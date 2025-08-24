import { z } from 'zod';
import { MoneyV2Schema } from './common-schema';
import { ProductVariantSchema } from './product-schema';

const NewCartSchema = z.object({
  id: z.string(),
});

export type NewCartResult = z.infer<typeof NewCartSchema>;

export const CartQuantitySchema = z.object({
  totalQuantity: z.number().int(),
  id: z.string(),
});

export type CartQuantityResult = z.infer<typeof CartQuantitySchema>;

const CartCostSchema = z.object({
  subtotalAmount: MoneyV2Schema,
  totalAmount: MoneyV2Schema,
  totalDutyAmount: MoneyV2Schema.nullable(),
  totalTaxAmount: MoneyV2Schema.nullable(),
  totalTaxAmountEstimated: z.boolean(),
  totalDutyAmountEstimated: z.boolean(),
  totalAmountEstimated: z.boolean(),
  subtotalAmountEstimated: z.boolean(),
  checkoutChargeAmount: MoneyV2Schema,
});

const CartLineItemSchema = z.object({
  id: z.string(),
  cost: z.object({
    totalAmount: MoneyV2Schema,
  }),
  merchandise: ProductVariantSchema,
  quantity: z.number().int().positive(),
  discountAllocations: z.array(
    z.object({
      allocatedAmount: MoneyV2Schema,
    }),
  ),
});

export const CustomerCartSchema = z.object({
  id: z.string(),
  totalQuantity: z.number().int(),
  buyerIdentity: z.object({
    email: z.string().email().nullable(),
  }),
  checkoutUrl: z.string().url(),
  cost: CartCostSchema,
  lines: z.object({
    nodes: z.array(CartLineItemSchema),
  }),
});

export type CustomerCartResult = z.infer<typeof CustomerCartSchema>;

const UserErrorSchema = z.object({
  code: z.string(),
  field: z.string(),
  message: z.string(),
});

export const CreateCartSchema = z.object({
  cartCreate: z.object({
    cart: z.object({
      id: z.string(),
    }),
    userErrors: z.array(UserErrorSchema).optional(),
  }),
});

export type CreateCartResult = z.infer<typeof CreateCartSchema>;

export const AddToCartSchema = z.object({
  cartLinesAdd: z.object({
    cart: CustomerCartSchema,
    userErrors: z.array(UserErrorSchema).optional(),
  }),
});

export type AddToCartResult = z.infer<typeof AddToCartSchema>;

export const RemoveFromCartSchema = z.object({
  cartLinesRemove: z.object({
    cart: CustomerCartSchema,
    userErrors: z.array(UserErrorSchema).optional(),
  }),
});

export type RemoveFromCartResult = z.infer<typeof RemoveFromCartSchema>;
