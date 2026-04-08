import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function CategoryListSkeleton({ index }: { index: number }) {
  return (
    <li
      key={`skeleton-${index}`}
      className={cn(
        "flex justify-between px-4 py-5 sm:px-6",
        index % 2 === 1 && "bg-brown-200"
      )}
    >
      <Skeleton className="w-25 h-6" />
      <div className="flex gap-5">
        <Skeleton className="size-6" />
        <Skeleton className="size-6" />
      </div>
    </li>
  );
}

export default CategoryListSkeleton;
