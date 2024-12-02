import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../models/validations';
import { userService } from '../services/user.service';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout, updateUser } from '../store/slices/auth.slice';
import { User } from '../models';
import { useNavigate } from 'react-router-dom';

export const useProfile = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: user || undefined
  });

  const handleUpdateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await userService.updateProfile(data);
      dispatch(updateUser(updatedUser));
    } catch (err) {
      setError('Error al actualizar perfil');
      return false;
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveUser = async () => {
    try {
      if(user){
        setDeleting(true);
        setError(null);
        await userService.deleteUser(user.id);
        dispatch(logout());
        navigate('/login');
      }
    } catch (err) {
      setError('Error al actualizar perfil');
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return {
    deleting,
    form,
    loading,
    error,
    handleRemoveUser,
    handleUpdateProfile
  };
};