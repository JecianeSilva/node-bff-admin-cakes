import { Inject, Injectable } from '@nestjs/common';
import { IPostLoginResponse, TPostLoginRequestBody, TPostRegisterRequestBody, IPostRegisterResponse, TPostRefreshTokentBody, IPostRefreshTokenResponse } from 'cakes-lib-types-js';
import { IHttpClientService } from '../service/http-client.service';

import { IAuthClient } from './interfaces/AuthInterface';

@Injectable()
export class AuthClient implements IAuthClient {
  constructor(
    @Inject('IHttpClientService')
    private readonly httpClientService: IHttpClientService,
  ) {}

  async login(body: TPostLoginRequestBody): Promise<IPostLoginResponse> {
    const { data } = await this.httpClientService.post<IPostLoginResponse>(
      `${process.env.API_BASE_URL}/auth/login`,
      body,
    );
    return data
  }

  async register(body: TPostRegisterRequestBody): Promise<IPostRegisterResponse> {
       const { data } = await this.httpClientService.post<IPostRegisterResponse>(
      `${process.env.API_BASE_URL}/auth/register`,
      body,
    );
    return data
  }

  async refreshToken(body: TPostRefreshTokentBody): Promise<IPostRefreshTokenResponse> {
    const { data } = await this.httpClientService.post<IPostRefreshTokenResponse>(
      `${process.env.API_BASE_URL}/auth/refresh-token`,
      body,
    );
    return data
  }
}