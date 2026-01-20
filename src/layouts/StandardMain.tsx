import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

function StandardMain(props: Props) {
  return (
    <main
      className={cn(
        // Add padding-inline for responsive design
        // Add padding-top to offset fixed header position
        "pt-12 sm:pt-20 lg:flex lg:flex-col lg:px-12 lg:pt-30 lg:pb-30 xl:px-30 xl:pt-35",
        props.className
      )}
    >
      {props.children}
    </main>
  );
}

export default StandardMain;
