import express from "express";
import {
  createJobApplication,
  getApplyJobByJobSeekerId,
  getJobApplicationById,
} from "../controllers/jobApplication.js";

const router = express.Router();

// Route to allow jobseeker to apply for a job
router.post("/apply/", createJobApplication);
router.get("/:jobseekerId", getApplyJobByJobSeekerId);
router.get("/applied/:id", getJobApplicationById);

export default router;
