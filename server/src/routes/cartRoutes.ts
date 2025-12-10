import express from "express";
import auth from "../middleware/auth";
import { addToCart, getCart, removeFromCart, decreaseQuantity } from "../controllers/cartConntrollers";

const router = express.Router();

// מוסיף מוצר לעגלה
router.post("/add", auth, addToCart);

// מביא את כל העגלה
router.get("/", auth, getCart);

// מוריד כמות של מוצר (quantity--)
router.post("/decrease", auth, decreaseQuantity);

// מוחק מוצר מהעגלה לגמרי
router.post("/remove", auth, removeFromCart);

export default router;
