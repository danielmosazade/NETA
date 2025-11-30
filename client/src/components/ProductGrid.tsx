import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Container, Box } from '@mui/material';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const productNames = [
  'שמלה אלגנטית',
  'חולצה קזואלית',
  'ג׳ינס סטיילי',
  'בלוזה קיצית',
  'ז׳קט עור',
  'נעלי ספורט',
];

const productPrices = [
  '$89.99',
  '$49.99',
  '$79.99',
  '$39.99',
  '$129.99',
  '$69.99',
];

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/images');
        const images = await response.json();
        console.log("IMAGES RESPONSE:", images);

        const fetchedProducts = images.slice(0, 6).map((img: any, index: number) => ({
          id: index + 1,
          name: productNames[index] || 'Product',
          price: productPrices[index] || '$0.00',
          image: img.secure_url,
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, []);

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
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              width: {
                xs: '100%',   // Mobile
                sm: '46%',    // Tablet
                md: '30%',    // Desktop
              },
            }}
          >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                  {product.price}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button variant="contained" fullWidth>
                  הוסף לעגלה
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
