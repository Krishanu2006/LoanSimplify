import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// This ensures localhost works normally, and GitHub Pages has correct base
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: '/Loansimplify/', 
  };
});
