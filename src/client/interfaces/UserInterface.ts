import { IPostSaveUserResponse, IUser, TGetUserQueryParams, TGetUsersResponse, TPostSaveUserRequestBody, TPutUserRequestBody } from "cakes-lib-types-js"

export interface IUsersClient {
  getUsers(queryParams: TGetUserQueryParams): Promise<TGetUsersResponse>;
  getUserById(id: string): Promise<IUser>
  postSaveUser(body: TPostSaveUserRequestBody): Promise<IPostSaveUserResponse>
  updatedUser(id: string, body: TPutUserRequestBody): Promise<void>
  uploadAvatar(file: any): Promise<void>;
  deleteUser(id: string): Promise<void>;
}