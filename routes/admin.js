import express from "express";
import { login, me } from "../controllers/admin.js";
import isAdminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

// router.post("/register", register);
router.post("/login", login);
// router.post("/me", isAdminAuth, me);
router.post("/me", me);

export default router;
