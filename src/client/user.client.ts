import { IUsersClient } from './interfaces/UserInterface';
import { IHttpClientService } from '../service/http-client.service';
import { Inject, Injectable } from "@nestjs/common";
import FormData from 'form-data';
import { 
  IPostSaveUserResponse, 
  IUser, 
  TGetUserQueryParams, 
  TGetUsersResponse, 
  TPostSaveUserRequestBody, 
  TPutUserRequestBody 
} from 'cakes-lib-types-js';
import { queryString } from '../utils/queryString';

@Injectable()
export class UsersClient implements IUsersClient {
  private readonly baseUrl = `${process.env.API_BASE_URL}/users`;

  constructor(
    @Inject('IHttpClientService')
    private readonly httpClientService: IHttpClientService
  ) {}

  async getUsers(queryParams: TGetUserQueryParams): Promise<TGetUsersResponse> {
    const query = queryString.encode(queryParams);
    const { data } = await this.httpClientService.get<TGetUsersResponse>(
      `${this.baseUrl}?${query}`,
    );
    return data;
  }

  async getUserById(id: string): Promise<IUser> {
    const { data } = await this.httpClientService.get<IUser>(`${this.baseUrl}/${id}`);
    return data;
  }

  async postSaveUser(body: TPostSaveUserRequestBody): Promise<IPostSaveUserResponse> {
    const { data } = await this.httpClientService.post<IPostSaveUserResponse>(this.baseUrl, body);
    return data;
  }

  async updatedUser(id: string, body: TPutUserRequestBody): Promise<void> {
    await this.httpClientService.patch<void>(`${this.baseUrl}/${id}`, body);
  }
  
  async uploadAvatar(file: any): Promise<void> {
    const formData = new FormData();
    formData.append('avatar', file.buffer, file.originalname);

    const { data } = await this.httpClientService.patch<void>(
      `${this.baseUrl}/me/avatar`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      },
    );
    return data;
  }

  async deleteUser(id: string): Promise<void> {
    await this.httpClientService.delete<void>(`${this.baseUrl}/${id}`);
  }
}