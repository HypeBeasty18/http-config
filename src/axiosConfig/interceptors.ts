import { AxiosError, AxiosInstance } from "axios";
import { TypeServices } from "../types";

import { AuthService } from "../services/auth.service";
import { removeTokens } from "../utils/auth";
import { createErrorObject } from "./errorObject";
import { getAccessToken } from "../config/configState";

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// Функция для добавления callback-ов в очередь запросов, которые нужно повторить после обновления токена
const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// Функция для уведомления всех запросов, ожидающих обновления токена
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

export const setupInterceptors = (axiosInstance: AxiosInstance, service: TypeServices) => {
  axiosInstance.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (config.headers && accessToken !== "") {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response, config: originalRequest } = error;
      if (response) {
        const { status } = response;

        // Обработка ошибки 401 (несанкционированный доступ)
        if (status === 401 && !originalRequest._isRetry) {
          if (isRefreshing) {
            // Если токен обновляется, добавляем запрос в очередь
            return new Promise((resolve) => {
              subscribeTokenRefresh((newToken: string) => {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                resolve(axiosInstance.request(originalRequest));
              });
            });
          }

          originalRequest._isRetry = true;
          isRefreshing = true;
          try {
            await AuthService.getNewsTokens(); // Предполагается, что эта функция возвращает новые токены

            const accessToken = getAccessToken();
            isRefreshing = false;
            onRefreshed(accessToken); // Уведомляем все запросы, что токен обновлён

            // originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axiosInstance.request(originalRequest);
          } catch (refreshError) {
            isRefreshing = false;
            const axiosRefreshError = refreshError as AxiosError;
            if (axiosRefreshError.response && axiosRefreshError.response.status === 401) {
              removeTokens();
            }
            throw createErrorObject(service, axiosRefreshError, axiosRefreshError.response?.status);
          }
        } else {
          // Обработка ошибок, не связанных с обновлением токена
          const errorObject = createErrorObject(service, error, status);
          return Promise.reject(errorObject);
        }
      } else {
        // Обработка сетевых ошибок
        const errorObject = createErrorObject(service, error);
        return Promise.reject(errorObject);
      }
    }
  );
};
