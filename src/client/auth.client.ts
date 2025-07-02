import { Inject, Injectable } from '@nestjs/common';
import { IHttpClientService } from '../service/http-client.service';
import { IAuthClient, IAuthResponse } from './interfaces/AuthInterface';
import { AxiosResponse } from 'axios';

@Injectable()
export class AuthClient implements IAuthClient {
  constructor(
    @Inject('IHttpClientService')
    private readonly httpClientService: IHttpClientService,
  ) {}

  async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return await this.httpClientService.post<IAuthResponse>(
      `${process.env.API_BASE_URL}/auth/login`,
      { email, password },
    );
  }
}
