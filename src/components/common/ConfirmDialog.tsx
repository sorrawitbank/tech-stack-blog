import { ActionButton } from "./Button";
import Dialog from "./Dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface Props {
  title: string;
  content: string;
  cancelText?: string;
  confirmText?: string;
  open?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

function ConfirmDialog(props: Props) {
  return (
    <Dialog
      open={props.open}
      onCancel={props.onCancel}
      className="xl:max-w-120!"
    >
      <AlertDialogTitle asChild>
        <h3 className="text-center style-headline-3 text-brown-600">
          {props.title}
        </h3>
      </AlertDialogTitle>
      <span className="style-body-1 text-center text-balance text-brown-400">
        {props.content}
      </span>
      <div className="flex gap-2 sm:gap-6 lg:gap-10">
        <AlertDialogCancel asChild>
          <ActionButton variant="secondary" onClick={props.onCancel}>
            {props.cancelText ?? "Cancel"}
          </ActionButton>
        </AlertDialogCancel>
        <AlertDialogAction asChild>
          <ActionButton variant="primary" onClick={props.onConfirm}>
            {props.confirmText ?? "Confirm"}
          </ActionButton>
        </AlertDialogAction>
      </div>
    </Dialog>
  );
}

export default ConfirmDialog;
