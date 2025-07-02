import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { PostLoginRequestBodySchema, TPostLoginRequestBody, IPostLoginResponse } from 'cakes-lib-types-js';
import { ZodValidationPipe } from '../utils';
import { IAuthService } from '../client/interfaces/AuthInterface';

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
    const response = await this.authService.login(body.email, body.password);
    return response.data
  }
}
