import { Router } from "express";
import { getImages } from "../controllers/cloudControllers"

const router = Router();

// נתיב GET /api/images
router.get("/", getImages);

export default router;
