import { useState, useCallback } from 'react';
import { userService } from '../services/user.service';
import { User, UserFormData } from '../models';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/auth.slice';
import { useNavigate } from 'react-router-dom';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(state => state.auth.user);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getUsers(page, search);
      setUsers(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  const handleUserSubmit = async (id: number | undefined, data: UserFormData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      if (id) {
        await userService.updateUser(id, data);
      } else {
        await userService.createUser(data);
      }
      
      fetchUsers();
      return true;
    } catch (err) {
      setError(id ? 'Error al actualizar usuario' : 'Error al crear usuario');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await userService.deleteUser(id);
      
      if (currentUser && currentUser.id === id) {
        dispatch(logout());
        navigate('/login');
      } else {
        fetchUsers();
      }
      return true;
    } catch (err) {
      setError('Error al eliminar usuario');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    page,
    totalPages,
    search,
    setPage,
    setSearch,
    fetchUsers,
    handleUserSubmit,
    handleDeleteUser
  };
};