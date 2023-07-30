import JobSeeker from "../models/JobSeeker.js";

// Create a new job seeker
exports.createJobSeeker = async (req, res) => {
  try {
    const newJobSeeker = await JobSeeker.create(req.body);
    res.status(201).json(newJobSeeker);
  } catch (err) {
    res.status(500).json({ error: "Failed to create job seeker." });
  }
};

// Get job seeker by ID
exports.getJobSeekerById = async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.findById(req.params.id).populate(
      "saved_jobs job_applications"
    );
    res.status(200).json(jobSeeker);
  } catch (err) {
    res.status(404).json({ error: "Job seeker not found." });
  }
};

// Update job seeker by ID
exports.updateJobSeekerById = async (req, res) => {
  try {
    const updatedJobSeeker = await JobSeeker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedJobSeeker);
  } catch (err) {
    res.status(404).json({ error: "Job seeker not found." });
  }
};

// Delete job seeker by ID
exports.deleteJobSeekerById = async (req, res) => {
  try {
    await JobSeeker.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: "Job seeker not found." });
  }
};
