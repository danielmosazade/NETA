import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/images");
        const images = await response.json();

        const names = [
          "שמלה אלגנטית",
          "חולצה קזואלית",
          "ג׳ינס סטיילי",
          "בלוזה קיצית",
          "ז׳קט עור",
          "נעלי ספורט",
        ];

        const prices = [89.99, 49.99, 79.99, 39.99, 129.99, 69.99];

        const index = Number(id) - 1;

        setProduct({
          id: Number(id),
          name: names[index] || "Product",
          price: prices[index] || 0,
          image: images[index]?.secure_url,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAdd = async () => {
    if (!user) {
      navigate("/login");
      toast.info("אנא התחבר כדי להוסיף מוצרים לעגלה");
      return;
    }

    try {
      if (product) {
        await addToCart({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("אירעה שגיאה בעת הוספת המוצר לעגלה.");
    }
    finally{
      toast.success("המוצר נוסף לעגלה בהצלחה!");
    }
  };

  if (!product) return <Typography>טוען...</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* כפתור חזרה */}
      <Button variant="outlined" sx={{ mb: 3 }} onClick={() => navigate(-1)}>
        ← חזרה
      </Button>

      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: 4,
          borderRadius: 3,
        }}
      >
        {/* תמונה מעוצבת */}
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            width: { xs: "100%", md: "50%" },
            height: 400,
            objectFit: "cover",
            borderRadius: { xs: "12px 12px 0 0", md: "12px 0 0 12px" },
          }}
        />

        <CardContent
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            {product.name}
          </Typography>

          <Typography variant="h5" sx={{ color: "primary.main", mb: 3 }}>
            ${product.price}
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            מוצר איכותי מבד נוח, מתאים ליום יום או לאירועים. כולל אחריות מלאה
            ומשלוח מהיר 🚚
          </Typography>

          <Button variant="contained" size="large" onClick={handleAdd}>
            הוסף לעגלה 🛒
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductPage;
