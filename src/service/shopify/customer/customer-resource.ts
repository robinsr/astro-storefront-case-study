import type {
  CustomerAccessTokenResult, CustomerResult, CustomerWithCartIdResult,
} from '~/service/schemas/customer-schema';
import { shopifyStorefront, shopifyAdmin } from '../client';
import getLogger from '~/util/log';
import { toGlobalId, concatErrors } from '../shopify-util';
import FetchError from '~/service/errors/FetchError';
import {
  CreateCustomerSchema,
  GetCustomerAccessTokenSchema,
  GetCustomerCartSchema,
  AddCartIDMetafieldSchema,
} from '~/service/schemas/customer-schema';
import {
  CreateCustomerMutation,
  GetCustomerAccessTokenMutation,
  GetCustomerInfoQuery
} from './customer.store.gql';
import { AddCartIDMetafieldMutation } from './customer.admin.gql';
import type { IShopifyCustomer } from '../shopify-service';

const log = getLogger('service/shopify/auth');

export default class ShopifyCustomer implements IShopifyCustomer {
  async create(email: string, password: string, buyerIp: string): Promise<CustomerResult> {
    const vars = { email, password };

    const result = await shopifyStorefront(CreateCustomerMutation, vars, buyerIp);

    log.debug(result);

    const parsed = CreateCustomerSchema.safeParse(result);

    if (!parsed.success) {
      throw new FetchError(concatErrors('CreateCustomerSchema', parsed.error.errors));
    }

    const { customerUserErrors, customer } = parsed.data.customerCreate;

    if (customerUserErrors?.length) {
      throw new FetchError(concatErrors('CreateCustomerMutation', customerUserErrors));
    }

    return customer as CustomerResult;
  }

  async login(email: string, password: string, buyerIp: string): Promise<CustomerAccessTokenResult> {
    const vars = { email, password };

    const result = await shopifyStorefront(GetCustomerAccessTokenMutation, vars, buyerIp);

    log.debug(result)

    const parsed = GetCustomerAccessTokenSchema.safeParse(result);

    if (!parsed.success) {
      throw new FetchError(concatErrors('CustomerAccessTokenSchema', parsed.error.errors));
    }

    const { customerUserErrors, customerAccessToken } = parsed.data.customerAccessTokenCreate;

    if (customerUserErrors?.length) { {
      throw new FetchError(concatErrors('GetCustomerAccessTokenMutation', customerUserErrors));}
    }

    return customerAccessToken as CustomerAccessTokenResult;

  }

  async get(customerAccessToken: string, buyerIp: string): Promise<CustomerWithCartIdResult> {
    const vars = { customerAccessToken };

    const result = await shopifyStorefront(GetCustomerInfoQuery, vars, buyerIp);
    const parsed = GetCustomerCartSchema.safeParse(result);

    if (!parsed.success) {
      throw new FetchError(concatErrors('CustomerAccessTokenSchema', parsed.error.errors));
    }

    const { userErrors, customerUserErrors, customer } = parsed.data;

    if (userErrors) {
      throw new FetchError(concatErrors('GetCustomerInfoQuery', userErrors));
    }

    if (customerUserErrors?.length) {
      throw new FetchError(concatErrors('GetCustomerInfoQuery', customerUserErrors));
    }

    return customer as CustomerWithCartIdResult;
  }

  async linkCart(customerId: string, cartId: string): Promise<CustomerWithCartIdResult> {
    const vars = { customerId, cartId };

    const result = await shopifyAdmin(AddCartIDMetafieldMutation, vars);
    const parsed = AddCartIDMetafieldSchema.safeParse(result);

    if (!parsed.success) {
      throw new FetchError(concatErrors('CreateCustomerSchema', parsed.error.errors));
    }

    const { userErrors, customer } = parsed.data.customerUpdate;

    if (userErrors?.length) {
      throw new FetchError(concatErrors('AddCartIDMetafieldMutation', userErrors));
    }

    return customer as CustomerWithCartIdResult;
  }
}
