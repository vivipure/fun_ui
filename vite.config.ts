import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import DefineOptions from "unplugin-vue-define-options/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), DefineOptions()],
  build: {
    lib: {
      entry: "packages/components/index.ts",
      name: "funui",
      formats: ["umd", "iife"],
      fileName: "funui.js",
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./packages/styles/variable.scss";',
      },
    },
  },
});
