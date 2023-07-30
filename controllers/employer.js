import Employer from "../models/Employer.js";
// Create a new employer
exports.createEmployer = async (req, res) => {
  try {
    const newEmployer = await Employer.create(req.body);
    res.status(201).json(newEmployer);
  } catch (err) {
    res.status(500).json({ error: "Failed to create employer." });
  }
};

// Get employer by ID
exports.getEmployerById = async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id).populate("jobs");
    res.status(200).json(employer);
  } catch (err) {
    res.status(404).json({ error: "Employer not found." });
  }
};

// Update employer by ID
exports.updateEmployerById = async (req, res) => {
  try {
    const updatedEmployer = await Employer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedEmployer);
  } catch (err) {
    res.status(404).json({ error: "Employer not found." });
  }
};

// Delete employer by ID
exports.deleteEmployerById = async (req, res) => {
  try {
    await Employer.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: "Employer not found." });
  }
};
