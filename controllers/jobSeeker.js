import JobSeeker from "../models/JobSeeker.js";

export const getAllJobSeekers = async (req, res) => {
  try {
    const jobseekers = await JobSeeker.find().populate("user");
    return res.status(200).json({ jobseekers });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Create a new job seeker
export const createJobSeeker = async (req, res) => {
  try {
    const newJobSeeker = await JobSeeker.create(req.body);
    res.status(201).json(newJobSeeker);
  } catch (err) {
    res.status(500).json({ error: "Failed to create job seeker." });
  }
};

// Get job seeker by ID
export const getJobSeekerById = async (req, res) => {
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
export const updateJobSeekerById = async (req, res) => {
  try {
    const updatedJobSeeker = await JobSeeker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedJobSeeker) {
      return res.status(404).json({ error: "Job seeker not found." });
    }

    res.status(200).json(updatedJobSeeker);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the job seeker." });
  }
};

// Delete job seeker by ID
export const deleteJobSeekerById = async (req, res) => {
  try {
    await JobSeeker.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: "Job seeker not found." });
  }
};
export const addFavoriteJob = async (req, res) => {
  const { userId } = req.params;
  const { jobId } = req.body;

  try {
    const jobSeeker = await JobSeeker.findById(userId);

    if (!jobSeeker) {
      return res.status(404).json({ message: "Job seeker not found" });
    }

    // Check if the job listing is already in the job seeker's saved_jobs
    if (!jobSeeker.saved_jobs.includes(jobId)) {
      jobSeeker.saved_jobs.push(jobId);
      await jobSeeker.save();
    }

    res.status(200).json(jobSeeker);
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
