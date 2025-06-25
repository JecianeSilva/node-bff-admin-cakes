import api from './ApiService';
import jwt from 'jsonwebtoken';
import config from '../config/config';

interface AuthResponse {
  user: any;
  token: string;
}

class AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post('/auth/login', { email, password });
    const { access_token } = data;

    if (!access_token) {
      throw new Error('Token de acesso não recebido da API principal');
    }

    const decoded = jwt.decode(access_token);

    if (!decoded || typeof decoded !== 'object') {
      throw new Error('Falha ao decodificar o token de acesso');
    }

    const userId = (decoded as any).sub;
    const userEmail = (decoded as any).email;

    const bffToken = jwt.sign(
      { id: userId, email: userEmail },
      config.jwtSecret,
      { expiresIn: '1d' }
    );

    return {
      user: { id: userId, email: userEmail },
      token: bffToken
    };
  }

  async register(userData: any): Promise<any> {
    const { data } = await api.post('/auth/register', userData);
    return data;
  }
}

export default new AuthService();
