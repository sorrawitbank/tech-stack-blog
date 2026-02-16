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
    <div className="flex flex-col gap-1 text-brown-400">
      <span className="text-body-1">Category</span>
      <Select value={category} onValueChange={handleSelectCategory}>
        <SelectTrigger className="w-full h-12! text-body-1 bg-white hover:cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            <SelectLabel className="text-brown-600">Category</SelectLabel>
            <SelectSeparator className="bg-brown-300" />
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
    </div>
  );
}

export default CategorySelector;
