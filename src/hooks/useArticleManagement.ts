import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import useConfirmDialog from "./useConfirmDialog";
import useGetPostById from "./useGetPostById";
import useUploadImage from "./useUploadImage";
import useValidateForm, {
  type InputRefs,
  type TextAreaRefs,
} from "./useValidateForm";
import STATUSES from "@/constants/status";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCategoryContext } from "@/contexts/CategoryContext";
import { createPost, deletePost, updatePost } from "@/services/admin";
import sonner from "@/utils/sonner";

function useArticleManagement(mode: "create" | "update" | "delete") {
  const params = useParams();
  const postId = Number(params.postId);

  const navigate = useNavigate();
  const intent = useRef<string | undefined>(undefined);
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const { user } = useAuthContext();
  const { categories } = useCategoryContext();
  const {
    post,
    isLoading: isGetPostLoading,
    error: getPostError,
  } = mode === "update"
    ? useGetPostById(postId, "admin")
    : { post: null, isLoading: false, error: null };
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
  const {
    isConfirmDialogOpen: isDeleteConfirmDialogOpen,
    requestConfirm: requestDeleteConfirm,
    handleConfirm: handleDeleteConfirm,
    handleCancel: handleDeleteCancel,
  } = useConfirmDialog();

  useEffect(() => {
    if (!post) return;
    setCategoryIds(
      categories
        .filter((category) => post.categories.includes(category.name))
        .map((category) => category.id)
    );

    inputRefs.imageAlt.current.value = post.imageAlt ?? "";
    inputRefs.name.current.value = post.author.name;
    inputRefs.title.current.value = post.title;
    textareaRefs.introduction.current.value = post.description;
    textareaRefs.content.current.value = post.content;
  }, [post]);

  useEffect(() => {
    if (!error) return;
    sonner.error({ message: "Error!", description: error });
  }, [error]);

  useEffect(() => {
    if (!getPostError) return;
    sonner.error({
      message: "Get post failed",
      description: getPostError,
    });
    navigate("/admin/article", { replace: true });
  }, [getPostError]);

  useEffect(() => {
    if (mode === "create") {
      inputRefs.name.current.value = user!.name;
    }
  }, []);

  const inputRefs: Pick<InputRefs, "name" | "imageAlt" | "title"> = {
    imageAlt: useRef<HTMLInputElement>(document.createElement("input")),
    name: useRef<HTMLInputElement>(document.createElement("input")),
    title: useRef<HTMLInputElement>(document.createElement("input")),
  };

  const textareaRefs: Pick<TextAreaRefs, "introduction" | "content"> = {
    introduction: useRef<HTMLTextAreaElement>(
      document.createElement("textarea")
    ),
    content: useRef<HTMLTextAreaElement>(document.createElement("textarea")),
  };

  const handleSubmitCreate = async (isPublish: boolean) => {
    setIsLoading(true);

    const body = {
      imageAlt: inputRefs.imageAlt.current.value,
      categoryIds,
      title: inputRefs.title.current.value,
      description: textareaRefs.introduction.current.value,
      content: textareaRefs.content.current.value,
      statusId: STATUSES[isPublish ? 2 : 1].id,
    };

    const formData = new FormData();
    formData.append("body", JSON.stringify(body));
    if (selectedImageFile) {
      formData.append("image", selectedImageFile);
    }

    try {
      await createPost(formData);
      sonner.success({
        message: "Created article successfully",
        description: "Article has been created successfully",
      });
      navigate("/admin/article");
    } catch (error) {
      // Get error message from response data if available
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || "Failed to create article");
        } else {
          setError(error.message || "Failed to create article");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitUpdate = async (isPublish: boolean) => {
    setIsLoading(true);

    const body = {
      imageAlt: inputRefs.imageAlt.current.value,
      categoryIds,
      title: inputRefs.title.current.value,
      description: textareaRefs.introduction.current.value,
      content: textareaRefs.content.current.value,
      statusId: STATUSES[isPublish ? 2 : 1].id,
    };

    const formData = new FormData();
    formData.append("body", JSON.stringify(body));
    if (selectedImageFile) {
      formData.append("image", selectedImageFile);
    }

    try {
      await updatePost(postId, formData);
      sonner.success({
        message: "Saved article successfully",
        description: "Article has been updated successfully",
      });
      navigate("/admin/article");
    } catch (error) {
      // Get error message from response data if available
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || "Failed to edit article");
        } else {
          setError(error.message || "Failed to edit article");
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
    setPictureError(null);
    setCategoryError(null);

    const isValidImage = Boolean(post?.image) || selectedImageFile !== null;
    const isValidCategory = categoryIds.length > 0;
    const isValidInputFields = validateInputFields(inputRefs);
    const isValidTextAreaFields = validateTextAreaFields(textareaRefs);

    if (!isValidImage) {
      setPictureError("Thumbnail image is required");
    }

    if (!isValidCategory) {
      setCategoryError("Category is required");
    }

    if (
      !(
        isValidImage &&
        isValidCategory &&
        isValidInputFields &&
        isValidTextAreaFields
      )
    )
      return;

    const submitter = (
      event.nativeEvent as Event & { submitter?: HTMLElement | null }
    ).submitter;
    intent.current =
      submitter instanceof HTMLButtonElement ? submitter.value : undefined; // "draft" | "publish"
    const isPublish = intent.current === "publish";

    const isConfirmed = await requestConfirm();
    if (!isConfirmed) return;

    if (mode === "create") {
      await handleSubmitCreate(isPublish);
    } else if (mode === "update") {
      await handleSubmitUpdate(isPublish);
    }
  };

  const handleDelete = async (postId: number) => {
    setError(null);

    const isConfirmed = await requestDeleteConfirm();
    if (!isConfirmed) return;

    setIsLoading(true);
    try {
      await deletePost(postId);
      sonner.success({
        message: "Deleted article successfully",
        description: "Article has been deleted successfully",
      });
      navigate("/admin/article");
    } catch (error) {
      // Get error message from response data if available
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || "Failed to delete article");
        } else {
          setError(error.message || "Failed to delete article");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    intent,
    inputRefs,
    textareaRefs,
    pictureRef,
    post,
    categoryIds,
    isLoading,
    isGetPostLoading,
    isConfirmDialogOpen,
    isDeleteConfirmDialogOpen,
    setCategoryIds,
    inputErrors,
    textareaErrors,
    pictureError,
    categoryError,
    previewImageUrl,
    handleImageFileChange,
    handleSubmit,
    handleDelete,
    handleConfirm,
    handleDeleteConfirm,
    handleCancel,
    handleDeleteCancel,
  };
}

export default useArticleManagement;
