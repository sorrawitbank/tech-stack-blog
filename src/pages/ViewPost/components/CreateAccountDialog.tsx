import React from "react";
import { X } from "lucide-react";
import { NavigationButton } from "@/components/common/Button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function CreateAccountDialog({ children }: { children?: React.ReactNode }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-6 px-4 pt-4 pb-10 bg-brown-100 border-0 rounded-2xl sm:max-w-120! md:px-6 xl:max-w-155!">
        <AlertDialogHeader>
          <AlertDialogCancel className="self-end rounded-full cursor-pointer hover:bg-brown-300">
            <X />
          </AlertDialogCancel>
        </AlertDialogHeader>
        <div className="flex flex-col items-center gap-4 xl:gap-10">
          <AlertDialogTitle asChild>
            <h2 className="text-headline-3 text-center text-brown-600 xl:text-headline-2">
              Create an account to continue
            </h2>
          </AlertDialogTitle>
          <NavigationButton variant="primary" navigateTo="/signup">
            Create account
          </NavigationButton>
          <div className="flex justify-center gap-3">
            <AlertDialogDescription asChild>
              <span className="text-body-1 text-brown-400!">
                Already have an account?
              </span>
            </AlertDialogDescription>
            <NavigationButton variant="text" navigateTo="/login">
              Login
            </NavigationButton>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CreateAccountDialog;
