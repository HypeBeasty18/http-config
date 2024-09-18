import Cookies from "js-cookie";
import { TOKENS } from "../types";

// Геттеры

const getAccessToken = (): string | undefined => Cookies.get(TOKENS.ACCESS_TOKEN);
const getRefreshToken = (): string | undefined => Cookies.get(TOKENS.REFRESH_TOKEN);

// Сеттеры

const setAccessToken = (token: string): void => {
  Cookies.set(TOKENS.ACCESS_TOKEN, token);
};

const setTokens = ({ access, refresh }: { refresh: string; access: string }) => {
  Cookies.set(TOKENS.REFRESH_TOKEN, refresh);
  setAccessToken(access);
};

const removeTokens = () => {
  Cookies.remove(TOKENS.REFRESH_TOKEN);
  Cookies.remove(TOKENS.ACCESS_TOKEN);
};

export { getAccessToken, getRefreshToken, setAccessToken, setTokens, removeTokens };
