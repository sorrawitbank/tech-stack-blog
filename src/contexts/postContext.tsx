import type { Post } from "@/types/post";
import { useParams } from "react-router-dom";
import React, { createContext } from "react";
import useGetPost from "@/hooks/useGetPost";

interface PostContextType {
  post: Post | null;
  isLoading: boolean;
  error: string;
}

export const PostContext = createContext<PostContextType>({
  post: null,
  isLoading: false,
  error: "",
});

export function PostProvider({ children }: { children?: React.ReactNode }) {
  const params = useParams();
  const { post, isLoading, error } = useGetPost(Number(params.postId));

  return (
    <PostContext.Provider value={{ post, isLoading, error }}>
      {children}
    </PostContext.Provider>
  );
}
