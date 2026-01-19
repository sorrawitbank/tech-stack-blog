import { CircleAlert } from "lucide-react";
import { NavigationButton } from "@/components/common/Button";
import FullHeightMain from "@/layouts/FullHeightMain";

function Main() {
  return (
    <FullHeightMain className="flex-col gap-4 lg:gap-6">
      <CircleAlert className="size-12 min-h-12 text-brown-600" />
      <h3 className="text-headline-3 text-center text-brown-600">
        Page not found
      </h3>
      <NavigationButton variant="primary" navigateTo="/">
        Go to Home page
      </NavigationButton>
    </FullHeightMain>
  );
}

export default Main;
