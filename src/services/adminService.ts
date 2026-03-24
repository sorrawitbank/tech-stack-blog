import axios from "axios";

const ADMIN_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/admin`;

export async function updateAdminProfile(formData: FormData) {
  await axios.put(`${ADMIN_BASE_URL}/profile`, formData);
}
