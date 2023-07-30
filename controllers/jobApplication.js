import JobApplication from "../models/JobApplication.js";

// Create a new job application
exports.createJobApplication = async (req, res) => {
  try {
    const newJobApplication = await JobApplication.create(req.body);
    res.status(201).json(newJobApplication);
  } catch (err) {
    res.status(500).json({ error: "Failed to create job application." });
  }
};

// Get job application by ID
exports.getJobApplicationById = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findById(req.params.id);
    res.status(200).json(jobApplication);
  } catch (err) {
    res.status(404).json({ error: "Job application not found." });
  }
};

// Update job application by ID
exports.updateJobApplicationById = async (req, res) => {
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
exports.deleteJobApplicationById = async (req, res) => {
  try {
    await JobApplication.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: "Job application not found." });
  }
};
