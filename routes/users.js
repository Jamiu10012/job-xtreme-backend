import express from "express";
import {
  deleteUserById,
  getUserById,
  updateUserById,
  getUsers,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Get all users
router.get("/all/", getUsers);

// upadate user
router.put("/:id", verifyToken, updateUserById);

router.get("/find/:id", getUserById);

router.delete("/:id", verifyToken, deleteUserById);

export default router;
