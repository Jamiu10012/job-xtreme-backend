import express from "express";
import {
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// upadate user
router.put("/:id", verifyToken, updateUserById);

router.get("/find/:id", getUserById);

router.delete("/:id", verifyToken, deleteUserById);

export default router;
