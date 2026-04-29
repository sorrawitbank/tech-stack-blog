import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import useConfirmDialog from "./useConfirmDialog";
import useValidateForm, { type InputRefs } from "./useValidateForm";
import { useCategoryContext } from "@/contexts/CategoryContext";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/admin";
import sonner from "@/utils/sonner";

function useCategoryManagement(mode: "create" | "update" | "delete") {
  const params = useParams();
  const categoryId = Number(params.categoryId);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { inputErrors, validateInputFields } = useValidateForm();
  const { categories, getCategories } = useCategoryContext();
  const { isConfirmDialogOpen, requestConfirm, handleConfirm, handleCancel } =
    useConfirmDialog();

  const refs: Pick<InputRefs, "category"> = {
    category: useRef<HTMLInputElement>(document.createElement("input")),
  };

  useEffect(() => {
    if (!error) return;
    sonner.error({ message: "Error!", description: error });
  }, [error]);

  useEffect(() => {
    if (mode !== "update") return;
    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      sonner.error({
        message: "Invalid category ID",
        description: "Please enter a valid category ID",
      });
      navigate("/admin/category", { replace: true });
      return;
    }
    const category = categories.find(
      (category) => category.id === categoryId
    )?.name;
    if (!category) {
      sonner.error({
        message: "Category not found",
        description: "Please select a valid category",
      });
      navigate("/admin/category", { replace: true });
      return;
    }

    refs.category.current.value = category;
  }, []);

  const handleSubmitCreate = async () => {
    setIsLoading(true);
    try {
      await createCategory({ name: refs.category.current.value });
      sonner.success({
        message: "Created category successfully",
        description: `"${refs.category.current.value}" category has been created successfully`,
      });
      getCategories();
      navigate("/admin/category");
    } catch (error) {
      // Get error message from response data if available
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          setError(
            error.response?.data?.message || "Failed to create category"
          );
        } else {
          setError(error.message || "Failed to create category");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitUpdate = async () => {
    setIsLoading(true);
    try {
      await updateCategory(categoryId, { name: refs.category.current.value });
      sonner.success({
        message: "Saved category successfully",
        description: "Category has been updated successfully",
      });
      getCategories();
      navigate("/admin/category");
    } catch (error) {
      // Get error message from response data if available
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || "Failed to edit category");
        } else {
          setError(error.message || "Failed to edit category");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setError(null);

    if (!validateInputFields(refs)) return;

    const isConfirmed = await requestConfirm();
    if (!isConfirmed) return;

    if (mode === "create") {
      await handleSubmitCreate();
    } else if (mode === "update") {
      if (
        categories.find((category) => category.id === categoryId)?.name ===
        refs.category.current.value.trim()
      ) {
        sonner.error({
          message: "Category name is the same",
          description: "Please edit the category name",
        });
        return;
      }

      await handleSubmitUpdate();
    }
  };

  const handleDelete = async (categoryId: number) => {
    setError(null);

    const isConfirmed = await requestConfirm();
    if (!isConfirmed) return;

    setIsLoading(true);
    try {
      await deleteCategory(categoryId);
      sonner.success({
        message: "Deleted category successfully",
        description: `"${
          categories.find((category) => category.id === categoryId)?.name
        }" category has been deleted successfully`,
      });
      getCategories();
    } catch (error) {
      // Get error message from response data if available
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          setError(
            error.response?.data?.message || "Failed to delete category"
          );
        } else {
          setError(error.message || "Failed to delete category");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    refs,
    categoryId,
    isLoading,
    isConfirmDialogOpen,
    inputErrors,
    handleSubmit,
    handleDelete,
    handleConfirm,
    handleCancel,
  };
}

export default useCategoryManagement;
