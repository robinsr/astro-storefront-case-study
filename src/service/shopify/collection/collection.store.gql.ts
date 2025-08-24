import { METAFIELD_FRAGMENT } from '../graphql/metafield.store.gql';
import { IMAGE_FRAGMENT, PAGE_INFO_FRAGMENT, FILTER_FRAGMENT } from '../graphql/common.store.gql';
import { SMALL_PRODUCT_FRAGMENT, TINY_PRODUCT_FRAGMENT } from '../product/product.store.gql';

export const SMALL_COLLECTION_FRAGMENT = `#graphql
    fragment smallCollectionFragment on Collection {
        id
        handle
        title
        description
        descriptionHtml
        image {
            ...imageFragment
        }
        products(
            first: $first_products,
            after: $product_start_cursor,
            filters: $filters,
            sortKey: $sortKey,
        ) {
            filters {
                ...filterFragment
            }
            nodes {
                ...tinyProductFragment
            }
            pageInfo {
                ...pageInfoFragment
            }
        }
    }
    ${PAGE_INFO_FRAGMENT}
    ${FILTER_FRAGMENT}
    ${TINY_PRODUCT_FRAGMENT}
    ${IMAGE_FRAGMENT}
`;

export const FULL_COLLECTION_FRAGMENT = `#graphql
    fragment fullCollectionFragment on Collection {
        id
        handle
        title
        description
        descriptionHtml
        image {
            ...imageFragment
        }
        products(
            first: $first_products,
            after: $product_start_cursor,
            filters: $filters,
            sortKey: $sortKey,
        ) {
            filters {
                ...filterFragment
            }
            nodes {
                ...smallProductFragment
            }
            pageInfo {
                ...pageInfoFragment
            }
        }
    }
    ${PAGE_INFO_FRAGMENT}
    ${FILTER_FRAGMENT}
    ${SMALL_PRODUCT_FRAGMENT}
`;

export type ListQueryVars = {
  first?: number;
  first_products?: number;
}

export const ListCollectionsQuery = `#graphql
    query cwListCollections (
        $first: Int!,
        $first_products: Int = 25,
        $product_start_cursor: String,
        $filters: [ProductFilter!] = [],
        $sortKey: ProductCollectionSortKeys = COLLECTION_DEFAULT,
    ) {
        collections(first: $first) {
            edges {
                cursor
                node {
                    ...smallCollectionFragment
                }
            }
            pageInfo {
                ...pageInfoFragment
            }
            totalCount
        }
    }
    ${SMALL_COLLECTION_FRAGMENT}
`;

// TODO - smelly
export interface GetQueryVars {
  handle: string;
  first_products?: number | null;
  product_start_cursor?: string | null;
  first_collections?: number;
  filters?: any[];
  sortKey?: string;
  metafieldIdentifiers?: any[];
  hasMetafields?: boolean;
}

export const GetCollectionQuery = `#graphql
    query cwGetCollection (
        $handle: String,
        $first_products: Int = 50,
        $product_start_cursor: String,
        $filters: [ProductFilter!] = [],
        $sortKey: ProductCollectionSortKeys = COLLECTION_DEFAULT,
#        $selectedOptions: [SelectedOptionInput!]!,
#        $hasSelectedOptions: Boolean = false,
        $metafieldIdentifiers: [HasMetafieldsIdentifier!] = [],
        $hasMetafields: Boolean = false
    ) {
        collection(handle: $handle) {
            ...fullCollectionFragment
            metafields(identifiers: $metafieldIdentifiers) @include (if: $hasMetafields) {
                ...metafieldFragment
            }
        }
    }
    ${FULL_COLLECTION_FRAGMENT}
    ${METAFIELD_FRAGMENT}
`;
