import Cookies from "js-cookie";
import { TOKENS } from "../config/configState";

interface ISetLocalStorage {
  event: string;
  key: string;
}

interface IGetLocalStorage {
  event: string;
}

let refreshSubscribers: Array<(token: string | null, error?: Error) => void> = [];

// Функция для добавления callback-ов в очередь запросов, которые нужно повторить после обновления токена
const subscribeTokenRefresh = (callback: (token: string | null, error?: Error) => void) => {
  refreshSubscribers.push(callback);
};

// Функция для уведомления всех запросов, ожидающих обновления токена
const onRefreshed = () => {
  const newToken = Cookies.get(TOKENS.ACCESS_TOKEN);
  if (newToken) {
    refreshSubscribers.forEach((callback) => callback(newToken));
  }
  refreshSubscribers = [];
};

// Функция для уведомления всех запросов, что обновление токена не удалось
const onFailedRefresh = (error: Error) => {
  refreshSubscribers.forEach((callback) => callback(null, error));
  refreshSubscribers = [];
};

// Функция для обработки изменений в localStorage
const handleStorageChange = (event: StorageEvent) => {
  if (event.key === "isRefreshing" && event.newValue === "false") {
    const newToken = Cookies.get(TOKENS.ACCESS_TOKEN);
    if (newToken) {
      onRefreshed();
    } else {
      onFailedRefresh(new Error("Failed to refresh token"));
    }
  }
  window.removeEventListener("storage", handleStorageChange);
};

const setLocalStorage = ({ event, key }: ISetLocalStorage) => {
  localStorage.setItem(`${event}`, `${key}`);
};
const getLocalStorage = ({ event }: IGetLocalStorage) => {
  return localStorage.getItem(`${event}`);
};

export {
  subscribeTokenRefresh,
  handleStorageChange,
  onRefreshed,
  onFailedRefresh,
  setLocalStorage,
  getLocalStorage,
};
