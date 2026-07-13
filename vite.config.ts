import { defineConfig } from "vite";
import sommarkWeb, { themeScript } from "sommark-web";

export default defineConfig({
  plugins: [
    sommarkWeb({
      themeScript: themeScript("dark-mode"),
    }),
  ],
  server: {
    host: true
  }
});
