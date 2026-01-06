import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  categories: string[];
}

function CategoryTab(props: Props) {
  return (
    <Tabs defaultValue={props.categories[0]}>
      <TabsList className="gap-2 bg-brown-200">
        {props.categories.map((category) => (
          <TabsTrigger
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
