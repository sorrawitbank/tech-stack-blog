import { User } from "lucide-react";
import { ActionButton } from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/contexts/AuthContext";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import useProfile from "@/hooks/useProfile";
import AdminLargeHeader from "@/layouts/AdminLargeHeader";
import AdminMain from "@/layouts/AdminMain";
import { cn } from "@/lib/utils";

function Main() {
  const { user } = useAuthContext();
  const {
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
  } = useProfile("admin");
  const { isLarge } = useMediaQueryContext();

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
        <FieldSet disabled={isLoading} className="gap-6 sm:gap-8 lg:gap-0">
          {isLarge && (
            <AdminLargeHeader>
              <h3 className="style-headline-3 text-brown-600">Profile</h3>
              <ActionButton variant="primary" type="submit">
                Save
              </ActionButton>
            </AdminLargeHeader>
          )}
          <div className="flex flex-col gap-8 lg:gap-10 lg:px-15 lg:py-10">
            <Field className="gap-2">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-7">
                <Avatar className="size-30">
                  <AvatarImage
                    src={previewImageUrl || user!.profilePic}
                    alt={user!.name}
                    className="text-brown-500 object-cover"
                  />
                  <AvatarFallback className="bg-brown-400">
                    <User className="size-2/5 text-white" />
                  </AvatarFallback>
                </Avatar>
                <ActionButton
                  variant="secondary"
                  onClick={() => pictureRef.current.click()}
                >
                  Upload profile picture
                </ActionButton>
              </div>
              <FieldError>{pictureError}</FieldError>
            </Field>
            <Separator className="bg-brown-300" />
            <FieldGroup className="gap-6 lg:gap-7">
              <Field className="gap-1 lg:max-w-120">
                <FieldLabel
                  htmlFor="name"
                  className="style-body-1 text-brown-400"
                >
                  Name
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  ref={inputRefs.name}
                  placeholder="Full name"
                  autoComplete="name"
                  className={cn(
                    "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                    inputErrors.name && "border-brand-red"
                  )}
                />
                <FieldError>{inputErrors.name}</FieldError>
              </Field>
              <Field className="gap-1 lg:max-w-120">
                <FieldLabel
                  htmlFor="username"
                  className="style-body-1 text-brown-400"
                >
                  Username
                </FieldLabel>
                <Input
                  id="username"
                  type="text"
                  ref={inputRefs.username}
                  placeholder="Username"
                  autoComplete="username"
                  className={cn(
                    "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                    inputErrors.username && "border-brand-red"
                  )}
                />
                <FieldError>{inputErrors.username}</FieldError>
              </Field>
              <Field className="gap-1 lg:max-w-120">
                <FieldLabel
                  htmlFor="email"
                  className="style-body-1 text-brown-400"
                >
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  ref={inputRefs.email}
                  placeholder="Email"
                  autoComplete="email"
                  className="h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400"
                  disabled
                />
              </Field>
              <Field className="gap-1">
                <FieldLabel
                  htmlFor="bio"
                  className="style-body-1 text-brown-400"
                >
                  Bio (max 400 letters)
                </FieldLabel>
                <Textarea
                  id="bio"
                  ref={textareaRefs.bio}
                  placeholder="Write something about yourself"
                  className={cn(
                    "min-h-36 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                    textareaErrors.bio && "border-brand-red"
                  )}
                />
                <FieldError>{textareaErrors.bio}</FieldError>
              </Field>
            </FieldGroup>
          </div>
          {!isLarge && (
            <ActionButton variant="primary" type="submit" className="self-end">
              Save
            </ActionButton>
          )}
        </FieldSet>
      </form>
      <ConfirmDialog
        title="Update profile"
        content="Do you want to update your profile?"
        confirmText="Update"
        open={isConfirmDialogOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </AdminMain>
  );
}

export default Main;
