import mongoose from "mongoose";

const employerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company_name: { type: String, required: true },
  company_description: { type: String },
  industry: {
    type: String,
    enum: [
      "it",
      "finance",
      "healthcare",
      "manufacturing",
      "retail",
      "education",
      "entertainment",
      "automotive",
      "hospitality",
      "real_estate",
      "agriculture",
      // Add more industry options as needed
    ],
    required: true,
  },
  company_size: { type: String, enum: ["small", "medium", "large", "larger"] },
  nationality: { type: String },
  location: {
    city: { type: String },
    zipcode: { type: String },
    full_address: { type: String },
    state: { type: String },
  },
  website_url: { type: String },
  contact_email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    required: true,
  },
  contact_phone: { type: String, required: true },
  social_media: {
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
  },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
});

const Employer = mongoose.model("Employer", employerSchema);

// module.exports = Employer;
export default Employer;
