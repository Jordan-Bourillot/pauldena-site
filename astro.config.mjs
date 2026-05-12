import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || "https://pauldena.fr",
  base: process.env.BASE_PATH || "/",
  server: {
    port: 4321,
  },
});
