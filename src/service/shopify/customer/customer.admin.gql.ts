// Admin API
export const AddCartIDMetafieldMutation = `#graphql
    mutation CW_Admin_AddCustomerCartId(
        $customerId: ID!,
        $cartId: String!,
    ) {
        customerUpdate(
            input: {
                id: $customerId,
                metafields: {
                    key: "cartid",
                    namespace: "custom",
                    value: $cartId,
                }
            }
        ) {
            customer {
                id
                email
                displayName
                createdAt
                cartId: metafield(key: "cartid", namespace: "custom") {
                    key
                    namespace
                    type
                    value
                }
            }
            userErrors {
                field
                message
            }
        }
    }
`;

// Admin API
export const AddAnyMetafieldMutation = `#graphql
    mutation CW_Admin_AddCustomerMetafield(
        $customerId: ID!,
        $metaNamespace: String!,
        $metaKey: String!,
        $metaValue: String!,
    ) {
        customerUpdate(
            input: {
                id: $customerId,
                metafields: {
                    key: $metaKey,
                    namespace: $metaNamespace,
                    value: $metaValue,
                }
            }
        ) {
            customer {
                displayName
                email
                firstName
                id
                metafield(key: $metaKey, namespace: $metaNamespace) {
                    key
                    namespace
                    type
                    value
                }
            }
            userErrors {
                field
                message
            }
        }
    }
`;