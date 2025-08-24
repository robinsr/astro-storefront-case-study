import type { IShopifyCart, ShopifyClient } from '../shopify-service';
import { toGlobalId, concatErrors } from '../shopify-util';
import * as gql from './cart.store.gql';
import * as schemas from '~/service/schemas/cart-schema';
import FetchError from '~/service/errors/FetchError';
import getLogger from '~/util/log';

const log = getLogger('service/shopify/cart');

export default class ShopifyCart implements IShopifyCart {
  client: ShopifyClient;

  constructor(client: ShopifyClient) {
    this.client = client;
  }

  async create(customerEmail: string, buyerIp: string): Promise<schemas.NewCartResult> {
    const vars = { buyerEmail: customerEmail };
    const result = await this.client.storefront(gql.CreateCartMutation, vars, buyerIp);
    const parsed = schemas.CreateCartSchema.safeParse(result);

    if (!parsed.success) {
      throw new FetchError(concatErrors('CreateCartSchema', parsed.error.errors));
    }

    const { userErrors, cart } = parsed.data.cartCreate;

    if (userErrors?.length) {
      throw new FetchError(concatErrors('CreateCartMutation', userErrors));
    }

    return cart as schemas.NewCartResult;
  }

  async get(cartId: string, buyerIp: string): Promise<schemas.CustomerCartResult> {
    const queryVars = { cartId: toGlobalId(cartId, 'Cart') };
    const result = await this.client.storefront(gql.GetCustomerCartQuery, queryVars, buyerIp);

    if (!result.cart) {
      throw new FetchError(`Cart not found with if "${cartId}"`);
    }

    const parsed = schemas.CustomerCartSchema.safeParse(result.cart);

    if (parsed.success) {
      return parsed.data as schemas.CustomerCartResult;
    }

    throw new FetchError(concatErrors('CustomerCartSchema', parsed.error.errors));
  }

  async getQty(cartId: string, buyerIp: string): Promise<schemas.CartQuantityResult> {
    const queryVars = { cartId: toGlobalId(cartId, 'Cart') };
    const result = await this.client.storefront(gql.GetCartQtyQuery, queryVars, buyerIp);
    
    if (!result.cart) {
      throw new FetchError(`Cart not found with if "${cartId}"`);
    }

    const parsed = schemas.CartQuantitySchema.safeParse(result.cart);

    if (parsed.success) {
      return parsed.data as schemas.CartQuantityResult;
    }

    throw new FetchError(concatErrors('CartQuantitySchema', parsed.error.errors));
  }

  async addItem(cartId: string, variantId: string, quantity: number, buyerIp: string): Promise<schemas.CustomerCartResult> {
    const vars = {
      cartId: toGlobalId(cartId, 'Cart'),
      variantId,
      quantity,
    };

    const result = await this.client.storefront(gql.AddToCartMutation, vars, buyerIp);
    const parsed = schemas.AddToCartSchema.safeParse(result);

    if (!parsed.success) {
      throw new FetchError(concatErrors('CustomerCartSchema', parsed.error.errors));
    }

    const { userErrors, cart } = parsed.data.cartLinesAdd;

    if (userErrors?.length) {
      throw new FetchError(concatErrors('AddToCartMutation', userErrors));
    }

    return cart;
  }


  async removeItem(cartId: string, lineId: string, buyerIp: string): Promise<schemas.CustomerCartResult> {
    const vars = { cartId: toGlobalId(cartId, 'Cart'), lineId };
    const result = await this.client.storefront(gql.RemoveFromCartMutation, vars, buyerIp);

    log.debug('RemoveFromCartMutation result:', result);

    const parsed = schemas.RemoveFromCartSchema.safeParse(result);

    if (!parsed.success) {
      throw new FetchError(concatErrors('CustomerCartSchema', parsed.error.errors));
    }

    const { userErrors, cart } = parsed.data.cartLinesRemove;

    if (userErrors?.length) {
      throw new FetchError(concatErrors('RemoveFromCartMutation', userErrors));
    }

    return cart;
  }

  async updateQty(cartId: string, variantId: string, quantity: number, buyerIp: string): Promise<unknown> {
    return Promise.resolve(undefined);
  }
}
