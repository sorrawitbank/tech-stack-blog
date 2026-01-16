import type { Post, PostsResponse } from "@/types/post";
import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import { ActionButton } from "@/components/common/Button";
import { mapToPost } from "@/utils/post";
import { cn } from "@/lib/utils";

function PostGrid({ selectedCategory }: { selectedCategory: string }) {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

  // Callback when change category
  useEffect(() => {
    setPosts([]);
    setPage(1);
    fetchPosts(1);
  }, [selectedCategory]);

  // Callback when load more posts
  useEffect(() => {
    if (page === 1) return;
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (pageToFetch: number) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get<PostsResponse>(
        "https://blog-post-project-api.vercel.app/posts",
        {
          params: {
            page: pageToFetch,
            category:
              selectedCategory === "Highlight" ? null : selectedCategory,
          },
        }
      );
      const mapped: Post[] = mapToPost(response.data.posts);
      setHasMore(response.data.currentPage < response.data.totalPages);
      setPosts((prev) => [...prev, ...mapped]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="relative flex flex-col items-center gap-12 px-4 pt-6 pb-13 sm:px-12 lg:gap-20 lg:p-0">
      {posts.length === 0 ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-5 2xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {hasMore && (
            <ActionButton
              variant="text"
              disabled={isLoading}
              onClick={handleLoadMore}
              className={isLoading ? "invisible" : "visible"}
            >
              View more
            </ActionButton>
          )}
          <LoadingIndicator
            className={cn(
              isLoading ? "visible" : "invisible",
              "absolute bottom-9 lg:-bottom-5"
            )}
          />
        </>
      )}
    </div>
  );
}

export default PostGrid;
