# Build Progress

Current status of the milestones for this case study. The goal is a standalone, fully runnable storefront demonstrating the same patterns as the production engagement, with real Shopify credentials replaced by a mock data layer.

---

## Milestones

### M1 — Foundation ✅
Core infrastructure: Astro 5 SSR with Node standalone adapter, TypeScript strict mode, pnpm, `~` path alias, Zod v4 for schema validation, global CSS skeleton, `consts.ts` as single source of truth for site-wide constants.

### M2 — Shopify Data Layer ✅
Fully typed GraphQL integration:
- Four resource classes: `ShopifyCart`, `ShopifyCustomer`, `ShopifyCollection`, `ShopifyProduct`
- Zod schemas for all API response shapes (`FullProductSchema`, `SmallProductSchema`, `CollectionSchema`, `CartSchema`, etc.)
- `StoreItem.fromSchema()` — domain model adapter normalizing Shopify's API shapes into a single template-ready type
- `StoreFilter.parseFilterParams()` — Zod-powered URL param parser mapping query strings to typed Shopify GQL variables

### M3 — Component System ✅
~20 UI primitives with polymorphic props (`Polymorphic<{as: Tag}>`), type-safe styling via `fromStateMap()`, and live `/components/*` kitchen-sink pages covering:
- Layout: `ContainerGrid`, `Card`, `Accordion`, `Tabs`, `Carousel`
- Typography: `Text`, `PageTitle`
- Elements: `Button`, `Link`, `Icon`, `Rating`, `Hero`
- Forms: `FormGroup`
- Navigation: `FooterNav`

### M4 — Tailwind v4 Migration ✅
Full migration from `tailwind.config.cjs` (v3 JS config) to CSS-native v4 syntax:
- `@plugin` directives for typography, container-queries, aspect-ratio, bg-patterns, DaisyUI
- Custom `moto-light` / `moto-dark` DaisyUI themes defined as `[data-theme]` blocks with OKLCH color values matching the brand palette
- `@theme` block registering the full 18-color palette as CSS custom properties, generating `bg-*` / `text-*` / `border-*` utilities (`bg-cw_orange`, `text-shark`, etc.)
- `tailwind.config.cjs` deleted — no longer needed in v4

### M5 — Site Shell & Navigation ✅
- `BaseHead.astro` — SEO/OG meta, font preloads, canonical URL, theme initialization
- `Header.astro` — logo, nav links (THE SHOP / THE TEAM), theme toggle button; `transition:persist` for view transitions
- `HeaderLink.astro` — active-state nav link
- `Footer.astro` — column nav from `MAIN_MENU_ITEMS`, placeholder contact link, copyright
- `CartBtn.astro` — live cart count badge via Alpine `$store.cart`
- `src/scripts/handle-theme.ts` — `setupTheme()` / `toggleTheme()` / `setUserTheme()` with `localStorage` persistence and `astro:before-swap` hook for view transition continuity
- `src/middleware.ts` — sets `locals.theme` and `locals.isSignedIn` on every request
- `BaseLayout.astro` — wires all shell components; initializes Alpine on `astro:page-load`

### M6 — Mock Data Layer ✅
Standalone demo mode — no real Shopify credentials required:
- `SHOPIFY_MOCK=true` in `.env` swaps the real service for mock implementations
- `MockProduct`, `MockCollection`, `MockCart`, `MockCustomer` — return typed static fixtures matching all Zod schemas
- 12 mock motorsport products across 3 collections (Suspension, Brakes, Race Consumables) with realistic variants, options, and pricing
- `src/service/shopify/index.ts` — exports `AnyShopifyService` union; selects mock or real at startup

### M7 — Shop / Parts Pages ✅
- `src/pages/parts/index.astro` — collection grid fetched from mock service; filters to collections with items
- `src/pages/parts/categories/[handle].astro` — full collection detail: filter sidebar (checkbox filters, price range), sort select, `ProductTile` grid, cursor-based `ProductPaginator`
- `ProductTile.astro` — skeleton loading, image, title, variant price, Add to Cart button
- `ProductPaginator.astro` — prev/next links from Shopify cursor pageInfo
- `CheckboxFilter.astro` / `PriceRangeFilter.astro` — URL-param-bound filter controls

### M8 — Product Detail Page ✅
- `src/pages/parts/[handle].astro` — product image, description HTML, vendor label, price, Add to Cart
- `VariantSelector.astro` — GET form with `<select>` per product option; `onchange` resubmits to update URL params and re-render the page with the correct variant selected
- URL-driven variant selection: `/parts/k-tech-dds-fork-spring-kit?Spring+Rate=1.0+N%2Fmm` pre-selects the matching variant

### M9 — Cart & Checkout ✅
Client-side cart with localStorage persistence — no server session required:
- `src/scripts/cart.ts` — Alpine `$store.cart` with `addItem`, `removeItem`, `updateQty`, `clear`; persisted to `localStorage` under key `cw-cart`
- `window.addToCart(event)` — reads product/variant/price data from button `data-*` attributes and delegates to the store
- `CartBtn.astro` — live `(N)` count badge driven by `$store.cart.qty`
- `src/pages/users/cart.astro` — full cart page: Alpine `x-for` item table, quantity +/− controls, remove per item, clear all, subtotal, disabled checkout button

### M10 — Index Page ✅
- Hero carousel with 3 slides using `Hero.astro` + `Carousel.astro`, placed in the `after-nav` slot so it spans full width above the content container
- About section with `prose` article
- "Shop by Category" collection grid pulled from the mock service, linking into `/parts/categories/*`

---

## Remaining

### M11 — Testing ⬜
- Vitest: unit tests for `fromStateMap`, `variantPrice`, `parseFilterParams`, Zod schema edge cases
- Playwright: smoke tests for homepage, `/components` index, `/parts` listing, `/parts/categories/suspension`

### M12 — Deployment Polish ⬜
- Add `astro check` to the build script
- Audit `consts.ts` placeholder copy
- Verify Node standalone adapter builds cleanly with `pnpm build`
- Review OG meta image
