import { IPostLoginResponse, IPostRegisterResponse, TPostLoginRequestBody, TPostRegisterRequestBody} from 'cakes-lib-types-js';

export interface IAuthClient {
  login(body: TPostLoginRequestBody): Promise<IPostLoginResponse>
  register(body: TPostRegisterRequestBody): Promise<IPostRegisterResponse>
}
 