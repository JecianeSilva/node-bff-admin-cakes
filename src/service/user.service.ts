import { Inject, Injectable } from "@nestjs/common";
import { IPostSaveUserResponse, IUser, TGetUserQueryParams, TGetUsersResponse, TPostSaveUserRequestBody, TPutUserRequestBody } from "cakes-lib-types-js";
import { IUsersClient } from "../client/interfaces/UserInterface";

export interface IUserService {
  getUsers(queryParams: TGetUserQueryParams): Promise<TGetUsersResponse>;
  getUserById(id: string): Promise<IUser>
  postSaveUser(body: TPostSaveUserRequestBody): Promise<IPostSaveUserResponse>
  updatedUser(id: string, body: TPutUserRequestBody): Promise<void>
  deleteUser(id: string): Promise<void>;
  uploadAvatar(file: any): Promise<void>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUsersClient')
    private readonly usersClient: IUsersClient
  ) {}

  async getUsers(queryParams: TGetUserQueryParams): Promise<TGetUsersResponse> {
    return this.usersClient.getUsers(queryParams);
  }

  async getUserById(id: string): Promise<IUser> {
    return this.usersClient.getUserById(id);
  }

  async postSaveUser(body: TPostSaveUserRequestBody): Promise<IPostSaveUserResponse> {
    return this.usersClient.postSaveUser(body);
  }

  async updatedUser(id: string, body: TPutUserRequestBody): Promise<void> {
    return this.usersClient.updatedUser(id, body);
  }

  async uploadAvatar(file: any): Promise<void> {
      return this.usersClient.uploadAvatar(file)
  }

  async deleteUser(id: string): Promise<void> {
    return this.usersClient.deleteUser(id);
  }
}