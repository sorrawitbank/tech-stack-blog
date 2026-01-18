import { CircleAlert } from "lucide-react";
import { NavigationButton } from "@/components/common/Button";

function Main() {
  return (
    <main
      aria-labelledby="page-not-found"
      className="flex flex-col flex-1 justify-center items-center gap-6"
    >
      <CircleAlert className="size-12" />
      <h3
        id="page-not-found"
        className="text-headline-3 text-center text-brown-600"
      >
        Page Not Found
      </h3>
      <NavigationButton variant="primary" navigateTo="/">
        Go to Home page
      </NavigationButton>
    </main>
  );
}

export default Main;
