import ShopifyCart from './cart/cart-resource';
import ShopifyCustomer from './customer/customer-resource';
import ShopifyCollection from './collection/collection-resource';
import ShopifyProduct from './product/product-resource';
import { shopifyStorefront, shopifyAdmin } from './client';


const client = {
  admin: shopifyAdmin,
  storefront: shopifyStorefront,
};

export class ShopifyService {
  public cart: ShopifyCart;
  public customer: ShopifyCustomer;
  public collection: ShopifyCollection;
  public product: ShopifyProduct;

  constructor() {
    this.cart = new ShopifyCart(client);
    this.customer = new ShopifyCustomer();
    this.collection = new ShopifyCollection();
    this.product = new ShopifyProduct();
  }
}

export default new ShopifyService();
