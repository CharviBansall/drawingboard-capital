import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactX from "eslint-plugin-react-x";

export default {
  ignores: ["dist"],
  extends: [
    js.configs.recommended,
    ...tsPlugin.configs.strictTypeChecked,
    ...tsPlugin.configs.stylisticTypeChecked,
  ],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    parser: tsParser, // Use TypeScript parser
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "react-x": reactX,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    ...reactX.configs["recommended-typescript"].rules,
  },
};
