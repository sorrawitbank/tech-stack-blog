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
import { useAuthContext } from "@/contexts/AuthContext";
import useProfile from "@/hooks/useProfile";
import { cn } from "@/lib/utils";

function Main() {
  const { user } = useAuthContext();
  const {
    inputRefs,
    pictureRef,
    isLoading,
    isConfirmDialogOpen,
    inputErrors,
    pictureError,
    previewImageUrl,
    handleImageFileChange,
    handleConfirm,
    handleCancel,
    handleSubmit,
  } = useProfile("user");

  return (
    <main className="bg-brown-200 md:flex-1 md:rounded-2xl lg:gap-10">
      <form onSubmit={handleSubmit}>
        <Input
          ref={pictureRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleImageFileChange}
          className="hidden"
        />
        <FieldSet
          disabled={isLoading}
          className="flex flex-col gap-6 px-4 pt-6 pb-10 sm:p-8 lg:p-10"
        >
          <Field className="gap-2">
            <div className="flex flex-col items-center gap-6 lg:flex-row">
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
          <div className="flex flex-col items-start gap-6 md:gap-8 lg:gap-10">
            <FieldGroup className="gap-6 lg:gap-7">
              <Field className="gap-1">
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
              <Field className="gap-1">
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
              <Field className="gap-1 opacity-40">
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
                  className={cn(
                    "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400"
                  )}
                  disabled
                />
              </Field>
            </FieldGroup>
            <ActionButton variant="primary" type="submit">
              Save
            </ActionButton>
          </div>
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
    </main>
  );
}

export default Main;
