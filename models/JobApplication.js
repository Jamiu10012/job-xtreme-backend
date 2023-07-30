import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  jobseeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobSeeker",
    required: true,
  },
  jobpost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPost",
    required: true,
  },
  application_date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["applied", "shortlisted", "rejected"],
    default: "applied",
  },
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobApplication;
