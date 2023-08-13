import express from "express";
import {
  createResume,
  deleteResume,
  getAllResumes,
  getResumeById,
  updateResume,
} from "../controllers/resume.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/createresume", createResume);
router.put("/updateresume/:id", verifyToken, updateResume);
router.get("/resumes", getAllResumes);
router.delete("/:id", verifyToken, deleteResume);
router.get("/getresume/:id", verifyToken, getResumeById);

export default router;
