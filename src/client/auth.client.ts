import { Inject, Injectable } from '@nestjs/common';
import { IPostLoginResponse, TPostLoginRequestBody, TPostRegisterRequestBody, IPostRegisterResponse } from 'cakes-lib-types-js';
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
}