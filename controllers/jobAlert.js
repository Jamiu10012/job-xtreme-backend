import JobAlert from "../models/JobAlert.js";

// Create a new job alert
exports.createJobAlert = async (req, res) => {
  try {
    const newJobAlert = await JobAlert.create(req.body);
    res.status(201).json(newJobAlert);
  } catch (err) {
    res.status(500).json({ error: "Failed to create job alert." });
  }
};

// Get job alert by ID
exports.getJobAlertById = async (req, res) => {
  try {
    const jobAlert = await JobAlert.findById(req.params.id);
    res.status(200).json(jobAlert);
  } catch (err) {
    res.status(404).json({ error: "Job alert not found." });
  }
};

// Update job alert by ID
exports.updateJobAlertById = async (req, res) => {
  try {
    const updatedJobAlert = await JobAlert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedJobAlert);
  } catch (err) {
    res.status(404).json({ error: "Job alert not found." });
  }
};

// Delete job alert by ID
exports.deleteJobAlertById = async (req, res) => {
  try {
    await JobAlert.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: "Job alert not found." });
  }
};
