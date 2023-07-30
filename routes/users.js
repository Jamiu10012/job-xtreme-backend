import express from "express";
import { updateUserById } from "../controllers/user.js";

const router = express.Router();

// upadate user
router.put("/:id", updateUserById);

export default router;
