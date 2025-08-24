
/**
 * Get a logger for a named module.
 *
 * Usage:
 *
 * ```ts
 * const log = getLogger('service/shopify/cart');
 * log.info('Cart created', { cartId: '123' });
 * ```
 *
 * @param name - The name of the module to log to.
 * @returns A logger for the given module.
 */
function getLogger(name: string) {
  return {
    info: (...args: unknown[]) => console.info(`[${name}]`, ...args),
    log: (...args: unknown[]) => console.log(`[${name}]`, ...args),
    debug: (...args: unknown[]) => console.debug(`[${name}]`, ...args),
    error: (...args: unknown[]) => console.error(`[${name}]`, ...args),
    fatal: (...args: unknown[]) => {
      console.error(`[${name}] FATAL`, ...args);
      process.exitCode = 1; // optional
    },
  };
}

export default getLogger;
