import LoginForm from "./components/LoginForm";
import StandardMain from "@/layouts/StandardMain";
import { NavigationButton } from "@/components/common/Button";

function Main() {
  return (
    <StandardMain>
      <section
        id="login-section"
        aria-labelledby="login-label"
        className="flex flex-col items-center self-center gap-6 px-4 py-10 mx-4 mt-10 bg-brown-200 rounded-2xl sm:px-12 sm:mx-20 md:gap-8 md:px-20 md:py-12 md:mx-32 lg:gap-10 lg:w-200 lg:px-30 lg:py-15 lg:m-0"
      >
        <h2
          id="login-label"
          className="text-headline-2 text-brown-600 text-center"
        >
          Log in
        </h2>
        <LoginForm />
        <div className="flex gap-3">
          <span className="text-body-1 text-brown-400">
            Don’t have any account?
          </span>
          <NavigationButton variant="text" navigateTo="/signup">
            Sign up
          </NavigationButton>
        </div>
      </section>
    </StandardMain>
  );
}

export default Main;
