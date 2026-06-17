import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://jatskie.com",
  output: "static",
  adapter: cloudflare()
});