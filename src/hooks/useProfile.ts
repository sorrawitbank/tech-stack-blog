import type { Role } from "@/types/user";
import React, { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import useUploadImage from "./useUploadImage";
import useValidateForm, { type Refs } from "./useValidateForm";
import { updateProfile } from "@/services/userService";
import sonner from "@/utils/sonner";

function useProfile(role: Role) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { errors, validateFields } = useValidateForm();
  const {
    pictureRef,
    pictureError,
    selectedImageFile,
    previewImageUrl,
    setPictureError,
    handleImageFileChange,
  } = useUploadImage();

  const refs: Pick<Refs, "name" | "username"> = {
    name: useRef<HTMLInputElement>(document.createElement("input")),
    username: useRef<HTMLInputElement>(document.createElement("input")),
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
    if (!validateFields(refs)) return;

    setIsLoading(true);

    const body = {
      name: refs.name.current.value,
      username: refs.username.current.value,
    };

    const formData = new FormData();
    formData.append("body", JSON.stringify(body));
    if (selectedImageFile) {
      formData.append("image", selectedImageFile);
    }

    try {
      await updateProfile(formData);
      sonner.success({
        message: "Update profile success",
        description: "Please refresh the page to see the changes.",
      });
    } catch (error) {
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
    refs,
    pictureRef,
    isLoading,
    errors,
    pictureError,
    previewImageUrl,
    handleImageFileChange,
    handleSubmit,
  };
}

export default useProfile;
