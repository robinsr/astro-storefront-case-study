import type { IShopifyProduct } from '~/service/shopify/shopify-service';
import type { FullProductResult } from '~/service/schemas/product-schema';
import type { GetQueryVars } from '~/service/shopify/product/product.store.gql';
import { MOCK_PRODUCTS } from './data/products';
import { MOCK_COLLECTIONS } from './data/collections';

export default class MockProduct implements IShopifyProduct {
  async get(query: GetQueryVars): Promise<FullProductResult> {
    const p = MOCK_PRODUCTS.find((product) => product.handle === query.handle);

    if (!p) {
      throw new Error(`Mock: product "${query.handle}" not found`);
    }

    const collectionNodes = MOCK_COLLECTIONS.filter((c) =>
      p.collectionHandles.includes(c.handle),
    ).map((c) => ({
      id: c.id,
      handle: c.handle,
      title: c.title,
      description: c.description,
      image: c.image,
    }));

    return {
      schema: 'FullProductSchema' as const,
      id: p.id,
      title: p.title,
      handle: p.handle,
      tags: p.tags,
      productType: p.productType,
      vendor: p.vendor,
      description: p.description,
      options: p.options,
      featuredImage: p.featuredImage,
      images: p.images,
      variants: p.variants,
      collections: { nodes: collectionNodes },
      productRecommendations: [],
    } as FullProductResult;
  }
}
