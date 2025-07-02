import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ZodValidationPipe } from '../utils';
import { LoginSchema, LoginDTO } from 'cakes-lib-types-js';
import { IAuthResponse, IAuthService } from '../client/interfaces/AuthInterface';
import { Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @Post('login')
  async login(
    @Body(new ZodValidationPipe(LoginSchema)) body: LoginDTO,
    @Res() res: Response, 
  ): Promise<IAuthResponse> {
    const response = await this.authService.login(body.email, body.password);
    res.status(response.status).json(response.data);
    return response.data
  }
}
