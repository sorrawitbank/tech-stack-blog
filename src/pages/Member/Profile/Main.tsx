import { User } from "lucide-react";
import { ActionButton } from "@/components/common/Button";
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
    refs,
    pictureRef,
    isLoading,
    errors,
    pictureError,
    previewImageUrl,
    handleImageFileChange,
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
                  src={(previewImageUrl || user!.profilePic) ?? undefined}
                  alt={user!.name}
                  className="text-brown-500 object-cover"
                />
                <AvatarFallback className="bg-brown-400">
                  <User className="size-2/5 text-white" />
                </AvatarFallback>
              </Avatar>
              <ActionButton
                type="button"
                variant="secondary"
                onClick={() => pictureRef.current?.click()}
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
                  ref={refs.name}
                  placeholder="Full name"
                  autoComplete="name"
                  defaultValue={user!.name}
                  className={cn(
                    "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400"
                  )}
                />
                <FieldError>{errors.name}</FieldError>
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
                  ref={refs.username}
                  placeholder="Username"
                  autoComplete="username"
                  defaultValue={user!.username}
                  className={cn(
                    "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400"
                  )}
                />
                <FieldError>{errors.username}</FieldError>
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
                  placeholder="Email"
                  autoComplete="email"
                  defaultValue={user!.email}
                  disabled={true}
                  className={cn(
                    "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400"
                  )}
                />
              </Field>
            </FieldGroup>
            <ActionButton variant="primary">Save</ActionButton>
          </div>
        </FieldSet>
      </form>
    </main>
  );
}

export default Main;
