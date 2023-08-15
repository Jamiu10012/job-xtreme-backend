import JobListing from "../models/JobListing.js";
import User from "../models/User.js";
// Create a new job listing
// export const createJobListing = async (req, res) => {
//   try {
//     const newJobListing = await JobListing.create(req.body);
//     // await newJobListing.save();
//     res.status(201).json(newJobListing);
//   } catch (err) {
//     console.error("Error creating job:", err);
//     res.status(500).json({ error: "Failed to create job." });
//   }
// };
export const createJobListing = async (req, res) => {
  try {
    // Assuming you have user information available in req.user after authentication
    // const userRole = req.user.role;
    // if (!req.user || !req.user._id) {
    //   return res.status(403).json({ error: "User not authenticated." });
    // }
    const userId = req.id;
    const user = await User.findOne({ _id: userId });
    // console.log(user);
    res.status(200).json(err);
    // // Check if the user's role is "employer"
    // if (user.role !== "employer") {
    //   return res
    //     .status(403)
    //     .json({ error: "Only employers can create job listings." });
    // }

    // // Check if the user is an employer
    // if (userRole !== "employer") {
    //   return res
    //     .status(403)
    //     .json({ error: "Only employers can create job listings." });
    // }

    // const newJobListing = await JobListing.create(req.body);
    // res.status(201).json(newJobListing);
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ error: "Failed to create job." });
  }
};
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobListing.find();
    return res.status(200).json({ jobs });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
// Get job listing by ID
export const getJobListingById = async (req, res) => {
  try {
    const jobListing = await JobListing.findById(req.params.id);
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
