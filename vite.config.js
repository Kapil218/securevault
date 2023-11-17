import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      stream: "stream-browserify",
      os: "os-browserify/browser",
      util: "util",
      process: "process/browser",
      buffer: "buffer",
    },
  },
});
