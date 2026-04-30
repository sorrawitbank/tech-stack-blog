import React from "react";
import { NavigationButton } from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import {
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuthContext } from "@/contexts/AuthContext";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import { cn } from "@/lib/utils";

function CreateAccountDialog({ children }: { children?: React.ReactNode }) {
  const { user } = useAuthContext();
  const { isXLarge } = useMediaQueryContext();

  return (
    <Dialog openWhenTrigger={!user} trigger={children}>
      <AlertDialogTitle asChild>
        <h2
          className={cn(
            "text-center text-brown-600",
            isXLarge ? "style-headline-2" : "style-headline-3"
          )}
        >
          Create an account to continue
        </h2>
      </AlertDialogTitle>
      <NavigationButton variant="primary" to="/signup">
        Create account
      </NavigationButton>
      <div className="flex justify-center gap-3">
        <AlertDialogDescription asChild>
          <span className="style-body-1 text-brown-400!">
            Already have an account?
          </span>
        </AlertDialogDescription>
        <NavigationButton variant="text" to="/login">
          Login
        </NavigationButton>
      </div>
    </Dialog>
  );
}

export default CreateAccountDialog;
