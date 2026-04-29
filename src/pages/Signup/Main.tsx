import { Check } from "lucide-react";
import SignupForm from "./components/SignupForm";
import StandardMain from "@/layouts/StandardMain";
import { NavigationButton } from "@/components/common/Button";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import useSignup from "@/hooks/useSignup";
import { cn } from "@/lib/utils";

function Main() {
  const { isLarge } = useMediaQueryContext();
  const { refs, isSuccess, isLoading, inputErrors, handleSubmit } = useSignup();

  return (
    <StandardMain className="pb-12 sm:pb-20">
      {isSuccess ? (
        <section
          id="signup-section"
          aria-labelledby="signup-label"
          className="flex flex-col items-center self-center gap-10 py-10 mx-4 mt-10 bg-brown-200 rounded-2xl sm:mx-20 md:py-12 md:mx-32 lg:w-200 lg:py-15 lg:m-0"
        >
          <div className="p-4 rounded-full bg-brand-green">
            <Check className="size-12 text-white" />
          </div>
          <h2
            id="signup-label"
            className={cn(
              "text-brown-600 text-center",
              isLarge ? "style-headline-2" : "style-headline-3"
            )}
          >
            Registration success
          </h2>
          <NavigationButton variant="primary" to="/">
            Continue
          </NavigationButton>
        </section>
      ) : (
        <section
          id="signup-section"
          aria-labelledby="signup-label"
          className="flex flex-col items-center self-center gap-6 px-4 py-10 mx-4 mt-10 bg-brown-200 rounded-2xl sm:px-12 sm:mx-20 md:gap-8 md:px-20 md:py-12 md:mx-32 lg:gap-10 lg:w-200 lg:px-30 lg:py-15 lg:m-0"
        >
          <h2
            id="signup-label"
            className="style-headline-2 text-brown-600 text-center"
          >
            Sign up
          </h2>
          <SignupForm
            refs={refs}
            isLoading={isLoading}
            inputErrors={inputErrors}
            handleSubmit={handleSubmit}
          />
          <div className="flex gap-3">
            <span className="style-body-1 text-brown-400">
              Already have an account?
            </span>
            <NavigationButton variant="text" to="/login">
              Log in
            </NavigationButton>
          </div>
        </section>
      )}
    </StandardMain>
  );
}

export default Main;
