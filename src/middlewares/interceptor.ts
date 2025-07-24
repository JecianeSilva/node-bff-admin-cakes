import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HttpServiceInterceptor implements NestInterceptor {
  constructor(private httpService: HttpService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    
    const allowedPaths = [
      `${process.env.CONTEXTO}/auth/login`,
      `${process.env.CONTEXTO}/auth/register`,
      `${process.env.CONTEXTO}/auth/refresh-token`
    ];

    if (allowedPaths.includes(request.url) && request.method === 'POST') {
      return next.handle();
    }

    const authHeader: string | undefined = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization token missing');
    }

    this.httpService.axiosRef.defaults.headers.common['Authorization'] = authHeader;
    this.httpService.axiosRef.defaults.headers.common['x-caller-id'] = 'bff-admin'; 

    return next.handle().pipe();
  }
}

