import { Menu } from "lucide-react";
import { NavigationButton } from "../common/Button";

function NavBar() {
  return (
    <nav className="fixed top-0 left-0 z-50 flex justify-between items-center w-full h-12 px-6 py-3 bg-brown-100 border-b border-brown-300 sm:h-20 sm:px-12 sm:py-4 lg:px-21 xl:px-30">
      <img src="logo.svg" alt="Logo" className="h-6 sm:h-11" />
      <button className="text-brown-400 sm:hidden">
        <Menu />
      </button>
      <div className="hidden sm:flex sm:gap-2">
        <NavigationButton variant="secondary" label="Log in" href="/login" />
        <NavigationButton variant="primary" label="Sign up" href="/signup" />
      </div>
    </nav>
  );
}

export default NavBar;
