import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  Menu,
  RotateCw,
  SquareArrowOutUpRight,
  User,
} from "lucide-react";
import { NavigationButton } from "@/components/common/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/contexts/AuthContext";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import { useScrollContext } from "@/contexts/ScrollContext";
import { cn } from "@/lib/utils";

function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthContext();
  const { isSmall } = useMediaQueryContext();
  const { scrollDirection, scrollY } = useScrollContext();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 flex justify-between items-center w-full h-12 px-6 py-3 bg-brown-100 border-b border-brown-300 sm:h-20 sm:px-12 xl:px-30",
        "transition-transform duration-300 ease-in-out",
        scrollDirection === "down" && scrollY > 60
          ? "-translate-y-full"
          : "translate-y-0"
      )}
    >
      <img
        src="/logo.svg"
        alt="Logo"
        onClick={() => navigate("/")}
        className="size-6 text-brown-500 cursor-pointer sm:size-11"
      />
      {isSmall ? (
        isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Avatar className="size-12">
              <AvatarImage
                src={user!.profilePic}
                alt={user!.name}
                className="text-brown-500 object-cover"
              />
              <AvatarFallback className="bg-brown-300">
                <User className="size-3/5 text-brown-400" />
              </AvatarFallback>
            </Avatar>
            <span className="text-body-1 text-brown-500">{user!.name}</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-brown-400">
                <ChevronDown className="size-4 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-62.5 px-0 py-2 mt-5 bg-brown-100 border-0 shadow-[0px_0px_16px_0px_rgb(0_0_0_/0.1)]"
              >
                <ul>
                  <li>
                    <Link
                      to={`${user!.role === "admin" ? "/admin" : ""}/profile`}
                      className="flex gap-3 px-4 py-3 hover:bg-brown-200"
                    >
                      <User className="text-brown-400" />
                      <span className="text-body-1 text-brown-500">
                        Profile
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`${
                        user!.role === "admin" ? "/admin" : ""
                      }/reset-password`}
                      className="flex gap-3 px-4 py-3 hover:bg-brown-200"
                    >
                      <RotateCw className="text-brown-400 rotate-135" />
                      <span className="text-body-1 text-brown-500">
                        Reset password
                      </span>
                    </Link>
                  </li>
                  {user!.role === "admin" && (
                    <li>
                      <Link
                        to="/admin/article"
                        className="flex gap-3 px-4 py-3 hover:bg-brown-200"
                      >
                        <SquareArrowOutUpRight className="text-brown-400" />
                        <span className="text-body-1 text-brown-500">
                          Admin panel
                        </span>
                      </Link>
                    </li>
                  )}
                  <Separator className="bg-brown-300" />
                  <li>
                    <button
                      onClick={logout}
                      className="flex gap-3 w-full px-4 py-3 cursor-pointer hover:bg-brown-200"
                    >
                      <LogOut className="text-brown-400" />
                      <span className="text-body-1 text-brown-500">
                        Log out
                      </span>
                    </button>
                  </li>
                </ul>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <nav>
            <ul className="flex gap-2">
              <li>
                <NavigationButton variant="secondary" navigateTo="/login">
                  Log in
                </NavigationButton>
              </li>
              <li>
                <NavigationButton variant="primary" navigateTo="/signup">
                  Sign up
                </NavigationButton>
              </li>
            </ul>
          </nav>
        )
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="text-brown-400 outline-none hover:text-brown-500 focus:text-brown-500 data-[state=open]:text-brown-500">
            <Menu className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={cn(
              "z-40 w-screen mt-2 bg-brown-100 border-0 rounded-none shadow-[0px_0px_16px_0px_rgb(0_0_0_/0.1)]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100",
              "data-[side=bottom]:slide-in-from-top-2",
              isAuthenticated ? "p-6" : "px-6 py-10"
            )}
          >
            {isAuthenticated ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="size-12">
                    <AvatarImage
                      src={user!.profilePic}
                      alt={user!.name}
                      className="text-brown-500 object-cover"
                    />
                    <AvatarFallback className="bg-brown-300">
                      <User className="size-3/5 text-brown-400" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-body-1 text-brown-500 line-clamp-1">
                    {user!.name}
                  </span>
                </div>
                <nav className="flex flex-col gap-4">
                  <ul>
                    <li>
                      <Link
                        to={`${user!.role === "admin" ? "/admin" : ""}/profile`}
                        className="flex gap-3 px-4 py-3 rounded-lg hover:bg-brown-200"
                      >
                        <User className="text-brown-400" />
                        <span className="text-body-1 text-brown-500">
                          Profile
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`${
                          user!.role === "admin" ? "/admin" : ""
                        }/reset-password`}
                        className="flex gap-3 px-4 py-3 rounded-lg hover:bg-brown-200"
                      >
                        <RotateCw className="text-brown-400 rotate-135" />
                        <span className="text-body-1 text-brown-500">
                          Reset password
                        </span>
                      </Link>
                    </li>
                    {user!.role === "admin" && (
                      <li>
                        <Link
                          to="/admin/article"
                          className="flex gap-3 px-4 py-3 rounded-lg hover:bg-brown-200"
                        >
                          <SquareArrowOutUpRight className="text-brown-400" />
                          <span className="text-body-1 text-brown-500">
                            Admin panel
                          </span>
                        </Link>
                      </li>
                    )}
                  </ul>
                  <Separator className="bg-brown-300" />
                  <button
                    onClick={logout}
                    className="flex gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-brown-200"
                  >
                    <LogOut className="text-brown-400" />
                    <span className="text-body-1 text-brown-500">Log out</span>
                  </button>
                </nav>
              </div>
            ) : (
              <nav className="h-full">
                <ul className="flex flex-col gap-6">
                  <li>
                    <NavigationButton variant="secondary" navigateTo="/login">
                      Log in
                    </NavigationButton>
                  </li>
                  <li>
                    <NavigationButton variant="primary" navigateTo="/signup">
                      Sign up
                    </NavigationButton>
                  </li>
                </ul>
              </nav>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}

export default Header;
