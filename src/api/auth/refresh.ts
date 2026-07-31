import { api } from "../client";
import { ApiResponse, AuthData } from "../../types/auth";

export const refresh = async (): Promise<
  ApiResponse<Omit<AuthData, "user">>
> => {
  const res =
    await api.post<ApiResponse<Omit<AuthData, "user">>>("/auth/refresh");
  return res.data;
};
