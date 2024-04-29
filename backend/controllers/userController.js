import User from "../models/userSchema.js";
import Job from "../models/jobSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { delete_file, upload_file } from "../utils/cloudinary.js";

// register => /api/register
const register = async (req, res) => {
  // get the fields from req
  const { fullName, email, password, address } = req.body;

  try {
    // check whether provided email already exists in the db
    const isEmailExists = await User.findOne({ email });

    if (isEmailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // creating user doc
    const user = await User.create({
      fullName,
      email,
      password,
      address,
    });

    // res.status(201).json({ user });
    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      return res.status(400).json({ error: message[0] });
    }
    res.status(500).json({ error: err.message });
  }
};

// login => api/login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please Enter All the Fields" });
  }

  try {
    // check user with email exists or not
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ error: "Invalid EmailId" });
    }

    // if exists compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Incorrect Password" });
    }

    // generating token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_TIME,
      }
    );

    // return token in cookie as response
    const options = {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
    };

    res.status(200).cookie("token", token, options).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// logout => api/logout
const logout = (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({ message: "LoggedOut Successfully" });
};

// get LoggedIn user details => /api/me
const getLoggedInUser = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id)
      .populate("savedJobs.job", "jobListingName companyName jobLocation")
      .populate("appliedJobs.job", "jobListingName companyName jobLocation");
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user details => /api/me/update
const updateProfile = async (req, res) => {
  // generating public_id, url related to profilePic using cloudinary
  let profilePhotoResponse = {};

  if (typeof req.body.profilePhoto === "string") {
    profilePhotoResponse = await upload_file(
      req.body.profilePhoto,
      "Jobportal/profilePhotos"
    );
  } else {
    profilePhotoResponse = req.body.profilePhoto;
  }

  const detailsToBeUpdated = {
    fullName: req.body.fullName,
    email: req.body.email,
    address: req.body.address,
    profilePhoto: profilePhotoResponse,
  };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      detailsToBeUpdated,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "No User Found To Update Details" });
    }

    // res.status(200).json({ user: updatedUser });
    res.status(200).json({ message: "Profile Updated Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update qualifications, expereinces and primary skills => /api/me/updateOtherDetails
const updateOtherDetails = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    res.status(200).json({ message: "Details Updated Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update password => /api/password/update
const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const pswdMatch = await bcrypt.compare(req.body.oldPassword, user.password);

    if (!pswdMatch) {
      return res.status(400).json({ error: "Old password in incorrect" });
    }

    user.password = req.body.password;
    await user.save();

    res.status(200).json({ message: "Password Updated Successfully" });
  } catch (err) {
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      return res.status(400).json({ error: message[0] });
    }
    res.status(500).json({ error: err.message });
  }
};

// save job by user only => /api/saveJob/
const saveJob = async (req, res) => {
  const { jobId } = req.body;

  try {
    const user = await User.findById(req.user._id);
    user.savedJobs.push({ job: jobId });
    await user.save();
    res.status(200).json({ message: "Successfully Saved the Job" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete saved job => /api/saveJobs/:id
const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(req.user._id);
    const savedJobs = user.savedJobs.filter(
      (job) => job._id.toString() !== id.toString()
    );
    user.savedJobs = savedJobs;
    await user.save();
    res
      .status(200)
      .json({ message: "Job Successfully removed from saved list" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// apply for job by user only
const applyJob = async (req, res) => {
  const { jobId } = req.body;

  try {
    // update appliedJobs array for user
    const user = await User.findById(req.user._id);
    user.appliedJobs.push({ job: jobId, appliedOn: new Date().toUTCString() });
    await user.save();

    // get the job details
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: "No Job Found with the Id" });
    }

    // update userApplied array for the job
    job.usersApplied.push({ user: req.user._id });
    await job.save();

    res.status(200).json({ message: "Successfully applied for the job" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete applied job => /api/appliedJobs/:id
const deleteAppliedJob = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(req.user._id);
    const appliedJobs = user.appliedJobs.filter(
      (job) => job._id.toString() !== id.toString()
    );
    user.appliedJobs = appliedJobs;
    await user.save();
    res.status(200).json({ message: "Job Successfully removed from list" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------------------- Admin Functionalities ------------------------

// get All Users by admin => /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({ users: allUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get user by Id by admin => api/admin/users/:id
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // checking for valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ error: "No User Found With The Provided Id" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "No User Found With Id" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete user by admin => /api/admin/users/:id
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "No User Found With Id" });
    }

    // remove profilePhoto in Cloudinary
    if (user?.profilePhoto?.url) {
      await delete_file(user?.profilePhoto?.public_id);
    }

    await user.deleteOne();

    res.status(200).json({ message: "User Profile Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get stats => /api/mystats
const myStats = async (req, res) => {
  try {
    const pendingApplicationsCount = await User.aggregate([
      { $unwind: { path: "$appliedJobs" } },
      { $match: { "appliedJobs.jobStatus": { $eq: "Pending" } } },
    ]);
    const interviewsCount = await User.aggregate([
      { $unwind: { path: "$appliedJobs" } },
      { $match: { "appliedJobs.jobStatus": { $eq: "Interview" } } },
    ]);
    const declinedApplicationsCount = await User.aggregate([
      { $unwind: { path: "$appliedJobs" } },
      { $match: { "appliedJobs.jobStatus": { $eq: "Declined" } } },
    ]);

    // calculating jobs applied in a month
    // const jobsCountInMonths = new Map([
    //   ["January", 0],
    //   ["February", 0],
    //   ["March", 0],
    //   ["April", 0],
    //   ["May", 0],
    //   ["June", 0],
    //   ["July", 0],
    //   ["August", 0],
    //   ["September", 0],
    //   ["October", 0],
    //   ["November", 0],
    //   ["December", 0],
    // ]);

    // const user = await User.findById(req.user._id);

    // user.appliedJobs.forEach((job) => {
    //   if (getMonth(job.appliedOn) === "January") {
    //     jobsCountInMonths.set("January", jobsCountInMonths.get("January") + 1);
    //   } else if (getMonth(job.appliedOn) === "February") {
    //     jobsCountInMonths.set(
    //       "February",
    //       jobsCountInMonths.get("February") + 1
    //     );
    //   } else if (getMonth(job.appliedOn) === "March") {
    //     jobsCountInMonths.set("March", jobsCountInMonths.get("March") + 1);
    //   } else if (getMonth(job.appliedOn) === "April") {
    //     jobsCountInMonths.set("April", jobsCountInMonths.get("April") + 1);
    //   } else if (getMonth(job.appliedOn) === "May") {
    //     jobsCountInMonths.set("May", jobsCountInMonths.get("May") + 1);
    //   } else if (getMonth(job.appliedOn) === "June") {
    //     jobsCountInMonths.set("June", jobsCountInMonths.get("June") + 1);
    //   } else if (getMonth(job.appliedOn) === "July") {
    //     jobsCountInMonths.set("July", jobsCountInMonths.get("July") + 1);
    //   } else if (getMonth(job.appliedOn) === "August") {
    //     jobsCountInMonths.set("August", jobsCountInMonths.get("August") + 1);
    //   } else if (getMonth(job.appliedOn) === "September") {
    //     jobsCountInMonths.set(
    //       "September",
    //       jobsCountInMonths.get("September") + 1
    //     );
    //   } else if (getMonth(job.appliedOn) === "October") {
    //     jobsCountInMonths.set("October", jobsCountInMonths.get("October") + 1);
    //   } else if (getMonth(job.appliedOn) === "November") {
    //     jobsCountInMonths.set(
    //       "November",
    //       jobsCountInMonths.get("November") + 1
    //     );
    //   } else if (getMonth(job.appliedOn) === "December") {
    //     jobsCountInMonths.set(
    //       "December",
    //       jobsCountInMonths.get("December") + 1
    //     );
    //   }
    // });

    // const jobsAppliedCountInMonthsArr = Array.from(
    //   jobsCountInMonths,
    //   function (entry) {
    //     return { month: entry[0], count: entry[1] };
    //   }
    // );

    const jobsAppliedInMonths = await User.aggregate([
      { $unwind: "$appliedJobs" }, // unwind the array to get each applied job as a separate document
      {
        $group: {
          _id: {
            month: { $month: { $toDate: "$appliedJobs.appliedOn" } }, // extract month from appliedOn Date
            year: { $year: { $toDate: "$appliedJobs.appliedOn" } }, // Extract year from appliedOn date
          },
          count: { $sum: 1 }, //  count the number of applied Jobs for each month
        },
      },
      {
        $addFields: {
          monthName: {
            $dateToString: {
              format: "%B", // Full month name (e.g., January, February)
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: 1,
                },
              }, // create date object for aggregation
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          appliedJobs: {
            $push: {
              month: "$monthName",
              year: "$_id.year",
              count: "$count",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          appliedJobs: 1,
        },
      },
    ]);

    const jobsAppliedCountInMonths = [
      { month: "January", count: 0 },
      { month: "February", count: 0 },
      { month: "March", count: 0 },
      { month: "April", count: 0 },
      { month: "May", count: 0 },
      { month: "June", count: 0 },
      { month: "July", count: 0 },
      { month: "August", count: 0 },
      { month: "September", count: 0 },
      { month: "October", count: 0 },
      { month: "November", count: 0 },
      { month: "December", count: 0 },
    ];

    // updating the jobsAppliedCountInMonths array with jobs that has count by keeping other months job count to zero
    for (let i = 0; i < jobsAppliedInMonths.length; i++) {
      for (let j = 0; j < jobsAppliedCountInMonths.length; j++) {
        if (
          jobsAppliedInMonths[i].appliedJobs[0].month ===
          jobsAppliedCountInMonths[j].month
        ) {
          jobsAppliedCountInMonths[j] = {
            month: jobsAppliedInMonths[i].appliedJobs[0].month,
            count: jobsAppliedInMonths[i].appliedJobs[0].count,
          };
        }
      }
    }

    res.status(200).json({
      pendingAppsCount: pendingApplicationsCount.length,
      interviewsCount: interviewsCount.length,
      declinedAppsCount: declinedApplicationsCount.length,
      jobsAppliedCountInMonths,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMonth = (date) => {
  const formatter = new Intl.DateTimeFormat("en", { month: "long" });
  const month = formatter.format(new Date(date));
  return month;
};

// stats for admin => /api/adminStats
const adminStats = async (req, res) => {
  try {
    const users = await User.find();
    const jobs = await Job.find();

    // calculating jobs applied in a month
    // jobsCountInMonths will give count of jobs posted in a month (not the months that has 0 jobs posted)
    const jobsCountInMonths = await Job.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" }, // Extract month from createdAt date
            year: { $year: "$createdAt" }, // Extract year from createdAt date
          },
          count: { $sum: 1 }, // Count the number of jobs created for each month
        },
      },
      {
        $addFields: {
          // adds a field to map the numeric month to its corresponding name
          monthName: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id.month", 1] }, then: "January" },
                { case: { $eq: ["$_id.month", 2] }, then: "February" },
                { case: { $eq: ["$_id.month", 3] }, then: "March" },
                { case: { $eq: ["$_id.month", 4] }, then: "April" },
                { case: { $eq: ["$_id.month", 5] }, then: "May" },
                { case: { $eq: ["$_id.month", 6] }, then: "June" },
                { case: { $eq: ["$_id.month", 7] }, then: "July" },
                { case: { $eq: ["$_id.month", 8] }, then: "August" },
                { case: { $eq: ["$_id.month", 9] }, then: "September" },
                { case: { $eq: ["$_id.month", 10] }, then: "October" },
                { case: { $eq: ["$_id.month", 11] }, then: "November" },
                { case: { $eq: ["$_id.month", 12] }, then: "December" },
              ],
              default: "Unknown",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$monthName",
          year: "$_id.year",
          count: 1,
        },
      },
      {
        $sort: { year: 1, month: 1 }, //  sort the result by year and month
      },
    ]);

    const jobsPostedCountInMonths = [
      { month: "January", count: 0 },
      { month: "February", count: 0 },
      { month: "March", count: 0 },
      { month: "April", count: 0 },
      { month: "May", count: 0 },
      { month: "June", count: 0 },
      { month: "July", count: 0 },
      { month: "August", count: 0 },
      { month: "September", count: 0 },
      { month: "October", count: 0 },
      { month: "November", count: 0 },
      { month: "December", count: 0 },
    ];

    // updating the jobsPostedCountInMonths array with jobs that has count by keeping other months job count to zero
    for (let i = 0; i < jobsCountInMonths.length; i++) {
      for (let j = 0; j < jobsPostedCountInMonths.length; j++) {
        if (jobsCountInMonths[i].month === jobsPostedCountInMonths[j].month) {
          jobsPostedCountInMonths[j] = {
            month: jobsCountInMonths[i].month,
            count: jobsCountInMonths[i].count,
          };
        }
      }
    }

    res.status(200).json({
      totalUsers: users.length,
      totalJobs: jobs.length,
      jobsPostedCountInMonths,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  register,
  login,
  logout,
  getLoggedInUser,
  getUserById,
  updateProfile,
  updateOtherDetails,
  updatePassword,
  getAllUsers,
  deleteUser,
  saveJob,
  deleteJob,
  applyJob,
  deleteAppliedJob,
  myStats,
  adminStats,
};
