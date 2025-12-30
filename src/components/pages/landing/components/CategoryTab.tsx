import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  categories: string[];
}

function CategoryTab(props: Props) {
  return (
    <Tabs defaultValue={props.categories[0]}>
      <TabsList className="gap-2">
        {props.categories.map((category) => (
          <TabsTrigger
            value={category}
            className="h-12 px-5 text-brown-400 rounded-[8px] data-[state=active]:text-brown-500 data-[state=active]:bg-brown-300"
          >
            <p className="text-body-1">{category}</p>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default CategoryTab;

// text-brown-400 data-[state=active]:text-brown-500
