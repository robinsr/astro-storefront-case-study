import getLogger from '~/util/log';
import { shopifyStorefront } from '../client';
import FetchError from '~/service/errors/FetchError';
import type { IShopifyProduct } from '../shopify-service';
import { concatErrors } from '../shopify-util';

// Schemas
import { type FullProductResult, FullProductSchema, } from '~/service/schemas/product-schema';

// GraphQL
import { type GetQueryVars, GetProductQuery, ProductRecsQuery } from './product.store.gql';

const log = getLogger('service/shopify/product');

export default class ShopifyProduct implements IShopifyProduct {

  async get(query: GetQueryVars, buyerIP?: string): Promise<FullProductResult> {
    const response = await shopifyStorefront(GetProductQuery, query, buyerIP);
    const parsed = FullProductSchema.safeParse(response.product);

    log.debug('getProductByHandle', parsed);

    if (!parsed.success) {
      throw new FetchError(concatErrors('FullProductSchema', parsed.error.errors));
    }

    const product = parsed.data;

    if (product.options?.length) {
      product.options = product.options.map((option) => {
        if (option.name === 'Title') {
          option.name = 'Size';
        }
        return option;
      });
    }

    if (product && product.id) {
      const recs = await shopifyStorefront(ProductRecsQuery, { productId: product.id }, buyerIP);
      return FullProductSchema.parse({ ...product, ...recs });
    }

    return product as FullProductResult;
  };
}
