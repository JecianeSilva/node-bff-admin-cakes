import { AxiosResponse } from 'axios';
import { Inject, Injectable } from '@nestjs/common';
import { IPostLoginResponse } from 'cakes-lib-types-js';
import { IAuthClient, IAuthService } from '../client/interfaces/AuthInterface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IAuthClient')
    private readonly authClient: IAuthClient,
  ) {}

  async login(email: string, password: string): Promise<AxiosResponse<IPostLoginResponse>> {
    return this.authClient.login(email, password);
  }
}
