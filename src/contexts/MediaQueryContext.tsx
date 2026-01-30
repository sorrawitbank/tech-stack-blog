import { createContext } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

export const MediaQueryContext = createContext({
  isSmall: false,
  isMedium: false,
  isLarge: false,
  isXLarge: false,
  is2XLarge: false,
});

export function MediaQueryProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { isSmall, isMedium, isLarge, isXLarge, is2XLarge } = useMediaQuery();

  return (
    <MediaQueryContext.Provider
      value={{ isSmall, isMedium, isLarge, isXLarge, is2XLarge }}
    >
      {children}
    </MediaQueryContext.Provider>
  );
}
