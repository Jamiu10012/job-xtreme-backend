import express from "express";
import { signup, signin } from "../controllers/auth.js";

const router = express.Router();
// CREATE A USER
router.post("/signup", signup);
// router.get("/verify/:userId/:uniqueString", verifyEmail);
// router.get("/verified", verified);
// SIGN IN
router.post("/signin", signin);
// GOOGLE AUTH
// router.post("/google");
export default router;
