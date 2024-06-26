import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    server: {
      deps: {
        inline: ["vuetify"],
      },
    },
    environment: "jsdom",
  },
  resolve: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname, 
    }
  },
});
