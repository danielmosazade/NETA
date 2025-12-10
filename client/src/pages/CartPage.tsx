import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage: React.FC = () => {
  const { cart, loadCart } = useContext(CartContext);

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (productId: string, delta: number) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((c) => c.startsWith("token="))
        ?.split("=")[1];
      if (!token) return;

      const endpoint =
        delta > 0
          ? "http://localhost:5000/api/cart/add"
          : "http://localhost:5000/api/cart/decrease";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      await res.json();
      loadCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((c) => c.startsWith("token="))
        ?.split("=")[1];
      if (!token) return;

      await fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      loadCart();
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        עגלת קניות שלי
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {cart.length === 0 ? (
        <Typography>העגלה שלך ריקה</Typography>
      ) : (
        <>
          <List>
            {cart.map((item: any) => (
              <ListItem
                key={item.productId}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handleRemove(item.productId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar src={item.image} alt={item.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`מחיר: ₪${item.price} | כמות: ${item.quantity}`}
                />
                <Box>
                  <Button onClick={() => updateQuantity(item.productId, 1)}>
                    +
                  </Button>
                  <Button onClick={() => updateQuantity(item.productId, -1)}>
                    -
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">סך הכל: ₪{totalPrice}</Typography>
        </>
      )}
    </Box>
  );
};

export default CartPage;
