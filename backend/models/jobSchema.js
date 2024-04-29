import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobType: {
      type: String,
      required: true,
    },
    jobListingName: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    jobStatus: {
      type: String,
      enum: ["Active", "InActive"],
      default: "Active",
    },
    companyName: {
      type: String,
      required: true,
    },
    companyEmail: {
      type: String,
      required: true,
    },
    companyPhone: {
      type: String,
      required: true,
    },
    companyDescription: {
      type: String,
      required: true,
    },
    usersApplied: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
