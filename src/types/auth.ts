import type { User } from "./user";

export type LoginCredentials = {
  username: string;
  password: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  description: string;
  imageId: number;
  isActive: boolean;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type RegisterResponse = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;

};
