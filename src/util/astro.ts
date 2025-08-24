import type { APIContext, AstroGlobal } from 'astro';

/**
 * This is for typescript to know that the locals object is of type App.AppLocals
 * @param req
 */
export const getAppLocals = (req: AstroGlobal | APIContext): App.Locals => {
  return req.locals as App.Locals;
};
