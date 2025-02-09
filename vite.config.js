import path from "path"
import react from "@vitejs/plugin-react"
// import tailwindConfig from "tailwind.config"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
