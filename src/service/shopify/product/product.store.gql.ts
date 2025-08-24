import {
  FILTER_FRAGMENT,
  IMAGE_FRAGMENT,
  MONEY_FRAGMENT,
  PAGE_INFO_FRAGMENT,
} from '../graphql/common.store.gql';

export const SELECTED_OPTION_FRAGMENT = `#graphql
    fragment selectedOptionFragment on SelectedOption {
        name
        value
    }
`;

export const PRODUCT_OPTION_FRAGMENT = `#graphql
    fragment productOptionFragment on ProductOption {
        id
        name
        values
    }
`;

export const PRODUCT_VARIANT_FRAGMENT = `#graphql
    fragment productVariantFragment on ProductVariant {
        id
        title
        availableForSale
        price {
            ...moneyFragment
        }
        compareAtPrice {
            ...moneyFragment
        }
        image {
            ...imageFragment
        }
        selectedOptions {
            ...selectedOptionFragment
        }
        product {
            handle
            title
        }
    }
    ${MONEY_FRAGMENT}
    ${SELECTED_OPTION_FRAGMENT}
`;

export const TINY_PRODUCT_FRAGMENT = `#graphql
    fragment tinyProductFragment on Product {
        id
        title
        handle
    }
`;

export const SMALL_PRODUCT_FRAGMENT = `#graphql
    fragment smallProductFragment on Product {
        id
        title
        handle
        tags
        productType
        vendor
        description
        images(first: 1) {
            nodes {
                ...imageFragment
            }
        }
        featuredImage {
            ...imageFragment
        }
        variants(first: 10) {
            nodes {
                ...productVariantFragment
            }
        }
    }
    ${IMAGE_FRAGMENT}
    ${PRODUCT_VARIANT_FRAGMENT}
`;

export const FULL_PRODUCT_FRAGMENT = `#graphql
    fragment fullProductFragment on Product {
        id
        title
        handle
        tags
        productType
        vendor
        description
        options {
            ...productOptionFragment
        }
        featuredImage {
            ...imageFragment
        }
        collections(first: $first_collections) {
            nodes {
                id
                handle
                title
                description
            }
        }
        images(first: $first_images) {
            nodes {
                ...imageFragment
            }
        }
        variants(first: $first_variants) {
            nodes {
                ...productVariantFragment
            }
        }
    }
    ${PRODUCT_VARIANT_FRAGMENT}
    ${PRODUCT_OPTION_FRAGMENT}
    ${IMAGE_FRAGMENT}
`;

export const ListProductsQuery = `#graphql
    query cwListProducts (
        $first: Int,
        $after: String,
        $query: String
    ) {
        products(first: $first, after: $after, query: $query) {
            edges {
                cursor
                node {
                    ...smallProductFragment
                }
            }
            filters {
                ...filterFragment
            }
            pageInfo {
                ...pageInfoFragment
            }
        }
    }
    ${SMALL_PRODUCT_FRAGMENT}
    ${FILTER_FRAGMENT}
    ${PAGE_INFO_FRAGMENT}
`;

export type GetQueryVars = {
  handle: string;
  first_collections?: number;
  first_images?: number;
  first_variants?: number;
};

export const GetProductQuery = `#graphql
    query cwGetProduct (
        $handle: String,
        $first_collections: Int = 10, 
        $first_images: Int = 50, 
        $first_variants: Int = 10,
    ) {
        product(handle: $handle) {
            ...fullProductFragment
        }
    }
    ${FULL_PRODUCT_FRAGMENT}
`;

export type GetRecsQueryVars = {
  productId: string;
  // https://shopify.dev/docs/api/storefront/2023-10/enums/ProductRecommendationIntent
  intent?: 'RELATED' | 'COMPLEMENTARY';
};

export const ProductRecsQuery = `#graphql
    query cwProductRecs (
        $productId: ID!,
        $intent: ProductRecommendationIntent = RELATED,
    ) {
        productRecommendations(productId: $productId, intent: $intent) {
            ...smallProductFragment
        }
    }
    ${SMALL_PRODUCT_FRAGMENT}
`;
