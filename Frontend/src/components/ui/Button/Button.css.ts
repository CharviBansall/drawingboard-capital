import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/styles/themes/theme.css";

export const button = recipe({
  base: {
    padding: "0.4rem 0.8rem",
    borderRadius: "4px",
    fontWeight: 400,
    border: "1px solid transparent",
    cursor: "pointer",
    transition: "background-color 0.2s ease, color 0.2s ease",
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.colors.blue9,
        color: "white",
        borderColor: vars.colors.blue7,
        ":hover": {
          backgroundColor: vars.colors.blue4,
        },
      },
      secondary: {
        backgroundColor: "gray",
        color: "black",
        borderColor: "gray",
        ":hover": {
          backgroundColor: "darkgray",
        },
      },
    },
    size: {
      small: {
        fontSize: "12px",
      },
      large: {
        fontSize: "16px",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "large",
  },
});
