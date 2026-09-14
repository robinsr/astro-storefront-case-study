import getLogger from '~/util/log';
import type { ProductVariantResult } from '~/service/schemas/product-schema.ts';
import type { MoneyV2Result } from '~/service/schemas/common-schema.ts';

const log = getLogger('hooks/usePrice');

const currencySymbol = (price: MoneyV2Result, title = '') => {
  const { currencyCode } = price;
  switch (currencyCode) {
    case 'USD':
      return '$';
    default:
      log.error(`Unknown currency code "${currencyCode}" for product "${title}"`);
      return '';
  }
};

export const displayPrice = (price: MoneyV2Result) => ({
  symbol: currencySymbol(price),
  amount: price.amount.toFixed(2),
  currencyCode: price.currencyCode,
});

export const variantPrice = (variant: ProductVariantResult) => displayPrice(variant.price);
