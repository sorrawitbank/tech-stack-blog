import type { CategoryApi } from "@/types/category";
import axios from "axios";

const CATEGORIES_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/categories`;

export async function fetchCategories(params: { controller: AbortController }) {
  const response = await axios.get<CategoryApi[]>(CATEGORIES_BASE_URL, {
    signal: params.controller.signal,
  });

  return response.data;
}
