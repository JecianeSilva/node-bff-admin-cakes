import api from './ApiService';

interface AuthResponse {
  access_token: string;
  refresh_token?: string;
}

class AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post('/auth/login', { email, password });

    const accessToken = data?.access_token;
    if (!accessToken) {
      throw new Error('Token de acesso não recebido da API principal');
    }

    return {
      access_token: accessToken,
      refresh_token: data?.refresh_token,
    };
  }

  async register(userData: Record<string, any>): Promise<any> {
    const { data } = await api.post('/auth/register', userData);
    return data;
  }
}

export default new AuthService();
