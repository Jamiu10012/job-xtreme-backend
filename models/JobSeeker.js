import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  full_name: { type: String, required: true },
  contact_number: { type: String },
  contact_email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  date_of_birth: { type: Date },
  nationality: { type: String },
  location: {
    city: { type: String },
    zipcode: { type: String },
    full_address: { type: String },
  },
  social_media: {
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
  },
  saved_jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
  job_applications: [
    { type: mongoose.Schema.Types.ObjectId, ref: "JobApplication" },
  ],
});

const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema);

module.exports = JobSeeker;
