import { useContext } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryContext } from "@/contexts/CategoryContext";
import { cn } from "@/lib/utils";

function CategoryTab({ className }: { className?: string }) {
  const { category, categories, handleSelectCategory } =
    useContext(CategoryContext);

  return (
    <Tabs
      value={category}
      onValueChange={handleSelectCategory}
      className={cn("overflow-x-hidden", className)}
    >
      <TabsList className="gap-2 h-full bg-brown-200">
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="h-12 px-5 text-brown-400 border-0 rounded-lg hover:bg-brown-300 hover:cursor-pointer data-[state=active]:text-brown-500 data-[state=active]:bg-brown-300"
          >
            <span className="text-body-1">{category}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default CategoryTab;
