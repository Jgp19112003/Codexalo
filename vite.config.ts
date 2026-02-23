import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimizaciones para SEO y rendimiento
    cssCodeSplit: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
        },
      },
    },
    // Mejorar caché
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
  },
  // Precargar fuentes y recursos
  server: {
    headers: {
      "Cache-Control": "public, max-age=31536000",
    },
  },
});
