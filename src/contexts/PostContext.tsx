import type { Post } from "@/types/post";
import React, { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import useGetPostById from "@/hooks/useGetPostById";

interface PostContextType {
  post: Post | null;
  isLoading: boolean;
  error: string | null;
}

const PostContext = createContext<PostContextType>({
  post: null,
  isLoading: false,
  error: null,
});

export function PostProvider({ children }: { children?: React.ReactNode }) {
  const params = useParams();
  const { post, isLoading, error } = useGetPostById(Number(params.postId));

  return (
    <PostContext.Provider value={{ post, isLoading, error }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePostContext() {
  return useContext(PostContext);
}
