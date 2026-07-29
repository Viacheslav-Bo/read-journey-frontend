import { api } from "../client";
import { AuthData } from "../../types/auth";

export const refresh = async (): Promise<Omit<AuthData, "user">> => {
  const res = await api.post<Omit<AuthData, "user">>("/auth/refresh");
  return res.data;
};
