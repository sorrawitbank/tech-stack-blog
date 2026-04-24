import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoryContext } from "@/contexts/CategoryContext";

function CategorySelector() {
  const { category, categories, handleSelectCategory } = useCategoryContext();

  return (
    <Select value={category} onValueChange={handleSelectCategory}>
      <SelectTrigger className="w-full h-12! text-brown-400 style-body-1 bg-white md:w-40 xl:w-60 hover:cursor-pointer">
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          <SelectLabel className="text-brown-600">Category</SelectLabel>
          <SelectSeparator className="bg-brown-300" />
          {categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.name}
              className="text-brown-400 hover:text-brown-500! hover:cursor-pointer"
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CategorySelector;
