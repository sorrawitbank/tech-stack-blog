import React from "react";
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  trigger: React.ReactNode;
  children?: React.ReactNode;
}

function Dialog(props: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.trigger}</AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-6 px-4 pt-4 pb-10 bg-brown-100 border-0 rounded-2xl sm:max-w-120! md:px-6 xl:max-w-155!">
        <AlertDialogHeader>
          <AlertDialogCancel className="self-end text-brown-600 rounded-full cursor-pointer hover:bg-brown-300">
            <X />
          </AlertDialogCancel>
        </AlertDialogHeader>
        <div className="flex flex-col items-center gap-4 xl:gap-10">
          {props.children}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Dialog;
