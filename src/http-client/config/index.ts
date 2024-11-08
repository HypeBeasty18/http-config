import Cookies from "js-cookie";
import { COOKIES, IHosts, TypeEnvironment } from "../types";
import { QueryClient } from "@tanstack/react-query";

// Переменные

let build_env: TypeEnvironment = "prod";

let hosts: IHosts = {} as IHosts;

let queryClient: QueryClient;

// Геттеры

const getAccessToken = (): string | undefined => Cookies.get(COOKIES.ACCESS_TOKEN);
const getRefreshToken = (): string | undefined => Cookies.get(COOKIES.REFRESH_TOKEN);

const getBuildEnv = () => build_env;

const getHosts = (): IHosts => hosts;

const getCSRF = (): string | undefined => Cookies.get(COOKIES.CSRF);

const getQueryClient = (): QueryClient => queryClient;

// Сеттеры

const setAccessToken = (token: string): void => {
  Cookies.set(COOKIES.ACCESS_TOKEN, token);
};

const setTokens = ({ access, refresh }: { refresh: string; access: string }) => {
  Cookies.set(COOKIES.REFRESH_TOKEN, refresh);
  setAccessToken(access);
};

const removeTokens = () => {
  Cookies.remove(COOKIES.REFRESH_TOKEN);
  Cookies.remove(COOKIES.ACCESS_TOKEN);
};

const setBuildEnv = (env: TypeEnvironment) => {
  build_env = env;
};

const setHosts = (newHosts: IHosts) => {
  hosts = newHosts;
};

const setQueryClient = (client: QueryClient) => {
  queryClient = client;
};

export {
  getAccessToken,
  getRefreshToken,
  getBuildEnv,
  getHosts,
  getCSRF,
  getQueryClient,
  setAccessToken,
  setTokens,
  removeTokens,
  setBuildEnv,
  setHosts,
  setQueryClient,
};
