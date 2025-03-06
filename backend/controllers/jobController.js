import mongoose from "mongoose";
import Job from "../models/jobSchema.js";
import User from "../models/userSchema.js";

// adding a new job => /api/admin/jobs
const addNewJob = async (req, res) => {
  const newJob = {
    jobType: req.body.jobType,
    jobListingName: req.body.jobListingName,
    jobDescription: req.body.jobDescription,
    salary: req.body.salary,
    jobLocation: req.body.jobLocation,
    companyName: req.body.companyName,
    companyEmail: req.body.companyEmail,
    companyPhone: req.body.companyPhone,
    companyDescription: req.body.companyDescription,
  };

  try {
    const job = await Job.create(newJob);
    res.status(201).json({ message: "Job Added Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all jobs => /api/admin/jobs
const getAllJobs = async (req, res) => {
  try {
    const allJobs = await Job.find({}).sort({ createdAt: -1 });
    res.status(200).json(allJobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get job by Id => /api/jobs/:id
const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No Such Job Found with the Id" });
    }

    const job = await Job.findById(id).populate(
      "usersApplied.user",
      "fullName address appliedJobs"
    );

    if (!job) {
      return res.status(404).json({ error: "No Job Found With the Id" });
    }

    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update job => /api/admin/jobs/:id
const updateJob = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedJob) {
      return res
        .status(404)
        .json({ error: "No Job found with the Id to update" });
    }

    res.status(200).json({ message: "Job Updated Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete a job => /api/admin/jobs/:id
const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);

    if (!job) {
      return res
        .status(404)
        .json({ error: "No Job found with the Id to delete" });
    }
    await job.deleteOne();
    res.status(200).json({ message: "Job Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update job status for user and set interview for qualified person => /api/admin/updateJobStatusForUser
const updateJobStatusForUser = async (req, res) => {
  const { userId, jobId, jobStatus, interviewOn } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "No User Found with Id" });
    }

    // user.appliedJobs.forEach((appliedjob) => {
    //   if (appliedjob.job.toString() === jobId.toString()) {
    //     appliedjob.jobStatus = jobStatus;
    //     appliedjob.interviewOn = interviewOn === "" ? null : interviewOn;
    //   }
    // });

    const appliedJob = user.appliedJobs.find(
      (eachJob) => eachJob.job.toString() === jobId.toString()
    );
    appliedJob.jobStatus = jobStatus;
    appliedJob.interviewOn = interviewOn === "" ? null : interviewOn;

    await user.save();

    res.status(200).json({ message: "Updated jobStatus Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// search for jobs by user => /api/searchJobs
const searchJobs = async (req, res) => {
  const { search, jobType, jobLocation, salary, page } = req.query;
  //console.log(search, jobType, jobLocation, salary);

  const resPerPage = 6;
  const currentpage = page || 1;
  const skipJobs = resPerPage * (currentpage - 1);

  try {
    const jobQuery = Job.find({
      jobListingName: { $regex: `${search}`, $options: "i" },
      jobType: { $regex: `${jobType}`, $options: "i" },
      salary: { $regex: `\\$([0-9]+)k-\\$([0-9]+)k`, $options: "i" },
      jobLocation: {
        $regex: `${jobLocation}`,
        $options: "i",
      },
    });

    //console.log(jobQuery);

    const alljobs = await jobQuery.exec();

    // limiting the search results based on page number
    const jobs = await jobQuery.clone().limit(resPerPage).skip(skipJobs); // use clone() only when executing the same query second time

    res.status(200).json({ resPerPage, searchJobsCount: alljobs.length, jobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  addNewJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  updateJobStatusForUser,
  searchJobs,
};
