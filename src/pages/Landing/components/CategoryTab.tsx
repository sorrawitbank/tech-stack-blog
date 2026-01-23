import { useContext } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryContext } from "@/contexts/CategoryContext";

function CategoryTab() {
  const { category, categories, handleSelectCategory } =
    useContext(CategoryContext);

  return (
    <Tabs value={category} onValueChange={handleSelectCategory}>
      <TabsList className="gap-2 h-12 py-0 bg-brown-200">
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="h-full px-5 text-brown-400 border-0 rounded-lg hover:bg-brown-300 hover:cursor-pointer data-[state=active]:text-brown-500 data-[state=active]:bg-brown-300"
          >
            <span className="text-body-1">{category}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default CategoryTab;
