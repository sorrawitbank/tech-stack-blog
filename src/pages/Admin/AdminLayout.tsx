import React from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Folder,
  LogOut,
  Menu,
  Notebook,
  RotateCw,
  SquareArrowOutUpRight,
  User,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import { cn } from "@/lib/utils";

export type AdminPage =
  | "article"
  | "category"
  | "profile"
  | "notification"
  | "reset-password";

const pageDetails: Record<AdminPage, { text: string; icon: React.ReactNode }> =
  {
    article: { text: "Article management", icon: <Notebook /> },
    category: { text: "Category management", icon: <Folder /> },
    profile: { text: "Profile", icon: <User /> },
    notification: { text: "Notification", icon: <Bell /> },
    "reset-password": {
      text: "Reset password",
      icon: <RotateCw className="rotate-135" />,
    },
  };

interface Props {
  page: AdminPage;
  children?: React.ReactNode;
}

function AdminLayout(props: Props) {
  const { isSmall, isMedium, isLarge } = useMediaQueryContext();

  return (
    <div className="flex flex-col lg:flex-row">
      {!isLarge && (
        <header className="flex items-center gap-2 h-12 px-6 py-3 bg-brown-100 border-b border-brown-300 sm:gap-8 sm:h-24 sm:px-12 xl:px-30">
          <Drawer direction={isMedium ? "left" : "top"} handleOnly={true}>
            <DrawerTrigger className="text-brown-400 outline-none hover:text-brown-500 focus:text-brown-500 data-[state=open]:text-brown-500">
              <Menu className="cursor-pointer sm:size-8" />
            </DrawerTrigger>
            <DrawerContent className="max-h-[75dvh]! bg-brown-200 border-0! md:w-70! md:max-h-dvh! md:pt-4">
              <DrawerHeader className="flex flex-row items-center gap-4 px-6 sm:px-12 md:flex-col md:items-start md:gap-1 md:px-6 md:py-15">
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="size-11 text-brown-500 md:size-15"
                />
                <DrawerTitle className="text-brand-orange" asChild>
                  <h4 className="text-headline-4 text-brand-orange">
                    Admin panel
                  </h4>
                </DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col rounded-b-lg overflow-y-hidden md:justify-between md:gap-16 md:rounded-none">
                <ScrollArea className="max-h-125 h-[calc(75dvh-4.75rem)] md:max-h-none md:h-[calc(100dvh-14.25rem)]">
                  <nav className="flex flex-col gap-8 h-full md:gap-16">
                    <DrawerDescription asChild>
                      <ul>
                        {Object.entries(pageDetails).map(([page, detail]) => (
                          <li
                            key={page}
                            className={cn(
                              "hover:bg-brown-300",
                              props.page === page && "bg-brown-300"
                            )}
                          >
                            <Link
                              to={`/admin/${page}`}
                              className={cn(
                                "flex items-center gap-3 px-6 py-5 sm:px-12 md:px-6",
                                props.page === page
                                  ? "text-brown-500"
                                  : "text-brown-400"
                              )}
                            >
                              {detail.icon}
                              <span className="text-body-1">{detail.text}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </DrawerDescription>
                    <DrawerFooter className="p-0">
                      <ul>
                        <li className="hover:bg-brown-300">
                          <Link
                            to="/"
                            className="flex gap-3 px-6 py-5 text-brown-400 sm:px-12 md:px-6"
                          >
                            <SquareArrowOutUpRight />
                            <span className="text-body-1">hh. website</span>
                          </Link>
                        </li>
                        <Separator className="bg-brown-300" />
                        <li className="mb-4 hover:bg-brown-300">
                          <button className="flex gap-3 w-full px-6 py-5 text-brown-400 cursor-pointer sm:px-12 md:px-6">
                            <LogOut />
                            <span className="text-body-1">Log out</span>
                          </button>
                        </li>
                      </ul>
                    </DrawerFooter>
                  </nav>
                </ScrollArea>
              </div>
            </DrawerContent>
          </Drawer>
          {isSmall && (
            <h3 className="text-headline-3 text-brown-600">
              {pageDetails[props.page].text}
            </h3>
          )}
        </header>
      )}
      {!isSmall && (
        <h3 className="px-6 py-3 text-headline-3 text-brown-600">
          {pageDetails[props.page].text}
        </h3>
      )}
      {isLarge && (
        <aside className="flex flex-col w-70 h-dvh pt-4 bg-brown-200 overflow-y-hidden">
          <div className="flex flex-col gap-1 px-6 py-15">
            <img
              src="/logo.svg"
              alt="Logo"
              className="size-15 text-brown-500"
            />
            <h4 className="text-headline-4 text-brand-orange">Admin panel</h4>
          </div>
          <ScrollArea className="h-[calc(100dvh-14.25rem)]">
            <nav className="flex flex-col justify-between gap-16 h-full">
              <ul>
                {Object.entries(pageDetails).map(([page, detail]) => (
                  <li
                    key={page}
                    className={cn(
                      "hover:bg-brown-300",
                      props.page === page && "bg-brown-300"
                    )}
                  >
                    <Link
                      to={`/admin/${page}`}
                      className={cn(
                        "flex gap-3 px-6 py-5 sm:px-12 md:px-6",
                        props.page === page
                          ? "text-brown-500"
                          : "text-brown-400"
                      )}
                    >
                      {detail.icon}
                      <span className="text-body-1">{detail.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul>
                <li className="hover:bg-brown-300">
                  <Link
                    to="/"
                    className="flex gap-3 px-6 py-5 text-brown-400 sm:px-12 md:px-6"
                  >
                    <SquareArrowOutUpRight />
                    <span className="text-body-1">hh. website</span>
                  </Link>
                </li>
                <Separator className="bg-brown-300" />
                <li className="mb-4 hover:bg-brown-300">
                  <button className="flex gap-3 w-full px-6 py-5 text-brown-400 cursor-pointer sm:px-12 md:px-6">
                    <LogOut />
                    <span className="text-body-1">Log out</span>
                  </button>
                </li>
              </ul>
            </nav>
          </ScrollArea>
        </aside>
      )}
      {props.children}
    </div>
  );
}

export default AdminLayout;
