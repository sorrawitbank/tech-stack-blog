import { useCallback, useState } from "react";

function useCategory() {
  const [category, setCategory] = useState<string>("Highlight");

  const handleSelectCategory = useCallback((category: string) => {
    setCategory(category);
  }, []);

  return { category, handleSelectCategory };
}

export default useCategory;
