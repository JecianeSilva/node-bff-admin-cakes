import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { GetUserQueryParamsSchema, IPostSaveUserResponse, IUser, PostSaveUserRequestBodySchema, PutUserRequestBodySchema, TGetUserQueryParams, TGetUsersResponse, TPostSaveUserRequestBody, TPutUserRequestBody } from 'cakes-lib-types-js';
import { ZodValidationPipe } from '../utils';
import { HttpServiceInterceptor } from '../middlewares/interceptor';
import { IUserService } from '../service/user.service';

@UseInterceptors(HttpServiceInterceptor)
@Controller('/user')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(
    @Query(new ZodValidationPipe(GetUserQueryParamsSchema))
    queryParams: TGetUserQueryParams
  ): Promise<TGetUsersResponse> {
    return this.userService.getUsers(queryParams);
  }
  
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string): Promise<IUser> {
    return this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async postSaveUser(
    @Body(new ZodValidationPipe(PostSaveUserRequestBodySchema))
    body: TPostSaveUserRequestBody
  ): Promise<IPostSaveUserResponse> {
    return this.userService.postSaveUser(body);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatedUser(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(PutUserRequestBodySchema))
    body: TPutUserRequestBody
  ): Promise<void> {
    return this.userService.updatedUser(id, body);
  }
  
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}