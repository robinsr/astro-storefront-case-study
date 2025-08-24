import { z } from 'zod';
import { createEdgesSchema, type FilterResult } from './common-schema';
import { FilterSchema, ImageSchema, PageInfoResult } from './common-schema';
import { SmallProductSchema, TinyProductSchema } from './product-schema';

const countItemsInCollection = (filters: FilterResult[]): number => {
  const itemCount =
    filters
      .find((filter) => filter.id === 'filter.v.availability')
      ?.values.find((val) => val.id === 'filter.v.availability.1')?.count || 0;

  return itemCount;
};

export const CollectionSchema = z
  .object({
    id: z.string(),
    handle: z.string(),
    title: z.string(),
    description: z.string(),
    descriptionHtml: z.string(),
    image: ImageSchema,
    products: z.object({
      filters: z.array(FilterSchema),
      nodes: z.array(SmallProductSchema),
      pageInfo: PageInfoResult,
    }),
    itemCount: z.number().default(0),
  })
  .transform((data) => {
    const itemCount = countItemsInCollection(data.products.filters);
    return { ...data, itemCount };
  });

export type CollectionResult = z.infer<typeof CollectionSchema>;

export const SmallCollectionSchema = z
  .object({
    id: z.string(),
    handle: z.string(),
    title: z.string(),
    description: z.string(),
    descriptionHtml: z.string(),
    image: ImageSchema,
    products: z.object({
      filters: z.array(FilterSchema),
      nodes: z.array(TinyProductSchema),
      pageInfo: PageInfoResult,
    }),
    itemCount: z.number().default(0),
  })
  .transform((data) => {
    const itemCount = countItemsInCollection(data.products.filters);
    return { ...data, itemCount };
  });

export type SmallCollectionResult = z.infer<typeof SmallCollectionSchema>;

export const CollectionListSchema = z.object({
  // Providing the specific type parameters here just gives you better code completion when using the parsed data.
  // Will show as SmallCollectionResults[] as opposed to a z.infer<ZEffect<...etc etc>>[]
  collections: createEdgesSchema<typeof SmallCollectionSchema, SmallCollectionResult>(SmallCollectionSchema)
})
  .transform((data) => ({
  ...data, items: data.collections.items
}));

export type CollectionListResult = z.infer<typeof CollectionListSchema>;
