type ShopifyGlobalType = 'Product' | 'ProductVariant' | 'Cart' | 'Checkout';

export const toGlobalId = (id: string, objectType: ShopifyGlobalType) => {
  const gidPrefix = `gid://shopify/${objectType}/`;

  if (id.startsWith(gidPrefix)) {
    return id;
  } else {
    return gidPrefix + id;
  }
};

/**
 * Shopify's GraphQL API "userErrors" and Zod's "issues" are very similar
 */
interface SchemaOrGraphQLIssue {
  message: string;
  code?: string;
  path?: (string | number)[];
  field?: string | string[];
}

export const concatErrors = (operation: string, issues: SchemaOrGraphQLIssue[]) => {
  return issues
    .map((err, i) => {
      if (err.field) {
        return `${operation} Query Error {${i}} - "${err.field}": ${err.message}`;
      }
      if (err.path) {
        return `${operation} Validation Error {${i}} - "${err.path.join('.')}": ${err.message}`;
      }
    })
    .join('\n');
};
