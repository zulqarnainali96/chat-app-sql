import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/ws": "ws://localhost:3000",
    },
  },
  plugins: [
    // TanStackRouterVite({ target: "react" }),
    react(),
    // ...,
  ],
});
