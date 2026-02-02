import React, { createContext } from "react";
import useScroll, { type Direction } from "@/hooks/useScroll";

interface ScrollContextType {
  scrollDirection: Direction;
}

export const ScrollContext = createContext<ScrollContextType>({
  scrollDirection: "up",
});

export function ScrollProvider({ children }: { children?: React.ReactNode }) {
  const { scrollDirection } = useScroll();

  return (
    <ScrollContext.Provider value={{ scrollDirection }}>
      {children}
    </ScrollContext.Provider>
  );
}
