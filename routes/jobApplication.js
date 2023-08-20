import express from "express";
import { createJobApplication } from "../controllers/jobApplication";

const router = express.Router();

// Route to allow jobseeker to apply for a job
router.post("/apply/", createJobApplication);

export default router;
