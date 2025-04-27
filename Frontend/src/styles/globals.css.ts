import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./themes/theme.css";

globalStyle("body", {
  minWidth: "100vw",
  minHeight: "100vh",
  backgroundColor: vars.colors.slate2,
  color: vars.colors.blue12,
  transition: "background-color 0.3s ease, color 0.3s ease",
});

globalStyle("*", {
  fontFamily: "'Geist', sans-serif",
});
