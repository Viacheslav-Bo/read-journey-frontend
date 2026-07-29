import { api } from "../client";
import { RegisterResponse } from "../../types/auth";

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

export const register = async ({
  name,
  email,
  password,
}: RegisterProps): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("/auth/register", {
    name,
    email,
    password,
  });
  return res.data;
};
