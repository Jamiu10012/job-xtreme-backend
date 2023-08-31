import SavedJob from "../models/SavedJob.js";
import JobSeeker from "../models/JobSeeker.js";

export const createSaveJob = async (req, res) => {
  try {
    // Check if the job is already saved
    const existingSavedJob = await SavedJob.findOne({
      jobseeker: req.body.jobseeker,
      joblisting: req.body.joblisting,
    });

    if (existingSavedJob) {
      return res.status(400).json({ error: "Job is already saved." });
    }

    // Create and save the job if it's not already saved
    const newsaveJob = await SavedJob.create(req.body);
    console.log("New job Saved:", newsaveJob);

    // Update jobseeker's saved_jobs field
    await JobSeeker.findByIdAndUpdate(
      req.body.jobseeker, // Replace with the actual field name holding the jobseeker's ID
      { $push: { saved_jobs: newsaveJob._id } },
      { new: true }
    );

    res.status(201).json(newsaveJob);
  } catch (err) {
    res.status(500).json({ error: "Failed to save job." });
  }
};

export const getSavedJobById = async (req, res) => {
  try {
    const savedjob = await SavedJob.findById(req.params.id).populate(
      "joblisting"
    );
    res.status(200).json(savedjob);
  } catch (err) {
    res.status(404).json({ error: "saved job not found." });
  }
};
export const getSavedJobByJobSeekerId = async (req, res) => {
  const jobseekerId = req.params.jobseekerId;

  try {
    const savedJob = await SavedJob.find({ jobseeker: jobseekerId }).populate({
      path: "joblisting",
      populate: {
        path: "employer", // Assuming 'employer' is the field in JobListing that references the Employer model
        model: "Employer", // Replace with the actual model name for Employer
      },
    });
    res.status(200).json(savedJob);
  } catch (error) {
    console.error("Error fetching savedjobs:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching saved jab." });
  }
};
export const deleteSaveJobById = async (req, res) => {
  try {
    await SavedJob.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: "Job application not found." });
  }
};
