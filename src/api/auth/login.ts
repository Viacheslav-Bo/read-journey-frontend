import { api } from "../client";
import { LoginResponse } from "../../types/auth";

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({
  email,
  password,
}: LoginParams): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return res.data;
};
