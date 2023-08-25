import Employer from "../models/Employer.js";
import JobApplication from "../models/JobApplication.js";
import JobListing from "../models/JobListing.js";
import JobSeeker from "../models/JobSeeker.js";

// Create a new job application
// export const createJobApplication = async (req, res) => {
//   try {
//     const newJobApplication = await JobApplication.create(req.body);
//     console.log("New job application created:", newJobApplication);
//     // Update jobseeker's job_applications field
//     await JobSeeker.findByIdAndUpdate(
//       req.body.jobseeker, // Replace with the actual field name holding the jobseeker's ID
//       { $push: { job_applications: newJobApplication._id } },
//       { new: true }
//     );
//     // update joblisting's job
//     await JobListing.findByIdAndUpdate(
//       req.body.joblisting, // Replace with the actual field name holding the jobseeker's ID
//       { $push: { job_applications: newJobApplication._id } },
//       { new: true }
//     );

//     res.status(201).json(newJobApplication);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to create job application." });
//   }
// };
export const createJobApplication = async (req, res) => {
  try {
    const { jobseeker, joblisting } = req.body;

    // Check if the job application already exists
    const existingApplication = await JobApplication.findOne({
      jobseeker,
      joblisting,
    });

    if (existingApplication) {
      return res.status(400).json({ error: "Job application already exists." });
    }

    const newJobApplication = await JobApplication.create(req.body);

    // Update jobseeker's job_applications field
    await JobSeeker.findByIdAndUpdate(
      jobseeker,
      { $push: { job_applications: newJobApplication._id } },
      { new: true }
    );

    // Update joblisting's job_applications field
    await JobListing.findByIdAndUpdate(
      joblisting,
      { $push: { job_applications: newJobApplication._id } },
      { new: true }
    );

    res.status(201).json(newJobApplication);
  } catch (err) {
    res.status(500).json({ error: "Failed to create job application." });
  }
};

// Get job application by ID
export const getJobApplicationById = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findById(
      req.params.id
    ).populate("jobseeker");
    res.status(200).json(jobApplication);
  } catch (err) {
    res.status(404).json({ error: "Job application not found." });
  }
};
export const getApplyJobByJobSeekerId = async (req, res) => {
  const jobseekerId = req.params.jobseekerId;

  try {
    const AppliedJob = await JobApplication.find({
      jobseeker: jobseekerId,
    }).populate({
      path: "joblisting",
      populate: {
        path: "employer", // Assuming 'employer' is the field in JobListing that references the Employer model
        model: "Employer", // Replace with the actual model name for Employer
      },
    });
    res.status(200).json(AppliedJob);
  } catch (error) {
    console.error("Error fetching applied obs:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching applied jab." });
  }
};

// Update job application by ID
export const updateJobApplicationById = async (req, res) => {
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
export const deleteJobApplicationById = async (req, res) => {
  try {
    await JobApplication.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: "Job application not found." });
  }
};
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

// Controller function to get job applications by employer ID
export const getJobApplicationsByEmployer = async (req, res) => {
  const employerId = req.params.employerId;

  try {
    const jobApplications = await JobApplication.find()
      .populate({
        path: "joblisting",
        match: { employer: employerId }, // Filter by employer ID
      })
      .populate("jobseeker")
      .exec();

    const filteredApplications = jobApplications.filter(
      (application) => application.joblisting !== null
    );

    res.json(filteredApplications);
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
};
export const updateJobApplication = async (req, res) => {
  try {
    const jobseekerId = req.params.jobseekerId;
    const joblistingId = req.params.joblistingId;
    const newStatus = req.body.status; // Assuming you send the updated status in the request body

    // Find the job application based on jobseeker and job listing IDs
    const jobApp = await JobApplication.findOne({
      jobseeker: jobseekerId,
      joblisting: joblistingId,
    });

    if (!jobApp) {
      return res.status(404).json({ message: "Job application not found." });
    }

    // Update the status
    jobApp.status = newStatus;

    // Save the changes
    const updatedJobApp = await jobApp.save();

    return res.status(200).json(updatedJobApp);
  } catch (error) {
    console.error("Error updating job application:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
