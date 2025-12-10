import { Request, Response } from "express";
import { User } from "../models/User";

// 📌 1. הוספה לעגלה (כבר עשית, רק משולב כאן)
export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { productId, name, price, image } = req.body;

    if (!userId) return res.status(401).json({ message: "Not authenticated" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingItem = user.cart.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      user.cart.push({ productId, name, price, image, quantity: 1 });
    }

    await user.save();
    return res.json(user.cart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error adding to cart" });
  }
};


// 📌 2. קבלת כל העגלה
export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user.cart);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error loading cart" });
  }
};

// 📌 3. הפחתת כמות של מוצר
export const decreaseQuantity = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const item = user.cart.find(i => i.productId === productId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.quantity > 1) {
      item.quantity--;
    } else {
      user.cart = user.cart.filter(i => i.productId !== productId);
    }

    await user.save();
    return res.json(user.cart);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error decreasing quantity" });
  }
};

// 📌 4. מחיקת מוצר מהעגלה לגמרי
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(item => item.productId !== productId);

    await user.save();
    return res.json(user.cart);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error removing item" });
  }
};
