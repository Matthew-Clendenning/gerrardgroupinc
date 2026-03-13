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
    lastmod: new Date(),
    filter: (page) =>
      page !== "https://gerrardgroupinc.com/PacificHP/" &&
      page !== "https://gerrardgroupinc.com/timkenBearings/" &&
      page !== "https://gerrardgroupinc.com/timkenDetails/",
    serialize(item) {
      const url = item.url;
      // Homepage
      if (url === 'https://gerrardgroupinc.com/' || url === 'https://gerrardgroupinc.com') {
        item.priority = 1.0;
        item.changefreq = 'weekly';
      }
      // Product listing page
      else if (url.includes('/liquidations')) {
        item.priority = 0.9;
        item.changefreq = 'weekly';
      }
      // Individual product pages (active for sale)
      else if (
        url.includes('pacific-hydraulic-press') ||
        url.includes('air-compressor') ||
        url.includes('sullair') ||
        url.includes('gernetti-band-saw')
      ) {
        item.priority = 0.8;
        item.changefreq = 'weekly';
      }
      // Blog pages
      else if (url.includes('/blog')) {
        item.priority = 0.7;
        item.changefreq = 'weekly';
      }
      // Auctions page
      else if (url.includes('/auctions')) {
        item.priority = 0.7;
        item.changefreq = 'monthly';
      }
      // Services page
      else if (url.includes('/services')) {
        item.priority = 0.6;
        item.changefreq = 'monthly';
      }
      // Contact page
      else if (url.includes('/contact')) {
        item.priority = 0.5;
        item.changefreq = 'monthly';
      }
      // Sold items
      else if (
        url.includes('cooling-towers') ||
        url.includes('palletJackDetails') ||
        url.includes('rackingDetails')
      ) {
        item.priority = 0.3;
        item.changefreq = 'yearly';
      }
      // Default
      else {
        item.priority = 0.5;
        item.changefreq = 'monthly';
      }
      return item;
    },
  })],
});
