import React from "react";

type ButtonVariant = "primary" | "secondary" | "text";

interface NavigationProps {
  /**
   * Variant of button - "primary", "secondary", or "text" only
   */
  variant: ButtonVariant;
  children: React.ReactNode;
  href?: string;
}

const styles: Record<ButtonVariant, string> = {
  primary:
    "flex justify-center items-center gap-1.5 h-12 px-10 py-3 text-body-1 text-white bg-brown-600 rounded-full transition-colors duration-200 cursor-pointer hover:bg-brown-400 active:bg-brown-500 disabled:opacity-40",
  secondary:
    "flex justify-center items-center gap-1.5 h-12 px-10 py-3 text-body-1 text-brown-600 border border-brown-400 rounded-full transition-colors duration-200 cursor-pointer hover:text-brown-400 active:text-brown-500 disabled:border-brown-600 disabled:opacity-40",
  text: "flex justify-center items-center gap-1.5 text-body-1 underline text-brown-600 transition-colors duration-200 cursor-pointer hover:text-brown-400 active:text-brown-500 disabled:opacity-40",
};

export function NavigationButton({ variant, children, href }: NavigationProps) {
  return (
    <a href={href} className={styles[variant]}>
      {children}
    </a>
  );
}
