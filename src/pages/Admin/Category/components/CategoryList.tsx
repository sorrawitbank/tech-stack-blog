import type { Category } from "@/types/category";
import React from "react";
import { Link } from "react-router-dom";
import { Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  category: Category;
  index: number;
  setDeleteCategory: React.Dispatch<React.SetStateAction<string>>;
  handleDelete: (categoryId: number) => Promise<void>;
}

function CategoryList(props: Props) {
  return (
    <li
      className={cn(
        "flex justify-between items-center px-4 py-5 sm:px-6",
        props.index % 2 === 1 && "bg-brown-200"
      )}
    >
      <span className="style-body-1 text-brown-500">{props.category.name}</span>
      <div className="flex gap-5">
        <Link
          to={`/admin/category/edit/${props.category.id}`}
          className="text-brown-400 transition-colors duration-200 hover:text-brown-500 active:text-brown-600"
        >
          <Edit2 />
        </Link>
        <button
          onClick={() => {
            props.setDeleteCategory(props.category.name);
            props.handleDelete(props.category.id);
          }}
          className="text-brown-400 transition-colors duration-200 cursor-pointer hover:text-brown-500 active:text-brown-600"
        >
          <Trash2 />
        </button>
      </div>
    </li>
  );
}

export default CategoryList;
