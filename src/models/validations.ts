import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});

export const userSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  position: z.string().min(1, 'Debe seleccionar una posición'),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional()
});

export const profileSchema = userSchema.omit({ password: true });
export const userEditSchema = userSchema.omit({ password: true });