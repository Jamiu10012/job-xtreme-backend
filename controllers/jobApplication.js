import JobApplication from "../models/JobApplication.js";

// Create a new job application
export const createJobApplication = async (req, res) => {
  try {
    const newJobApplication = await JobApplication.create(req.body);
    res.status(201).json(newJobApplication);
  } catch (err) {
    res.status(500).json({ error: "Failed to create job application." });
  }
};

// Get job application by ID
export const getJobApplicationById = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findById(req.params.id);
    res.status(200).json(jobApplication);
  } catch (err) {
    res.status(404).json({ error: "Job application not found." });
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
