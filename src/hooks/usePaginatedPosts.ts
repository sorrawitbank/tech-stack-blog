import type { Post } from "@/types/post";
import { useContext, useEffect, useState } from "react";
import useGetPosts from "./useGetPosts";
import { CategoryContext } from "@/contexts/CategoryContext";

function usePaginatedPosts() {
  const [page, setPage] = useState<number>(1);
  const [paginatedPosts, setPaginatedPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { category } = useContext(CategoryContext);
  const { data, posts, isLoading, error } = useGetPosts({
    page,
    category,
  });

  useEffect(() => {
    setPage(1);
    setPaginatedPosts([]);
  }, [category]);

  useEffect(() => {
    setPaginatedPosts((prev) => [...prev, ...posts]);
  }, [posts]);

  useEffect(() => {
    setHasMore(data.currentPage < data.totalPages);
  }, [data.currentPage, data.totalPages]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return { paginatedPosts, isLoading, error, hasMore, handleLoadMore };
}

export default usePaginatedPosts;
