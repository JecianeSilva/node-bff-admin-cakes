import { AxiosResponse } from "axios";
import { IPostLoginResponse } from "cakes-lib-types-js";

export interface IAuthService {
 login(email: string, password: string): Promise<AxiosResponse<IPostLoginResponse>>;
}

export interface IAuthClient {
  login(email: string, password: string): Promise<AxiosResponse>;
}
