import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../models/validations';
import { authService } from '../services/auth.service';
import { useAppDispatch } from '../store/hooks';
import { setCredentials, logout } from '../store/slices/auth.slice';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(data.email, data.password);
      dispatch(setCredentials({
        user: response.user,
        token: response.token
    }));
      navigate('/');
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return {
    form,
    loading,
    error,
    handleLogin,
    handleLogout
  };
};