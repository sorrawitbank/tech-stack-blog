import type { Post } from "@/types/post";
import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { fetchPostById } from "@/services/postApi";
import { toPost } from "@/utils/post";

function useGetPostById(postId: number) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const data = await fetchPostById(postId);
      const mappedPost: Post = toPost(data);
      setPost(mappedPost);
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
  }, []);

  return { post, isLoading, error };
}

export default useGetPostById;
