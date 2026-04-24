import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import { cn } from "@/lib/utils";

function ArticleListSkeleton({ index }: { index: number }) {
  const { isSmall, isXLarge } = useMediaQueryContext();

  return (
    <li
      className={cn(
        "flex items-center gap-4 px-4 py-5 sm:px-6",
        index % 2 === 1 && "bg-brown-200"
      )}
    >
      <div className="flex-5">
        <Skeleton className="h-6 w-2/3" />
      </div>
      {isXLarge && (
        <div className="flex-3">
          <Skeleton className="h-6 w-2/5" />
        </div>
      )}
      {isSmall && (
        <div className="w-30">
          <Skeleton className="h-6 w-2/3" />
        </div>
      )}
      <div className="flex gap-5 w-17">
        <Skeleton className="size-6" />
        <Skeleton className="size-6" />
      </div>
    </li>
  );
}

export default ArticleListSkeleton;
