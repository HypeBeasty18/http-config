import Cookies from "js-cookie";
import { IHosts, TypeEnvironment } from "../types";
import { TOKENS } from "./types";

// конфиг с hosts - все доступные хосты ()которые мы задали и их урлы
// конфиг с build_env
// конфиг с токенами

interface IConfigState {
  hosts: IHosts;
  build_env: TypeEnvironment;
  tokens: {
    refreshToken: string | null;
  };
}

const configState: IConfigState = {
  hosts: {} as IHosts,
  build_env: "stage",
  tokens: {
    refreshToken: null,
  },
};

// Геттеры
const getHosts = (): IHosts => configState.hosts;
const getBuildEnv = (): TypeEnvironment => configState.build_env;
const getAccessToken = (): string | undefined => Cookies.get(TOKENS.ACCESS_TOKEN);
const getRefreshToken = (): string | null => configState.tokens.refreshToken;

// Сеттеры
const setHosts = (hosts: IHosts): void => {
  configState.hosts = hosts;
};

const setBuildEnv = (environment: TypeEnvironment): void => {
  configState.build_env = environment;
};

const setAccessToken = (token: string): void => {
  Cookies.set(TOKENS.ACCESS_TOKEN, token);
};

const setTokens = ({ access, refresh }: { refresh: string; access: string }) => {
  configState.tokens.refreshToken = refresh;
  setAccessToken(access);
};

const removeTokens = () => {
  configState.tokens.refreshToken = null;

  Cookies.remove(TOKENS.ACCESS_TOKEN);
};

export {
  getHosts,
  getBuildEnv,
  getAccessToken,
  getRefreshToken,
  setHosts,
  setBuildEnv,
  setAccessToken,
  setTokens,
  removeTokens,
};
