import type { CookieSetOptions } from './types';
import { ttlSeconds, type TimeUnit } from './time';
import getEnv from '~/util/env';


const ONE_YEAR = ttlSeconds(1, 'years');

export const cookieProps = (
  url: URL,
  expVal: number = 365,
  expUnit: TimeUnit = 'days',
): CookieSetOptions => {
  return {
    httpOnly: true,
    secure: getEnv('NODE_ENV') === 'production',
    domain: url.hostname,
    maxAge: Math.min(ONE_YEAR, ttlSeconds(expVal, expUnit)),
    path: '/',
    // sameSite: 'strict',
  };
};
