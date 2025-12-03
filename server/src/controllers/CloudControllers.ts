import { Request, Response } from "express";
import cloudinary from "../assets/cloudinaryConfig";

// הפונקציה רק מטפלת בלוגיקה של שליפת תמונות
export const getImages = async (req: Request, res: Response) => {
  try {
    const result = await cloudinary.search
    .expression("folder:NETA ")
      .sort_by("created_at", "desc")
      .execute();

    res.json(result.resources); // מחזיר מערך תמונות
  } catch (error: any) {
    console.error("Cloudinary ERROR:", error);
    res.status(500).json({ error: error.message || "Failed to fetch images" });
  }
};
