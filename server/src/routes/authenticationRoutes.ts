import { Router } from "express";
import { registerUser, loginUser,isAdmin } from "../controllers/AuthController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/me",isAdmin)

export default router;
