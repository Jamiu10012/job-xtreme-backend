import mongoose from "mongoose";

const jobAlertSchema = new mongoose.Schema({
  jobseeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobSeeker",
    required: true,
  },
  keywords: [{ type: String }],
  location: { type: String },
});

const JobAlert = mongoose.model("JobAlert", jobAlertSchema);

module.exports = JobAlert;
