import { IPostLoginResponse, IPostRegisterResponse, TPostLoginRequestBody, TPostRegisterRequestBody, TPostRefreshTokentBody, IPostRefreshTokenResponse } from 'cakes-lib-types-js';

export interface IAuthClient {
  login(body: TPostLoginRequestBody): Promise<IPostLoginResponse>
  register(body: TPostRegisterRequestBody): Promise<IPostRegisterResponse>
  refreshToken(body: TPostRefreshTokentBody): Promise<IPostRefreshTokenResponse>
}
 