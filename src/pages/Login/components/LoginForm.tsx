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
  const { refs, errors, handleSubmit } = useLogin();

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <FieldSet className="items-center gap-6 lg:gap-10">
        <FieldGroup className="gap-6 text-brown-400 lg:gap-7">
          <Field className="gap-1">
            <FieldLabel htmlFor="email" className="text-body-1">
              Email
            </FieldLabel>
            <Input
              id="email"
              type="email"
              ref={refs.email}
              placeholder="Email"
              autoComplete="email"
              className={cn(
                "h-12 text-body-1 bg-white placeholder:text-brown-400",
                errors.email && "border-brand-red"
              )}
            />
            <FieldError>{errors.email}</FieldError>
          </Field>
          <Field className="gap-1">
            <FieldLabel htmlFor="password" className="text-body-1">
              Password
            </FieldLabel>
            <Input
              id="password"
              type="password"
              ref={refs.password}
              placeholder="Password"
              className={cn(
                "h-12 text-body-1 bg-white placeholder:text-brown-400",
                errors.password && "border-brand-red"
              )}
            />
            <FieldError>{errors.password}</FieldError>
          </Field>
        </FieldGroup>
        <ActionButton variant="primary">Log in</ActionButton>
      </FieldSet>
    </form>
  );
}

export default LoginForm;
