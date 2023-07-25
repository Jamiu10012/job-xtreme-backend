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
        "full-time",
        "part-time",
        "contract",
        "temporary",
        "internship",
        "remote",
        "freelance",
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
      type: Number,
      required: true,
    },
    salaryMethod: {
      type: String,
      enum: ["hourly", "monthly", "annually"],
      required: true,
    },
    yearsOfExperience: {
      type: Number,
    },

    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User collection (employers will be users in the User collection)
      required: true,
    },
    // You can add more fields like application deadline, date posted, etc. as needed
  },
  { timestamps: true }
);

const JobListing = mongoose.model("JobListing", JobListingSchema);

export default JobListing;
