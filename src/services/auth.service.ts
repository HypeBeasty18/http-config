import axios from "axios";

import Cookies from "js-cookie";
import { COOKIES } from "../types";

// interface IGetNewsTokens {
//   access: string;
// }

interface IGetNewsTokensOld {
  access: string;
  refresh: string;
}

// const URL = "https://stage.sarex.io/api/token/refresh";

// const URL_OLD = "https://stage.sarex.io/api/token/me";

// сервис на ревалидаци access
// export const AuthService = {
//   async getNewAccessToken(refresh: string) {
//     const response = await axios.post<IGetNewsTokens>(URL, {
//       [TOKENS.REFRESH_TOKEN]: refresh,
//     });

//     Cookies.set(TOKENS.ACCESS_TOKEN, response.data.access);
//   },
// };

export const AuthServiceOld = {
  async getNewAccessToken(url: string) {
    const response = await axios.get<IGetNewsTokensOld>(url);

    Cookies.set(COOKIES.ACCESS_TOKEN, response.data.access);
    Cookies.set(COOKIES.REFRESH_TOKEN, response.data.refresh);
  },
};
