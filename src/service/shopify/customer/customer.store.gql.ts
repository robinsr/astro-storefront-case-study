export const CreateCustomerMutation = `#graphql
    mutation CW_SF_CreateCustomerEmailPassword($email: String!, $password: String!) {
        customerCreate(input: {email: $email, password: $password}) {
            customer {
                id
                email
                displayName
                createdAt
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`;

export const GetCustomerAccessTokenMutation = `#graphql
    mutation CW_SF_GetCustomerAccessToken($email: String!, $password: String!) {
        customerAccessTokenCreate(input: { email: $email, password: $password }) {
            customerAccessToken {
                accessToken
                expiresAt
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`;

export const DeleteCustomerAccessTokenMutation = `#graphql
    mutation CW_SF_DeleteCustomerAccessToken($customerAccessToken: String!) {
        customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
            deletedAccessToken
            deletedCustomerAccessTokenId
            userErrors {
                field
                message
            }
        }
    }
`;

export const GetCustomerInfoQuery = `#graphql
    query CW_SF_GetCustomerInfo($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
            id
            email
            displayName
            createdAt
            cartId: metafield(key: "cartid", namespace: "custom") {
                id
                key
                namespace
                type
                value
            }
        }
    }
`;
