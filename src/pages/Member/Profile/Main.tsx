import { User } from "lucide-react";
import { ActionButton } from "@/components/common/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

function Main() {
  const { user } = useAuthContext();

  return (
    <main className="flex flex-col gap-6 px-4 pt-6 pb-10 bg-brown-200 sm:p-8 md:flex-1 md:rounded-2xl lg:gap-10 lg:p-10">
      <div className="flex flex-col items-center gap-6 lg:flex-row">
        <Avatar className="size-30">
          <AvatarImage
            src={user!.profilePic}
            alt={user!.name}
            className="text-brown-500 object-cover"
          />
          <AvatarFallback className="bg-brown-400">
            <User className="size-2/5 text-white" />
          </AvatarFallback>
        </Avatar>
        <ActionButton variant="secondary">Upload profile picture</ActionButton>
      </div>
      <Separator className="bg-brown-300" />
      {/* //TODO: change it so that it can upload file */}
      <form>
        <FieldSet className="items-start gap-6 md:gap-8 lg:gap-10">
          <FieldGroup className="gap-6 text-brown-400 lg:gap-7">
            <Field className="gap-1">
              <FieldLabel htmlFor="name" className="text-body-1">
                Name
              </FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Full name"
                autoComplete="name"
                defaultValue={user!.name}
                className={cn(
                  "h-12 text-body-1 bg-white text-brown-500 placeholder:text-brown-500"
                )}
              />
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="username" className="text-body-1">
                Username
              </FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                autoComplete="username"
                defaultValue={user!.username}
                className={cn(
                  "h-12 text-body-1 bg-white text-brown-500 placeholder:text-brown-500"
                )}
              />
            </Field>
            <Field className="gap-1 opacity-40">
              <FieldLabel htmlFor="email" className="text-body-1">
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
                  "h-12 text-body-1 bg-white text-brown-500 placeholder:text-brown-500"
                )}
              />
            </Field>
          </FieldGroup>
          <ActionButton variant="primary">Save</ActionButton>
        </FieldSet>
      </form>
    </main>
  );
}

export default Main;
