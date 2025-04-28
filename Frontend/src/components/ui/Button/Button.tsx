import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  kind?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "small" | "large";
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({
  kind = "primary",
  size = "small",
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = `flex items-center justify-center gap-1 font-medium cursor-pointer transition-all duration-200 ease-in-out`;

  const kindStyles = {
    primary: "bg-blue-12 text-blue-200 hover:bg-blue-900",
    secondary: "bg-blue-300 text-blue-900 hover:bg-blue-400",
    ghost: "bg-transparent text-slate-900 hover:bg-slate-200",
    destructive: "bg-red-800 text-red-200 hover:bg-red-900",
  };

  const sizeStyles = {
    small: "text-sm py-1 px-2",
    large: "text-base py-2 px-4",
  };

  return (
    <button
      className={`${baseStyles} ${kindStyles[kind]} ${sizeStyles[size]}`}
      {...props} // Spread all props (including onClick, disabled, etc.)
    >
      {children}
    </button>
  );
};

export default Button;
