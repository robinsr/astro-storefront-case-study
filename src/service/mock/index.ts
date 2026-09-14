import MockCart from './MockCart';
import MockCustomer from './MockCustomer';
import MockCollection from './MockCollection';
import MockProduct from './MockProduct';

export class MockShopifyService {
  public cart = new MockCart();
  public customer = new MockCustomer();
  public collection = new MockCollection();
  public product = new MockProduct();
}

export default new MockShopifyService();
