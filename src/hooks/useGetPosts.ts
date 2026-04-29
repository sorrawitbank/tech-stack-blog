import type { Post, PostsParams, PostsResponse } from "@/types/post";
import type { Role } from "@/types/user";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import DEFAULT_CATEGORY_NAME from "@/constants/category";
import { fetchAdminPosts } from "@/services/admin";
import { fetchPosts } from "@/services/post";
import { mapToPost } from "@/utils/post";

interface Params extends Partial<PostsParams> {
  role?: Role;
  requiredKeyword?: boolean;
  fetchOnCategoryChange?: boolean;
}

function useGetPosts({
  page = 1,
  limit = 6,
  category = DEFAULT_CATEGORY_NAME,
  keyword = "",
  statusId = 0,
  role = "user",
  requiredKeyword = false,
  fetchOnCategoryChange = true,
}: Params) {
  const [searchParams] = useSearchParams();
  const isFirstRender = useRef<boolean>(true);
  const memPage = useRef<number>(
    role === "user" ? 1 : Number(searchParams.get("page")?.trim()) || 1
  );
  const memCategory = useRef<string>(
    searchParams.get("category")?.trim() || DEFAULT_CATEGORY_NAME
  );
  const memKeyword = useRef<string>("");
  const [data, setData] = useState<Omit<PostsResponse, "posts">>({
    totalPosts: 0,
    totalPages: 0,
    currentPage: 0,
    limit: limit,
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // This effect will not run on the first render.
  useEffect(() => {
    if (isFirstRender.current) return;
    // Skip loading if page didn't change
    if (page === memPage.current) return;
    // Skip loading if category changed
    if (category !== memCategory.current) {
      memCategory.current = category;
      return;
    }
    // Skip loading if keyword changed
    if (keyword !== memKeyword.current) {
      memKeyword.current = keyword;
      return;
    }
    const controller = new AbortController();
    getPosts(controller);

    return () => {
      controller.abort();
    };
  }, [page]);

  // This effect will not run on the first render.
  useEffect(() => {
    if (isFirstRender.current) return;
    if (memPage.current === 1) {
      memCategory.current = category;
    }
    if (!fetchOnCategoryChange) return;
    const controller = new AbortController();
    getPosts(controller, 1);

    return () => {
      controller.abort();
    };
  }, [category, statusId]);

  // This effect will not run on the first render.
  useEffect(() => {
    if (isFirstRender.current) return;
    if (requiredKeyword && !keyword) return;
    if (memPage.current === 1) {
      memKeyword.current = keyword;
    }
    const controller = new AbortController();
    getPosts(controller, 1);

    return () => {
      controller.abort();
    };
  }, [keyword]);

  useEffect(() => {
    setIsLoading(false);
  }, [posts]);

  useEffect(() => {
    isFirstRender.current = false;
    if (requiredKeyword) return;
    const controller = new AbortController();
    getPosts(controller);

    return () => {
      controller.abort();
    };
  }, []);

  const getPosts = async (
    controller?: AbortController,
    pageToFetch: number = page
  ) => {
    setError(null);
    setIsLoading(true);
    try {
      let data;
      if (role === "admin") {
        data = await fetchAdminPosts({
          page: pageToFetch,
          limit,
          category,
          keyword,
          statusId,
          controller,
        });
      } else {
        data = await fetchPosts({
          page: pageToFetch,
          limit,
          category,
          keyword,
          controller,
        });
      }
      const posts: Post[] = mapToPost(data.posts);
      setData(data);
      setPosts(posts);
      memPage.current = pageToFetch;
    } catch (error) {
      // Get error message from response data if available
      if (error instanceof Error && error.message !== "canceled") {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || "Failed to fetch posts");
        } else {
          setError(error.message || "Failed to fetch posts");
        }
        setIsLoading(false);
      }
    }
  };

  const clearPosts = () => {
    setPosts([]);
  };

  return { data, memPage, posts, isLoading, error, getPosts, clearPosts };
}

export default useGetPosts;
