/**
 * Builds a set of strings from key-value pairs in a map, intended
 * to product tailwind-style css-classes, eg `[key]:[const][value]`
 *
 * Example:
 * fromStateMap({ default: 'sm', lg: 'md', 2xl: 'lg' }, 'd-btn-')
 * // returns ['d-btn-sm', 'lg:d-btn-md', '2xl:d-btn-lg']
 *
 * fromStateMap({ default: 'red', hover: 'blue', first: 'orange' }, 'text-')
 * // returns [ 'text-red', 'hover:text-blue', 'first:text-orange' ]
 *
 */
export const fromStateMap = (sizeMap: Record<string, string>, styleConst = ''): string[] => {
  const prefixKey = (pref: string) => (pref !== 'default' ? `${pref}:` : '');

  return Object.entries(sizeMap).map(
    ([size, variant]) => `${prefixKey(size)}${styleConst}${variant}`,
  );
};
