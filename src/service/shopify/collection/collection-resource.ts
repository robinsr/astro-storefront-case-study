import getLogger from '~/util/log';
import { DEFAULT_PRODUCTS_PER_PAGE } from '~/consts';
import { shopifyStorefront } from '../client';

// Schemas
import { CollectionSchema, CollectionListSchema } from '~/service/schemas/collection-schema';
import type { CollectionResult, CollectionListResult } from '~/service/schemas/collection-schema';
import { keyed } from '~/service/schemas/common-schema';

// GraphQL
import { GetCollectionQuery, ListCollectionsQuery } from './collection.store.gql';
import type { GetQueryVars, ListQueryVars } from './collection.store.gql';
import type { IShopifyCollection } from '../shopify-service';

const log = getLogger('service/shopify/collections');

const queryDefaults = {
  get: {
    first_products: DEFAULT_PRODUCTS_PER_PAGE
  },
  list: {
    first: 10,
    first_products: 0,
  }
}

export default class ShopifyCollection implements IShopifyCollection {
  async get(queryVars: GetQueryVars, buyerIP?: string,): Promise<CollectionResult> {
    try {
      const vars = { ...queryDefaults.get, ...queryVars, };
      const response = await shopifyStorefront(GetCollectionQuery, vars, buyerIP,);
      const result = keyed('collection', CollectionSchema).parse(response) as CollectionResult;
      log.debug('getCollectionByHandle', result);
      return result;
    } catch (error) {
      log.error('ShopifyCollection.get Error', error);
      throw error;
    }
  }

  async list(queryVars: ListQueryVars, buyerIP?: string): Promise<CollectionListResult> {
    try {
      const vars = { ...queryDefaults.list, ...queryVars, };
      const data = await shopifyStorefront(ListCollectionsQuery, vars, buyerIP);
      const result = CollectionListSchema.parse(data);
      log.debug('listCollections', result);
      return result;
    } catch (error) {
      log.error('ShopifyCollection.list Error', error);
      throw error;
    }
  }
}
