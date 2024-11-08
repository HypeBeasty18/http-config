import axios, { AxiosInstance } from "axios";
import { COOKIES, TypeServices } from "../../types";
import { AuthServiceOld } from "../../services/auth.service";
import { createErrorObject } from "../utils";
import { getAccessToken, getBuildEnv, getHosts, getRefreshToken, removeTokens } from "../../config";
import Cookies from "js-cookie";
import { resolveHost } from "../../lib/utils";

let isRefreshing = false;
const refreshSubscribers: Array<(token: string | null, error?: Error) => void> = [];

// Уведомление всех подписчиков
const notifySubscribers = (token: string | null, error?: Error) => {
  refreshSubscribers.forEach((callback) => callback(token, error));
  refreshSubscribers.length = 0;
};

// Очистка токенов и уведомление об ошибке
const clearTokensAndNotify = (error: Error) => {
  removeTokens();
  notifySubscribers(null, error);
  throw error;
};

// Обновление токена
const handleTokenRefresh = async ({ originalRequest }: { originalRequest: any }) => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      refreshSubscribers.push((token, error) => {
        if (error) {
          reject(error);
        } else if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axios.request(originalRequest));
        }
      });
    });
  }

  isRefreshing = true;
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      return clearTokensAndNotify(new Error("Refresh token is missing"));
    }

    await AuthServiceOld.getNewAccessToken(
      `${resolveHost({
        buildEnv: getBuildEnv(),
        hosts: getHosts(),
        service: "sarex",
      })}/api/token/me`
    );
    const newToken = Cookies.get(COOKIES.ACCESS_TOKEN);

    if (!newToken) {
      return clearTokensAndNotify(new Error("Access token is missing"));
    }

    isRefreshing = false;
    notifySubscribers(newToken);
    originalRequest.headers.Authorization = `Bearer ${newToken}`;
    return axios.request(originalRequest);
  } catch (error) {
    isRefreshing = false;
    return clearTokensAndNotify(error as Error);
  }
};

export const setupInterceptorsTokens = (axiosInstance: AxiosInstance, service: TypeServices) => {
  axiosInstance.interceptors.request.use((config) => {
    const accessToken = getAccessToken();
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

        if (status === 401 && !originalRequest._isRetry) {
          if (getRefreshToken()) {
            originalRequest._isRetry = true;
            return handleTokenRefresh({ originalRequest });
          } else {
            removeTokens();
            return Promise.reject({ message: "Refresh token is missing" });
          }
        } else {
          const errorObject = createErrorObject(service, error, status);
          return Promise.reject(errorObject);
        }
      } else {
        const errorObject = createErrorObject(service, error);
        return Promise.reject(errorObject);
      }
    }
  );
};
