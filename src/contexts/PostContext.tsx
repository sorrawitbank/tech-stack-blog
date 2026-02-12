import type { Post } from "@/types/post";
import { useParams } from "react-router-dom";
import React, { createContext, useContext } from "react";
import useGetPostById from "@/hooks/useGetPostById";

interface PostContextType {
  post: Post | null;
  isLoading: boolean;
  error: string;
}

const PostContext = createContext<PostContextType>({
  post: null,
  isLoading: false,
  error: "",
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
