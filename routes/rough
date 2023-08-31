// routes/jobListing.js
import express from "express";
const router = express.Router();
const JobListing = require("../models/JobListing");

// POST /api/create-job-listing
router.post("/create-job-listing", async (req, res) => {
  const {
    title,
    description,
    qualification,
    location,
    jobType,
    salary,
    salaryMethod,
    yearsOfExperience,
    posted_date,
  } = req.body;

  const employerId = req.user.user_id;

  try {
    // Create and save the job listing
    const jobListing = await JobListing.create({
      title,
      description,
      qualification,
      location,
      jobType,
      salary,
      salaryMethod,
      yearsOfExperience,
      posted_date,
      employer: employerId,
    });

    res
      .status(201)
      .json({ message: "Job listing created successfully!", jobListing });
  } catch (error) {
    res.status(500).json({ error: "Error creating job listing." });
  }
});

module.exports = router;
