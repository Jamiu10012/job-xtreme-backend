import mongoose from "mongoose";

const JobListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: [
        "Full-time",
        "Part-time",
        "Contract",
        "Temporary",
        "Internship",
        "Remote",
        "Freelance",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    salaryMethod: {
      type: String,
      enum: ["Hourly", "Month", "Year"],
      required: true,
    },
    yearsOfExperience: {
      type: String,
    },
    skills: {
      type: [String],
    },
    posted_date: { type: Date, default: Date.now },

    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
    applicant: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobSeeker",
      },
    ],
    job_applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobApplication",
      },
    ],
  },
  { timestamps: true }
);

const JobListing = mongoose.model("JobListing", JobListingSchema);

export default JobListing;
