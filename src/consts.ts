// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { LinkTreeNode, HeroSlide } from './util/types';
import getEnv from './util/env';
import getLogger from './util/log';

const log = getLogger('consts');

const NODE_ENV = getEnv('NODE_ENV', import.meta.env);

log.info('NODE_ENV:', NODE_ENV);

export const SITE_TITLE = 'CW Moto';
export const SITE_DESCRIPTION = 'CW Moto - Shop & Racing';
export const PAGE_TRANSITIONS = false;
export const NO_CACHE = ['parts', 'users', 'api'];

export const CALENDAR_ICS =
  'https://outlook.office365.com/owa/calendar/7f123e85345d49d2b95fdab3ee2ff54e@cwmoto.com/0732fd45f6ba4adaa3d30f93f49e0e8a13338273716546968137/calendar.ics';

export const DEFAULT_SHOPIFY_COLLECTION = {
  NAME: 'all-parts',
  id: '0123456789', // todo
};

export const DEFAULT_PRODUCTS_PER_PAGE = 50;

/**
 * Configuration for site-wide header navigation
 */
export const MAIN_MENU_ITEMS: LinkTreeNode[] = [
  {
    label: 'The Shop',
    url: null,
    items: [
      {
        label: 'Suspension',
        url: '/suspension',
        items: [],
      },
      {
        label: 'Parts',
        url: '/parts',
        items: [],
      },
      {
        label: 'Ebay Store',
        url: 'https://www.ebay.com/sch/i.html?_ssn=cw_moto_racing&store_name=counterweightmotorsport&_oac=1',
        items: [],
      },
    ],
  },
  {
    label: 'The Team',
    url: null,
    items: [
      {
        label: 'Sponsors',
        url: '/sponsors',
        items: [],
      },
      {
        label: 'Gear',
        url: '/gear',
        items: [],
      },
      {
        label: 'Races',
        url: '/races',
        items: [],
      },
    ].filter((item) => NODE_ENV === 'development' || item.label !== 'Dev'),
  },
];

export const BRAND_LOGO_PATH = '/images/CWMoto_PrimaryHZ_2CLR_cropped.png';

export const HERO_IMAGES: HeroSlide[] = [
  {
    imageUrl: '/images/hero_1.jpg',
    imageAlt: 'CW-Moto Racing Team',
    url: '/',
    title: 'CW Moto',
    text: 'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.',
  },
  {
    imageUrl: '/images/hero_2.jpg',
    imageAlt: 'CW-Moto Racing Team',
    url: '/',
    title: 'CW Moto',
    text: 'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.',
  },
  {
    imageUrl: '/images/hero_3.jpg',
    imageAlt: 'CW-Moto Racing Team',
    url: '/',
    title: 'CW Moto',
    text: 'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.',
  },
];

const imageURLs = {
  development: {
    MISSING_IMG: '/images/cwmoto_gear_pad.png',
    // MISSING_IMG: 'https://placehold.co/480x480/e25926/3c3c3c/?text=null%20image',
  },
  production: {
    MISSING_IMG:
      'https://cdn.shopify.com/s/files/1/0621/9903/8104/products/ktech_img_soon_a_39_1_262.jpg',
  },
  test: {
    MISSING_IMG: '/images/cwmoto_gear_pad.png',
  },
};

export const MISSING_IMG = imageURLs[NODE_ENV].MISSING_IMG;

export const FALLBACK_IMG = {
  url: MISSING_IMG,
  width: 480,
  height: 480,
  altText: 'CW Moto Logo',
  id: 'missing-image',
  styles: 'bg-primary',
};
