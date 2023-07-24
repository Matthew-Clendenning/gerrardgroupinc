import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: 'https://gerrardgroupinc.com',
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  },
  experimental: {
    assets: true,
  },
  integrations: [react(), sitemap({
    filter: (page) => 
      page !== "https://gerrardgroupinc.com/PacificHP/" && 
      page !== "https://gerrardgroupinc.com/timkenBearings/" && 
      page !== "https://gerrardgroupinc.com/timkenDetails/",
  }), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  })],
});