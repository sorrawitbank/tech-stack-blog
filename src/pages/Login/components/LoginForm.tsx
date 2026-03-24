import { ActionButton } from "@/components/common/Button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useLogin from "@/hooks/useLogin";
import { cn } from "@/lib/utils";

function LoginForm() {
  const { refs, isLoading, inputErrors, handleSubmit } = useLogin();

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <FieldSet disabled={isLoading} className="items-center gap-6 lg:gap-10">
        <FieldGroup className="gap-6 lg:gap-7">
          <Field className="gap-1">
            <FieldLabel htmlFor="email" className="style-body-1 text-brown-400">
              Email
            </FieldLabel>
            <Input
              id="email"
              type="email"
              ref={refs.email}
              placeholder="Email"
              autoComplete="email"
              className={cn(
                "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                inputErrors.email && "border-brand-red"
              )}
            />
            <FieldError>{inputErrors.email}</FieldError>
          </Field>
          <Field className="gap-1">
            <FieldLabel
              htmlFor="password"
              className="style-body-1 text-brown-400"
            >
              Password
            </FieldLabel>
            <Input
              id="password"
              type="password"
              ref={refs.password}
              placeholder="Password"
              className={cn(
                "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                inputErrors.password && "border-brand-red"
              )}
            />
            <FieldError>{inputErrors.password}</FieldError>
          </Field>
        </FieldGroup>
        <ActionButton variant="primary">Log in</ActionButton>
      </FieldSet>
    </form>
  );
}

export default LoginForm;
