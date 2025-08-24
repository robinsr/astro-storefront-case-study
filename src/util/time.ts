

const tMod = {
  seconds: 1,
  minutes: 60,
  hours: 60 * 60,
  days: 60 * 60 * 24,
  weeks: 60 * 60 * 24 * 7,
  months: 60 * 60 * 24 * 30,
  years: 60 * 60 * 24 * 365,
};

export type TimeUnit = keyof typeof tMod;

/**
 * Gets number of seconds from a relative language input
 * @example
 * getSeconds(30, 'days') // 2592000
 * getSeconds(1, 'days') // 86400
 * getSeconds(1, 'hours') // 3600
 * getSeconds(1, 'minutes') // 60
 * getSeconds(1, 'seconds') // 1
 */
export const ttlSeconds = (quantity: number, unit: TimeUnit = 'days') => {
  return tMod[unit] * quantity
}

/**
 * Gets number of minutes from a relative language input
 * @example
 * getMinutes(30, 'days') // 43200
 * getMinutes(1, 'weeks') // 10080
 * getMinutes(1, 'days') // 1440
 * getMinutes(1, 'hours') // 60
 * getMinutes(1, 'minutes') // 1
 */
export const ttlMinues = (quantity: number, expUnit: TimeUnit = 'days') => {
  return (tMod[expUnit] * quantity) / 60;
}

/**
 * Gets the number of seconds from now until the future date
 * @example
 * secondsFromNow(new Date(Date.now() + 1000)) // 1
 * secondsFromNow(new Date(Date.now() + 1000 * 60)) // 60
 * secondsFromNow(new Date(Date.now() + 1000 * 60 * 60)) // 3600
 * @param future
 */
export const toTtlSeconds = (future: Date): number => {
  return Math.floor((future.getTime() - Date.now()) / 1000);
}
