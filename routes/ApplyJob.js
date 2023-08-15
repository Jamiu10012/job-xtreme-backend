import express from "express";
import { applyForJob } from "../controllers/jobApplicationController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Route to allow jobseeker to apply for a job
router.post("/apply/:jobListingId", verifyToken applyForJob);

export default router;
