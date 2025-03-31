import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true,
    assetsDir: "assets",
    rollupOptions: {
      input: "./index.html",
      output: {
        entryFileNames: "assets/[name]-entry.js",
        chunkFileNames: "assets/[name]-chunk.js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});
