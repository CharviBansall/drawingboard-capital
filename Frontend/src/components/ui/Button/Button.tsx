import { button } from "./Button.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = RecipeVariants<typeof button> & {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({
  variant = "primary",
  size = "large",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={button({ variant, size })} // Dynamically apply styles
      {...props} // All native button props (like onClick) are passed down
    >
      {children}
    </button>
  );
};

export default Button;
