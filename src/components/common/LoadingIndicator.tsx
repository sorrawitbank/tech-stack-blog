import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

function LoadingIndicator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 text-brown-500 lg:gap-3",
        className
      )}
    >
      <Spinner className="size-10 lg:size-12" />
      <span className="text-body-1">Loading...</span>
    </div>
  );
}

export default LoadingIndicator;
