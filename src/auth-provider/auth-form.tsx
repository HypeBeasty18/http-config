import React from "react";
import { setTokens } from "../config";
import HttpService from "../axiosConfig";

interface IProps {
  useFetch: HttpService;
}

export const AuthForm = ({ useFetch }: IProps) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const data = { password: form.password.value, username: form.username.value };

    try {
      await useFetch.postRequest({
        service: "sarex",
        data,
        url: "/api/login/",
        errorNotification: true,
        errorMessage: "Неверный логин или пароль",
      });

      const response = await useFetch.getRequest({
        service: "sarex",
        url: "/api/token/me",
      });

      if (response.data) {
        setTokens({ access: response.data.access, refresh: response.data.refresh });
      }
    } catch (error) {}
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          margin: "auto",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h2>Login</h2>
          <form
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
            onSubmit={handleSubmit}
          >
            <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span>Username</span>
              <input type="text" name="username" />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span>Password</span>
              <input type="password" name="password" />
            </label>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};
