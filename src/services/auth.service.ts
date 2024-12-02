import axios from 'axios';
import { LoginResponse } from '../models/index';

const API_URL = process.env.REACT_APP_API_URL;

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};