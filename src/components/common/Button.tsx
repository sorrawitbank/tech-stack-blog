import { Link } from "react-router-dom";
import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "text";

interface ActionButtonProps extends React.ComponentProps<"button"> {
  /**
   * Variant of button - "primary", "secondary", or "text" only
   */
  variant: ButtonVariant;
  children: React.ReactNode;
}

interface NavigationButtonProps {
  /**
   * Variant of button - "primary", "secondary", or "text" only
   */
  variant: ButtonVariant;
  children: React.ReactNode;
  navigateTo: `/${string}`;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary: cn(
    "flex justify-center items-center gap-1.5 h-12 px-10 py-3 style-body-1 text-center text-white bg-brown-600 rounded-full transition-colors duration-200 cursor-pointer",
    "hover:bg-brown-400",
    "active:bg-brown-500",
    "disabled:bg-brown-600 disabled:opacity-40"
  ),
  secondary: cn(
    "flex justify-center items-center gap-1.5 h-12 px-10 py-3 style-body-1 text-center text-brown-600 bg-white border border-brown-400 rounded-full transition-colors duration-200 cursor-pointer",
    "hover:text-brown-400",
    "active:text-brown-500",
    "disabled:border-brown-600 disabled:text-brown-600 disabled:opacity-40"
  ),
  text: cn(
    "flex justify-center items-center gap-1.5 style-body-1 text-center underline underline-offset-2 text-brown-600 transition-colors duration-200 cursor-pointer",
    "hover:text-brown-400",
    "active:text-brown-500",
    "disabled:text-brown-600 disabled:opacity-40"
  ),
};

export function ActionButton({
  variant,
  type,
  children,
  className,
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type ?? "button"}
      className={cn(
        variants[variant],
        "disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function NavigationButton(props: NavigationButtonProps) {
  return (
    <Link
      to={props.navigateTo}
      className={cn(
        variants[props.variant],
        "disabled:cursor-not-allowed",
        props.className
      )}
    >
      {props.children}
    </Link>
  );
}
