import type { Post } from "@/types/post";
import type { Role } from "@/types/user";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import debounceFunction from "debounce-fn";
import useGetPosts from "./useGetPosts";
import STATUSES from "@/constants/status";
import { useCategoryContext } from "@/contexts/CategoryContext";
import sonner from "@/utils/sonner";

function usePaginatedPosts(role: Role = "user") {
  const isFirstRender = useRef<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [page, setPage] = useState<number>(
    role === "user" ? 1 : Number(searchParams.get("page")?.trim()) || 1
  );
  const [statusId, setStatusId] = useState<number>(
    STATUSES.find(
      (status) => status.name === searchParams.get("status")?.trim()
    )?.id ?? 0
  );
  const [paginatedPosts, setPaginatedPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isPaginationLoading, setIsPaginationLoading] =
    useState<boolean>(false);
  const { category } = useCategoryContext();
  const { data, memPage, posts, isLoading, error } = useGetPosts({
    page,
    category,
    keyword,
    statusId,
    role,
  });

  // This effect will not run on the first render.
  useEffect(() => {
    if (isFirstRender.current) return;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("page");
      return params;
    });
  }, [keyword]);

  // This effect will not run on the first render.
  useEffect(() => {
    if (isFirstRender.current) return;
    setPage(1);
    setPaginatedPosts([]);
  }, [category, keyword, statusId]);

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
    setPage(memPage.current);
    sonner.error({ message: "Error!", description: error });
  }, [error]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const debouncedSetKeyword = useMemo(() => {
    return debounceFunction(setKeyword, { wait: 600 });
  }, []);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSetKeyword(value.trim());
  };

  const handleLoadMore = () => {
    setIsPaginationLoading(true);
    setPage((prev) => prev + 1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (nextPage <= 1) {
          params.delete("page");
        } else {
          params.set("page", String(nextPage));
        }
        return params;
      },
      { replace: true }
    );
  };

  const handleStatusChange = (nextStatusId: string) => {
    setStatusId(Number(nextStatusId));
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (
          Number(nextStatusId) === STATUSES[0].id ||
          Number(nextStatusId) >= STATUSES.length
        ) {
          params.delete("status");
        } else {
          params.set("status", STATUSES[Number(nextStatusId)].name);
        }
        params.delete("page");
        return params;
      },
      { replace: true }
    );
  };

  return {
    inputValue,
    statusId,
    data,
    posts,
    paginatedPosts,
    hasMore,
    isLoading,
    isPaginationLoading,
    error,
    handleInputChange,
    handleLoadMore,
    handlePageChange,
    handleStatusChange,
  };
}

export default usePaginatedPosts;
