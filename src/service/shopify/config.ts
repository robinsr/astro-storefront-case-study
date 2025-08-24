import getLogger from '~/util/log';
import getEnv from '~/util/env';
const log = getLogger('service/shopify/config');

const SHOPIFY_API_VERSION = '2023-10';

const config = {
  apiVersion: SHOPIFY_API_VERSION,
  domain: getEnv('SHOPIFY_STORE_DOMAIN'),
  token: {
    storefront: getEnv('SHOPIFY_STOREFRONT_TOKEN'),
    admin: getEnv('SHOPIFY_ADMIN_TOKEN'),
  },
};

log.info('Shopify config:', config);

export default config;
