import { useRef, useState } from "react";

function useConfirmDialog() {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);

  const confirmDialogResolverRef = useRef<
    ((confirmed: boolean) => void) | null
  >(null);

  const requestConfirm = () =>
    new Promise<boolean>((resolve) => {
      confirmDialogResolverRef.current = resolve;
      setIsConfirmDialogOpen(true);
    });

  const handleConfirm = () => {
    confirmDialogResolverRef.current?.(true);
    confirmDialogResolverRef.current = null;
    setIsConfirmDialogOpen(false);
  };

  const handleCancel = () => {
    confirmDialogResolverRef.current?.(false);
    confirmDialogResolverRef.current = null;
    setIsConfirmDialogOpen(false);
  };

  return {
    isConfirmDialogOpen,
    requestConfirm,
    handleConfirm,
    handleCancel,
  };
}

export default useConfirmDialog;
