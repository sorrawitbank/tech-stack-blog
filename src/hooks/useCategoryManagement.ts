import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useConfirmDialog from "./useConfirmDialog";
import useValidateForm, { type InputRefs } from "./useValidateForm";
import { useCategoryContext } from "@/contexts/CategoryContext";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/adminService";
import sonner from "@/utils/sonner";

function useCategoryManagement() {
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

  const handleSubmitCreate = async () => {
    setError(null);
    if (!validateInputFields(refs)) return;

    const isConfirmed = await requestConfirm();
    if (!isConfirmed) return;

    setIsLoading(true);
    try {
      await createCategory({ name: refs.category.current.value });
      sonner.success({
        message: "Created category successfully",
        description: `"${refs.category.current.value}" category has been created.`,
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

  const handleSubmitUpdate = async (categoryId: number) => {
    setError(null);
    if (!validateInputFields(refs)) return;

    const isConfirmed = await requestConfirm();
    if (!isConfirmed) return;

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
          setError(
            error.response?.data?.message || "Failed to update category"
          );
        } else {
          setError(error.message || "Failed to update category");
        }
      }
    } finally {
      setIsLoading(false);
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
          categories.find((category) => category.id === categoryId)?.name ??
          "Unknown"
        }" category has been deleted.`,
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
    isLoading,
    isConfirmDialogOpen,
    inputErrors,
    handleSubmitCreate,
    handleSubmitUpdate,
    handleDelete,
    handleConfirm,
    handleCancel,
  };
}

export default useCategoryManagement;
