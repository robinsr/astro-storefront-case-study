# Astro Storefront Case Study

A working extract of the storefront I built for [CWMoto](https://www.cwmoto.com), a PNW road racing team and motorcycle performance shop, between December 2023 and February 2024. I was the sole engineer on the project. The site is live and has been in continuous production since launch.

The full engagement covered the whole stack: an Astro + TypeScript frontend against Shopify's Storefront API, tRPC for end-to-end type safety between client and server, Redis-backed sessions and cart persistence, a Content Collections CMS for team and sponsor content, a race calendar, Vitest and Playwright test suites, and a containerized deploy on Railway with health checks and restart policies. The brief was unusual in that the site had to serve two different revenue streams — race sponsorship and suspension services — from one set of pages, and had to be fast on phones, because a meaningful share of the audience opens it from a race paddock.

**This repo is a subset.** It contains the storefront and component patterns I authored, with client branding, proprietary assets, and third-party contributions removed or replaced by neutral placeholders, under an MIT license. It runs standalone in mock mode.

---

## What's in here

- **Typed Shopify GraphQL integration** — strongly-typed data layer for products, collections, and filters, with pagination, price filtering, and cursor-based queries
- **A reusable component system** — product tiles, lists, filters, paginator, add-to-cart flow, plus Carousel, Rating, Text, and Button primitives
- **Astro + TypeScript + Tailwind** — component-driven, mobile-first, accessible
- **Testing and DX** — Vitest unit tests, Playwright end-to-end checks, pnpm
- **Deployment** — configured for Railway / Node hosting, with mock vs. live Shopify switched by an `.env` flag

## Architecture

- **Frontend:** Astro + Tailwind components
- **Data layer:** type-safe GraphQL queries and schema contracts
- **Pages:** `/parts` index, collection pages, product detail routes
- **Testing:** Vitest (unit), Playwright (e2e)

## Getting started

```bash 
git clone https://github.com/robinsr/astro-storefront-case-study
cd astro-storefront-case-study
pnpm install
pnpm dev    # runs in mock mode
```

To connect a real Shopify store, set these in `.env`:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_API_TOKEN=shpat_XXXX
```

## Provenance

This repo re-implements patterns I authored for the client project. Representative commit SHAs from the original private repo:

- Dec 18, 2023 – Basic Shopify integration (e66c006…)
- Dec 27, 2023 – GraphQL filters & pagination (51c84e0…)
- Dec 29, 2023 – Shopify GraphQL refactor & collections (8ae5811…)
- Dec 30, 2023 – Tailwind/DX rework (c3c43ad…)
- Jan 3–4, 2024 – Rating + Carousel (15a307f…, 08e9ced…)
- Jan 26, 2024 – Major refactor squash (b3a82bc…)
- Feb 7–14, 2024 – pnpm switch, deploy cleanup, hero component (940f8a9…, 5f35176…, 9ec63c1…, 23b91ab…)

## About this kind of work

This is roughly the size and shape of engagement I take on independently: a real business with a real deadline, where one engineer owns the problem from the data layer through deployment and the thing has to keep working afterward.

📬 [hi@ryanryan.net](mailto:hi@ryanryan.net) · [ryanryan.net](https://ryanryan.net) · [LinkedIn](https://www.linkedin.com/in/ryanbrobinson/)