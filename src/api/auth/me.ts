import { api } from "../client";

interface MeProps {
  user: {
    userId: string;
    iat: number;
    exp: number;
  };
}

export const me = async (): Promise<MeProps> => {
  const res = await api.post<MeProps>("/auth/me", {});
  return res.data;
};
