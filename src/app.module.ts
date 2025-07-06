import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AuthClient } from './client/auth.client';
import { AuthService } from './service/auth.service';
import { AuthController } from './controllers/auth.controller';

import { ProductsClient } from './client/products.client';
import { ProductService } from './service/product.service';
import { ProductController } from './controllers/product.controller';

import { CategoryClient } from './client/category.client';
import { CategoryService } from './service/category.service';
import { CategoryController } from './controllers/category.controller';

import { HttpClientService } from './service/http-client.service';
import { HttpServiceInterceptor } from './middlewares/interceptor';
import config from './config/config';

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
    CategoryController,
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
    },
        {
      provide: 'ICategoryClient',
      useClass: CategoryClient,
    },
    {
      provide: 'ICategoryService',
      useClass: CategoryService
    }
  ],
  exports: [],
})

export class AppModule {}
