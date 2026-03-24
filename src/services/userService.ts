import axios from "axios";

const USER_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/user`;

export async function updateProfile(formData: FormData) {
  await axios.put(`${USER_BASE_URL}/profile`, formData);
}
