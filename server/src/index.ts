import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinaryRouter from "./routes/cloudinaryRoutes";
import authenticationRoutes from "./routes/authenticationRoutes"
import adminRoute from "./routes/adminRoute";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
});


// Connect to MongoDB
console.log(process.env.MONGO_URL);
const mongoUri = process.env.MONGO_URL || "";
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use("/api/images", cloudinaryRouter);
app.use("/api/auth", authenticationRoutes);
app.use("/api/me", adminRoute);
 
app.get("/", (req: Request, res: Response) => {
  res.send("TS + Express + Import works!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
