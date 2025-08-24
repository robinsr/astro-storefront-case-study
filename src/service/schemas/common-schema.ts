import { z } from 'zod';
import { FALLBACK_IMG } from '~/consts';
import { parseJson } from '~/util';

const AnyObjectSchema = z.object({}).passthrough();
const AnyJSONString = z.preprocess((data) => parseJson(data as string), AnyObjectSchema);

const AvailabilityFilterInput = z.object({
  available: z.boolean(),
});

const ProductTagFilterInput = z.object({
  tag: z.string(),
});

const ProductTypeFilterInput = z.object({
  productType: z.string(),
});

const PriceFilterInput = z.object({
  price: z.object({
    min: z.number(),
    max: z.number(),
  }),
});

const MetafieldFilterInput = z.object({
  productMetafield: z.object({
    namespace: z.string(),
    key: z.string(),
    value: z.string(),
  }),
});

const VariantOptionFilterInput = z.object({
  variantOption: z.object({
    name: z.string(),
    value: z.string(),
  }),
});

const ListFilterInput = z.union([
  AvailabilityFilterInput,
  ProductTagFilterInput,
  ProductTypeFilterInput,
  MetafieldFilterInput,
  VariantOptionFilterInput,
]);

/**
 * Schema for {@link FILTER_FRAGMENT}.values
 */
export const FilterValueResult = z.object({
  id: z.string(),
  count: z.number().int(),
  label: z.string(),
  input: AnyJSONString,
});

export const BooleanFilterSchema = z.object({
  type: z.literal('BOOLEAN'),
  id: z.string(),
  label: z.string(),
  values: z.array(
    FilterValueResult.extend({
      input: AnyJSONString,
    }),
  ),
});

export const ListFilterSchema = z.object({
  type: z.literal('LIST'),
  id: z.string(),
  label: z.string(),
  values: z.array(
    FilterValueResult.extend({
      input: z.preprocess((v) => parseJson(v as string), ListFilterInput),
    }),
  ),
});

export type ListFilterResult = z.infer<typeof ListFilterSchema>;

export const PriceRangeFilterSchema = z.object({
  type: z.literal('PRICE_RANGE'),
  id: z.string(),
  label: z.string(),
  values: z.array(
    FilterValueResult.extend({
      input: z.preprocess((v) => parseJson(v as string), PriceFilterInput),
    }),
  ),
});

export type PriceRangerFilterResult = z.infer<typeof PriceRangeFilterSchema>;

/**
 * Schema for {@link FILTER_FRAGMENT}
 */
export const FilterSchema = z.discriminatedUnion('type', [
  BooleanFilterSchema,
  ListFilterSchema,
  PriceRangeFilterSchema,
]);

export type FilterResult = z.infer<typeof FilterSchema>;

/**
 * Schema for {@link IMAGE_FRAGMENT}
 */
export const ImageSchema = z
  .object({
    id: z.string(),
    altText: z.string().nullable(),
    url: z.string(),
    width: z.number().positive().int().optional(),
    height: z.number().positive().int().optional(),
    styles: z.string().optional(),
  })
  .default(FALLBACK_IMG)
  .nullable()
  .transform((val) => {
    return val ?? FALLBACK_IMG;
  });

export type ImageResult = z.infer<typeof ImageSchema>;

/**
 * Schema for {@link MONEY_FRAGMENT}
 */
export const MoneyV2Schema = z.object({
  amount: z.coerce.number(),
  currencyCode: z.string(),
});

export type MoneyV2Result = z.infer<typeof MoneyV2Schema>;

export const HasMetafieldsIdentifier = z.object({
  key: z.string(),
  value: z.string(),
});

/**
 * Schema for {@link PAGE_INFO_FRAGMENT}
 */
export const PageInfoResult = z.object({
  startCursor: z.string().nullable(),
  endCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

export const TotalCountSchema = z.coerce.number();


/**
 * Some queries return a list of nodes, with pagination info and total count. This helper
 * just abstracts the pattern, and makes getting the nodes easier.
 */
export const createEdgesSchema = <I extends z.ZodTypeAny, T = z.infer<I>>(itemSchema: I) => {
  return z.object({
    edges: z.array(z.object({
      cursor: z.string(),
      node: itemSchema,
    })),
    pageInfo: PageInfoResult,
    totalCount: TotalCountSchema,
    items: z.array(z.any()).default([]),
  })
  .transform((data) => ({
      ...data,
      items: data.edges.map((edge) => edge.node) as T[],
    }));
}


/**
 * Many queries are returned within a single top-level key ("collection", "product", etc.)
 * This helper just lets us write the schema for the inner object, and then transform it
 */
export const keyed = <I extends z.ZodTypeAny> (itemKey: string, itemSchema: I) => {
  return z.object({ [itemKey]: itemSchema }).transform((data) => data[itemKey]);
}