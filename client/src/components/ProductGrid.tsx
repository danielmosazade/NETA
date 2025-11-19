import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Container, Box } from '@mui/material';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'שמלה אלגנטית',
    price: '$89.99',
    image: 'https://via.placeholder.com/300x400?text=Elegant+Dress',
  },
  {
    id: 2,
    name: 'חולצה קזואלית',
    price: '$49.99',
    image: 'https://via.placeholder.com/300x400?text=Casual+Shirt',
  },
  {
    id: 3,
    name: 'ג׳ינס סטיילי',
    price: '$79.99',
    image: 'https://via.placeholder.com/300x400?text=Stylish+Jeans',
  },
  {
    id: 4,
    name: 'בלוזה קיצית',
    price: '$39.99',
    image: 'https://via.placeholder.com/300x400?text=Summer+Blouse',
  },
  {
    id: 5,
    name: 'ז׳קט עור',
    price: '$129.99',
    image: 'https://via.placeholder.com/300x400?text=Leather+Jacket',
  },
  {
    id: 6,
    name: 'נעלי ספורט',
    price: '$69.99',
    image: 'https://via.placeholder.com/300x400?text=Sneakers',
  },
];

const ProductGrid: React.FC = () => {
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
