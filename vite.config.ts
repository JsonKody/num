import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import { splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), splitVendorChunkPlugin(), compression()],
  server: {
    port: 4040,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // priradí knihovny do samostatných chunku podle názvu balícku
            const modules = [
              "vue",
              "pinia",
              "@floating-ui/dom",
              "lodash-es",

              // a další knihovny, které by mohly tvorit významné cásti vašeho kódu
            ];

            const chunkName = modules.find((module) => id.includes(module));
            return chunkName ? `vendor-${chunkName}` : "vendor-others";
          }
        },
        // ...
      },
    },
    chunkSizeWarningLimit: 600, // nebo jakoukoli jinou hodnotu, která je vhodná pro vaši aplikaci
  },
});
