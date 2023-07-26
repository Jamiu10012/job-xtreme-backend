import mongoose from "mongoose";

const employerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company_name: { type: String, required: true },
  company_description: { type: String },
  industry: { type: String },
  company_size: { type: String },
  nationality: { type: String },
  location: {
    city: { type: String },
    zipcode: { type: String },
    full_address: { type: String },
  },
  website_url: { type: String },
  contact_email: { type: String },
  contact_phone: { type: String },
  social_media: {
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
  },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobPost" }],
});

const Employer = mongoose.model("Employer", employerSchema);

module.exports = Employer;
