import { z } from 'zod';
import type { FullProductResult, ProductResult } from '~/service/schemas/product-schema';
import type { ImageResult } from '~/service/schemas/common-schema';
import { FALLBACK_IMG } from '~/consts';

/**
 * Product model used for rendering items on parts/store pages
 */
export type StoreItem = {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  tags: string[];
  images: {
    main: ImageResult;
    alt?: ImageResult[];
  };
  collections?: {
    id: string;
    handle: string;
    title: string;
    description: string;
    image: ImageResult;
  }[];
};

/**
 * Maps a {@link FullProductSchema} to a template-able {@link StoreItem}
 */
export const fromSchema = (item: ProductResult): StoreItem => {
  if (item.schema === 'TinyProductSchema') {
    throw new Error('Cannot convert TinyProductSchema to StoreItem');
  }

  const storeItem = {
    id: item.id,
    handle: item.handle,
    title: item.title,
    description: item.description,
    price: item.variants.nodes[0].price.amount,
    images: {
      main: item.featuredImage ? item.featuredImage : item.images?.nodes?.at(0) ?? FALLBACK_IMG,
      alt: item.images.nodes.map((image) => image || FALLBACK_IMG),
    },
    tags: item.tags,
  };

  if (item.schema === 'FullProductSchema') {
    item = item as FullProductResult;

    Object.assign(storeItem, {
      collections: item.collections.nodes.map((collection) => ({
        id: collection.id,
        handle: collection.handle,
        title: collection.title,
        description: collection.description,
        image: collection.image || FALLBACK_IMG,
      })),
      images: {
        main: item.featuredImage || FALLBACK_IMG,
        alt: item.images.nodes.map((image) => image || FALLBACK_IMG),
      },
    });
  }

  return storeItem;
};

const IMG_SM = 300;
const IMG_MD = 480;
const IMG_LG = 960;

// CopyPasted from https://github.com/Shopify/js-buy-sdk/blob/main/src/image-helpers.js
const resizeImage = (image: ImageResult, dimensions: { w: number; h: number }): string => {
  const { w = IMG_SM, h = IMG_SM } = dimensions;

  const splitUrl = (image?.url || FALLBACK_IMG.url).split('?');
  const notQuery = splitUrl[0];
  const query = splitUrl[1] ? `?${splitUrl[1]}` : '';

  // Use the section before the query
  const imageTokens = notQuery.split('.');

  // Take the token before the file extension and append the dimensions
  const imagePathIndex = imageTokens.length - 2;

  imageTokens[imagePathIndex] = `${imageTokens[imagePathIndex]}_${w}x${h}`;

  return `${imageTokens.join('.')}${query}`;
};
