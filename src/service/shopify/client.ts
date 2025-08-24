import { getLogger, json } from '~/util';
import { isEnv } from '~/util/env';
import config from './config';

const PROD = isEnv('NODE_ENV', 'production');
const log = getLogger('service/shopify/client');
const br = log.combine(log.color.bold, log.color.red);
const bg = log.combine(log.color.bold, log.color.green);

const getQueryName = (query?: string) => {
  const match = query && query.match(/(?:mutation|query)\s(\w+)/);
  return match && match[1];
};

async function shopifyFetch(apiUrl: string, options: RequestInit = {}) {
  const response = await fetch(apiUrl, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw Error(`${response.status} ${body}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    log.error(errors);
    throw Error(errors.map((e: Error) => e.message).join('\n'));
  }

  return data;
}

export async function shopifyAdmin(query: string, variables: Record<string, unknown> = {}) {
  const apiUrl = `https://${config.domain}/admin/api/${config.apiVersion}/graphql.json`;
  const queryName = getQueryName(query);

  const adminFetchResult = await shopifyFetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': config.token.admin,
    },
    body: json({ query, variables }),
  });

  log.debug(`AdminAPI result: "${br(queryName)}" (${json(variables)}):`, adminFetchResult);

  return adminFetchResult;
}

export async function shopifyStorefront(query: string, variables: Record<string, unknown> = {}, buyerIP: string | undefined) {
  const apiUrl = `https://${config.domain}/api/${config.apiVersion}/graphql.json`;
  const queryName = getQueryName(query);

  const fetchopts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': config.token.storefront,
    },
    body: json({ query, variables }),
  };

  if (buyerIP) {
    fetchopts.headers['X-Shopify-Storefront-Buyer-IP'] = buyerIP;
  } else {
    PROD && log.warn('No buyer IP provided for this Storefront API request');
  }

  try {
    const storefrontFetchResult = await shopifyFetch(apiUrl, fetchopts);
    
    log.debug(`StorefrontAPI result: "${br(queryName)}" (${bg(json(variables))}):`);
    log.debug(storefrontFetchResult);
    
    return storefrontFetchResult;
  } catch (error) {
    log.fatal(`StorefrontAPI result: "${br(queryName)}" (${bg(json(variables))}):`,);
    throw error;
  }
}
