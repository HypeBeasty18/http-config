import { IHosts, TypeEnvironment } from "../types";

// конфиг с hosts - все доступные хосты ()которые мы задали и их урлы
// конфиг с build_env
// конфиг с токенами
const configState = {
  hosts: {} as IHosts,
  build_env: "stage" as TypeEnvironment,
  tokens: {
    refreshToken: "",
    accessToken: "",
  },
};

// Геттеры
const getHosts = (): IHosts => configState.hosts;
const getBuildEnv = (): TypeEnvironment => configState.build_env;
const getAccessToken = (): string => configState.tokens.accessToken;
const getRefreshToken = (): string => configState.tokens.refreshToken;

// Сеттеры
const setHosts = (hosts: IHosts): void => {
  configState.hosts = hosts;
};

const setBuildEnv = (environment: TypeEnvironment): void => {
  configState.build_env = environment;
};

const setAccessToken = (token: string): void => {
  configState.tokens.accessToken = token;
};

const setTokens = ({ access, refresh }: { refresh: string; access: string }) => {
  configState.tokens.refreshToken = refresh;
  setAccessToken(access);
};

const removeTokens = () => {
  setTokens({ access: "", refresh: "" });
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
