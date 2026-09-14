// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'http://localhost:4321',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  integrations: [
    icon()
  ]
});