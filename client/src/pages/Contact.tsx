import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('הודעה נשלחה! תודה על הפנייה.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Container maxWidth="md" sx={{ padding: '40px 20px' }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          צור קשר
        </Typography>
        <Typography variant="body1">
          יש לכם שאלות? אנחנו כאן לעזור. מלאו את הטופס למטה ונחזור אליכם בהקדם.
        </Typography>
      </Box>

      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          mt: 3, 
          display: 'flex',
          flexDirection: 'column',
          gap: 3 
        }}
      >

        {/* שני שדות בשורה אחת */}
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <TextField
            required
            fullWidth
            label="שם"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            label="אימייל"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Box>

        {/* הודעה */}
        <TextField
          required
          fullWidth
          label="הודעה"
          name="message"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
        />

        {/* כפתור */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          שלח הודעה
        </Button>
      </Box>
    </Container>
  );
};

export default Contact;
