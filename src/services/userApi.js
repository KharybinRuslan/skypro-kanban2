import { api } from "./api";

export const registerUser = async (login, name, password) => {
  const response = await api.request("/user", {
    method: "POST",
    body: JSON.stringify({ login, name, password }),
  });
  return response.user;
};

export const loginUser = async (login, password) => {
  const response = await api.request("/user/login", {
    method: "POST",
    body: JSON.stringify({ login, password }),
  });
  return response.user;
};

