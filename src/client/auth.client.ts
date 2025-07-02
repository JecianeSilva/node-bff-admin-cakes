import { AxiosResponse } from 'axios';
import { Inject, Injectable } from '@nestjs/common';
import { IPostLoginResponse } from 'cakes-lib-types-js';
import { IHttpClientService } from '../service/http-client.service';

import { IAuthClient } from './interfaces/AuthInterface';

@Injectable()
export class AuthClient implements IAuthClient {
  constructor(
    @Inject('IHttpClientService')
    private readonly httpClientService: IHttpClientService,
  ) {}

  async login(email: string, password: string): Promise<AxiosResponse<IPostLoginResponse>> {
    return await this.httpClientService.post<IPostLoginResponse>(
      `${process.env.API_BASE_URL}/auth/login`,
      { email, password },
    );
  }
}
