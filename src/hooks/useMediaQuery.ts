import { useEffect, useState } from "react";

function useMediaQuery() {
  const [isSmall, setIsSmall] = useState(false);
  const [isMedium, setIsMedium] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  const [isXLarge, setIsXLarge] = useState(false);
  const [is2XLarge, setIs2XLarge] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 40rem)");
    
    const handleChange = (event: MediaQueryListEvent) => {
      setIsSmall(event.matches);
    };

    setIsSmall(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 48rem)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMedium(event.matches);
    };

    setIsMedium(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 64rem)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIsLarge(event.matches);
    };

    setIsLarge(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 80rem)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIsXLarge(event.matches);
    };

    setIsXLarge(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 96rem)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIs2XLarge(event.matches);
    };

    setIs2XLarge(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return { isSmall, isMedium, isLarge, isXLarge, is2XLarge };
}

export default useMediaQuery;
