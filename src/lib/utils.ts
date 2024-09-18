import { AxiosRequestConfig } from "axios";

import { showNotification } from "../notifications";
import { IHosts, TypeEnvironment, TypeServices, TypeSuccessNotification } from "../types";

interface IHandleRequestError {
  error: any;
  isNotification: boolean;
}

interface IShowNotification {
  notificationType: TypeSuccessNotification | null;
  successMessage: string | null;
}

interface IMergeAxiosConfigs {
  currentConfig: AxiosRequestConfig;
  newConfig: AxiosRequestConfig;
}

interface IResolveHos {
  service: TypeServices;
  hosts: IHosts;
  buildEnv: TypeEnvironment;
}

// функция для обработки ошибки и вывода ошибки
export const handleRequestError = ({ error, isNotification }: IHandleRequestError) => {
  console.error(`Ошибка при выполнении запроса:`, error);

  if (isNotification) {
    showNotification({
      message: `Ошибка при выполнении запроса: ${error.errMessage}`,
      type: "error",
    });
  }

  throw error;
};

// функция для вывода уведомления при успешном запросе
export const handleSuccessNotification = ({
  notificationType,
  successMessage,
}: IShowNotification) => {
  if (notificationType && successMessage) {
    showNotification({ message: successMessage, type: notificationType });
  }
};

// установка базового урла исходя из переданного сервиса
export const resolveHost = ({ buildEnv, hosts, service }: IResolveHos) => {
  if (hosts[service]) {
    return hosts[service][buildEnv];
  }
};

export const mergeAxiosConfigs = ({
  currentConfig,
  newConfig,
}: IMergeAxiosConfigs): AxiosRequestConfig => {
  return {
    ...currentConfig,
    ...newConfig,
    headers: {
      ...currentConfig.headers,
      ...(newConfig?.headers || {}),
    },
  };
};
