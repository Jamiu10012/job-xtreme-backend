// routes/jobListing.js
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createJobListing,
  deleteJobListingById,
  getAllJobs,
  getJobListingById,
  getJobsByEmployerId,
  getJobByEmployerId,
  getRandomJobs,
  searchJobs,
  updateJobListingById,
} from "../controllers/jobListing.js";

const router = express.Router();
// const JobListing = require("../models/JobListing");

// POST /api/create-job-listing
router.post("/createjoblisting/:id", createJobListing);

router.put("/updatejoblisting/:id", updateJobListingById);
router.get("/jobs", getAllJobs);
// router.get("/getjoblisting/:id", verifyToken, getJobListingById);
router.get("/getjoblisting/:id", getJobListingById);
router.get("/getjob/:employerId", getJobsByEmployerId);
router.get("/getjob/one/:employerId/:jobId", getJobByEmployerId);

router.get("/search", searchJobs);
router.delete("/deletejoblisting/:id", deleteJobListingById);
router.get("/randomjobs", getRandomJobs);

export default router;
