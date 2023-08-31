import express from "express";
import {
  createResume,
  deleteResume,
  getAllResumes,
  getResumeById,
  getResumeByJobseekerId,
  updateResume,
} from "../controllers/resume.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/createresume/:id", createResume);
router.put("/updateresume/:id", updateResume);
router.get("/resumes", getAllResumes);
router.get("/seeker/:jobseekerId", getResumeByJobseekerId);
router.delete("/:id", verifyToken, deleteResume);
router.get("/getresume/:id", getResumeById);

export default router;
