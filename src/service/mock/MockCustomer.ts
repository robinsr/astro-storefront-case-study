import type { IShopifyCustomer } from '~/service/shopify/shopify-service';
import type { CustomerResult, CustomerAccessTokenResult, CustomerWithCartIdResult } from '~/service/schemas/customer-schema';

const MOCK_CUSTOMER: CustomerWithCartIdResult = {
  id: 'mock-customer-id',
  email: 'demo@example.com',
  displayName: 'Demo User',
  createdAt: new Date().toISOString(),
  cartId: null,
};

export default class MockCustomer implements IShopifyCustomer {
  async create(_email: string, _password: string, _ip: string): Promise<CustomerResult> {
    return {
      id: MOCK_CUSTOMER.id,
      email: MOCK_CUSTOMER.email,
      displayName: MOCK_CUSTOMER.displayName,
      createdAt: MOCK_CUSTOMER.createdAt,
    };
  }

  async login(_email: string, _password: string, _ip: string): Promise<CustomerAccessTokenResult> {
    return {
      accessToken: 'mock-access-token',
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    };
  }

  async get(_token: string, _ip: string): Promise<CustomerWithCartIdResult> {
    return MOCK_CUSTOMER;
  }

  async linkCart(_customerId: string, _cartId: string, _ip: string): Promise<CustomerWithCartIdResult> {
    return MOCK_CUSTOMER;
  }
}
