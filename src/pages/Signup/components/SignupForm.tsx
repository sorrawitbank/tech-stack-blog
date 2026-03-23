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

type Props = Omit<ReturnType<typeof useSignup>, "isSuccess">;

function SignupForm(props: Props) {
  return (
    <form className="w-full" onSubmit={props.handleSubmit}>
      <FieldSet
        disabled={props.isLoading}
        className="items-center gap-6 lg:gap-10"
      >
        <FieldGroup className="gap-6 lg:gap-7">
          <Field className="gap-1">
            <FieldLabel htmlFor="name" className="style-body-1 text-brown-400">
              Name
            </FieldLabel>
            <Input
              id="name"
              type="text"
              ref={props.refs.name}
              placeholder="Full name"
              autoComplete="name"
              className={cn(
                "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                props.errors.name && "border-brand-red"
              )}
            />
            <FieldError>{props.errors.name}</FieldError>
          </Field>
          <Field className="gap-1">
            <FieldLabel
              htmlFor="username"
              className="style-body-1 text-brown-400"
            >
              Username
            </FieldLabel>
            <Input
              id="username"
              type="text"
              ref={props.refs.username}
              placeholder="Username"
              autoComplete="username"
              className={cn(
                "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                props.errors.username && "border-brand-red"
              )}
            />
            <FieldError>{props.errors.username}</FieldError>
          </Field>
          <Field className="gap-1">
            <FieldLabel htmlFor="email" className="style-body-1 text-brown-400">
              Email
            </FieldLabel>
            <Input
              id="email"
              type="email"
              ref={props.refs.email}
              placeholder="Email"
              autoComplete="email"
              className={cn(
                "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                props.errors.email && "border-brand-red"
              )}
            />
            <FieldError>{props.errors.email}</FieldError>
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
              ref={props.refs.password}
              placeholder="Password"
              className={cn(
                "h-12 style-body-1 text-brown-500 bg-white placeholder:text-brown-400",
                props.errors.password && "border-brand-red"
              )}
            />
            <FieldError>{props.errors.password}</FieldError>
          </Field>
        </FieldGroup>
        <ActionButton variant="primary">Sign up</ActionButton>
      </FieldSet>
    </form>
  );
}

export default SignupForm;
