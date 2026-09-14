export const onBeforePrepare = (callback: () => void) => {
  document.addEventListener('astro:before-preparation', callback, { once: true });
};

export const onEveryBeforePrepare = (callback: () => void) => {
  document.addEventListener('astro:before-preparation', callback);
};

export const onAfterPrepare = (callback: () => void) => {
  document.addEventListener('astro:after-preparation', callback, { once: true });
};

export const onEveryAfterPrepare = (callback: () => void) => {
  document.addEventListener('astro:after-preparation', callback);
};

export const onBeforeSwap = (callback: () => void) => {
  document.addEventListener('astro:before-swap', callback, { once: true });
};

export const onEveryBeforeSwap = (callback: () => void) => {
  document.addEventListener('astro:before-swap', callback);
};

export const onAfterSwap = (callback: () => void) => {
  document.addEventListener('astro:after-swap', callback, { once: true });
};

export const onEveryAfterSwap = (callback: () => void) => {
  document.addEventListener('astro:after-swap', callback);
};

export const onPageLoad = (callback: () => void) => {
  document.addEventListener('astro:page-load', callback, { once: true });
};

export const onEveryPageLoad = (callback: () => void) => {
  document.addEventListener('astro:page-load', callback);
};
