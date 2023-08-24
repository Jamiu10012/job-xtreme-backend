import express from "express";
import {
  createJobApplication,
  getApplyJobByJobSeekerId,
  getJobApplicationById,
  getJobApplicationsByEmployer,
} from "../controllers/jobApplication.js";

const router = express.Router();

// Route to allow jobseeker to apply for a job
router.post("/apply/", createJobApplication);
router.get("/:jobseekerId", getApplyJobByJobSeekerId);
router.get("/:employerId", getJobApplicationsByEmployer);
router.get("/applied/:id", getJobApplicationById);

export default router;
