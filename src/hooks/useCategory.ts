import type { Category } from "@/types/category";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { fetchCategories } from "@/services/categoryService";
import { mapToCategory } from "@/utils/category";
import sonner from "@/utils/sonner";

function useCategory() {
  const [category, setCategory] = useState<string>("Highlight");
  const [categories, setCategories] = useState<Category[]>([
    { id: 0, name: "Highlight" },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    getCategories(controller);

    return () => {
      controller.abort;
    };
  }, []);

  useEffect(() => {
    if (!error) return;
    sonner.error({ message: "Error!", description: error });
  }, [error]);

  const getCategories = async (controller: AbortController) => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await fetchCategories({ controller });
      const parsedCategories: Category[] = mapToCategory(data);
      setCategories((prev) => [...prev, ...parsedCategories]);
    } catch (error) {
      // Get error message from response data if available
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          setError(
            error.response?.data?.message || "Failed to fetch categories"
          );
        } else {
          setError(error.message || "Failed to fetch categories");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCategory = (category: string) => {
    setCategory(category);
  };

  return { category, categories, isLoading, handleSelectCategory };
}

export default useCategory;
