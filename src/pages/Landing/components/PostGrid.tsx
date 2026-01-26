import PostCard from "./PostCard";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import { ActionButton } from "@/components/common/Button";
import usePaginatedPosts from "@/hooks/usePaginatedPosts";

function PostGrid() {
  const { paginatedPosts, isLoading, hasMore, handleLoadMore } =
    usePaginatedPosts();

  return (
    <div className="relative flex flex-col items-center gap-12 px-4 pt-6 pb-13 sm:px-12 sm:pt-12 lg:gap-20 lg:p-0">
      {paginatedPosts.length === 0 ? (
        <LoadingIndicator className="mb-[calc(100svh-36rem)] sm:mb-[calc(100svh-40rem)] lg:mb-[calc(100svh-41rem)]" />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-5 2xl:grid-cols-3">
            {paginatedPosts.map((post) => (
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
          {isLoading && (
            <LoadingIndicator className="absolute bottom-9 lg:-bottom-5" />
          )}
        </>
      )}
    </div>
  );
}

export default PostGrid;
