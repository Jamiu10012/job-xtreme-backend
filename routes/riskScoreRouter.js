import express from "express";
import {
  createRiskScore,
  getAllRiskScores,
} from "../controllers/riskScoreController.js";

const router = express.Router();

// Get all users
router.post("/createRiskScore", createRiskScore);
router.get("/getAllRiskScores", getAllRiskScores);

export default router;
