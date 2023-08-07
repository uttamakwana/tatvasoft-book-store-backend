import express from "express";
import { login, register, me } from "../controllers/user.js";
import isAuth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/me", isAuth, me);

export default router;
