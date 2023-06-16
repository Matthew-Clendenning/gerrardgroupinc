import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: 'https://gerrardgroupinc.netlify.app',
  experimential: {
    assets: true,
  },
  integrations: [react(), sitemap({
    filter: page => page !== "https://gerrardgroupinc.netlify.app/PacificHP/" && page !== "https://gerrardgroupinc.netlify.app/timkenBearings/" && page !== "https://gerrardgroupinc.netlify.app/timkenDetails/"
  }), image()],
});