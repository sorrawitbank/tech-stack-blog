import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import debounceFunction from "debounce-fn";
import useGetPosts from "./useGetPosts";
import { useCategoryContext } from "@/contexts/CategoryContext";
import sonner from "@/utils/sonner";

function useSearchPosts() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { category } = useCategoryContext();
  const { posts, error, clearPosts } = useGetPosts({
    category,
    keyword,
    requireKeyword: true,
    fetchOnCategoryChange: false,
  });

  useEffect(() => {
    setKeyword("");
  }, [category]);

  useEffect(() => {
    if (keyword) return;
    clearPosts();
  }, [keyword]);

  useEffect(() => {
    if (!error) return;
    sonner.error({ message: "Error!", description: error });
  }, [error]);

  const debouncedSetKeyword = useMemo(() => {
    return debounceFunction(setKeyword, { wait: 600 });
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setValue(value);
    debouncedSetKeyword(value.trim());
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  const handleNavigate = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  return {
    value,
    posts,
    isOpen,
    handleChange,
    handleFocus,
    handleBlur,
    handleNavigate,
  };
}

export default useSearchPosts;
