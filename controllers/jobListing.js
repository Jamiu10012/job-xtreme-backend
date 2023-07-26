import JobListing from "../models/JobListing.js";

// Create a new job listing
exports.createJobListing = async (req, res) => {
  try {
    const newJobListing = await JobListing.create(req.body);
    res.status(201).json(newJobListing);
  } catch (err) {
    res.status(500).json({ error: "Failed to create job." });
  }
};

// Get job listing by ID
exports.getJobListingById = async (req, res) => {
  try {
    const jobListing = await JobListing.findById(req.params.id);
    res.status(200).json(jobListing);
  } catch (err) {
    res.status(404).json({ error: "Job listing not found." });
  }
};

// Update job listing by ID
exports.updateJobListingById = async (req, res) => {
  try {
    const updatedJobListing = await JobListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedJobListing);
  } catch (err) {
    res.status(404).json({ error: "Job listing not found." });
  }
};

// Delete job listing by ID
exports.deleteJobListingById = async (req, res) => {
  try {
    await JobListing.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: "Job listing not found." });
  }
};
