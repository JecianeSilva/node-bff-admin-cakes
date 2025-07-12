import { Inject, Injectable } from '@nestjs/common';
import { IPostLoginResponse, IPostRefreshTokenResponse, IPostRegisterResponse, TPostLoginRequestBody, TPostRefreshTokentBody, TPostRegisterRequestBody } from 'cakes-lib-types-js';
import { IAuthClient } from '../client/interfaces/AuthInterface';

export interface IAuthService {
  login(body: TPostLoginRequestBody): Promise<IPostLoginResponse>
  register(body: TPostRegisterRequestBody): Promise<IPostRegisterResponse>
  refreshToken(body: TPostRefreshTokentBody): Promise<IPostRefreshTokenResponse>
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IAuthClient')
    private readonly authClient: IAuthClient,
  ) {}

  async login(body: TPostLoginRequestBody): Promise<IPostLoginResponse> {
    return this.authClient.login(body);
  }

  async register(body: TPostRegisterRequestBody): Promise<IPostRegisterResponse> {
      return this.authClient.register(body)
  }
  async refreshToken(body: TPostRefreshTokentBody): Promise<IPostRefreshTokenResponse> {
      return this.authClient.refreshToken(body)
  }
}
