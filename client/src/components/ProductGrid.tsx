import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const productNames = [
  "שמלה אלגנטית",
  "חולצה קזואלית",
  "ג׳ינס סטיילי",
  "בלוזה קיצית",
  "ז׳קט עור",
  "נעלי ספורט",
];

const productPrices = [
  "$89.99",
  "$49.99",
  "$79.99",
  "$39.99",
  "$129.99",
  "$69.99",
];

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useContext(AuthContext);
  const { loadCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/images");
        const images = await response.json();
        const fetchedProducts = images.map((img: any, index: number) => ({
          id: index + 1,
          name: productNames[index] || "Product",
          price: parseFloat(productPrices[index]?.replace("$", "")) || 0,
          image: img.secure_url,
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleAddToCart = async (product: Product) => {
    if (!user) {
      // אם לא מחובר, נווט לעמוד התחברות
      navigate("/login");
      return;
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        מוצרים מומלצים
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              width: { xs: "100%", sm: "46%", md: "30%" },
            }}
          >
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  צפה במוצר
                </Button>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ProductGrid;
