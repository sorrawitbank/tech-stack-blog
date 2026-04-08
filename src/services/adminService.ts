import axios from "axios";

const ADMIN_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/admin`;

export async function createCategory(name: string) {
  await axios.post(`${ADMIN_BASE_URL}/categories`, { name });
}

export async function updateAdminProfile(formData: FormData) {
  await axios.put(`${ADMIN_BASE_URL}/profile`, formData);
}

export async function updateCategory(categoryId: number, name: string) {
  await axios.put(`${ADMIN_BASE_URL}/categories/${categoryId}`, { name });
}

export async function deleteCategory(categoryId: number) {
  await axios.delete(`${ADMIN_BASE_URL}/categories/${categoryId}`);
}
