import { api } from "../client";

type LogoutProps = { message: string };

export const logout = async () => {
  const res = await api.post<LogoutProps>("/auth/logout");
  return res.data;
};
