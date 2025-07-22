// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    // Configure platform proxy for local development
    platformProxy: {
      enabled: true,
      configPath: 'wrangler.toml'
    },
    // Runtime configuration
    runtime: {
      mode: 'local',
      type: 'pages'
    },
  }),
  // Environment-specific settings
  vite: {
    define: {
      __WORKER_ENV__: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }
});
