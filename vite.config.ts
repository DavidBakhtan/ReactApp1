import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",       
    port: 8080,       
    proxy: {
      "/api": {
        target: "http://localhost:3001", // json-server
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ""), // /api/bookings -> /bookings
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
