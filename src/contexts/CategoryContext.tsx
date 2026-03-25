import type { Category } from "@/types/category";
import React, { createContext, useContext } from "react";
import useCategory from "@/hooks/useCategory";

interface CategoryContextType {
  category: string;
  categories: Category[];
  isLoading: boolean;
  handleSelectCategory: (category: string) => void;
}

const CategoryContext = createContext<CategoryContextType>({
  category: "Highlight",
  categories: [{ id: 0, name: "Highlight" }],
  isLoading: false,
  handleSelectCategory: () => {},
});

export function CategoryProvider({ children }: { children?: React.ReactNode }) {
  const { category, categories, isLoading, handleSelectCategory } =
    useCategory();

  return (
    <CategoryContext.Provider
      value={{ category, categories, isLoading, handleSelectCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryContext() {
  return useContext(CategoryContext);
}
