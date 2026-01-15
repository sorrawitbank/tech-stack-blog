import { Spinner } from "../ui/spinner";

import { cn } from "@/lib/utils";

function LoadingIndicator({ className }: { className?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-brown-500">
      <Spinner className={cn("size-10 lg:size-12", className)} />
      <span className="text-body-1">Loading...</span>
    </div>
  );
}

export default LoadingIndicator;
