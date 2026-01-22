import { ActionButton } from "@/components/common/Button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function LoginForm() {
  return (
    <form className="w-full">
      <FieldSet className="items-center gap-6 lg:gap-10">
        <FieldGroup className="gap-6 text-brown-400 lg:gap-7">
          <Field className="gap-1">
            <FieldLabel htmlFor="email" className="text-body-1">
              Email
            </FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="h-12 bg-white placeholder:text-brown-400"
            />
          </Field>
          <Field className="gap-1">
            <FieldLabel htmlFor="password" className="text-body-1">
              Password
            </FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="h-12 bg-white placeholder:text-brown-400"
            />
          </Field>
        </FieldGroup>
        <ActionButton variant="primary">Log in</ActionButton>
      </FieldSet>
    </form>
  );
}

export default LoginForm;
