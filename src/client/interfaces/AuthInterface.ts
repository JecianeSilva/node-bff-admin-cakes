import { AxiosResponse } from "axios";

export interface IAuthResponse {
    access_token: string;
    refresh_token?: string;
}

export interface IAuthService {
 login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>>;
}

export interface IAuthClient {
  login(email: string, password: string): Promise<AxiosResponse>;
}
