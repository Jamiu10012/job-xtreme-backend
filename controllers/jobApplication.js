import JobApplication from "../models/JobApplication.js";
import JobListing from "../models/JobListing.js";
import JobSeeker from "../models/JobSeeker.js";

// Create a new job application
export const createJobApplication = async (req, res) => {
  try {
    const newJobApplication = await JobApplication.create(req.body);
    console.log("New job application created:", newJobApplication);
    // Update jobseeker's job_applications field
    await JobSeeker.findByIdAndUpdate(
      req.body.jobseeker, // Replace with the actual field name holding the jobseeker's ID
      { $push: { job_applications: newJobApplication._id } },
      { new: true }
    );
    // update joblisting's job
    await JobListing.findByIdAndUpdate(
      req.body.joblisting, // Replace with the actual field name holding the jobseeker's ID
      { $push: { job_applications: newJobApplication._id } },
      { new: true }
    );
    res.status(201).json(newJobApplication);
  } catch (err) {
    res.status(500).json({ error: "Failed to create job application." });
  }
};

// Get job application by ID
export const getJobApplicationById = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findById(
      req.params.id
    ).populate("jobseeker");
    res.status(200).json(jobApplication);
  } catch (err) {
    res.status(404).json({ error: "Job application not found." });
  }
};
export const getApplyJobByJobSeekerId = async (req, res) => {
  const jobseekerId = req.params.jobseekerId;

  try {
    const AppliedJob = await JobApplication.find({
      jobseeker: jobseekerId,
    }).populate({
      path: "joblisting",
      populate: {
        path: "employer", // Assuming 'employer' is the field in JobListing that references the Employer model
        model: "Employer", // Replace with the actual model name for Employer
      },
    });
    res.status(200).json(AppliedJob);
  } catch (error) {
    console.error("Error fetching applied obs:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching applied jab." });
  }
};

// Update job application by ID
export const updateJobApplicationById = async (req, res) => {
  try {
    const updatedJobApplication = await JobApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedJobApplication);
  } catch (err) {
    res.status(404).json({ error: "Job application not found." });
  }
};

// Delete job application by ID
export const deleteJobApplicationById = async (req, res) => {
  try {
    await JobApplication.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: "Job application not found." });
  }
};
export const applyForJob = async (req, res) => {
  try {
    // Assuming you have user information available in req.user after authentication
    const userId = req.user._id; // Replace with the actual user ID

    // Get the job listing ID from the request parameters
    const jobListingId = req.params.jobListingId;

    // Check if the job listing exists
    const jobListing = await JobListing.findById(jobListingId);
    if (!jobListing) {
      return res.status(404).json({ error: "Job listing not found." });
    }

    // Create a new application
    const newApplication = new Application({
      jobListing: jobListingId,
      jobSeeker: userId,
    });

    // Save the application
    await newApplication.save();

    res.status(201).json({ message: "Application submitted successfully." });
  } catch (err) {
    console.error("Error applying for job:", err);
    res.status(500).json({ error: "Failed to submit application." });
  }
};
