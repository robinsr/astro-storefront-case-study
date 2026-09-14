import { defineMiddleware } from 'astro:middleware';
import { LIGHT_THEME } from '~/consts.themes.ts';

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.isSignedIn = false;
  context.locals.theme = LIGHT_THEME;
  return next();
});
