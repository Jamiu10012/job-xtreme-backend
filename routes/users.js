import express from "express";
import { update } from "../controllers/user.js";

const router = express.Router();

// upadate user
router.put("/:id", update);

export default router;
