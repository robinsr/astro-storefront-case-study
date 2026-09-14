/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type Alpine from 'alpinejs';

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