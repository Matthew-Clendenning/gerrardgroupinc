import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://gerrardgroupinc.com',
  output: 'static',
  prefetch: {
    prefetchAll: true
  },
  build: {
    inlineStylesheets: 'auto'
  },
  integrations: [react(), sitemap({
    priority: 0.9,
    lastmod: new Date(),
    changefreq: 'weekly',
    filter: (page) =>
      page !== "https://gerrardgroupinc.com/PacificHP/" &&
      page !== "https://gerrardgroupinc.com/timkenBearings/" &&
      page !== "https://gerrardgroupinc.com/timkenDetails/",
  })],
});
