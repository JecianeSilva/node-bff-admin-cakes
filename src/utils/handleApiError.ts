import { AxiosError } from "axios";

  export function handleApiError(err: unknown): never {
    const error = err as AxiosError<any>;
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || 'API error';
    const errToThrow = new Error(message);
    (errToThrow as any).status = status;
    throw errToThrow;
  }