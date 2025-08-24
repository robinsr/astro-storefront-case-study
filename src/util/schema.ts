/**
 * Schemas shared across front and back end
 */

import { z } from 'zod';

const MSG = {
  email: 'Please enter a valid email address',
  password: 'Please enter a valid password',
  password_short: 'Password must be at least 12 characters',
  password_long: 'Password must be less than 128 characters',
  password_match: "Passwords don't match",
  confirm_password: 'Please confirm your password',
};

const EmailSchema = z
  .string({ required_error: MSG.email })
  .email({ message: MSG.email })
  .describe('Email address');

const PasswordSchema = z
  .string({ required_error: MSG.password })
  .min(12, { message: MSG.password_short })
  .max(128, { message: MSG.password_long })
  .describe('Password');

const ConfirmPasswordSchema = z
  .string({ required_error: MSG.confirm_password })
  .describe('Confirm password');

/**
 * Login parameters
 */
export const LoginInputSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type LoginParams = z.infer<typeof LoginInputSchema>;

const LoginOKSchema = z.object({
  type: z.literal('success'),
  data: z.object({
    userId: z.string(),
    action: z.object({
      type: z.literal('redirect'),
      url: z.string(),
    }),
  }),
});

const LoginDeniedSchema = z.object({
  type: z.literal('denied'),
  data: z.object({
    msg: z.string(),
  }),
});

const LoginNotFoundSchema = z.object({
  type: z.literal('not-found'),
  data: z.object({
    msg: z.string(),
  }),
});

const SigninTakenSchema = z.object({
  type: z.literal('email-taken'),
  data: z.object({
    msg: z.string(),
  }),
});

export const LoginOutputSchema = z.discriminatedUnion('type', [LoginOKSchema, LoginDeniedSchema, LoginNotFoundSchema, SigninTakenSchema]);

export type LoginResult = z.infer<typeof LoginOutputSchema>;


/**
 * User signup parameters
 */
export const RegisterInputSchema = LoginInputSchema.extend({
  confirm_password: ConfirmPasswordSchema,
}).refine((data) => data.password === data.confirm_password, {
  message: MSG.password_match,
  path: ['confirm_password'],
});

export const RegisterOutputSchema = LoginOutputSchema;

/**
 * CartID schema
 * @example 'gid://shopify/Cart/c1-fe0a85a88144acdcf45a53ffb48f187b'
 */
export const CartIdSchema = z
  .string()
  .regex(/^(?:gid:\/\/shopify\/Cart\/)?[a-z0-9]{2}-[a-f0-9]{32}$/);

/**
 * Parameters for adding an item to a cart
 */
export const AddToCartSchema = z.object({
  variantId: z.string(),
  quantity: z.coerce.number(),
});

export type AddToCartParams = z.infer<typeof AddToCartSchema>;

export const DeleteFromCartSchema = z.object({
  lineId: z.string(),
});
