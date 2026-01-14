import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavigationButton } from "@/components/common/Button";
import { cn } from "@/lib/utils";

function Narbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 flex justify-between items-center w-full h-12 px-6 py-3 bg-brown-100 border-b border-brown-300 sm:h-20 sm:px-12 sm:py-4 xl:px-30">
      <img src="logo.svg" alt="Logo" className="h-6 sm:h-11" />
      <DropdownMenu>
        <DropdownMenuTrigger className="text-brown-400 outline-none hover:text-brown-500 focus:text-brown-500 data-[state=open]:text-brown-500 sm:hidden">
          <Menu className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            "flex flex-col justify-between z-40 w-screen h-50 px-6 py-10 mt-2 bg-brown-100 border-0 rounded-none shadow-[2px_2px_16px_0px_rgb(0_0_0_/0.1)] sm:hidden",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100",
            "data-[side=bottom]:slide-in-from-top-2"
          )}
        >
          <NavigationButton variant="secondary" href="/login">
            Log in
          </NavigationButton>
          <NavigationButton variant="primary" href="/signup">
            Sign up
          </NavigationButton>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="hidden sm:flex sm:gap-2">
        <NavigationButton variant="secondary" href="/login">
          Log in
        </NavigationButton>
        <NavigationButton variant="primary" href="/signup">
          Sign up
        </NavigationButton>
      </div>
    </nav>
  );
}

export default Narbar;
