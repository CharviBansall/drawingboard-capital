import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
    },
  },
});
