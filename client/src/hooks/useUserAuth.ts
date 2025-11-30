import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginData {
  email: string;
  password: string;
}

export const useUserAuth = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);

  const loginUser = async ({ email, password }: LoginData) => {
    setError('');
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setToastOpen(true);
      navigate('/');
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'שגיאה בהתחברות');
      return false;
    }
  };

  return { loginUser, error, toastOpen, setToastOpen };
};
