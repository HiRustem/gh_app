import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '@/utils/hooks/token';

// Создаем экземпляр axios с базовой конфигурацией
export const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Упрощенная функция для обработки ответа
const responseBody = <T>(response: AxiosResponse<{ data: T }>): T => response.data.data;

// Универсальная API-конфигурация
export const api = {
  get: async <T, TParams = undefined>(url: string, queryParams?: TParams): Promise<T> =>
    axiosConfig.get<{ data: T }>(url, { params: queryParams }).then(responseBody),

  post: async <T, TData extends Record<string, unknown> = {}>(
    url: string,
    body?: TData,
    config?: AxiosRequestConfig,
  ): Promise<T> => axiosConfig.post<{ data: T }>(url, body, config).then(responseBody),

  put: async <T, TData extends Record<string, unknown> = {}>(
    url: string,
    body?: TData,
  ): Promise<T> => axiosConfig.put<{ data: T }>(url, body).then(responseBody),

  delete: async <T>(url: string): Promise<T> =>
    axiosConfig.delete<{ data: T }>(url).then(responseBody),
};

axiosConfig.interceptors.request.use(
  (config) => {
    const tokens = getToken();

    if (tokens?.access_token) {
      config.headers['Authorization'] = `Bearer ${tokens.access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
