import { z } from 'zod';

const CustomerSchema = z.object({
  id: z.string(),
  email: z.string(),
  displayName: z.string(),
  createdAt: z.string(),
});

export type CustomerResult = z.infer<typeof CustomerSchema>;

const CustomerWithCartIdSchema = CustomerSchema.extend({
  cartId: z
    .object({
      key: z.string(),
      namespace: z.string(),
      type: z.string(),
      value: z.string(),
    })
    .nullable(),
});

export type CustomerWithCartIdResult = z.infer<typeof CustomerWithCartIdSchema>;

const CustomerUserErrorSchema = z.object({
  code: z.string(),
  field: z.array(z.string()),
  message: z.string(),
});

const UserErrorSchema = z.object({
  field: z.array(z.string()),
  message: z.string(),
});

export const CreateCustomerSchema = z.object({
  customerCreate: z.object({
    customer: CustomerSchema.nullable(),
    customerUserErrors: z.array(CustomerUserErrorSchema).nullable(),
  }),
});

export type CreateCustomerResult = z.infer<typeof CreateCustomerSchema>;

export const GetCustomerCartSchema = z.object({
  customer: CustomerWithCartIdSchema,
  customerUserErrors: z.array(CustomerUserErrorSchema).nullable().optional(),
  userErrors: z.array(UserErrorSchema).nullable().optional(),
});

export type GetCustomerInfoResult = z.infer<typeof GetCustomerCartSchema>;

export const CustomerAccessTokenSchema = z.object({
  accessToken: z.string(),
  expiresAt: z.coerce.date(),
});

export type CustomerAccessTokenResult = z.infer<typeof CustomerAccessTokenSchema>;

export const GetCustomerAccessTokenSchema = z.object({
  customerAccessTokenCreate: z.object({
    customerAccessToken: CustomerAccessTokenSchema.nullable(),
    customerUserErrors: z.array(CustomerUserErrorSchema).nullable(),
  }),
});

export const AddCartIDMetafieldSchema = z.object({
  customerUpdate: z.object({
    customer: CustomerWithCartIdSchema,
    userErrors: z.array(UserErrorSchema).nullable(),
  }),
});

export type AddCartIDMetafieldResult = z.infer<typeof AddCartIDMetafieldSchema>;
