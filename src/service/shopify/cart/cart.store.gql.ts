import { PRODUCT_VARIANT_FRAGMENT } from '../product/product.store.gql';
import { IMAGE_FRAGMENT } from '../graphql/common.store.gql';

const CART_COST_FRAGMENT = `#graphql
    fragment cartCostFragment on CartCost {
        # The estimated total cost of all merchandise that the customer will pay at checkout.
        totalAmount {
            amount
            currencyCode
        }
        # The estimated amount, before taxes and discounts, for the customer to pay at checkout.
        subtotalAmount {
            amount
            currencyCode
        }
        # The estimated tax amount for the customer to pay at checkout.
        totalTaxAmount {
            amount
            currencyCode
        }
        # The estimated duty amount for the customer to pay at checkout.
        totalDutyAmount {
            amount
            currencyCode
        }
        totalTaxAmountEstimated
        totalDutyAmountEstimated
        totalAmountEstimated
        subtotalAmountEstimated
        checkoutChargeAmount {
            amount
            currencyCode
        }
    }
`;

const CUSTOMER_CART_FRAGMENT = `#graphql
    fragment customerCartFragment on Cart {
        id
        totalQuantity
        buyerIdentity {
            email
        }
        checkoutUrl
        cost {
            ...cartCostFragment
        }
        lines(first: 10) {
            nodes {
                id
                cost {
                    totalAmount {
                        amount
                        currencyCode
                    }
                }
                merchandise {
                    ... on ProductVariant {
                        ...productVariantFragment
                    }
                }
                quantity
                discountAllocations {
                    discountedAmount {
                        amount
                        currencyCode
                    }
                }
            }
        }
    }
    ${CART_COST_FRAGMENT}
    ${PRODUCT_VARIANT_FRAGMENT}
    ${IMAGE_FRAGMENT}
`;

export const GetCartQtyQuery = `#graphql
    query CWGetCartQty($cartId: ID!) {
        cart(id: $cartId) {
            id
            totalQuantity
        }
    }
`;

export const GetCustomerCartQuery = `#graphql
    query CWGetCustomerCart($cartId: ID!) {
        cart(id: $cartId) {
            ...customerCartFragment
        }
    }
    ${CUSTOMER_CART_FRAGMENT}
`;

export const CreateCartMutation = `#graphql
    mutation CWCreateCart(
        $buyerEmail: String!,
    ) {
        cartCreate(input: {buyerIdentity: {email: $buyerEmail}}) {
            userErrors {
                code
                field
                message
            }
            cart {
                id
            }
        }
    }
`;

export const AddToCartMutation = `#graphql
    mutation CWAddToCart(
        $cartId: ID!,
        $variantId: ID!,
        $quantity: Int!
    ) {
        cartLinesAdd(
            cartId: $cartId
            lines: [{ merchandiseId: $variantId, quantity: $quantity }]
        ) {
            cart {
                ...customerCartFragment
            }
        }
    }
    ${CUSTOMER_CART_FRAGMENT}
`;

export const RemoveFromCartMutation = `#graphql
    mutation DeleteItemFromCart(
        $cartId: ID!, 
        $lineId: ID!,
    ) {
        cartLinesRemove(cartId: $cartId, lineIds: [$lineId]) {
            userErrors {
                code
                field
                message
            }
            cart {
                ...customerCartFragment
            }
        }
    }
    ${CUSTOMER_CART_FRAGMENT}
`;
