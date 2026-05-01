import type { Category } from "@/types/category";
import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import DEFAULT_CATEGORY_NAME from "@/constants/category";
import { fetchCategories } from "@/services/category";
import { mapToCategory } from "@/utils/category";
import sonner from "@/utils/sonner";

const categoryCheckPath = ["/", "/admin/article"];

function useCategory() {
  const location = useLocation();
  const isFirstRender = useRef<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState<string>(
    searchParams.get("category")?.trim() || DEFAULT_CATEGORY_NAME
  );
  const [categories, setCategories] = useState<Category[]>([
    { id: 0, name: DEFAULT_CATEGORY_NAME },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category === DEFAULT_CATEGORY_NAME) return;
    if (!categoryCheckPath.includes(location.pathname)) return;
    if (searchParams.get("category")?.trim() === category) return;
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.set("category", category);
        return params;
      },
      { replace: true }
    );
  }, [location.pathname, searchParams, category]);

  useEffect(() => {
    if (isFirstRender.current) return;
    if (categories.map((category) => category.name).includes(category)) return;
    setCategory(DEFAULT_CATEGORY_NAME);
  }, [categories]);

  useEffect(() => {
    if (!error) return;
    sonner.error({ message: "Error!", description: error });
  }, [error]);

  useEffect(() => {
    isFirstRender.current = false;
    const controller = new AbortController();
    getCategories(controller);

    return () => {
      controller.abort;
    };
  }, []);

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
        if (nextCategory === DEFAULT_CATEGORY_NAME) {
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
