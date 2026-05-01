import type { Category } from "@/types/category";
import React, { createContext, useContext } from "react";
import DEFAULT_CATEGORY_NAME from "@/constants/category";
import useCategory from "@/hooks/useCategory";

interface CategoryContextType {
  category: string;
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  getCategories: (controller?: AbortController) => Promise<void>;
  handleSelectCategory: (category: string) => void;
}

const CategoryContext = createContext<CategoryContextType>({
  category: DEFAULT_CATEGORY_NAME,
  categories: [{ id: 0, name: DEFAULT_CATEGORY_NAME }],
  isLoading: false,
  error: null,
  getCategories: async () => {},
  handleSelectCategory: () => {},
});

export function CategoryProvider({ children }: { children?: React.ReactNode }) {
  const {
    category,
    categories,
    isLoading,
    error,
    getCategories,
    handleSelectCategory,
  } = useCategory();

  return (
    <CategoryContext.Provider
      value={{
        category,
        categories,
        isLoading,
        error,
        getCategories,
        handleSelectCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryContext() {
  return useContext(CategoryContext);
}
