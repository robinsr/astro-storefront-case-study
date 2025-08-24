import type { NewCartResult, CartQuantityResult, CustomerCartResult } from '~/service/schemas/cart-schema';
import type {
  CustomerResult,
  CustomerAccessTokenResult,
  CustomerWithCartIdResult,
} from '~/service/schemas/customer-schema.ts';
import type { CollectionListResult, CollectionResult } from '~/service/schemas/collection-schema';
import type { GetQueryVars, ListQueryVars } from './collection/collection.store.gql';
import type { FullProductResult } from '~/service/schemas/product-schema';
import type { GetQueryVars as ProductQv } from './product/product.store.gql';

export interface ShopifyClient {
  admin: (query: string, variables?: Record<string, unknown>) => Promise<any>;
  storefront: (query: string, variables?: Record<string, unknown>, buyerIp?: string) => Promise<any>;
}

export interface IShopifyCart {
  create: (customerEmail: string, buyerIp: string) => Promise<NewCartResult>;
  get: (cartId: string, buyerIp: string) => Promise<CustomerCartResult>;
  getQty: (cartId: string, buyerIp: string) => Promise<CartQuantityResult>;
  addItem: (cartId: string, variantId: string, quantity: number, buyerIp: string) => Promise<CustomerCartResult>;
  updateQty: (cartId: string, variantId: string, quantity: number, buyerIp: string) => Promise<unknown>;
  removeItem: (cartId: string, lineId: string, buyerIp: string) => Promise<CustomerCartResult>;
}

export interface IShopifyCustomer {
  create: (email: string, password: string, buyerIp: string) => Promise<CustomerResult>;
  login: (email: string, password: string, buyerIp: string) => Promise<CustomerAccessTokenResult>;
  get: (customerAccessToken: string, buyerIp: string) => Promise<CustomerWithCartIdResult>;
  linkCart: (customerId: string, cartId: string, buyerIp: string) => Promise<CustomerWithCartIdResult>;
}

export interface IShopifyCollection {
  get: (query: GetQueryVars, buyerIp?: string) => Promise<CollectionResult>;
  list: (query: ListQueryVars, buyerIp?: string) => Promise<CollectionListResult>;
}

export interface IShopifyProduct {
  get: (query: ProductQv, buyerIp?: string) => Promise<FullProductResult>;
}
