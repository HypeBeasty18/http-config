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

interface IResolveHost {
  service: TypeServices;
  hosts: IHosts;
  buildEnv: TypeEnvironment;
}

// функция для обработки ошибки и вывода ошибки
export const handleRequestError = ({ error, isNotification }: IHandleRequestError) => {
  console.error(`Ошибка при выполнении запроса:`, error);

  if (isNotification) {
    showNotification({
      message: `Ошибка при выполнении запроса: ${error.errMessage || error.message}`,
      type: "error",
    });
  }
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
export const resolveHost = ({ buildEnv, hosts, service }: IResolveHost) => {
  const envConfig = hosts[buildEnv];

  if (envConfig && envConfig.hosts[service]) {
    return envConfig.hosts[service];
  }

  console.warn(`Service ${service} not found for environment ${buildEnv}.`);
  return "";
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
