import JobListing from "../models/JobListing.jx";
import Application from "../models/JobApplication.js";

// Controller to allow a jobseeker to apply for a job
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
