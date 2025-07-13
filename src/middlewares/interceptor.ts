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
    
    
    if (request.url === `${process.env.CONTEXTO}/auth/login` && request.method === 'POST') {
      return next.handle();
    }

    if (request.url === `${process.env.CONTEXTO}/auth/register` && request.method === 'POST') {
      return next.handle();
    }

    if (request.url === `${process.env.CONTEXTO}/auth/refresh-token` && request.method === 'POST') {
      return next.handle();
    }
    
    const authHeader: string | undefined = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization token missing');
    }

    this.httpService.axiosRef.defaults.headers.common['Authorization'] = authHeader;

    return next.handle().pipe();
  }
}
