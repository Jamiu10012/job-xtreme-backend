import Employer from "../models/Employer.js";

// Get all employers
export const getAll = async (req, res) => {
  try {
    const employers = await Employer.find().populate("user");
    res.status(200).json(employers);
  } catch (err) {
    res.status(500).json({ error: "Failed to load employers" });
  }
};

// Create a new employer
export const createEmployer = async (req, res) => {
  try {
    const newEmployer = await Employer.create(req.body);
    res.status(201).json(newEmployer);
  } catch (err) {
    res.status(500).json({ error: "Failed to create employer." });
  }
};

// Get employer by ID
export const getEmployerById = async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id).populate("jobs");
    res.status(200).json(employer);
  } catch (err) {
    res.status(404).json({ error: "Employer not found." });
  }
};

// Update employer by ID
export const updateEmployerById = async (req, res) => {
  try {
    const updatedEmployer = await Employer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployer) {
      return res.status(404).json({ error: "Employer not found." });
    }
    res.status(200).json(updatedEmployer);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while updating employer." });
  }
};

// Delete employer by ID
export const deleteEmployerById = async (req, res) => {
  try {
    await Employer.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: "Employer not found." });
  }
};
