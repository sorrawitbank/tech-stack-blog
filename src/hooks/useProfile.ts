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
import { updateAdminProfile } from "@/services/admin";
import { updateProfile } from "@/services/user";
import sonner from "@/utils/sonner";

function useProfile(role: Role) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user, getUser, getAdmin } = useAuthContext();
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

  const inputRefs: Pick<InputRefs, "name" | "username" | "email"> = {
    name: useRef<HTMLInputElement>(document.createElement("input")),
    username: useRef<HTMLInputElement>(document.createElement("input")),
    email: useRef<HTMLInputElement>(document.createElement("input")),
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

  useEffect(() => {
    inputRefs.name.current.value = user!.name;
    inputRefs.username.current.value = user!.username;
    inputRefs.email.current.value = user!.email;
    if (role === "admin") {
      textareaRefs.bio.current.value = user!.bio;
    }
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setError(null);
    setPictureError(null);

    const isValidInputFields = validateInputFields(inputRefs);
    const isValidTextAreaFields =
      role === "admin" ? validateTextAreaFields(textareaRefs) : true;
    if (!(isValidInputFields && isValidTextAreaFields)) return;

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
