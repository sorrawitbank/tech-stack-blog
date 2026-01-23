import React, { createContext } from "react";
import { categories } from "@/data/category";
import useCategory from "@/hooks/useCategory";

export const CategoryContext = createContext({
  category: "Highlight",
  categories: categories,
  handleSelectCategory: (_: string) => {},
});

export function CategoryProvider({ children }: { children?: React.ReactNode }) {
  const { category, handleSelectCategory } = useCategory();

  return (
    <CategoryContext.Provider
      value={{ category, categories, handleSelectCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
