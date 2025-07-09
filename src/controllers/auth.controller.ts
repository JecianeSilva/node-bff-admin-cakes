import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { PostLoginRequestBodySchema, TPostLoginRequestBody, IPostLoginResponse, PostRegisterRequestBodySchema, TPostRegisterRequestBody, IPostRegisterResponse } from 'cakes-lib-types-js';
import { ZodValidationPipe } from '../utils';
import { IAuthService } from '../service/auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body(new ZodValidationPipe(PostLoginRequestBodySchema)) 
    body: TPostLoginRequestBody,
  ): Promise<IPostLoginResponse> {
    return await this.authService.login(body);
  }

  @Post('register')
  @HttpCode(200)
  async register(
    @Body(new ZodValidationPipe(PostRegisterRequestBodySchema)) 
    body: TPostRegisterRequestBody,
  ): Promise<IPostRegisterResponse> {
    return await this.authService.register(body);
  }
}
