import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, Image, Trash2 } from "lucide-react";
import CategoryCombobox from "../components/CategoryCombobox";
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
import { Textarea } from "@/components/ui/textarea";
import STATUSES from "@/constants/status";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import useArticleManagement from "@/hooks/useArticleManagement";
import AdminLargeHeader from "@/layouts/AdminLargeHeader";
import AdminMain from "@/layouts/AdminMain";
import { cn } from "@/lib/utils";

function Main({ mode }: { mode: "create" | "update" }) {
  const location = useLocation();
  const {
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
  } = useArticleManagement(mode);
  const { isSmall, isMedium, isLarge, isXLarge } = useMediaQueryContext();

  const fromSearch = location.state?.fromSearch ?? "";
  const backTo = `/admin/article${fromSearch}`;

  return (
    <AdminMain>
      <form onSubmit={handleSubmit}>
        <Input
          ref={pictureRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleImageFileChange}
          className="hidden"
        />
        <FieldSet
          disabled={isLoading || isGetPostLoading}
          className="gap-6 sm:gap-8 lg:gap-0"
        >
          {isLarge && (
            <AdminLargeHeader>
              <div className="flex gap-8 items-center">
                <Link to={backTo}>
                  <ChevronLeft className="size-8 text-brown-600 hover:text-brown-400 hover:cursor-pointer active:text-brown-500" />
                </Link>
                <h3 className="style-headline-3 text-brown-600">
                  {mode === "create" ? "Create article" : "Edit article"}
                </h3>
              </div>
              <div className="flex gap-2">
                <ActionButton
                  variant="secondary"
                  type="submit"
                  name="intent"
                  value="draft"
                >
                  Save as draft
                </ActionButton>
                <ActionButton
                  variant="primary"
                  type="submit"
                  name="intent"
                  value="publish"
                >
                  {mode === "create"
                    ? `${isXLarge ? "Save and p" : "P"}ublish`
                    : "Save"}
                </ActionButton>
              </div>
            </AdminLargeHeader>
          )}
          <FieldGroup className="gap-6 lg:gap-7 lg:px-10 lg:py-10 xl:px-15">
            <Field className="gap-2">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <span className="style-body-1 text-brown-400">
                    Thumbnail image
                  </span>
                  {post && (
                    <span
                      className={cn(
                        "style-body-1 text-brown-500 line-clamp-1",
                        STATUSES.find((status) => status.name === post.status)
                          ?.style
                      )}
                    >
                      {post.status}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:gap-7">
                  <div className="relative w-full md:w-109 xl:w-120 2xl:w-160">
                    {previewImageUrl || post?.image ? (
                      <img
                        src={(previewImageUrl || post?.image) ?? undefined}
                        alt="Thumbnail"
                        className="aspect-24/13 size-full text-brown-500 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex justify-center items-center aspect-24/13 size-full bg-brown-200 rounded-lg">
                        <Image className="size-10 text-brown-400" />
                      </div>
                    )}
                    <svg
                      className="pointer-events-none absolute inset-0 size-full"
                      aria-hidden="true"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        rx="8"
                        ry="8"
                        width="calc(100% - 1px)"
                        height="calc(100% - 1px)"
                        fill="none"
                        className={cn(
                          "stroke-brown-300 [stroke-dasharray:8_8]",
                          pictureError && "stroke-brand-red"
                        )}
                      />
                    </svg>
                  </div>
                  <ActionButton
                    variant="secondary"
                    onClick={() => pictureRef.current.click()}
                  >
                    {`Upload ${!isMedium || isXLarge ? "thumbnail" : ""} image`}
                  </ActionButton>
                </div>
              </div>
              <FieldError>{pictureError}</FieldError>
            </Field>
            <Field className="gap-1 lg:max-w-120">
              <FieldLabel
                htmlFor="image-alt"
                className="style-body-1 text-brown-400"
              >
                Image alternative text
              </FieldLabel>
              <Input
                id="image-alt"
                type="text"
                ref={inputRefs.imageAlt}
                placeholder="Alternative text"
                className={cn(
                  "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                  inputErrors.imageAlt && "border-brand-red"
                )}
              />
              <FieldError>{inputErrors.imageAlt}</FieldError>
            </Field>
            <Field className="gap-1 lg:max-w-120">
              <FieldLabel
                htmlFor="author-name"
                className="style-body-1 text-brown-400"
              >
                Author name
              </FieldLabel>
              <Input
                id="author-name"
                type="text"
                ref={inputRefs.name}
                placeholder="Full name"
                autoComplete="name"
                className="h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400"
                disabled
              />
            </Field>
            <Field className="gap-1 lg:max-w-120">
              <span className="style-body-1 text-brown-400 cursor-default">
                Category
              </span>
              <CategoryCombobox
                categoryIds={categoryIds}
                setCategoryIds={setCategoryIds}
                disabled={isLoading || isGetPostLoading}
                isError={Boolean(categoryError)}
              />
              <FieldError>{categoryError}</FieldError>
            </Field>
            <Field className="gap-1">
              <FieldLabel
                htmlFor="title"
                className="style-body-1 text-brown-400"
              >
                Title
              </FieldLabel>
              <Input
                id="title"
                type="text"
                ref={inputRefs.title}
                placeholder="Article title"
                className={cn(
                  "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                  inputErrors.title && "border-brand-red"
                )}
              />
              <FieldError>{inputErrors.title}</FieldError>
            </Field>
            <Field className="gap-1">
              <FieldLabel
                htmlFor="introduction"
                className="style-body-1 text-brown-400"
              >
                Introduction (max 400 letters)
              </FieldLabel>
              <Textarea
                id="introduction"
                ref={textareaRefs.introduction}
                placeholder="Introduction"
                className={cn(
                  "min-h-36 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                  textareaErrors.introduction && "border-brand-red"
                )}
              />
              <FieldError>{textareaErrors.introduction}</FieldError>
            </Field>
            <Field className="gap-1">
              <FieldLabel
                htmlFor="content"
                className="style-body-1 text-brown-400"
              >
                Content
              </FieldLabel>
              <Textarea
                id="content"
                ref={textareaRefs.content}
                placeholder="Content"
                className={cn(
                  "min-h-143 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                  textareaErrors.content && "border-brand-red"
                )}
              />
              <FieldError>{textareaErrors.content}</FieldError>
            </Field>
            {post && isLarge && (
              <ActionButton
                variant="text"
                onClick={() => {
                  handleDelete(post.id, true);
                }}
                className="self-start"
              >
                <Trash2 />
                Delete article
              </ActionButton>
            )}
          </FieldGroup>
          {!isLarge && (
            <div
              className={cn(
                "flex flex-col items-end gap-12 sm:flex-row-reverse sm:justify-between sm:items-center"
              )}
            >
              <div className="flex gap-2">
                <ActionButton
                  variant="secondary"
                  type="submit"
                  name="intent"
                  value="draft"
                >
                  Save as draft
                </ActionButton>
                <ActionButton
                  variant="primary"
                  type="submit"
                  name="intent"
                  value="publish"
                >
                  {mode === "create"
                    ? `${!isSmall || isMedium ? "Save and p" : "P"}ublish`
                    : "Save"}
                </ActionButton>
              </div>
              {post && (
                <ActionButton
                  variant="text"
                  onClick={() => {
                    handleDelete(post.id, true);
                  }}
                >
                  <Trash2 />
                  Delete article
                </ActionButton>
              )}
            </div>
          )}
        </FieldSet>
      </form>
      <ConfirmDialog
        title={`${mode === "create" ? "Create" : "Edit"} article`}
        content={`Do you want to ${
          mode === "create" ? "create" : "edit"
        } this article ${
          intent.current === "publish" ? "before publishing" : "as draft"
        }?`}
        confirmText={mode === "create" ? "Create" : "Save"}
        open={isConfirmDialogOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
      <ConfirmDialog
        title="Delete article"
        content="Do you want to delete this article?"
        confirmText="Delete"
        open={isDeleteConfirmDialogOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </AdminMain>
  );
}

export default Main;
