import express from "express";
import {getEmployerById} from "../controllers/employer.js";

const router = express.Router();

// Get all users
router.get("/one/:id", getEmployerById);

// upadate user
// router.put("/:id", verifyToken, updateUserById);

// router.get("/find/:id", getUserById);

// router.delete("/:id", verifyToken, deleteUserById);

export default router;
