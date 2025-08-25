const colors = require('tailwindcss/colors');

const LIGHT_THEME = 'moto-light';
const DARK_THEME = 'moto-dark';

const palette = {
  cinnabar: '#e35927',
  copper: '#883517',
  clink: '#361509',
  siren: '#820346',
  purple_heart: '#5927e3',
  picton_blue: '#27b1e3',
  shark: '#212529',
  outerspace: '#343a40',
  nepal: '#8CA5BD',
  mystic: '#E8EDF2',
};

const paletteNames = Object.keys(palette);

const customTheme = {
  [LIGHT_THEME]: {
    // Extends "light" theme
    // ...require('daisyui/src/theming/themes')['light'],
    primary: palette.cinnabar,
    'primary-content': palette.mystic,
    secondary: palette.siren,
    accent: palette.picton_blue,
    neutral: palette.mystic,
    'neutral-content': palette.shark,
    '--rounded-btn': '0.3rem',
  },
  [DARK_THEME]: {
    // Extends "light" theme
    // ...require('daisyui/src/theming/themes')['dark'],
    primary: palette.cinnabar,
    secondary: palette.siren,
    accent: palette.picton_blue,
    '--rounded-btn': '0.3rem',
  },
};

const daisyUiConfig = {
  // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
  themes: [customTheme],
  // Name of one of the included themes for dark mode
  // See themes: https://daisyui.com/docs/themes/
  darkTheme: DARK_THEME,
  // applies background color and foreground color for root element by default
  base: true,
  // include daisyUI colors and design decisions for all components
  styled: true,
  // adds responsive and modifier utility classes
  utils: true,
  // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
  prefix: 'd-',
  // Shows info about daisyUI version and used config in the console when building your CSS
  logs: true,
  // The element that receives theme color CSS variables
  themeRoot: ':root',
};

const colorVariants = [
  'primary',
  'secondary',
  'accent',
  'neutral',
  'info',
  'base',
  'success',
  'warning',
  'error',
];

const screenSizes = ['sm', 'md', 'lg', 'xl', '2xl'];
const btnStates = ['active', 'disabled'];
const btnVariants = ['ghost', 'link', 'outline'];
const btnSizes = ['xs', 'sm', 'md', 'lg'];
const btnShapes = ['circle', 'square'];
const btnWidths = ['wide', 'block'];

const btnAll = [
  ...btnStates,
  ...btnVariants,
  ...btnSizes,
  ...btnShapes,
  ...btnWidths,
  ...colorVariants,
];

// Prevent purging of classes that match these patterns
// Many of these are applied conditionally depending on state (eg form validation state)
const safelist = Object.values({
  inputColorVariants: new RegExp(`^d-input-(${colorVariants.join('|')})`),
  textColorVariants: new RegExp(`^text-(${colorVariants.join('|')})-content`),
  bgColorVariants: new RegExp(`^bg-(${colorVariants.join('|')})`),
  btnAllVariants: new RegExp(`^d-btn-(${btnAll.join('|')})`),
  roundedEdges: new RegExp(/rounded-?(?:r|l|t|b|tr|tl|br|bl)*-?(?:none|sm|md|lg|full)$/),
  paletteTextColors: new RegExp(`^text-(${paletteNames.join('|')})`),
  paletteBgColors: new RegExp(`^bg-(${paletteNames.join('|')})`),
  responsiveBtnSizes: new RegExp(`^(${screenSizes.join('|')}):d-btn-(${btnSizes.join('|')})`),
  proseColors: {
    pattern: new RegExp(/^prose-(gray|slate|zinc|neutral|invert)/),
    variants: ['dark'],
  },
}).map((item) => (item instanceof RegExp ? { pattern: item } : item));

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,vue,js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      aspectRatio: {
        '4/1': '4 / 1',
        '3/1': '3 / 1',
      },
    },
    colors: {
      ...colors,
      ...palette,
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-bg-patterns'),
    require('@tailwindcss/typography'),
    // require('daisyui'),
  ],
  // daisyui: daisyUiConfig,
  // darkMode: 'media',
  darkMode: ['class', `[data-theme="${DARK_THEME}"]`],
  safelist,
};
