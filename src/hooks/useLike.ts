import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import debounceFunction from "debounce-fn";
import { useAuthContext } from "@/contexts/AuthContext";
import { fetchPostLike, likePost, unlikePost } from "@/services/post";
import sonner from "@/utils/sonner";

function useLike(postId: number) {
  const [likeAdjust, setLikeAdjust] = useState<number>(0);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isLikeValue, setIsLikeValue] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;
    const controller = new AbortController();
    getLike(controller);

    return () => {
      controller.abort();
    };
  }, [user]);

  useEffect(() => {
    if (!error) return;
    sonner.error({
      message: `${isLike ? "Unlike" : "Like"} post failed`,
      description: error,
    });
  }, [error]);

  const getLike = async (controller?: AbortController) => {
    setIsLoading(true);
    try {
      const data = await fetchPostLike({ postId, controller });
      setIsLike(Boolean(data));
      setIsLikeValue(Boolean(data));
    } catch (error) {
      // Get error message from response data if available
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          setError(
            error.response?.data?.message || "Failed to fetch post like"
          );
        } else {
          setError(error.message || "Failed to fetch post like");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSetIsLike = useMemo(() => {
    return debounceFunction(
      async (likeChange: boolean) => {
        if (likeChange === isLike) return;
        setError(null);
        if (likeChange) {
          try {
            await likePost(postId);
            setIsLike(true);
          } catch (error) {
            setIsLikeValue(false);
            setLikeAdjust((prev) => prev - 1);

            // Get error message from response data if available
            if (error instanceof Error) {
              if (error instanceof AxiosError) {
                setError(
                  error.response?.data?.message || "Failed to like post"
                );
              } else {
                setError(error.message || "Failed to like post");
              }
            }
          }
        } else {
          try {
            await unlikePost(postId);
            setIsLike(false);
          } catch (error) {
            setIsLikeValue(true);
            setLikeAdjust((prev) => prev + 1);

            // Get error message from response data if available
            if (error instanceof Error) {
              if (error instanceof AxiosError) {
                setError(
                  error.response?.data?.message || "Failed to unlike post"
                );
              } else {
                setError(error.message || "Failed to unlike post");
              }
            }
          }
        }
      },
      { wait: 600 }
    );
  }, [isLike]);

  const handleLikePost = () => {
    setIsLikeValue(true);
    setLikeAdjust((prev) => prev + 1);
    debouncedSetIsLike(true);
  };

  const handleUnlikePost = () => {
    setIsLikeValue(false);
    setLikeAdjust((prev) => prev - 1);
    debouncedSetIsLike(false);
  };

  return {
    likeAdjust,
    isLikeValue,
    isLoading,
    handleLikePost,
    handleUnlikePost,
  };
}

export default useLike;
