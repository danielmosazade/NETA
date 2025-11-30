import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Paper, Alert } from '@mui/material';
import axios from 'axios';
import { useUserAuth } from '../hooks/useUserAuth';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { loginUser, error: loginError } = useUserAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('אנא מלאו את כל השדות');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }, { withCredentials: true });
      // After successful registration, automatically login the user
      await loginUser({ email: formData.email, password: formData.password });
    } catch (err: any) {
      setError(err.response?.data?.message || 'שגיאה בהרשמה');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: '40px 20px' }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            הרשמה
          </Typography>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {loginError && <Alert severity="error" sx={{ mb: 2 }}>{loginError}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="שם משתמש"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            fullWidth
            label="אימייל"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            fullWidth
            label="סיסמה"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            הרשם
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
