import type { Category, CategoryApi } from "@/types/category";

export function toCategory(categoryApi: CategoryApi): Category {
  return {
    id: categoryApi.id,
    name: categoryApi.name,
  };
}

export function mapToCategory(categoryApis: CategoryApi[]): Category[] {
  return categoryApis.map(toCategory);
}
