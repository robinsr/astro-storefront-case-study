import type { IShopifyCart } from '~/service/shopify/shopify-service';
import type { NewCartResult, CartQuantityResult, CustomerCartResult } from '~/service/schemas/cart-schema';

const ZERO_MONEY = { amount: 0, currencyCode: 'USD' };

const EMPTY_CART: CustomerCartResult = {
  id: 'mock-cart-id',
  totalQuantity: 0,
  buyerIdentity: { email: null },
  checkoutUrl: 'https://example.com/checkout',
  cost: {
    subtotalAmount: ZERO_MONEY,
    totalAmount: ZERO_MONEY,
    totalDutyAmount: null,
    totalTaxAmount: null,
    totalTaxAmountEstimated: false,
    totalDutyAmountEstimated: false,
    totalAmountEstimated: false,
    subtotalAmountEstimated: false,
    checkoutChargeAmount: ZERO_MONEY,
  },
  lines: { nodes: [] },
};

export default class MockCart implements IShopifyCart {
  async create(_email: string, _ip: string): Promise<NewCartResult> {
    return { id: 'mock-cart-id' };
  }

  async get(_cartId: string, _ip: string): Promise<CustomerCartResult> {
    return EMPTY_CART;
  }

  async getQty(_cartId: string, _ip: string): Promise<CartQuantityResult> {
    return { id: 'mock-cart-id', totalQuantity: 0 };
  }

  async addItem(_cartId: string, _variantId: string, _qty: number, _ip: string): Promise<CustomerCartResult> {
    return EMPTY_CART;
  }

  async updateQty(_cartId: string, _variantId: string, _qty: number, _ip: string): Promise<unknown> {
    return EMPTY_CART;
  }

  async removeItem(_cartId: string, _lineId: string, _ip: string): Promise<CustomerCartResult> {
    return EMPTY_CART;
  }
}
