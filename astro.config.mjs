import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://gerrardgroupinc.netlify.app',
  integrations: [react(), partytown(), sitemap()]
});