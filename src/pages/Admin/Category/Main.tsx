import { useState } from "react";
import { Plus } from "lucide-react";
import CategoryHeader from "./components/CategoryHeader";
import CategoryList from "./components/CategoryList";
import CategoryListSkeleton from "./components/CategoryListSkeleton";
import { NavigationButton } from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useCategoryContext } from "@/contexts/CategoryContext";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import useCategoryManagement from "@/hooks/useCategoryManagement";
import AdminLargeHeader from "@/layouts/AdminLargeHeader";
import AdminMain from "@/layouts/AdminMain";

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
        <div className="border border-brown-300 rounded-lg overflow-hidden">
          <CategoryHeader />
          <ul>
            {isLoading
              ? Array.from({ length: 3 }, (_, index) => (
                  <CategoryListSkeleton index={index} />
                ))
              : categories
                  .slice(1)
                  .map((category, index) => (
                    <CategoryList
                      key={index}
                      category={category}
                      index={index}
                      setDeleteCategory={setDeleteCategory}
                      handleDelete={handleDelete}
                    />
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
