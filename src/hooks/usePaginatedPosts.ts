import type { Post } from "@/types/post";
import { useContext, useEffect, useState } from "react";
import useGetPosts from "./useGetPosts";
import { CategoryContext } from "@/contexts/CategoryContext";
import sonner from "@/utils/sonner";

function usePaginatedPosts() {
  const [page, setPage] = useState<number>(1);
  const [paginatedPosts, setPaginatedPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isPaginationLoading, setIsPaginationLoading] =
    useState<boolean>(false);
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
    setHasMore(data.currentPage < data.totalPages);
  }, [data]);

  useEffect(() => {
    setPaginatedPosts((prev) => [...prev, ...posts]);
    setIsPaginationLoading(false);
  }, [posts]);

  useEffect(() => {
    if (!error) return;
    setIsPaginationLoading(false);
    setPage((prev) => prev - 1);
    sonner.error({ message: "Error!", description: error });
  }, [error]);

  const handleLoadMore = () => {
    setIsPaginationLoading(true);
    setPage((prev) => prev + 1);
  };

  return {
    paginatedPosts,
    hasMore,
    isLoading,
    isPaginationLoading,
    error,
    handleLoadMore,
  };
}

export default usePaginatedPosts;
