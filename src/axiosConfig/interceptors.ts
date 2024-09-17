import { AxiosError, AxiosInstance } from "axios";
import { TypeServices } from "../types";
import { AuthService } from "../services/auth.service";
import { createErrorObject } from "./errorObject";
import { removeTokens } from "../config/configState";
import {
  getLocalStorage,
  handleStorageChange,
  setLocalStorage,
  subscribeTokenRefresh,
} from "./utils";
import Cookies from "js-cookie";
import { TOKENS } from "../config/types";

export const setupInterceptors = (axiosInstance: AxiosInstance, service: TypeServices) => {
  axiosInstance.interceptors.request.use((config) => {
    const accessToken = Cookies.get(TOKENS.ACCESS_TOKEN);
    if (config.headers && accessToken) {
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
          if (getLocalStorage({ event: "isRefreshing" }) === "true") {
            // Подписка на событие изменения localStorage
            window.addEventListener("storage", handleStorageChange);

            // Если токен обновляется, добавляем запрос в очередь
            return new Promise((resolve, reject) => {
              subscribeTokenRefresh((newToken, refreshError) => {
                if (refreshError) {
                  reject(refreshError);
                } else if (newToken) {
                  originalRequest.headers.Authorization = `Bearer ${newToken}`;
                  resolve(axiosInstance.request(originalRequest));
                }
              });
            });
          }

          originalRequest._isRetry = true;
          localStorage.setItem("isRefreshing", "true"); // Устанавливаем флаг в localStorage
          try {
            await AuthService.getNewAccessToken(); // Предполагается, что эта функция возвращает новые токены

            setLocalStorage({ event: "isRefreshing", key: "false" });
            // onRefreshed(); // Уведомляем все запросы, что токен обновлён

            return axiosInstance.request(originalRequest);
          } catch (refreshError) {
            localStorage.setItem("isRefreshing", "false"); // Сбрасываем флаг в localStorage
            // onFailedRefresh(refreshError as Error); // Уведомляем все запросы, что обновление токена не удалось
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
