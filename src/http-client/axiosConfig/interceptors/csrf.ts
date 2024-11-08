import { AxiosInstance } from "axios";

import { getCSRF, removeTokens } from "../../config";
import { createErrorObject } from "../utils";
import { TypeServices } from "../../types";

const csrfHeader = "X-CSRFToken";

export const setupInterceptorsCSRF = (axiosInstance: AxiosInstance, service: TypeServices) => {
  axiosInstance.interceptors.request.use((config) => {
    const csrf = getCSRF();

    if (config.headers && csrf) {
      config.headers[csrfHeader] = csrf;
    }

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response } = error;

      if (response) {
        const { status } = response;

        if (status === 401) {
          removeTokens();
          return Promise.reject({ message: "csrf token is expired" });
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
