import React, { useContext } from "react";
import { NavigationButton } from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import {
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MediaQueryContext } from "@/contexts/MediaQueryContext";

function CreateAccountDialog({ children }: { children?: React.ReactNode }) {
  const { isXLarge } = useContext(MediaQueryContext);

  return (
    <Dialog trigger={children}>
      <AlertDialogTitle asChild>
        <h2
          className={
            (isXLarge ? "text-headline-2" : "text-headline-3") +
            " text-center text-brown-600"
          }
        >
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
    </Dialog>
  );
}

export default CreateAccountDialog;
