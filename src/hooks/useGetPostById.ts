import type { Post } from "@/types/post";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { fetchPostById } from "@/services/postService";
import { toPost } from "@/utils/post";

function useGetPostById(postId: number) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    getPost(controller);

    return () => {
      controller.abort();
    };
  }, []);

  const getPost = async (controller: AbortController) => {
    setIsLoading(true);
    try {
      const data = await fetchPostById(postId, controller);
      const mappedPost: Post = toPost(data);
      setPost(mappedPost);
    } catch (error) {
      // Get error message from response data if available
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || "Failed to fetch posts");
        } else {
          setError(error.message || "Failed to fetch posts");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { post, isLoading, error };
}

export default useGetPostById;
