import express from "express";
import { deleteUser, login, me, register, userlist} from "../controllers/admin.js";
import isAdminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/me", isAdminAuth, me);
// router.post("/me", me);
router.post("/userlist", userlist);
router.post("/deleteUser/:id", deleteUser);

export default router;
