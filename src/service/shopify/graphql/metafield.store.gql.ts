export const METAOBJECTFIELD_FRAGMENT = `#graphql
    fragment metaobjectFieldFragment on MetaobjectField {
        key
    }
`;

export const METAOBJECT_FRAGMENT = `#graphql
    fragment metaobjectFragment on Metaobject {
        id
        handle
        type
        updatedAt
    }
    ${METAOBJECTFIELD_FRAGMENT}
`;

export const METAFIELD_FRAGMENT = `#graphql
    fragment metafieldFragment on Metafield {
        namespace
        key
        description
        value
    }
`;
