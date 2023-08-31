import express from "express";
import {
  createJobApplication,
  getApplyJobByJobSeekerId,
  getBestMatchingApplications,
  getJobApplicationById,
  getJobApplicationsByEmployer,
  updateJobApplication,
} from "../controllers/jobApplication.js";

const router = express.Router();

// Route to allow jobseeker to apply for a job
router.post("/apply/", createJobApplication);
router.get("/:jobseekerId", getApplyJobByJobSeekerId);
router.get("/best-matching/:jobListingId", getBestMatchingApplications);
router.get("/:employerId", getJobApplicationsByEmployer);
router.get("/applied/:id", getJobApplicationById);
router.put("/jobapplication/:jobseekerId/:joblistingId", updateJobApplication);

export default router;
