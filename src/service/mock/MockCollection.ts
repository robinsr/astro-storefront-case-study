import type { IShopifyCollection } from '~/service/shopify/shopify-service';
import type { CollectionResult, CollectionListResult } from '~/service/schemas/collection-schema';
import type { GetQueryVars, ListQueryVars } from '~/service/shopify/collection/collection.store.gql';
import { MOCK_COLLECTIONS } from './data/collections';
import { MOCK_PRODUCTS } from './data/products';

const PAGE_INFO_STATIC = {
  startCursor: null,
  endCursor: null,
  hasNextPage: false,
  hasPreviousPage: false,
};

export default class MockCollection implements IShopifyCollection {
  async get(query: GetQueryVars): Promise<CollectionResult> {
    const colData = MOCK_COLLECTIONS.find((c) => c.handle === query.handle);

    if (!colData) {
      throw new Error(`Mock: collection "${query.handle}" not found`);
    }

    const products = MOCK_PRODUCTS.filter((p) => p.collectionHandles.includes(colData.handle));

    return {
      id: colData.id,
      handle: colData.handle,
      title: colData.title,
      description: colData.description,
      descriptionHtml: colData.descriptionHtml,
      image: colData.image,
      products: {
        filters: [],
        nodes: products as any,
        pageInfo: PAGE_INFO_STATIC,
      },
      itemCount: products.length,
    } as CollectionResult;
  }

  async list(query: ListQueryVars): Promise<CollectionListResult> {
    const smallCollections = MOCK_COLLECTIONS.map((colData) => {
      const products = MOCK_PRODUCTS.filter((p) => p.collectionHandles.includes(colData.handle));
      const tinyProducts = products.map((p) => ({
        schema: 'TinyProductSchema' as const,
        id: p.id,
        title: p.title,
        handle: p.handle,
      }));

      return {
        id: colData.id,
        handle: colData.handle,
        title: colData.title,
        description: colData.description,
        descriptionHtml: colData.descriptionHtml,
        image: colData.image,
        products: {
          filters: [],
          nodes: tinyProducts,
          pageInfo: PAGE_INFO_STATIC,
        },
        itemCount: products.length,
      };
    });

    const edges = smallCollections.map((col, i) => ({
      cursor: `mock-cursor-${i}`,
      node: col,
    }));

    return {
      items: smallCollections,
      collections: {
        edges,
        pageInfo: PAGE_INFO_STATIC,
        totalCount: smallCollections.length,
        items: smallCollections,
      },
    } as CollectionListResult;
  }
}
