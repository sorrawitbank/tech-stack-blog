import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCategoryContext } from "@/contexts/CategoryContext";

function CategoryTab() {
  const { category, categories, isLoading, handleSelectCategory } =
    useCategoryContext();

  return (
    <Tabs
      value={category}
      onValueChange={handleSelectCategory}
      className="overflow-x-hidden"
    >
      <ScrollArea>
        {isLoading ? (
          <div className="flex gap-2 h-12 m-0.75">
            <Skeleton className="h-12 w-28" />
            <Skeleton className="h-12 w-28" />
            <Skeleton className="h-12 w-28" />
            <Skeleton className="h-12 w-28" />
          </div>
        ) : (
          <TabsList className="gap-2 h-full bg-brown-200">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.name}
                className="h-12 px-5 text-brown-400 border-0 rounded-lg hover:bg-brown-300 hover:cursor-pointer data-[state=active]:text-brown-500 data-[state=active]:bg-brown-300"
              >
                <span className="style-body-1">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Tabs>
  );
}

export default CategoryTab;
