import { Cookies } from "react-cookie";
import api from "./api";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  RegisterResponse
} from "../types/auth";

const cookies = new Cookies();

function generateRefreshToken(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `refresh_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export async function login(credentials: LoginCredentials) {
  const response = await api<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  cookies.set("accessToken", response.accessToken);
  cookies.set("refreshToken", response.refreshToken);
  cookies.set("user", response.user)

  return response;
}
export async function register(
  credentials: RegisterCredentials
) {
  const refreshToken = generateRefreshToken();

  return api<RegisterResponse>("/api/users", {
    method: "POST",
    body: JSON.stringify({
      ...credentials,
      refreshToken,
    }),
  });
}

export function logout() {
  cookies.remove("accessToken");
  cookies.remove("refreshToken");
}

export async function isLoggedIn() {
  try {
    await api("/api/auth/verify");
    return true;
  } catch {
    return false;
  }
}

