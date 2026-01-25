import type { Post, PostsParams, PostsResponse } from "@/types/post";
import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import { fetchPosts } from "@/services/postService";
import { mapToPost } from "@/utils/post";

interface Params extends Partial<PostsParams> {
  requireKeyword?: boolean;
  fetchOnCategoryChange?: boolean;
}

function useGetPosts({
  page = 1,
  limit = 6,
  category = "Highlight",
  keyword = "",
  requireKeyword = false,
  fetchOnCategoryChange = true,
}: Params) {
  const isFirstRender = useRef<boolean>(true);
  const [data, setData] = useState<PostsResponse>({
    totalPosts: 0,
    totalPages: 0,
    currentPage: 0,
    limit: limit,
    posts: [],
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // This effect will not run on the first render.
  useEffect(() => {
    if (isFirstRender.current) return;
    const controller = new AbortController();
    getPosts(controller);

    return () => {
      controller.abort();
    };
  }, [page]);

  // This effect will not run on the first render.
  useEffect(() => {
    if (isFirstRender.current || !fetchOnCategoryChange) return;
    const controller = new AbortController();
    getPosts(controller, 1);

    return () => {
      controller.abort();
    };
  }, [category]);

  useEffect(() => {
    isFirstRender.current = false;
    if (requireKeyword && !keyword) return;
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
    if (isLoading) return;
    setIsLoading(true);
    try {
      const data = await fetchPosts({
        page: pageToFetch,
        limit,
        category,
        keyword,
        controller,
      });
      const mappedPosts: Post[] = mapToPost(data.posts);
      setData(data);
      setPosts(mappedPosts);
    } catch (err) {
      // Get error message from response data if available
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch post");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearPosts = () => {
    setPosts([]);
  };

  return { data, posts, isLoading, error, clearPosts };
}

export default useGetPosts;
