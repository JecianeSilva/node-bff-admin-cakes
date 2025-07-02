import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config';

import config from './config/config';

import { ProductController } from './controllers/product.controller';

import { ProductService } from './service/product.service';
import { AuthService } from './service/auth.service';
import { HttpClientService } from './service/http-client.service';

import { ProductsClient } from './client/products.client';
import { AuthClient } from './client/auth.client';
import { AuthController } from './controllers/auth.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpServiceInterceptor } from './middlewares/interceptor';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [
    AuthController,
    ProductController,
  ],
  providers: [
    {
      provide: 'IAuthClient',
      useClass: AuthClient,
    },
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
    {
      provide: 'IHttpClientService',
      useClass: HttpClientService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpServiceInterceptor,
    },
    {
      provide: 'IProductsClient',
      useClass: ProductsClient,
    },
    {
      provide: 'IProductService',
      useClass: ProductService
    }
  ],
  exports: [],
})
export class AppModule {}
