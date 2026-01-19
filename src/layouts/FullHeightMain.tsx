import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

function FullHeightMain(props: Props) {
  return (
    <main
      className={cn(
        // Calculate full viewport height minus footer height (152px mobile, 144px desktop)
        // Add padding-top to offset fixed header position
        "flex justify-center items-center h-[calc(100dvh-9.5rem)] pt-12 sm:h-[calc(100dvh-9rem)] sm:pt-20",
        props.className
      )}
    >
      {props.children}
    </main>
  );
}

export default FullHeightMain;
