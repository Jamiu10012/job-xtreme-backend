import express from "express";
import {
  addFavoriteJob,
  getAllJobSeekers,
  updateJobSeekerById,
} from "../controllers/jobSeeker.js";
// import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Get all users
router.get("/all/", getAllJobSeekers);

// upadate user
router.put("/:id", updateJobSeekerById);
router.post("/addfav/:userId", addFavoriteJob);

// router.get("/find/:id", getUserById);

// router.delete("/:id", verifyToken, deleteUserById);

export default router;
