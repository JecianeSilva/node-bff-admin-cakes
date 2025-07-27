import cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(helmet());

  const allowedOrigins = configService.get<string>('CORS_ORIGINS')?.split(',');

  app.enableCors({
    origin: allowedOrigins || false,
    credentials: true,
  });

  const context = configService.get<string>('CONTEXTO')
  app.setGlobalPrefix(`${context}`)
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableShutdownHooks();

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
