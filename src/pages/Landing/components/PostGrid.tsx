import { CircleAlert, TriangleAlert } from "lucide-react";
import PostCard from "./PostCard";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import { ActionButton } from "@/components/common/Button";
import usePaginatedPosts from "@/hooks/usePaginatedPosts";

function PostGrid() {
  const {
    paginatedPosts,
    hasMore,
    isLoading,
    isPaginationLoading,
    error,
    handleLoadMore,
  } = usePaginatedPosts();

  if (paginatedPosts.length === 0) {
    if (isLoading)
      return (
        <LoadingIndicator className="mb-[calc(max(0px,100dvh-36rem))] sm:mb-[calc(max(0px,100dvh-40rem))] lg:mb-[calc(max(0px,100dvh-41rem))]" />
      );

    if (error)
      return (
        <div className="flex flex-col items-center gap-2 mb-[calc(max(0px,100dvh-37rem))] sm:mb-[calc(max(0px,100dvh-41rem))]">
          <TriangleAlert className="size-12 min-h-12 text-brown-600" />
          <h4 className="text-headline-4 text-center text-brown-600">
            {error}
          </h4>
        </div>
      );

    return (
      <div className="flex flex-col items-center gap-2 mb-[calc(max(0px,100dvh-37rem-28px))] sm:mb-[calc(max(0px,100dvh-41rem-28px))]">
        <CircleAlert className="size-12 min-h-12 text-brown-600" />
        <div className="flex flex-col gap-1">
          <h4 className="text-headline-4 text-center text-brown-600">
            No posts found
          </h4>
          <p className="text-body-1 text-center text-brown-400">
            Browse other categories to discover more.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-5 2xl:grid-cols-3">
        {paginatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {hasMore && (
        <ActionButton
          variant="text"
          onClick={handleLoadMore}
          disabled={isPaginationLoading}
          className={isPaginationLoading ? "invisible" : "visible"}
        >
          View more
        </ActionButton>
      )}
      {isPaginationLoading && (
        <LoadingIndicator className="absolute bottom-9 lg:-bottom-5" />
      )}
    </>
  );
}

export default PostGrid;
