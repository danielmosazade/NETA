import express from "express";
import { v2 as cloudinary } from "cloudinary";
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get("/", async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression('resource_type:image') // כל התמונות
      .sort_by('created_at', 'desc')
      .max_results(500)
      .execute();

    res.json(result.resources); // מחזיר רק את התמונות
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

export default router;
