import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please Enter FullName"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be minimum 8 characters"],
      select: false,
    },
    profilePhoto: {
      public_id: String,
      url: String,
    },
    address: {
      type: String,
      required: [true, "Please Enter Your Address"],
    },
    qualifications: [
      {
        degree: { type: String },
        university: { type: String },
        courseStartDate: { type: Date },
        courseEndDate: { type: Date },
      },
    ],
    experiences: [
      {
        position: { type: String },
        company: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    primarySkills: {
      type: String,
    },
    savedJobs: [
      {
        job: {
          type: mongoose.Types.ObjectId,
          ref: "Job",
        },
      },
    ],
    appliedJobs: [
      {
        job: {
          type: mongoose.Types.ObjectId,
          ref: "Job",
        },
        appliedOn: {
          type: Date,
        },
        jobStatus: {
          type: String,
          enum: ["Pending", "Interview", "Declined"],
          default: "Pending",
        },
        interviewOn: {
          type: Date,
        },
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// pre method hash the password if it is modified, if not controller will go to next middleware
userSchema.pre("save", async function (next) {
  //console.log(this);

  if (!this.isModified("password")) {
    return next();
  }

  // hashing the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
