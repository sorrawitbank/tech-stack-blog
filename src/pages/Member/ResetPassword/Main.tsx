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

  return (
    <main className="md:flex-1">
      <form
        onSubmit={handleSubmit}
        className="px-4 pt-6 pb-10 bg-brown-200 sm:p-8 md:rounded-2xl lg:p-10"
      >
        <FieldSet
          disabled={isLoading}
          className="items-start gap-6 md:gap-8 lg:gap-10"
        >
          <FieldGroup className="gap-6 lg:gap-7">
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
          <ActionButton variant="primary" type="submit">
            Reset password
          </ActionButton>
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
