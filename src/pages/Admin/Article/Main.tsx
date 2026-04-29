import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import ArticleHeader from "./components/ArticleHeader";
import ArticleList from "./components/ArticleList";
import ArticleListSkeleton from "./components/ArticleListSkeleton";
import CategorySelector from "./components/CategorySelector";
import StatusSelector from "./components/StatusSelector";
import { NavigationButton } from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import useArticleManagement from "@/hooks/useArticleManagement";
import usePaginatedPosts from "@/hooks/usePaginatedPosts";
import AdminLargeHeader from "@/layouts/AdminLargeHeader";
import AdminMain from "@/layouts/AdminMain";

function Main() {
  const location = useLocation();
  const [deleteTitle, setDeleteTitle] = useState<string>("");
  const { isSmall, isLarge } = useMediaQueryContext();
  const {
    isDeleteConfirmDialogOpen,
    handleDelete,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useArticleManagement("delete");
  const {
    inputValue,
    statusId,
    data,
    posts,
    isLoading,
    error,
    handleInputChange,
    handlePageChange,
    handleStatusChange,
  } = usePaginatedPosts("admin");

  return (
    <AdminMain>
      {isLarge && (
        <AdminLargeHeader>
          <h3 className="style-headline-3 text-brown-600">
            Article management
          </h3>
          <NavigationButton
            variant="primary"
            to="/admin/article/create"
            state={{ fromSearch: location.search }}
          >
            <Plus />
            Create article
          </NavigationButton>
        </AdminLargeHeader>
      )}
      <div className="flex flex-col gap-6 sm:gap-8 lg:px-10 lg:py-10 xl:px-15">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <div className="relative lg:max-w-90 lg:w-[40%]">
              <Input
                id="search-posts"
                type="search"
                value={inputValue}
                placeholder="Search"
                onChange={handleInputChange}
                className="h-12 pl-10 style-body-1 text-brown-400 bg-white placeholder:text-brown-400 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-brown-400 pointer-events-none" />
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <CategorySelector />
              <StatusSelector
                defaultStatusId={statusId}
                onStatusChange={handleStatusChange}
              />
            </div>
          </div>
          <div className="border border-brown-300 rounded-lg overflow-hidden">
            <ArticleHeader />
            <ul>
              {isLoading ? (
                Array.from({ length: 6 }, (_, index) => (
                  <ArticleListSkeleton key={index} index={index} />
                ))
              ) : posts.length ? (
                posts.map((post, index) => (
                  <ArticleList
                    key={post.id}
                    post={post}
                    index={index}
                    setDeleteTitle={setDeleteTitle}
                    handleDelete={handleDelete}
                  />
                ))
              ) : (
                <li className="px-4 py-5 sm:px-6">
                  <span className="style-body-1 text-brown-500">
                    {error || "No articles found"}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center gap-1">
            <Skeleton className="h-9 w-10" />
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
            <Skeleton className="h-9 w-10" />
          </div>
        ) : (
          data.currentPage > 0 && (
            <Pagination>
              <PaginationContent className="text-brown-500">
                {isSmall && data.currentPage - 1 >= 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => {
                        handlePageChange(data.currentPage - 1);
                      }}
                      className="style-body-1 cursor-pointer hover:text-brown-400 active:text-brown-600"
                    />
                  </PaginationItem>
                )}
                {data.currentPage - 2 >= 1 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(1)}
                      className="style-body-1 cursor-pointer hover:text-brown-400 active:text-brown-600"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                )}
                {data.currentPage - 3 >= 1 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {data.currentPage - 1 >= 1 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(data.currentPage - 1)}
                      className="style-body-1 cursor-pointer hover:text-brown-400 active:text-brown-600"
                    >
                      {data.currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    className="style-body-1 cursor-pointer hover:text-brown-400 active:text-brown-600"
                    isActive
                  >
                    {data.currentPage}
                  </PaginationLink>
                </PaginationItem>
                {data.currentPage + 1 <= data.totalPages && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(data.currentPage + 1)}
                      className="style-body-1 cursor-pointer hover:text-brown-400 active:text-brown-600"
                    >
                      {data.currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {data.currentPage + 3 <= data.totalPages && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {data.currentPage + 2 <= data.totalPages && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(data.totalPages)}
                      className="style-body-1 cursor-pointer hover:text-brown-400 active:text-brown-600"
                    >
                      {data.totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {isSmall && data.currentPage + 1 <= data.totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(data.currentPage + 1)}
                      className="style-body-1 cursor-pointer hover:text-brown-400 active:text-brown-600"
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )
        )}
        {!isLarge && (
          <NavigationButton
            variant="primary"
            to="/admin/article/create"
            state={{ fromSearch: location.search }}
            className="self-end"
          >
            <Plus />
            Create article
          </NavigationButton>
        )}
      </div>
      <ConfirmDialog
        title="Delete article"
        content={`Do you want to delete article? (Title: ${deleteTitle})`}
        confirmText="Delete"
        open={isDeleteConfirmDialogOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </AdminMain>
  );
}

export default Main;
