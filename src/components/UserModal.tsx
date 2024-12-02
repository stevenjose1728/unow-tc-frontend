import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../models/validations';
import { User, UserFormData } from '../models';
import { jobsService } from '../services/jobs.service';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSubmit: (id: number | undefined, data: UserFormData) => Promise<boolean>;
}

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user, onSubmit }) => {
  const [positions, setPositions] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user || {
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      birthDate: '',
      password: ''
    }
  });
  const { register, handleSubmit, reset, formState: { errors } } = form;

  useEffect(() => {
    if (isOpen) {
      reset(user || {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        position: '',
        birthDate: ''
      });
      fetchPositions();
    }
  }, [isOpen, user, reset]);

  const fetchPositions = async () => {
    try {
      const positionsList = await jobsService.getPositions();
      setPositions(positionsList);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  const handleFormSubmit = async (data: UserFormData) => {
    setLoading(true);
    const success = await onSubmit(user?.id, data);
    setLoading(false);
    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          {user ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              {...register('firstName')}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              {...register('lastName')}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {!user && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                {...register('password')}
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Posición
            </label>
            <select
              {...register('position')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Seleccionar posición</option>
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
            {errors.position && (
              <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Nacimiento
            </label>
            <input
              {...register('birthDate')}
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.birthDate && (
              <p className="mt-1 text-sm text-red-600">{errors.birthDate.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              {loading ? 'Guardando...' : user ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};