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

function CategorySelector({ categories }: Props) {
  return (
    <Select defaultValue={categories[0]}>
      <SelectTrigger className="w-full h-12! text-body-1 bg-white hover:cursor-pointer">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-brown-600">Category</SelectLabel>
          {categories.map((category) => (
            <SelectItem
              key={category}
              value={category}
              className="text-brown-400 hover:text-brown-500! hover:cursor-pointer"
            >
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CategorySelector;
