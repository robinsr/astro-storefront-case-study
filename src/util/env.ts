import type { ImportMetaEnv } from '~/env';

/**
 * DO NOT IMPORT ANY PROJECT MODULES HERE
 */


/**
 * Get environment variable from process.env
 * Pass `import.mets.env` to check first (from vite/Astro)
 */
export const getEnv = (key: keyof ImportMetaEnv, metaEnv?: object, fallback?: unknown) => {
  const value = (() => {
    if (metaEnv && metaEnv[key]) {
      return metaEnv[key];
    } else if (process.env[key]) {
      return process.env[key];
    } else {
      return fallback;
    }
  })();

  if (typeof value === 'undefined') {
    throw new Error(`Environment variable "${key}" not found`);
  }

  return value;
};

/**
 * Check if environment variable is equal to value
 */
export const isEnv = (key: keyof ImportMetaEnv, value: string, metaEnv?: object): boolean => {
  return getEnv(key, metaEnv) === value;
};

export default getEnv;
