import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  loadCart: () => Promise<void>;
  addToCart: (item: Omit<CartItem, "quantity">) => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  loadCart: async () => {},
  addToCart: async () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user } = useContext(AuthContext);

  const getToken = () => {
    return document.cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];
  };

  const loadCart = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.warn("No token, cannot load cart");
        return;
      }

      const response = await fetch("http://localhost:5000/api/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to load cart");

      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  // 📌 הוספת מוצר לעגלה
  const addToCart = async (item: Omit<CartItem, "quantity">) => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token");

      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) throw new Error("Failed to add to cart");

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, loadCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
