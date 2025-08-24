import { z } from 'astro:content';
import { paramsToMap } from '~/util/request';

import { DEFAULT_SHOPIFY_COLLECTION, DEFAULT_PRODUCTS_PER_PAGE } from '~/consts';

export type ShopifySortKey =
  | 'BEST_SELLING'
  | 'CREATED_AT'
  | 'ID'
  | 'PRICE'
  | 'PRODUCT_TYPE'
  | 'RELEVANCE'
  | 'TITLE'
  | 'UPDATED_AT'
  | 'VENDOR';

const sortKeys = [
  'newest',
  'bestselling',
  'title-desc',
  'title-asc',
  'price-desc',
  'price-asc',
  // 'featured' // todo - not a normal sort key
  // 'rating' // todo - not a normal sort key
] as const;

const getSortConfig = (sortKey: string): [ShopifySortKey, boolean] => {
  switch (sortKey) {
    case 'newest':
      return ['CREATED_AT', false];
    case 'bestselling':
      return ['BEST_SELLING', false];
    case 'title-desc':
      return ['TITLE', false];
    case 'title-asc':
      return ['TITLE', true];
    case 'price-desc':
      return ['PRICE', true];
    case 'price-asc':
      return ['PRICE', false];
    default:
      return ['PRICE', true];
  }
};

/**
 * Filters supported on product listing pages
 */
export interface ProductsFilterQueryParams {
  collection: string;
  limit: number;
  before?: string;
  after?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  priceMax?: number;
  priceMin?: number;
  sort: [ShopifySortKey, boolean];
}

const ProductQuerySchema = z
  .object({
    collection: z.string().default(DEFAULT_SHOPIFY_COLLECTION.NAME),
    limit: z.optional(z.coerce.number()).default(DEFAULT_PRODUCTS_PER_PAGE),
    before: z.optional(z.coerce.string()),
    after: z.optional(z.coerce.string()),
    category: z.optional(z.coerce.string()),
    subcategory: z.optional(z.coerce.string()),
    brand: z.optional(z.coerce.string()),
    priceMax: z.optional(z.coerce.number()),
    priceMin: z.optional(z.coerce.number()),
    sort: z
      .optional(z.enum(sortKeys))
      .default('bestselling')
      .transform((val) => getSortConfig(val)),
  })
  .passthrough();

type ProductGetQuery = z.infer<typeof ProductQuerySchema>;

/**
 * Maps pagination query parameters:
 * - "b" -> before
 * - "a" -> after
 *
 * Not really important, just trying things out
 */
const beforeAfterCursorMap = z.preprocess((data: object) => {
  return { before: data['b'], after: data['a'], ...data };
}, ProductQuerySchema);

export const parseFilterParams = (params: URLSearchParams): ProductsFilterQueryParams => {
  return beforeAfterCursorMap.parse(paramsToMap(params)) as ProductGetQuery;
};
