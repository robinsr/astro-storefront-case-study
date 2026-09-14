import { LIGHT_THEME, DARK_THEME, THEME_COOKIE_NAME } from '~/consts.themes.ts';
import { useMode } from '~/hooks/useMode.ts';

const STORAGE_KEY = THEME_COOKIE_NAME;

type StoredTheme = { time: number; value: string };

export const getUserTheme = (): string | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { time, value } = JSON.parse(raw) as StoredTheme;
    if (Date.now() - time > 1000 * 60 * 60 * 12) return null;
    return value || null;
  } catch {
    return null;
  }
};

export const setTheme = (doc: Document, theme: string) => {
  doc.documentElement.setAttribute('data-theme', theme);
};

export const setUserTheme = (doc: Document, theme: string) => {
  setTheme(doc, theme);
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ time: Date.now(), value: theme }));
};

export const setupTheme = (doc: Document) => {
  const userTheme = getUserTheme();
  if (userTheme) setTheme(doc, userTheme);

  if (useMode('dev')) {
    window.addEventListener('keyup', (e) => {
      if (e.code === 'KeyK' && e.ctrlKey && e.altKey) {
        const current = doc.documentElement.dataset.theme;
        setUserTheme(doc, current === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
      }
    });
  }
};

export const toggleTheme = (doc: Document) => {
  const current = doc.documentElement.dataset.theme;
  setUserTheme(doc, current === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
};

document.addEventListener('astro:before-swap', (ev) => {
  const theme = document.documentElement.dataset.theme || LIGHT_THEME;
  const swapEvent = ev as typeof ev & { newDocument: Document };
  swapEvent.newDocument.documentElement.setAttribute('data-theme', theme);
});
