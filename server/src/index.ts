import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { router as authRoutes } from "./routes/auth";
import controllers from "../controllers/controllers";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
});

// Connect to MongoDB
const mongoUri = process.env.MONGO_URL || "";
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Register auth routes under /api/auth
app.use("/api/auth", authRoutes);

// Register images routes under /api/images
app.use("/api/images", controllers);

app.get("/", (req: Request, res: Response) => {
  res.send("TS + Express + Import works!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
