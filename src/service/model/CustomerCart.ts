export interface CartLineItem {
  // For simplicity just going to use the product's handle
  // NO VARIATIONS SUPPORTED
  id: string;
  quantity: number;
}

export interface CustomerCart {
  items: CartLineItem[];
  shopifyId: string | null;
}

export class Cart implements CustomerCart {
  items: CartLineItem[] = [];
  shopifyId: string | null = null;

  constructor(data?: CustomerCart) {
    if (data && data.items) {
      this.items = data.items;
    }
  }

  public addItem(productId: string, quantity = 1) {
    const inCart = this.items.find(i => i.id === productId);

    if (inCart) {
      inCart.quantity++;
    } else {
      this.items.push({
        id: productId, quantity
      })
    }
  }

  public get qty() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  public toJS(): CustomerCart {
    const { items, shopifyId } = this;
    return { items, shopifyId };
  }
}
