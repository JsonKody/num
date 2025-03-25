import { defineConfig } from "vite";
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from "@vitejs/plugin-vue";
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  server: {
    port: 4040,
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes("node_modules")) {
  //           // priradí knihovny do samostatných chunku podle názvu balícku
  //           const modules = [
  //             "vue",
  //             "pinia",
  //             "@floating-ui/dom",
  //             "lodash-es",

  //             // a další knihovny, které by mohly tvorit významné cásti vašeho kódu
  //           ];

  //           const chunkName = modules.find((module) => id.includes(module));
  //           return chunkName ? `vendor-${chunkName}` : "vendor-others";
  //         }
  //       },
  //       // ...
  //     },
  //   },
  //   chunkSizeWarningLimit: 600, // nebo jakoukoli jinou hodnotu, která je vhodná pro vaši aplikaci
  // },
});
