import { Inject, Injectable } from '@nestjs/common';
import { IAuthClient, IAuthService, IAuthResponse } from '../client/interfaces/AuthInterface';
import { AxiosResponse } from 'axios';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IAuthClient')
    private readonly authClient: IAuthClient,
  ) {}

  async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return this.authClient.login(email, password);
  }
}
