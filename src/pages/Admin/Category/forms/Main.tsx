import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { ActionButton } from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCategoryContext } from "@/contexts/CategoryContext";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import useCategoryManagement from "@/hooks/useCategoryManagement";
import AdminLargeHeader from "@/layouts/AdminLargeHeader";
import AdminMain from "@/layouts/AdminMain";
import { cn } from "@/lib/utils";

function Main({ mode }: { mode: "create" | "update" }) {
  const {
    refs,
    categoryId,
    isLoading,
    isConfirmDialogOpen,
    inputErrors,
    handleSubmit,
    handleConfirm,
    handleCancel,
  } = useCategoryManagement(mode);
  const { categories } = useCategoryContext();
  const { isLarge } = useMediaQueryContext();

  return (
    <AdminMain>
      <form onSubmit={handleSubmit}>
        <FieldSet disabled={isLoading} className="gap-6 sm:gap-8 lg:gap-0">
          {isLarge && (
            <AdminLargeHeader>
              <div className="flex gap-8 items-center">
                <Link to="/admin/category">
                  <ChevronLeft className="size-8 text-brown-600 hover:text-brown-400 hover:cursor-pointer active:text-brown-500" />
                </Link>
                <h3 className="style-headline-3 text-brown-600">
                  {mode === "create" ? "Create category" : "Edit category"}
                </h3>
              </div>
              <ActionButton variant="primary" type="submit">
                {mode === "create" ? "Create" : "Save"}
              </ActionButton>
            </AdminLargeHeader>
          )}
          <FieldGroup className="lg:px-10 lg:py-10 xl:px-15">
            <Field className="gap-1 lg:max-w-120">
              <FieldLabel
                htmlFor="category-name"
                className="style-body-1 text-brown-400"
              >
                Category name
              </FieldLabel>
              <Input
                id="category-name"
                type="text"
                ref={refs.category}
                placeholder="Category name"
                className={cn(
                  "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                  inputErrors.category && "border-brand-red"
                )}
              />
              <FieldError>{inputErrors.category}</FieldError>
            </Field>
          </FieldGroup>
          {!isLarge && (
            <ActionButton variant="primary" type="submit" className="self-end">
              {mode === "create" ? "Create" : "Save"}
            </ActionButton>
          )}
        </FieldSet>
      </form>
      <ConfirmDialog
        title={`${mode === "create" ? "Create" : "Edit"} category`}
        content={`Do you want to ${
          mode === "create"
            ? `create "${refs.category.current.value}" category`
            : `edit from "${
                categories.find((category) => category.id === categoryId)?.name
              }" to "${refs.category.current.value.trim()}" category`
        }?`}
        confirmText={mode === "create" ? "Create" : "Save"}
        open={isConfirmDialogOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </AdminMain>
  );
}

export default Main;
