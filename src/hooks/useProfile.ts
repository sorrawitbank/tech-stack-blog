import type { Role } from "@/types/user";
import React, { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import useConfirmDialog from "./useConfirmDialog";
import useUploadImage from "./useUploadImage";
import useValidateForm, {
  type InputRefs,
  type TextAreaRefs,
} from "./useValidateForm";
import { useAuthContext } from "@/contexts/AuthContext";
import { updateAdminProfile } from "@/services/adminService";
import { updateProfile } from "@/services/userService";
import sonner from "@/utils/sonner";

function useProfile(role: Role) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { getUser, getAdmin } = useAuthContext();
  const {
    inputErrors,
    textareaErrors,
    validateInputFields,
    validateTextAreaFields,
  } = useValidateForm();
  const {
    pictureRef,
    pictureError,
    selectedImageFile,
    previewImageUrl,
    setPictureError,
    handleImageFileChange,
  } = useUploadImage();
  const { isConfirmDialogOpen, requestConfirm, handleConfirm, handleCancel } =
    useConfirmDialog();

  const inputRefs: Pick<InputRefs, "name" | "username"> = {
    name: useRef<HTMLInputElement>(document.createElement("input")),
    username: useRef<HTMLInputElement>(document.createElement("input")),
  };

  const textareaRefs: Pick<TextAreaRefs, "bio"> = {
    bio: useRef<HTMLTextAreaElement>(document.createElement("textarea")),
  };

  useEffect(() => {
    if (!error) return;
    sonner.error({
      message: "Update profile failed",
      description: error,
    });
  }, [error]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setError(null);
    setPictureError(null);

    const isValid =
      validateInputFields(inputRefs) && validateTextAreaFields(textareaRefs);
    if (!isValid) return;

    const isConfirmed = await requestConfirm();
    if (!isConfirmed) return;

    setIsLoading(true);

    const body = {
      name: inputRefs.name.current.value,
      username: inputRefs.username.current.value,
      bio: role === "admin" ? textareaRefs.bio.current.value : undefined,
    };

    const formData = new FormData();
    formData.append("body", JSON.stringify(body));
    if (selectedImageFile) {
      formData.append("image", selectedImageFile);
    }

    try {
      if (role === "admin") {
        await updateAdminProfile(formData);
        await getUser();
        await getAdmin();
      } else {
        await updateProfile(formData);
        await getUser();
      }
      sonner.success({
        message: "Saved profile successfully",
        description: "Profile has been updated successfully",
      });
    } catch (error) {
      // Get error message from response data if available
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || "Please try again");
        } else {
          setError(error.message || "Please try again");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    inputRefs,
    textareaRefs,
    pictureRef,
    isLoading,
    isConfirmDialogOpen,
    inputErrors,
    textareaErrors,
    pictureError,
    previewImageUrl,
    handleImageFileChange,
    handleConfirm,
    handleCancel,
    handleSubmit,
  };
}

export default useProfile;
