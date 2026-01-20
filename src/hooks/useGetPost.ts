import type { Post, ApiPost } from "@/types/post";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toPost } from "@/utils/post";

function useGetPost(postId: number) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get<ApiPost>(
        `https://blog-post-project-api.vercel.app/posts/${postId}`
      );
      const mappedPost: Post = toPost(response.data);
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
  };

  return { post, isLoading, error };
}

export default useGetPost;
