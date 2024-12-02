import axios from 'axios';
import { User, PaginatedResponse } from '../models/index';
import { store } from '../store';

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const userService = {
  getUsers: async (page: number = 1, search: string = ''): Promise<PaginatedResponse<User>> => {
    const response = await axiosInstance.get(`/users?page=${page}&search=${search}`);
    return response.data;
  },

  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  },

  updateUser: async (id: number, userData: Partial<User>): Promise<User> => {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/users/${id}`);
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await axiosInstance.put('/profile', userData);
    return response.data;
  }
};