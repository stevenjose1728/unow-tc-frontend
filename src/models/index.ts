export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  position: string;
  birthDate: string;
  roles: string[];
}

export interface UserFormData extends Omit<User, 'id'> {
  password?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  currentPage: number;
  totalPages: number;
}