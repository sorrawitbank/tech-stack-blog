import React, { createContext, useContext } from "react";
import useScroll, { type Direction } from "@/hooks/useScroll";

interface ScrollContextType {
  scrollDirection: Direction;
  scrollY: number;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollDirection: "up",
  scrollY: 0,
});

export function ScrollProvider({ children }: { children?: React.ReactNode }) {
  const { scrollDirection, scrollY } = useScroll();

  return (
    <ScrollContext.Provider value={{ scrollDirection, scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollContext() {
  return useContext(ScrollContext);
}
