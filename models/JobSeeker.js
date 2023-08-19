import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  full_name: {
    firstname: {
      type: String,
      required: [true, "First name is required"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
    },
  },
  contact_phone: { type: String, required: true },
  job_title: { type: String },
  contact_email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    required: true,
  },
  gender: { type: String },
  date_of_birth: { type: String },
  nationality: { type: String },
  location: {
    city: { type: String },
    zipcode: { type: String },
    full_address: { type: String },
    state: { type: String },
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

// module.exports = JobSeeker;
export default JobSeeker;
