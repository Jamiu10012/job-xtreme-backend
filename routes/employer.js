import express from "express";

// import { verifyToken } from "../verifyToken.js";

import {
  getEmployerById,
  getAll,
  updateEmployerById,
} from "../controllers/employer.js";
// import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Get all users
router.get("/all", getAll);

router.get("/:id", getEmployerById);
router.put("/:id", updateEmployerById);

// upadate user
router.put("/update/:id", updateEmployerById);

// router.get("/find/:id", getUserById);

// router.delete("/:id", verifyToken, deleteUserById);

export default router;
