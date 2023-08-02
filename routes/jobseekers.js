import express from "express";
import { getAllJobSeekers } from "../controllers/jobSeeker.js";


const router = express.Router();

// Get all users
router.get("/all/", getAllJobSeekers);

// upadate user
// router.put("/:id", verifyToken, updateUserById);

// router.get("/find/:id", getUserById);

// router.delete("/:id", verifyToken, deleteUserById);

export default router;
