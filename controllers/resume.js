import JobSeeker from "../models/JobSeeker.js";
import Resume from "../models/Resume.js"; // Import the Resume model

// Controller for creating a new resume
export const createResume = async (req, res) => {
  try {
    const id = req.params.id;
    const jobseeker = await JobSeeker.findOne({ _id: id }).populate("user");

    if (!req.params.id || !req.params.id) {
      return res.status(403).json({ error: "User not authenticated." });
    }
    if (jobseeker.resume) {
      return res.status(409).json({ error: "Resume already exists." });
    }
    if (jobseeker.user.role !== "jobseeker") {
      return res
        .status(403)
        .json({ error: "Only jobseeker can create job listings." });
    } else {
      const newResume = await Resume.create({
        ...req.body,
        jobseeker: req.params.id,
      });
      // Update the jobseeker's resume field with the ID of the newly created resume
      jobseeker.resume = newResume._id;
      await jobseeker.save();

      res.status(201).json(newResume);

      // const updateJobSeeker = await JobSeeker.save({
      //   ...jobseeker,
      //   resume: newResume,
      // });
      // res.status(204).json(updateJobSeeker);
    }
  } catch (err) {
    console.error("Error creating resume:", err);
    res.status(500).json({ error: "Failed to create resume." });
  }
};
// const newResume = new Resume(req.body);
// const savedResume = await newResume.save();
// res.json(savedResume);
// } catch (error) {
// console.error(error);
// res.status(500).json({ error: "Something is missing" });
// }
// Controller for getting all resumes
export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Opps look like you dont have access" });
  }
};

// Controller for getting a specific resume by ID
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).populate("jobseeker");
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller for updating a resume by ID
export const updateResume = async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.json(updatedResume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller for deleting a resume by ID
export const deleteResume = async (req, res) => {
  try {
    const deletedResume = await Resume.findByIdAndDelete(req.params.id);
    if (!deletedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
export const getResumeByJobseekerId = async (req, res) => {
  const jobseekerId = req.params.jobseekerId;

  try {
    const resume = await Resume.find({ jobseeker: jobseekerId }); // Assuming 'employer' is a field in your Job model that stores the employer's ID
    res.status(200).json(resume);
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ error: "An error occurred while fetching resume." });
  }
};
