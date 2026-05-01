import type { Category } from "@/types/category";
import React from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { useCategoryContext } from "@/contexts/CategoryContext";
import { cn } from "@/lib/utils";

interface Props {
  categoryIds: number[];
  setCategoryIds: React.Dispatch<React.SetStateAction<number[]>>;
  disabled: boolean;
  isError: boolean;
}

function CategoryCombobox(props: Props) {
  const anchor = useComboboxAnchor();
  const { categories } = useCategoryContext();

  return (
    <Combobox
      items={categories.slice(1)}
      value={props.categoryIds}
      onValueChange={props.setCategoryIds}
      disabled={props.disabled}
      multiple
    >
      <ComboboxChips
        id="category"
        ref={anchor}
        className={cn(
          "h-12 bg-white",
          props.disabled && "cursor-not-allowed opacity-50",
          props.isError && "border-brand-red"
        )}
      >
        <ComboboxValue>
          {(values: number[]) =>
            values.length ? (
              <React.Fragment>
                {values.map((value) => (
                  <ComboboxChip
                    key={value}
                    className="style-body-1 text-brown-500 bg-brown-100 has-disabled:opacity-100"
                  >
                    {categories.find((category) => category.id === value)!.name}
                  </ComboboxChip>
                ))}
              </React.Fragment>
            ) : (
              <span className="style-body-1 text-brown-400">
                Select category
              </span>
            )
          }
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxInput
          showTrigger={false}
          placeholder="Search"
          className="text-brown-500 bg-brown-100!"
        />
        <ComboboxEmpty>No category found.</ComboboxEmpty>
        <ComboboxList>
          {(item: Category) => (
            <ComboboxItem
              key={item.id}
              value={item.id}
              className="style-body-1 text-brown-400 hover:text-brown-500! hover:bg-brown-200! hover:cursor-pointer"
              disabled={
                props.categoryIds.length >= 3 &&
                !props.categoryIds.includes(item.id)
              }
            >
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export default CategoryCombobox;
