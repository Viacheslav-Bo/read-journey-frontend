export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthData {
  user: User;
  accessToken: string;
}

export type RegisterResponse = ApiResponse<AuthData>;
export type LoginResponse = ApiResponse<AuthData>;

export interface MeResponse {
  user: User;
}
