import express from "express";
import {
  getEmployerById,
  getAll,
  updateEmployerById,
} from "../controllers/employer.js";
// import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Get all users
router.get("/all", getAll);

router.get("/one/:id", getEmployerById);
router.put("/:id", updateEmployerById);

// upadate user
// router.put("/:id", verifyToken, updateUserById);

// router.get("/find/:id", getUserById);

// router.delete("/:id", verifyToken, deleteUserById);

export default router;
