import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema({
  jobseeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobSeeker",
    required: true,
  },
  joblisting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobListing",
    required: true,
  },
  saved_date: { type: Date, default: Date.now },
});

const SavedJob = mongoose.model("SavedJob", savedJobSchema);

export default SavedJob;
