import express from "express";
import {
  createSaveJob,
  deleteSaveJobById,
  getSavedJobById,
  getSavedJobByJobSeekerId,
} from "../controllers/savedJob.js";

const router = express.Router();

// Route to allow jobseeker to apply for a job
router.post("/", createSaveJob);
router.get("/saved/:id", getSavedJobById);
router.get("/:jobseekerId", getSavedJobByJobSeekerId);
router.delete("/delete/:id", deleteSaveJobById);

export default router;
