import Alpine from 'alpinejs';

const STORAGE_KEY = 'cw-cart';

export type CartItem = {
  variantId: string;
  productHandle: string;
  title: string;
  variantTitle: string;
  priceAmount: number;
  priceCurrency: string;
  imageUrl: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  qty: number;
  subtotal: number;
  addItem(item: Omit<CartItem, 'quantity'>): void;
  removeItem(variantId: string): void;
  updateQty(variantId: string, delta: number): void;
  clear(): void;
  save(): void;
};

document.addEventListener('alpine:init', () => {
  Alpine.store('cart', {
    items: [] as CartItem[],

    init() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          this.items = JSON.parse(saved);
        } catch {}
      }
    },

    get qty(): number {
      return this.items.reduce((t, i) => t + i.quantity, 0);
    },

    get subtotal(): number {
      return this.items.reduce((t, i) => t + i.priceAmount * i.quantity, 0);
    },

    addItem(item: Omit<CartItem, 'quantity'>) {
      const existing = this.items.find((i) => i.variantId === item.variantId);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
      this.save();
    },

    removeItem(variantId: string) {
      this.items = this.items.filter((i) => i.variantId !== variantId);
      this.save();
    },

    updateQty(variantId: string, delta: number) {
      const item = this.items.find((i) => i.variantId === variantId);
      if (item) {
        item.quantity = Math.max(0, item.quantity + delta);
        if (item.quantity === 0) {
          this.removeItem(variantId);
        } else {
          this.save();
        }
      }
    },

    clear() {
      this.items = [];
      this.save();
    },

    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    },
  } as CartStore & { init(): void });
});

declare global {
  interface Window {
    addToCart(event: MouseEvent): void;
  }
}

window.addToCart = (event: MouseEvent) => {
  const btn = (event.currentTarget ?? event.target) as HTMLElement;
  (Alpine.store('cart') as CartStore).addItem({
    variantId: btn.dataset.variantId ?? '',
    productHandle: btn.dataset.productHandle ?? '',
    title: btn.dataset.productTitle ?? '',
    variantTitle: btn.dataset.variantTitle ?? '',
    priceAmount: parseFloat(btn.dataset.priceAmount ?? '0'),
    priceCurrency: btn.dataset.priceCurrency ?? 'USD',
    imageUrl: btn.dataset.imageUrl ?? '',
  });
};
