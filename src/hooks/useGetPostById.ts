import type { Post } from "@/types/post";
import type { Role } from "@/types/user";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { fetchAdminPostById } from "@/services/admin";
import { fetchPostById } from "@/services/post";
import { toPost } from "@/utils/post";

function useGetPostById(postId: number, role: Role = "user") {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    getPost(controller);

    return () => {
      controller.abort();
    };
  }, []);

  const getPost = async (controller?: AbortController) => {
    if (!postId) {
      setError("Please enter a valid post ID");
      return;
    }

    setIsLoading(true);
    try {
      let data;
      if (role === "admin") {
        data = await fetchAdminPostById({ postId, controller });
      } else {
        data = await fetchPostById({ postId, controller });
      }
      const post: Post = toPost(data);
      setPost(post);
    } catch (error) {
      // Get error message from response data if available
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || "Failed to fetch post");
        } else {
          setError(error.message || "Failed to fetch post");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { post, isLoading, error };
}

export default useGetPostById;
