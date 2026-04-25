import type {
  LoginBody,
  LoginResponse,
  RegisterBody,
  ResetPasswordBody,
} from "@/types/auth";
import type { UserApi } from "@/types/user";
import axios from "axios";

const AUTH_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

export async function fetchUser(params: { controller?: AbortController }) {
  const response = await axios.get<UserApi>(`${AUTH_BASE_URL}/get-user`, {
    signal: params.controller?.signal,
  });

  return response.data;
}

export async function toLogin(body: LoginBody) {
  const response = await axios.post<LoginResponse>(
    `${AUTH_BASE_URL}/login`,
    body
  );

  return response.data;
}

export async function toRegister(body: RegisterBody) {
  await axios.post(`${AUTH_BASE_URL}/register`, body);
}

export async function resetPassword(body: ResetPasswordBody) {
  await axios.put(`${AUTH_BASE_URL}/reset-password`, body);
}
