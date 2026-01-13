import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  categories: string[];
  value?: string;
  onValueChange?: (value: string) => void;
}

function CategoryTab({ categories, value, onValueChange }: Props) {
  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList className="gap-2 bg-brown-200">
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="h-12 px-5 text-brown-400 rounded-lg hover:bg-brown-300 hover:cursor-pointer data-[state=active]:text-brown-500 data-[state=active]:bg-brown-300"
          >
            <span className="text-body-1">{category}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default CategoryTab;
