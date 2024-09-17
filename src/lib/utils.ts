import { getBuildEnv, getHosts } from "../config/configState";
import { showNotification } from "../notifications";
import { TypeServices, TypeSuccessNotification } from "../types";

interface IHandleRequestError {
  error: any;
  isNotification: boolean;
}

interface IShowNotification {
  notificationType: TypeSuccessNotification | null;
  successMessage: string | null;
}

// функция для обработки ошибки и вывода ошибки
const handleRequestError = ({ error, isNotification }: IHandleRequestError) => {
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
const handleSuccessNotification = ({ notificationType, successMessage }: IShowNotification) => {
  if (notificationType && successMessage) {
    showNotification({ message: successMessage, type: notificationType });
  }
};

// установка базового урла исходя из переданного сервиса
const resolveHost = (service: TypeServices) => {
  const hosts = getHosts();

  const buildEnv = getBuildEnv();

  return hosts[service][buildEnv];
};

export { handleRequestError, handleSuccessNotification, resolveHost };
