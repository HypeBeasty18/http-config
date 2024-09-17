export { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from "./apiRequests";

export {
  setNewAxiosConfig,
  setNewAxiosHeaders,
  updateAxiosConfig,
  updateAxiosHeaders,
} from "./lib/instanceSettings";

export { setTokens, removeTokens, setBuildEnv, setHosts } from "./config/configState";

//решить вопрос инстансов отдельных для микрофронтов, так как у нас будет синглтон библиотека
