import axios from "axios";

// сервис на запрос токенов
export const AuthService = {
  async getNewsTokens() {
    await axios.get("https://stage.sarex.io/api/token/me");
  },
};
