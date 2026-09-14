# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # start dev server (http://localhost:4321)
pnpm build      # production build
pnpm preview    # preview production build
```

No test runner is wired up yet (README mentions Vitest/Playwright as planned, but neither is configured in `package.json`).

## Environment variables

Copy `.env.example` (not yet created) or set these manually for live Shopify:

```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=shpat_XXXX
SHOPIFY_ADMIN_TOKEN=shpat_XXXX
NODE_ENV=development
```

`src/util/env.ts` reads from both `import.meta.env` (Vite/Astro) and `process.env`. Missing required vars throw at import time, not at request time — so startup will fail loudly if they're absent. The Shopify API version is pinned to `2023-10` in `src/service/shopify/config.ts`.

## Architecture

**Server-side rendering** — `astro.config.mjs` uses `output: 'server'` with the Node standalone adapter. All pages are SSR by default; there's no static export.

**Data layer** lives entirely in `src/service/shopify/`:
- `client.ts` — raw `shopifyStorefront()` and `shopifyAdmin()` fetch wrappers
- `index.ts` — exports a singleton `ShopifyService` with `.cart`, `.customer`, `.collection`, `.product` sub-resources
- Each resource folder (e.g. `product/`) contains a resource class and the associated GraphQL query strings (`.gql.ts` files)
- Zod schemas for API responses live in `src/service/schemas/`

**Component system** in `src/components/elements/`:
- Components are polymorphic Astro components using `Polymorphic<{as: Tag, ...}>` from `astro/types`
- `Text.astro` is the canonical example: a `type` prop selects a semantic preset (e.g. `page-h1`, `product-title`) that maps to both an HTML tag and Tailwind classes. Additional props (`size`, `weight`, `color`, etc.) stack on top.
- `src/components/types.ts` defines shared prop types: `ColorVariant`, `CustomSpacing`, `ScreenBreakpoint`
- `src/util/styles.ts` exports `fromStateMap()` — builds responsive Tailwind class arrays from a breakpoint→value map

**Styling** uses Tailwind CSS v4 (via `@tailwindcss/vite`), DaisyUI v5, and Alpine.js v3 for interactivity.
- DaisyUI prefix is `d-` (e.g. `d-btn`, `d-input`) — configured in `tailwind.config.cjs`
- Two custom DaisyUI themes: `moto-light` and `moto-dark`; dark mode toggled via `[data-theme="moto-dark"]` attribute
- Custom spacing utilities `cw-space-{xs|sm|md|lg|xl|2xl}` are defined in `src/styles/global.css`
- `tailwind.config.cjs` has an extensive `safelist` of regex patterns to prevent purging dynamically-assembled class names

**Alpine.js** is initialized in `BaseLayout.astro` on `astro:page-load` (compatible with Astro view transitions). The `window.Alpine` global and `window.session` boolean are declared in `src/env.d.ts`.

**Path alias** — `~` maps to `src/` (configured in `tsconfig.json`). Use `~/components/...`, `~/service/...`, etc.

## Component dev pages

`/components/*` routes under `src/pages/components/` are a live component kitchen-sink, not application pages. Use `pnpm dev` and visit `/components` to browse them. See `src/pages/components/README.md` for the full catalog.

## Key conventions

- `src/consts.ts` is the single source of truth for site-wide constants (nav items, hero images, Shopify defaults, image fallbacks). The `SITE_TITLE` is "CW Moto" — the neutral placeholder brand for this case study.
- GraphQL query strings are kept in `.gql.ts` files alongside their resource class, not in separate `.graphql` files.
- Logging uses a custom `getLogger(namespace)` from `src/util/log.ts` — prefer it over `console.*`.
