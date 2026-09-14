export const $doc = (
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
): void => {
  document.addEventListener(event, handler, options);
};

export const $on = (
  el: Element | Element[],
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
): void => {
  const els = Array.isArray(el) ? el : [el];
  els.forEach((e) => e.addEventListener(event, handler, options));
};
