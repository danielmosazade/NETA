import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// רישום משתמש
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // בפיתוח חייב להיות false
      sameSite: "none", // חשוב כי יש שני דומיינים שונים
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// התחברות משתמש
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // בפיתוח חייב להיות false
      sameSite: "none", // חשוב כי יש שני דומיינים שונים
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const isAdmin = async (req: Request, res: Response) => {
  console.log("isAdmin called");
  console.log("Headers:", req.headers.authorization);
  console.log("Cookies:", req.cookies);

  // Check for token in Authorization header or cookies
  const header = req.headers.authorization || "";
  let token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;

  // If no token in header, check cookies
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  console.log("Token found:", !!token);

  if (!token) return res.json({ user: null });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as Record<string, any>;
    console.log("JWT payload:", payload);
    const user = await User.findById(payload.id);
    if (!user) {
      console.log("User not found");
      return res.json({ user: null });
    }
    console.log("User found:", user.name);
    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("JWT verification failed:", error);
    return res.json({ user: null });
  }
};
