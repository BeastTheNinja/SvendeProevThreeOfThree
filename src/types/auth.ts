import type { User } from "./user";

export type LoginCredentials = {
  username: string;
  password: string;
};

export type RegisterCredentials = {
  firstname: string;
  lastname: string;
  address: string;
  zipcode: number;
  city: string;
  email: string;
  password: string;
  hasNewsletter: boolean;
  hasNotification: boolean;
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
  address: string;
  zipcode: number;
  city: string;
  email: string;
  hasNewsletter: boolean;
  hasNotification: boolean;

};
