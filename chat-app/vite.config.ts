import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3002",
      "/ws": "ws://localhost:3002",
    },
  },
  plugins: [
    TanStackRouterVite({ target: "react" }),
    react(),
    // ...,
  ],
});
