import type { AdminApi } from "@/types/user";
import axios from "axios";

const USER_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/user`;

export async function fetchAdmin(params: { controller?: AbortController }) {
  const response = await axios.get<AdminApi>(`${USER_BASE_URL}/admin`, {
    signal: params.controller?.signal,
  });

  return response.data;
}

export async function updateProfile(formData: FormData) {
  await axios.put(`${USER_BASE_URL}/profile`, formData);
}
