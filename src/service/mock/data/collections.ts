import type { ImageResult } from '~/service/schemas/common-schema';

export type MockCollectionData = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  image: ImageResult;
};

const img = (handle: string, text: string): ImageResult => ({
  id: `mock-img-col-${handle}`,
  altText: text,
  url: `https://placehold.co/800x400/212529/e35927?text=${encodeURIComponent(text)}`,
  width: 800,
  height: 400,
});

export const MOCK_COLLECTIONS: MockCollectionData[] = [
  {
    id: 'gid://shopify/Collection/200000000001',
    handle: 'suspension',
    title: 'Suspension',
    description: 'Fork springs, rear shocks, and cartridge upgrade kits for road racing and track day bikes.',
    descriptionHtml: '<p>Fork springs, rear shocks, and cartridge upgrade kits for road racing and track day bikes.</p>',
    image: img('suspension', 'Suspension Parts'),
  },
  {
    id: 'gid://shopify/Collection/200000000002',
    handle: 'brakes',
    title: 'Brakes',
    description: 'High-performance brake pads, rotors, braided lines, and master cylinders for track use.',
    descriptionHtml: '<p>High-performance brake pads, rotors, braided lines, and master cylinders for track use.</p>',
    image: img('brakes', 'Brake Components'),
  },
  {
    id: 'gid://shopify/Collection/200000000003',
    handle: 'race-consumables',
    title: 'Race Consumables',
    description: 'Race-compound tires, engine oils, chains, and other consumables for track day and competition.',
    descriptionHtml: '<p>Race-compound tires, engine oils, chains, and other consumables for track day and competition.</p>',
    image: img('race-consumables', 'Race Consumables'),
  },
];
