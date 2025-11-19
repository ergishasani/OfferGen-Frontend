// src/features/auth/api.ts
import { apiClient } from "../../lib/apiClient";
import type {
  AuthUser,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "./types";

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await apiClient.post("/api/auth/login", { email, password });
  return res.data;
}

export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const res = await apiClient.post("/api/auth/register", payload);
  return res.data;
}

export async function forgotPassword(
  payload: ForgotPasswordPayload
): Promise<ForgotPasswordResponse> {
  const res = await apiClient.post("/api/auth/forgot-password", payload);
  return res.data;
}

export async function getMe(): Promise<AuthUser> {
  const res = await apiClient.get("/api/auth/me");
  return res.data;
}
