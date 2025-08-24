🚀 Astro Storefront Case Study
==============================

This project is a **case study implementation** of a modern e-commerce storefront built with [Astro](https://astro.build/), [TypeScript](https://www.typescriptlang.org/), and [Shopify’s Storefront API](https://shopify.dev/docs/api/storefront).

It demonstrates architectural patterns and components I developed while contributing to a client project (Dec 2023 – Feb 2024).
For this public case study, all **client branding, proprietary assets, and third-party contributions have been removed or replaced** with neutral placeholders. The result is a clean, MIT-licensed codebase that highlights my own authored work.

---

## ✨ Features

- **Typed Shopify GraphQL Integration**
  - Strongly-typed data layer for products, collections, and filters
  - Pagination, price filtering, and cursor-based queries

- **Reusable Component System**
  - Product tiles, lists, filters, paginator, add-to-cart flow
  - UI elements including Carousel, Rating, Text, and Button components
  - Hero banner component (using placeholder images)

- **Modern Frontend Stack**
  - Astro + TypeScript + Tailwind CSS
  - Component-driven, mobile-first, accessible design

- **Developer Experience & Testing**
  - Vitest unit tests
  - Playwright end-to-end sanity checks
  - pnpm package manager

- **Deployment Ready**
  - Configured for Railway / Node hosting
  - Mock vs live Shopify API via `.env` flag

---

## 🏗 Architecture Overview

- **Frontend:** Astro + Tailwind components
- **Data Layer:** Type-safe GraphQL queries + schema contracts
- **Pages:** `/parts` index, collection pages, and product detail routes
- **Testing:** Vitest for unit, Playwright for e2e
- **Config:** Astro + Tailwind setup for DX, pnpm for dependency management

---

## 🚀 Getting Started

```bash
git clone https://github.com/robinsr/astro-storefront-case-study
cd astro-storefront-case-study
pnpm install
```

### Run in mock mode (default)

```bash
pnpm dev
```

If you want to connect to a real Shopify store, set environment variables in .env:

```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_API_TOKEN=shpat_XXXX
```

***

## Provenance

This repo re-implements patterns I authored for a client project. Representative commit SHAs from the original private repo:

- Dec 18, 2023 – Basic Shopify integration (e66c006…)
- Dec 27, 2023 – GraphQL filters & pagination (51c84e0…)
- Dec 29, 2023 – Shopify GraphQL refactor & collections (8ae5811…)
- Dec 30, 2023 – Tailwind/DX rework (c3c43ad…)
- Jan 3–4, 2024 – Rating + Carousel (15a307f…, 08e9ced…)
- Jan 26, 2024 – Major refactor squash (b3a82bc…)
- Feb 7–14, 2024 – pnpm switch, deploy cleanup, hero component (940f8a9…, 5f35176…, 9ec63c1…, 23b91ab…)

All client branding and assets have been removed or replaced.


## Why a Case Study?

This repo is not a production storefront.
It is a curated case study designed to showcase my authored engineering work:

- Shopify GraphQL integration with type-safety
- Modern component system in Astro
- Developer tooling, testing, and deployment practices

## License

This project is licensed under the MIT License — see the LICENSE file for details.