import { createGlobalTheme, createTheme } from "@vanilla-extract/css";
import {
  slate,
  red,
  green,
  yellow,
  slateDark,
  redDark,
  greenDark,
  yellowDark,
  slateA,
  slateDarkA,
  redA,
  redDarkA,
  greenA,
  greenDarkA,
  yellowA,
  yellowDarkA,
} from "@radix-ui/colors";
import { blue, blueDark } from "../tokens/brand-blue";

// 1. Global theme for light mode (always injected)
export const vars = createGlobalTheme(":root", {
  colors: {
    ...slate,
    ...red,
    ...green,
    ...yellow,
    ...slateA,
    ...redA,
    ...greenA,
    ...yellowA,
    ...blue,
  },
});

// 2. Dark mode theme (scoped, opt-in)
export const darkTheme = createTheme(vars, {
  colors: {
    ...slateDark,
    ...redDark,
    ...greenDark,
    ...yellowDark,
    ...slateDarkA,
    ...redDarkA,
    ...greenDarkA,
    ...yellowDarkA,
    ...blueDark,
  },
});
