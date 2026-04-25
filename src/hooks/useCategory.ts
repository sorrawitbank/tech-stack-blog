import type { Category } from "@/types/category";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import { fetchCategories } from "@/services/category";
import { mapToCategory } from "@/utils/category";
import sonner from "@/utils/sonner";

function useCategory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState<string>(
    searchParams.get("category")?.trim() || "Highlight"
  );
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
    const fromUrl = searchParams.get("category")?.trim();
    const next = fromUrl || "Highlight";

    setCategory((prev) => (prev === next ? prev : next));
  }, [searchParams]);

  useEffect(() => {
    if (!error) return;
    sonner.error({ message: "Error!", description: error });
  }, [error]);

  const getCategories = async (controller?: AbortController) => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await fetchCategories({ controller });
      const parsedCategories: Category[] = mapToCategory(data);
      setCategories((prev) => [prev[0], ...parsedCategories]);
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

  const handleSelectCategory = (nextCategory: string) => {
    setCategory(nextCategory);
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (nextCategory === "Highlight") {
          params.delete("category");
        } else {
          params.set("category", nextCategory);
        }
        params.delete("page");
        return params;
      },
      { replace: true }
    );
  };

  return {
    category,
    categories,
    isLoading,
    error,
    getCategories,
    handleSelectCategory,
  };
}

export default useCategory;
