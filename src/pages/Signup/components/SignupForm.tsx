import { ActionButton } from "@/components/common/Button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useSignup from "@/hooks/useSignup";
import { cn } from "@/lib/utils";

function SignupForm() {
  const { refs, errors, handleSubmit } = useSignup();

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <FieldSet className="items-center gap-6 lg:gap-10">
        <FieldGroup className="gap-6 text-brown-400 lg:gap-7">
          <Field className="gap-1">
            <FieldLabel htmlFor="name" className="text-body-1">
              Name
            </FieldLabel>
            <Input
              id="name"
              type="text"
              ref={refs.name}
              placeholder="Full name"
              autoComplete="name"
              className={cn(
                "h-12 text-body-1 bg-white placeholder:text-brown-400",
                errors.name && "border-brand-red"
              )}
            />
            <FieldError>{errors.name}</FieldError>
          </Field>
          <Field className="gap-1">
            <FieldLabel htmlFor="username" className="text-body-1">
              Username
            </FieldLabel>
            <Input
              id="username"
              type="text"
              ref={refs.username}
              placeholder="Username"
              autoComplete="username"
              className={cn(
                "h-12 text-body-1 bg-white placeholder:text-brown-400",
                errors.username && "border-brand-red"
              )}
            />
            <FieldError>{errors.username}</FieldError>
          </Field>
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
        <ActionButton variant="primary">Sign up</ActionButton>
      </FieldSet>
    </form>
  );
}

export default SignupForm;
