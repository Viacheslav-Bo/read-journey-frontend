import { api } from "../client";
import { MeResponse } from "../../types/auth";

export const me = async (): Promise<MeResponse> => {
  const res = await api.get<MeResponse>("/auth/me");
  return res.data;
};
