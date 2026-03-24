import { ActionButton } from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import useResetPassword from "@/hooks/useResetPassword";
import { cn } from "@/lib/utils";

function Main() {
  const {
    refs,
    confirmPasswordRef,
    isLoading,
    isConfirmDialogOpen,
    inputErrors,
    confirmPasswordError,
    handleSubmit,
    handleConfirm,
    handleCancel,
  } = useResetPassword();
  const { isLarge } = useMediaQueryContext();

  return (
    <main className="flex flex-col p-4 sm:p-8 lg:flex-1 lg:p-0">
      <form onSubmit={handleSubmit}>
        <FieldSet
          disabled={isLoading}
          className="items-start gap-6 sm:gap-8 lg:gap-0"
        >
          {isLarge && (
            <>
              <header className="flex justify-between items-center px-15 py-6 w-full border-b border-brown-300">
                <h3 className="style-headline-3">Reset password</h3>
                <ActionButton variant="primary" type="submit">
                  Reset password
                </ActionButton>
              </header>
            </>
          )}
          <FieldGroup className="lg:max-w-150 lg:px-15 lg:py-10">
            <Field className="gap-1">
              <FieldLabel
                htmlFor="current-password"
                className="style-body-1 text-brown-400"
              >
                Current password
              </FieldLabel>
              <Input
                id="current-password"
                type="password"
                ref={refs.password}
                placeholder="Current password"
                className={cn(
                  "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                  inputErrors.password && "border-brand-red"
                )}
              />
              <FieldError>{inputErrors.password}</FieldError>
            </Field>
            <Field className="gap-1">
              <FieldLabel
                htmlFor="new-password"
                className="style-body-1 text-brown-400"
              >
                New password
              </FieldLabel>
              <Input
                id="new-password"
                type="password"
                ref={refs.newPassword}
                placeholder="New password"
                className={cn(
                  "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                  inputErrors.newPassword && "border-brand-red"
                )}
              />
              <FieldError>{inputErrors.newPassword}</FieldError>
            </Field>
            <Field className="gap-1">
              <FieldLabel
                htmlFor="confirm-new-password"
                className="style-body-1 text-brown-400"
              >
                Confirm new password
              </FieldLabel>
              <Input
                id="confirm-new-password"
                type="password"
                ref={confirmPasswordRef}
                placeholder="Confirm new password"
                className={cn(
                  "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                  confirmPasswordError && "border-brand-red"
                )}
              />
              <FieldError>{confirmPasswordError}</FieldError>
            </Field>
          </FieldGroup>
          {!isLarge && (
            <ActionButton variant="primary" type="submit">
              Reset password
            </ActionButton>
          )}
        </FieldSet>
      </form>
      <ConfirmDialog
        title="Reset password"
        content="Do you want to reset your password?"
        open={isConfirmDialogOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </main>
  );
}

export default Main;
