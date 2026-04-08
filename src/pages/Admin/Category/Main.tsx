import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { NavigationButton } from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategoryContext } from "@/contexts/CategoryContext";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import useCategoryManagement from "@/hooks/useCategoryManagement";
import AdminLargeHeader from "@/layouts/AdminLargeHeader";
import AdminMain from "@/layouts/AdminMain";
import { cn } from "@/lib/utils";

function Main() {
  const [deleteCategory, setDeleteCategory] = useState<string>("");
  const { isConfirmDialogOpen, handleDelete, handleConfirm, handleCancel } =
    useCategoryManagement();
  const { categories, isLoading } = useCategoryContext();
  const { isLarge } = useMediaQueryContext();

  return (
    <AdminMain>
      {isLarge && (
        <AdminLargeHeader>
          <h3 className="style-headline-3 text-brown-600">
            Category management
          </h3>
          <NavigationButton
            variant="primary"
            navigateTo="/admin/category/create"
          >
            <Plus />
            Create category
          </NavigationButton>
        </AdminLargeHeader>
      )}
      <div className="flex flex-col gap-6 sm:gap-8 lg:px-10 lg:py-10 xl:px-15">
        <div className="border border-brown-300 rounded-lg overflow-hidden ">
          <div className="px-4 py-3 bg-brown-100 shadow-[0px_2px_12px_0px_rgb(0_0_0_/0.1)] sm:px-6">
            <span className="style-body-1 text-brown-400">Category</span>
          </div>
          <ul>
            {isLoading
              ? Array.from({ length: 3 }, (_, index) => (
                  <li
                    key={`skeleton-${index}`}
                    className={cn(
                      "flex justify-between px-4 py-5 sm:px-6",
                      index % 2 === 1 && "bg-brown-200"
                    )}
                  >
                    <Skeleton className="w-25 h-6" />
                    <div className="flex gap-5">
                      <Skeleton className="size-6" />
                      <Skeleton className="size-6" />
                    </div>
                  </li>
                ))
              : categories.slice(1).map((category, index) => (
                  <li
                    key={category.id}
                    className={cn(
                      "flex justify-between px-4 py-5 sm:px-6",
                      index % 2 === 1 && "bg-brown-200"
                    )}
                  >
                    <span className="style-body-1 text-brown-500">
                      {category.name}
                    </span>
                    <div className="flex gap-5">
                      <Link
                        to={`/admin/category/edit/${category.id}`}
                        className="text-brown-400 hover:text-brown-500 active:text-brown-600"
                      >
                        <Edit2 />
                      </Link>
                      <button
                        onClick={() => {
                          setDeleteCategory(category.name);
                          handleDelete(category.id);
                        }}
                        className="text-brown-400 cursor-pointer hover:text-brown-500 active:text-brown-600"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
        {!isLarge && (
          <NavigationButton
            variant="primary"
            navigateTo="/admin/category/create"
            className="w-fit"
          >
            <Plus />
            Create category
          </NavigationButton>
        )}
      </div>
      <ConfirmDialog
        title="Delete category"
        content={`Do you want to delete "${deleteCategory}" category?`}
        confirmText="Delete"
        open={isConfirmDialogOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </AdminMain>
  );
}

export default Main;
