import { z } from 'zod';
import { ImageSchema, MoneyV2Schema } from './common-schema';

export const SelectedOptionSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export const ProductOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  values: z.array(z.string()),
});

export const ProductVariantSchema = z.object({
  id: z.string(),
  title: z.string(),
  availableForSale: z.boolean(),
  price: MoneyV2Schema,
  compareAtPrice: MoneyV2Schema.nullable().optional(),
  image: ImageSchema,
  selectedOptions: z.array(SelectedOptionSchema),
  product: z.object({
    handle: z.string(),
    title: z.string(),
  }),
});

export type ProductVariantResult = z.infer<typeof ProductVariantSchema>;

export const TinyProductSchema = z.object({
  schema: z.literal('TinyProductSchema').default('TinyProductSchema'),
  id: z.string(),
  title: z.string(),
  handle: z.string(),
});

// @ts-ignore(2322)
export type TinyProductResult = z.infer<typeof TinyProductSchema>;

export const SmallProductSchema = z.object({
  schema: z.literal('SmallProductSchema').default('SmallProductSchema'),
  id: z.string(),
  title: z.string(),
  handle: z.string(),
  tags: z.array(z.string()),
  productType: z.string().optional(),
  vendor: z.string().optional(),
  description: z.string(),
  featuredImage: ImageSchema,
  images: z.object({
    nodes: z.array(ImageSchema),
  }),
  variants: z.object({
    nodes: z.array(ProductVariantSchema),
  }),
});

// @ts-ignore(2322)
export type SmallProductResult = z.infer<typeof SmallProductSchema>;

/**
 * Schema for {@link FULL_PRODUCT_FRAGMENT}
 */
export const FullProductSchema = z.object({
  schema: z.literal('FullProductSchema').default('FullProductSchema'),
  id: z.string(),
  title: z.string(),
  handle: z.string(),
  tags: z.array(z.string()),
  productType: z.string().optional(),
  vendor: z.string().optional(),
  description: z.string(),
  // descriptionHtml: z.string(),
  options: z.array(ProductOptionSchema).nullable(),
  featuredImage: ImageSchema,
  collections: z.object({
    nodes: z.array(
      z.object({
        id: z.string(),
        handle: z.string(),
        title: z.string(),
        description: z.string(),
        image: ImageSchema,
      }),
    ),
  }),
  images: z.object({
    nodes: z.array(ImageSchema),
  }),
  variants: z.object({
    nodes: z.array(ProductVariantSchema),
  }),
  metafields: z.any().optional(),
  productRecommendations: z.array(SmallProductSchema).optional().default([]),
  // variantBySelectedOptions: ProductVariantResult.nullable().optional()
});

export type FullProductResult = z.infer<typeof FullProductSchema>;

export const ProductSchema = z.discriminatedUnion('schema', [
  FullProductSchema,
  SmallProductSchema,
  TinyProductSchema,
]);

export type ProductResult = z.infer<typeof ProductSchema>;
