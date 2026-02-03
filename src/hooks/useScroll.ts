import { useState, useEffect } from "react";

export type Direction = "up" | "down";

function useScroll() {
  const [scrollDirection, setScrollDirection] = useState<Direction>("up");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    setScrollY(lastScrollY);

    const updateScrollDirection = () => {
      const currentScrollY = window.pageYOffset;
      const direction = currentScrollY > lastScrollY ? "down" : "up";
      setScrollY(currentScrollY);
      if (
        direction !== scrollDirection &&
        (currentScrollY - lastScrollY > 10 ||
          currentScrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  return { scrollDirection, scrollY };
}

export default useScroll;
