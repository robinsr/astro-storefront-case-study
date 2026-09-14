/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type Alpine from 'alpinejs';

interface ImportMetaEnv {
  readonly SHOPIFY_MOCK?: string;
  readonly SHOPIFY_STORE_DOMAIN?: string;
  readonly SHOPIFY_STOREFRONT_TOKEN?: string;
  readonly SHOPIFY_ADMIN_TOKEN?: string;
  readonly SESSION_SECRET?: string;
}

declare global {
  namespace App {
    interface Locals {
      theme: string;
      isSignedIn: boolean;
    }
  }

  interface Window {
    session: boolean;
    Alpine: typeof Alpine;
  }
}