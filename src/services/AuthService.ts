import { handleApiError } from '../utils/handleApiError';
import api from './ApiService';

interface AuthResponse {
  access_token: string;
  refresh_token?: string;
}

class AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      return data;
    } catch (err) {
      handleApiError(err);
    }
  }

  async register(userData: Record<string, any>): Promise<any> {
    try {
      const { data } = await api.post('/auth/register', userData);
      return data;
    } catch (err) {
      handleApiError(err);
    }
  }

  async resetPassword(email: string, newPassword: string): Promise<any> {
    try {
      const { data } = await api.post('/auth/reset-password', {
        email,
        newPassword
      });
      return data;
    } catch (err) {
      handleApiError(err);
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const { data } = await api.post('/auth/refresh-token', {
        refreshToken
      });
      return data;
    } catch (err) {
      handleApiError(err);
    }
  }
}

export default new AuthService();
