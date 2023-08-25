import JobListing from "../models/JobListing.js";
import User from "../models/User.js";
import Employer from "../models/Employer.js";

// Create a new job listin

export const createJobListing = async (req, res) => {
  try {
    // Assuming you have user information available in req.user after authentication
    const id = req.params.id;
    const employer = await Employer.findOne({ _id: id }).populate("user");

    if (!req.params.id || !req.params.id) {
      return res.status(403).json({ error: "User not authenticated." });
    }

    // Check if the user's role is not "employer"
    if (employer.user.role !== "employer") {
      return res
        .status(403)
        .json({ error: "Only employers can create job listings." });
    } else {
      const newJobListing = await JobListing.create({
        ...req.body,
        employer: req.params.id,
      });
      res.status(201).json(newJobListing);
      const updateEmployer = await Employer.save({
        ...employer,
        jobs: newJobListing,
      });
      res.status(204).json(updateEmployer);
    }
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ error: "Failed to create job." });
  }
};
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobListing.find().populate("employer");
    return res.status(200).json({ jobs });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
// Get job listing by ID
export const getJobListingById = async (req, res) => {
  try {
    const jobListing = await JobListing.findById(req.params.id).populate(
      "employer"
    );
    res.status(200).json(jobListing);
  } catch (err) {
    res.status(404).json({ error: "Job listing not found." });
  }
};

// Update job listing by ID
export const updateJobListingById = async (req, res) => {
  try {
    const updatedJobListing = await JobListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json("Update successfully");
  } catch (err) {
    res.status(404).json({ error: "Job listing not found." });
  }
};

// Delete job listing by ID
export const deleteJobListingById = async (req, res) => {
  try {
    await JobListing.findByIdAndDelete(req.params.id);
    res.status(200).send("Job deleted successfull!!!!");
  } catch (err) {
    res.status(404).json({ error: "Job listing not found." });
  }
};

export const searchJobs = async (req, res) => {
  try {
    const { keyword, location, salary, jobType } = req.query;

    // Build a dynamic query based on the search criteria
    const query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: new RegExp(keyword, "i") } },
        { description: { $regex: new RegExp(keyword, "i") } },
      ];
    }

    if (location) {
      query.location = { $regex: new RegExp(location, "i") };
    }
    if (salary) {
      query.salary = { $regex: new RegExp(salary, "i") };
    }
    // if (salary) {
    //   query.salary = salary;
    // }

    // if (jobType) {
    //   query.jobType = jobType;
    // }

    // Query the database based on the dynamic query
    const jobs = await JobListing.find(query);

    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to search for jobs." });
  }
};
export const getJobsByEmployerId = async (req, res) => {
  const employerId = req.params.employerId;

  try {
    const jobs = await JobListing.find({ employer: employerId })
      .populate({
        path: "job_applications",
        populate: {
          path: "jobseeker", // Assuming 'employer' is the field in JobListing that references the Employer model
          model: "JobSeeker", // Replace with the actual model name for Employer
          populate: {
            path: "resume", // Assuming 'employer' is the field in JobListing that references the Employer model
            model: "Resume", // Replace with the actual model name for Employer
          },
        },
      })
      .populate("employer"); // Assuming 'employer' is a field in your Job model that stores the employer's ID
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "An error occurred while fetching jobs." });
  }
};

export const getRandomJobs = async (req, res) => {
  try {
    const count = await JobListing.countDocuments();
    const randomJobs = [];

    while (randomJobs.length < 2) {
      const randomIndex = Math.floor(Math.random() * count);
      const randomJob = await JobListing.findOne().skip(randomIndex);
      if (randomJob) {
        randomJobs.push(randomJob);
      }
    }

    if (randomJobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }

    return res.status(200).json(randomJobs);
  } catch (error) {
    console.error("Error while fetching random jobs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
