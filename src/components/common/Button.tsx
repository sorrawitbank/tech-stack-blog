import { Link } from "react-router-dom";
import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "text";

interface ActionButtonProps {
  /**
   * Variant of button - "primary", "secondary", or "text" only
   */
  variant: ButtonVariant;
  children: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
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
  primary:
    "flex justify-center items-center gap-1.5 h-12 px-10 py-3 text-body-1 text-center text-white bg-brown-600 rounded-full transition-colors duration-200 cursor-pointer hover:bg-brown-400 active:bg-brown-500 disabled:opacity-40",
  secondary:
    "flex justify-center items-center gap-1.5 h-12 px-10 py-3 text-body-1 text-center text-brown-600 border border-brown-400 rounded-full transition-colors duration-200 cursor-pointer hover:text-brown-400 active:text-brown-500 disabled:border-brown-600 disabled:opacity-40",
  text: "flex justify-center items-center gap-1.5 text-body-1 text-center underline underline-offset-2 text-brown-600 transition-colors duration-200 cursor-pointer hover:text-brown-400 active:text-brown-500 disabled:opacity-40",
};

export function ActionButton(props: ActionButtonProps) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(variants[props.variant], props.className)}
    >
      {props.children}
    </button>
  );
}

export function NavigationButton(props: NavigationButtonProps) {
  return (
    <Link
      to={props.navigateTo}
      className={cn(variants[props.variant], props.className)}
    >
      {props.children}
    </Link>
  );
}
