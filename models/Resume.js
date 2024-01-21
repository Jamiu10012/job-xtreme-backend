import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  fullName: {
    firstname: {
      type: String,
      // required: [true, "First name is required"],
    },
    lastname: {
      type: String,
      // required: [true, "Last name is required"],
    },
  },
  email: {
    type: String,
    // required: [true, "Email is required"],
  },
  phone: {
    type: String,
    // required: [true, "Phone String is required"],
  },
  yearofExperience: {
    type: String,
    // required: [true, "Phone String is required"],
  },
  address: {
    type: String,
    // required: [true, "Address is required"],
  },
  social_media: {
    linkedin: { type: String },
    linkedinURL: { type: String },
    twitter: { type: String },
    twitterURL: { type: String },
    github: { type: String },
    githubURL: { type: String },
  },
  profile_summary: {
    type: String,
  },
  job_title: { type: String },
  education: [
    {
      degree: {
        type: String,
      },
      institution: {
        type: String,
      },
      institutionURL: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      startYear: {
        type: String,
      },
      endYear: {
        type: String,
      },
      desc: {
        type: String,
      },
    },
  ],
  experience: [
    {
      position: {
        type: String,
      },
      company: {
        type: String,
      },
      companyURL: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      startYear: {
        type: String,
        // required: [true, "Start year is required"],
      },
      endYear: {
        type: String,
      },
      desc: {
        type: String,
      },
    },
  ],
  skills: {
    type: [String],
  },
  hobby: {
    type: [String],
  },
  certifications: {
    type: [String],
  },
  jobseeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobSeeker",
    required: true,
  },
});

const Resume = mongoose.model("Resume", ResumeSchema);
export default Resume;
