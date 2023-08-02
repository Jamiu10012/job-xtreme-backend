// routes/jobListing.js
import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createJobListing,
  deleteJobListingById,
  getJobListingById,
  searchJobs,
  updateJobListingById,
} from "../controllers/jobListing.js";

const router = express.Router();
// const JobListing = require("../models/JobListing");

// POST /api/create-job-listing
router.post("/createjoblisting", verifyToken, createJobListing);

router.put("/updatejoblisting/:id", verifyToken, updateJobListingById);
router.get("/getjoblisting/:id", verifyToken, getJobListingById);
router.get("/search", searchJobs);
router.delete("/deletejoblisting/:id", verifyToken, deleteJobListingById);

export default router;
