import type { Post, PostsParams, PostsResponse } from "@/types/post";
import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import { fetchPosts } from "@/services/postService";
import { mapToPost } from "@/utils/post";

interface Params extends Partial<PostsParams> {
  requiredKeyword?: boolean;
  fetchOnCategoryChange?: boolean;
}

function useGetPosts({
  page = 1,
  limit = 6,
  category = "Highlight",
  keyword = "",
  requiredKeyword = false,
  fetchOnCategoryChange = true,
}: Params) {
  const isFirstRender = useRef<boolean>(true);
  const prevPage = useRef<number>(1);
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
    // Skip loading if page is 1, or page didn't increase
    if (page === 1 || page <= prevPage.current || isFirstRender.current) return;
    const controller = new AbortController();
    getPosts(controller);

    return () => {
      controller.abort();
    };
  }, [page]);

  // This effect will not run on the first render.
  useEffect(() => {
    if (!fetchOnCategoryChange || isFirstRender.current) return;
    const controller = new AbortController();
    getPosts(controller, 1);

    return () => {
      controller.abort();
    };
  }, [category]);

  useEffect(() => {
    setIsLoading(false);
  }, [posts]);

  useEffect(() => {
    isFirstRender.current = false;
    if (requiredKeyword && !keyword) return;
    const controller = new AbortController();
    getPosts(controller);

    return () => {
      controller.abort();
    };
  }, [keyword]);

  const getPosts = async (
    controller: AbortController,
    pageToFetch: number = page
  ) => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await fetchPosts({
        page: pageToFetch,
        limit,
        category,
        keyword,
        controller,
      });
      const parsedPosts: Post[] = mapToPost(data.posts);
      setData(data);
      setPosts(parsedPosts);
      prevPage.current = pageToFetch;
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

  return { data, posts, isLoading, error, clearPosts };
}

export default useGetPosts;
