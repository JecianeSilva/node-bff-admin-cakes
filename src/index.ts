import cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import CONFIG from './config';

async function bootstrap() {
  const context = CONFIG.APP.CONTEXTO 
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`${context}`)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  const configService = app.get(ConfigService);

  app.use(cors({}));
  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
