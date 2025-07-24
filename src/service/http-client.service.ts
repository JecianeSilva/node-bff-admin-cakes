  import { Injectable, HttpException, Logger } from '@nestjs/common';
  import { HttpService } from '@nestjs/axios';
  import { firstValueFrom } from 'rxjs';
  import {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from 'axios';

  export interface IHttpClientService {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    patch<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  }

  @Injectable()
  export class HttpClientService implements IHttpClientService {
    private readonly logger = new Logger(HttpClientService.name);

    constructor(private httpService: HttpService) {
      this.httpService.axiosRef.interceptors.request.use(this.handleRequest);
      this.httpService.axiosRef.interceptors.response.use(
        this.handleResponse,
        this.handleErrorResponse,
      );
    }

    private handleRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      this.logger.debug(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    };

    private handleResponse = (response: AxiosResponse): AxiosResponse => {
      this.logger.debug(`[Response] ${response.status} - ${response.config.url}`);
      return response;
    };

    private handleErrorResponse = (error: AxiosError<{ code: string; message: string }>): never => {
      const status = error?.response?.status || 500;
      const message = error?.response?.data?.message || error.message || 'Erro desconhecido';
      this.logger.error(`❌ Erro na requisição: ${status} - ${message}`);
      throw new HttpException(message, status);
    };

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
      const response: AxiosResponse<T> = await firstValueFrom(this.httpService.get<T>(url, config));
      return response;
    }

    
    async post<T, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
      this.logger.log(`➡️ Enviando POST para ${url} com dados: ${JSON.stringify(data)}`);
      const response: AxiosResponse<T> = await firstValueFrom(this.httpService.post<T>(url, data, config));
      this.logger.log(`✅ Resposta de ${url}: ${JSON.stringify(response.data)}`);
      return response
    }

    async put<T, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
      const response: AxiosResponse<T> = await firstValueFrom(this.httpService.put<T>(url, data, config));
      return response
    }

    async patch<T, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
      const response: AxiosResponse<T> = await firstValueFrom(this.httpService.patch<T>(url, data, config));
      return response
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
      const response: AxiosResponse<T> = await firstValueFrom(this.httpService.delete<T>(url, config));
      return response;
    }
  }
