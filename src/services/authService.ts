import type { LoginData, LoginResponse, RegisterData } from "@/types/auth";
import type { UserApi } from "@/types/user";
import axios from "axios";

const AUTH_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

export async function fetchUser() {
  return await axios.get<UserApi>(`${AUTH_BASE_URL}/get-user`);
}

export async function toLogin(data: LoginData) {
  return await axios.post<LoginResponse>(`${AUTH_BASE_URL}/login`, data);
}

export async function toRegister(data: RegisterData) {
  await axios.post(`${AUTH_BASE_URL}/register`, data);
}
