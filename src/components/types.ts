export type ColorVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'muted'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

/**
 * Implemented in global.css as "cs-space-{value}"
 */
export type CustomSpacing = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';

/**
 * These are defined by tailwind; using the defaults here but can be customized and added to in tailwind.config.js
 * See: https://tailwindcss.com/docs/screens
 */
export type ScreenBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
