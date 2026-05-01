import React from "react";
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface Props {
  open?: boolean;
  openWhenTrigger?: boolean;
  trigger?: React.ReactNode;
  onCancel?: () => void;
  children?: React.ReactNode;
  className?: string;
}

function Dialog(props: Props) {
  return (
    <AlertDialog open={props.open}>
      {props.trigger && (
        <AlertDialogTrigger asChild>{props.trigger}</AlertDialogTrigger>
      )}
      {(props.openWhenTrigger ?? true) && (
        <AlertDialogContent
          className={cn(
            "flex flex-col gap-6 px-4 pt-4 pb-10 bg-brown-100 border-0 rounded-2xl sm:max-w-120! md:px-6 xl:max-w-155!",
            props.className
          )}
        >
          <AlertDialogHeader>
            <AlertDialogCancel
              className="self-end text-brown-600 rounded-full cursor-pointer hover:bg-brown-300"
              onClick={props.onCancel}
            >
              <X />
            </AlertDialogCancel>
          </AlertDialogHeader>
          <div className="flex flex-col items-center gap-4 xl:gap-8">
            {props.children}
          </div>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}

export default Dialog;
