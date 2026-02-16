import { ActionButton } from "@/components/common/Button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function Main() {
  return (
    <main className="md:flex-1">
      <form className="px-4 pt-6 pb-10 bg-brown-200 sm:p-8 md:rounded-2xl lg:p-10">
        <FieldSet className="items-start gap-6 md:gap-8 lg:gap-10">
          <FieldGroup className="gap-6 text-brown-400 lg:gap-7">
            <Field className="gap-1">
              <FieldLabel htmlFor="current-password" className="text-body-1">
                Current password
              </FieldLabel>
              <Input
                id="current-password"
                type="password"
                placeholder="Current password"
                className={cn(
                  "h-12 text-body-1 bg-white text-brown-500 placeholder:text-brown-500"
                )}
              />
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="new-password" className="text-body-1">
                New password
              </FieldLabel>
              <Input
                id="new-password"
                type="password"
                placeholder="New password"
                className={cn(
                  "h-12 text-body-1 bg-white text-brown-500 placeholder:text-brown-500"
                )}
              />
            </Field>
            <Field className="gap-1">
              <FieldLabel
                htmlFor="confirm-new-password"
                className="text-body-1"
              >
                Confirm new password
              </FieldLabel>
              <Input
                id="confirm-new-password"
                type="password"
                placeholder="Confirm new password"
                className={cn(
                  "h-12 text-body-1 bg-white text-brown-500 placeholder:text-brown-500"
                )}
              />
            </Field>
          </FieldGroup>
          {/* //TODO: Reset password */}
          <ActionButton variant="primary">Reset password</ActionButton>
        </FieldSet>
      </form>
    </main>
  );
}

export default Main;
