import { DARK_THEME, LIGHT_THEME } from '~/consts.themes.ts';

export const useTheme = (prop?: string) => {
  const dataAttrs: {
    'data-theme'?: string;
  } = {};

  if (prop && prop === 'light') {
    dataAttrs['data-theme'] = LIGHT_THEME;
  }

  if (prop && prop === 'dark') {
    dataAttrs['data-theme'] = DARK_THEME;
  }

  return dataAttrs;
};
