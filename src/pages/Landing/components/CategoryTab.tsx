import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  categories: string[];
  value: string;
  onValueChange: (value: string) => void;
}

function CategoryTab(props: Props) {
  return (
    <Tabs value={props.value} onValueChange={props.onValueChange}>
      <TabsList className="gap-2 h-12 py-0 bg-brown-200">
        {props.categories.map((category) => (
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
