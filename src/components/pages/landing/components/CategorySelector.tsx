import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  categories: string[];
}

function CategorySelector(props: Props) {
  return (
    <Select defaultValue={props.categories[0]}>
      <SelectTrigger className="w-full h-12! text-body-1 bg-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-brown-600">Category</SelectLabel>
          {props.categories.map((category) => (
            <SelectItem value={category} className="text-brown-400">
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CategorySelector;
