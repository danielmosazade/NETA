import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          גלה את הסגנון שלך
        </Typography>
        <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4 }}>
          חקור את האוסף האחרון שלנו של בגדים טרנדיים ונוחים לכל אירוע.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: 'white',
            color: '#667eea',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          קנה עכשיו
        </Button>
      </Container>
    </Box>
  );
};

export default Hero;
