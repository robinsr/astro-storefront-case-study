export const FILTER_FRAGMENT = `#graphql
    fragment filterFragment on Filter {
        id
        label
        type
        values {
            id
            count
            input
            label
        }
    }
`;

export const IMAGE_FRAGMENT = `#graphql
    fragment imageFragment on Image {
        id
        altText
        width
        height
        url(transform: { maxHeight: 480, maxWidth: 480 })
    }
`;

export const MONEY_FRAGMENT = `#graphql
    fragment moneyFragment on MoneyV2 {
        amount
        currencyCode
    }
`;

export const PAGE_INFO_FRAGMENT = `#graphql
    fragment pageInfoFragment on PageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
    }
`;
