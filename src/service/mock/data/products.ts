import type { ImageResult } from '~/service/schemas/common-schema';
import type { ProductVariantResult } from '~/service/schemas/product-schema';

export type MockProductData = {
  id: string;
  schema: 'SmallProductSchema' | 'FullProductSchema';
  title: string;
  handle: string;
  tags: string[];
  productType: string;
  vendor: string;
  description: string;
  descriptionHtml: string;
  collectionHandles: string[];
  featuredImage: ImageResult;
  images: { nodes: ImageResult[] };
  variants: { nodes: ProductVariantResult[] };
  options: { id: string; name: string; values: string[] }[] | null;
};

const img = (handle: string, text: string): ImageResult => ({
  id: `mock-img-${handle}`,
  altText: text,
  url: `https://placehold.co/480x480/212529/e35927?text=${encodeURIComponent(text)}`,
  width: 480,
  height: 480,
});

let _variantSeq = 300000000001;
const nextVid = () => String(_variantSeq++);

const mkVariant = (
  handle: string,
  productTitle: string,
  price: number,
  optionName: string,
  optionValue: string,
): ProductVariantResult => {
  const vid = nextVid();
  return {
    id: `gid://shopify/ProductVariant/${vid}`,
    title: optionValue,
    availableForSale: true,
    price: { amount: price, currencyCode: 'USD' },
    compareAtPrice: null,
    image: img(handle, productTitle),
    selectedOptions: [{ name: optionName, value: optionValue }],
    product: { handle, title: productTitle },
  };
};

const single = (handle: string, title: string, price: number): ProductVariantResult[] => [
  mkVariant(handle, title, price, 'Title', 'Default Title'),
];

export const MOCK_PRODUCTS: MockProductData[] = [
  // ─── Suspension ─────────────────────────────────────────────────────────────

  {
    id: 'gid://shopify/Product/100000000001',
    schema: 'SmallProductSchema',
    title: 'K-Tech DDS Fork Spring Kit',
    handle: 'k-tech-dds-fork-spring-kit',
    tags: ['suspension', 'forks', 'springs', 'k-tech'],
    productType: 'Suspension',
    vendor: 'K-Tech Suspension',
    description:
      'Premium linear fork springs for sportbike track use. Compatible with most 41–48mm fork cartridges. Improve front-end feel and reduce dive under hard braking.',
    descriptionHtml:
      '<p>Premium linear fork springs for sportbike track use. Compatible with most 41–48mm fork cartridges.</p><p>Improve front-end feel and reduce dive under hard braking. Available in 0.05 N/mm increments.</p>',
    collectionHandles: ['suspension'],
    featuredImage: img('k-tech-dds-fork-spring-kit', 'K-Tech DDS'),
    images: { nodes: [img('k-tech-dds-fork-spring-kit', 'K-Tech DDS')] },
    variants: {
      nodes: [
        mkVariant('k-tech-dds-fork-spring-kit', 'K-Tech DDS Fork Spring Kit', 249.0, 'Spring Rate', '0.95 N/mm'),
        mkVariant('k-tech-dds-fork-spring-kit', 'K-Tech DDS Fork Spring Kit', 249.0, 'Spring Rate', '1.0 N/mm'),
        mkVariant('k-tech-dds-fork-spring-kit', 'K-Tech DDS Fork Spring Kit', 249.0, 'Spring Rate', '1.05 N/mm'),
      ],
    },
    options: [
      {
        id: 'gid://shopify/ProductOption/400000000001',
        name: 'Spring Rate',
        values: ['0.95 N/mm', '1.0 N/mm', '1.05 N/mm'],
      },
    ],
  },

  {
    id: 'gid://shopify/Product/100000000002',
    schema: 'SmallProductSchema',
    title: 'K-Tech Razor-R Rear Shock',
    handle: 'k-tech-razor-r-rear-shock',
    tags: ['suspension', 'rear-shock', 'k-tech'],
    productType: 'Suspension',
    vendor: 'K-Tech Suspension',
    description:
      "Full-spec piggyback rear shock with remote preload adjuster. Built to K-Tech's track-proven specification with fully adjustable compression and rebound.",
    descriptionHtml:
      "<p>Full-spec piggyback rear shock with remote preload adjuster. Built to K-Tech's track-proven specification.</p><ul><li>Fully adjustable compression and rebound</li><li>Remote reservoir with external preload adjuster</li><li>Available in 5mm length increments</li></ul>",
    collectionHandles: ['suspension'],
    featuredImage: img('k-tech-razor-r-rear-shock', 'K-Tech Razor-R'),
    images: { nodes: [img('k-tech-razor-r-rear-shock', 'K-Tech Razor-R')] },
    variants: {
      nodes: [
        mkVariant('k-tech-razor-r-rear-shock', 'K-Tech Razor-R Rear Shock', 1195.0, 'Length', '390mm'),
        mkVariant('k-tech-razor-r-rear-shock', 'K-Tech Razor-R Rear Shock', 1195.0, 'Length', '395mm'),
        mkVariant('k-tech-razor-r-rear-shock', 'K-Tech Razor-R Rear Shock', 1195.0, 'Length', '400mm'),
      ],
    },
    options: [
      {
        id: 'gid://shopify/ProductOption/400000000002',
        name: 'Length',
        values: ['390mm', '395mm', '400mm'],
      },
    ],
  },

  {
    id: 'gid://shopify/Product/100000000003',
    schema: 'SmallProductSchema',
    title: 'Andreani Misano Fork Upgrade Kit',
    handle: 'andreani-misano-fork-kit',
    tags: ['suspension', 'forks', 'cartridge', 'andreani'],
    productType: 'Suspension',
    vendor: 'Andreani',
    description:
      'Drop-in cartridge kit converts standard damping-rod forks to a fully adjustable system. Developed in collaboration with MotoGP chassis engineers.',
    descriptionHtml:
      '<p>Drop-in cartridge kit converts standard damping-rod forks to a fully adjustable system. Developed in collaboration with MotoGP chassis engineers.</p><p>Includes cartridges, springs, and all installation hardware. Available for 125cc and 250cc fork tube diameters.</p>',
    collectionHandles: ['suspension'],
    featuredImage: img('andreani-misano-fork-kit', 'Andreani Misano'),
    images: { nodes: [img('andreani-misano-fork-kit', 'Andreani Misano')] },
    variants: {
      nodes: [
        mkVariant('andreani-misano-fork-kit', 'Andreani Misano Fork Upgrade Kit', 449.0, 'Fork Diameter', '41mm'),
        mkVariant('andreani-misano-fork-kit', 'Andreani Misano Fork Upgrade Kit', 449.0, 'Fork Diameter', '43mm'),
        mkVariant('andreani-misano-fork-kit', 'Andreani Misano Fork Upgrade Kit', 449.0, 'Fork Diameter', '48mm'),
      ],
    },
    options: [
      {
        id: 'gid://shopify/ProductOption/400000000003',
        name: 'Fork Diameter',
        values: ['41mm', '43mm', '48mm'],
      },
    ],
  },

  {
    id: 'gid://shopify/Product/100000000004',
    schema: 'SmallProductSchema',
    title: 'Öhlins Linear Fork Spring Kit',
    handle: 'ohlins-linear-spring-kit',
    tags: ['suspension', 'forks', 'springs', 'ohlins'],
    productType: 'Suspension',
    vendor: 'Öhlins',
    description:
      'Factory-wound progressive springs in precise spring weights. Straightforward upgrade for improved front-end feel on stock or upgraded fork cartridges.',
    descriptionHtml:
      '<p>Factory-wound progressive springs in precise spring weights. A straightforward upgrade for improved front-end feel on stock or upgraded fork cartridges.</p>',
    collectionHandles: ['suspension'],
    featuredImage: img('ohlins-linear-spring-kit', 'Öhlins Springs'),
    images: { nodes: [img('ohlins-linear-spring-kit', 'Öhlins Springs')] },
    variants: {
      nodes: [
        mkVariant('ohlins-linear-spring-kit', 'Öhlins Linear Fork Spring Kit', 189.0, 'Spring Rate', '8.5 N/mm'),
        mkVariant('ohlins-linear-spring-kit', 'Öhlins Linear Fork Spring Kit', 189.0, 'Spring Rate', '9.0 N/mm'),
        mkVariant('ohlins-linear-spring-kit', 'Öhlins Linear Fork Spring Kit', 189.0, 'Spring Rate', '9.5 N/mm'),
        mkVariant('ohlins-linear-spring-kit', 'Öhlins Linear Fork Spring Kit', 189.0, 'Spring Rate', '10.0 N/mm'),
      ],
    },
    options: [
      {
        id: 'gid://shopify/ProductOption/400000000004',
        name: 'Spring Rate',
        values: ['8.5 N/mm', '9.0 N/mm', '9.5 N/mm', '10.0 N/mm'],
      },
    ],
  },

  // ─── Brakes ─────────────────────────────────────────────────────────────────

  {
    id: 'gid://shopify/Product/100000000005',
    schema: 'SmallProductSchema',
    title: 'Brembo HP Sintered Front Brake Pads',
    handle: 'brembo-hp-sintered-front-pads',
    tags: ['brakes', 'brake-pads', 'brembo', 'sintered'],
    productType: 'Brakes',
    vendor: 'Brembo',
    description:
      'High-performance sintered compound for aggressive street and light track use. Excellent initial bite from cold, consistent feel through full operating temperature range.',
    descriptionHtml:
      '<p>High-performance sintered compound for aggressive street and light track use.</p><ul><li>Excellent initial bite from cold</li><li>Consistent feel through full operating temperature range</li><li>Direct OEM replacement fitment</li></ul>',
    collectionHandles: ['brakes'],
    featuredImage: img('brembo-hp-sintered-front-pads', 'Brembo HP Pads'),
    images: { nodes: [img('brembo-hp-sintered-front-pads', 'Brembo HP Pads')] },
    variants: { nodes: single('brembo-hp-sintered-front-pads', 'Brembo HP Sintered Front Brake Pads', 49.95) },
    options: null,
  },

  {
    id: 'gid://shopify/Product/100000000006',
    schema: 'SmallProductSchema',
    title: 'Galfer Wave Brake Rotor Front 320mm',
    handle: 'galfer-wave-rotor-320mm',
    tags: ['brakes', 'rotor', 'galfer'],
    productType: 'Brakes',
    vendor: 'Galfer',
    description:
      'Stainless steel wave-pattern rotor with floating carrier. Reduces unsprung weight and improves heat dissipation under repeated hard braking at the track.',
    descriptionHtml:
      '<p>Stainless steel wave-pattern rotor with floating carrier. Reduces unsprung weight and improves heat dissipation under repeated hard braking at the track.</p><p>Direct OEM bolt-in replacement. 320mm diameter.</p>',
    collectionHandles: ['brakes'],
    featuredImage: img('galfer-wave-rotor-320mm', 'Galfer Wave Rotor'),
    images: { nodes: [img('galfer-wave-rotor-320mm', 'Galfer Wave Rotor')] },
    variants: { nodes: single('galfer-wave-rotor-320mm', 'Galfer Wave Brake Rotor Front 320mm', 189.0) },
    options: null,
  },

  {
    id: 'gid://shopify/Product/100000000007',
    schema: 'SmallProductSchema',
    title: 'Spiegler Stainless Braided Brake Lines',
    handle: 'spiegler-braided-brake-lines',
    tags: ['brakes', 'brake-lines', 'spiegler', 'braided'],
    productType: 'Brakes',
    vendor: 'Spiegler',
    description:
      'PTFE-lined stainless braided lines eliminate brake-feel fade under heat. Sold as direct OEM-length replacements for a drop-in fit.',
    descriptionHtml:
      '<p>PTFE-lined stainless braided lines eliminate brake-feel fade under heat. Sold as direct OEM-length replacements for a drop-in fit.</p>',
    collectionHandles: ['brakes'],
    featuredImage: img('spiegler-braided-brake-lines', 'Spiegler Lines'),
    images: { nodes: [img('spiegler-braided-brake-lines', 'Spiegler Lines')] },
    variants: {
      nodes: [
        mkVariant('spiegler-braided-brake-lines', 'Spiegler Stainless Braided Brake Lines', 79.0, 'Configuration', 'Front Only'),
        mkVariant('spiegler-braided-brake-lines', 'Spiegler Stainless Braided Brake Lines', 129.0, 'Configuration', 'Front & Rear Set'),
      ],
    },
    options: [
      {
        id: 'gid://shopify/ProductOption/400000000007',
        name: 'Configuration',
        values: ['Front Only', 'Front & Rear Set'],
      },
    ],
  },

  {
    id: 'gid://shopify/Product/100000000008',
    schema: 'SmallProductSchema',
    title: 'Brembo 19 RCS Corsa Corta Master Cylinder',
    handle: 'brembo-19rcs-master-cylinder',
    tags: ['brakes', 'master-cylinder', 'brembo', 'rcs'],
    productType: 'Brakes',
    vendor: 'Brembo',
    description:
      'Adjustable-ratio master cylinder as used in World Superbike. RCS adjuster dials brake feel between touring and race mode without tools.',
    descriptionHtml:
      '<p>Adjustable-ratio master cylinder as used in World Superbike. RCS (Ratio Control System) adjuster dials brake feel between touring and race mode without tools.</p><ul><li>19mm bore</li><li>Radial mount</li><li>Short lever included</li></ul>',
    collectionHandles: ['brakes'],
    featuredImage: img('brembo-19rcs-master-cylinder', 'Brembo 19 RCS'),
    images: { nodes: [img('brembo-19rcs-master-cylinder', 'Brembo 19 RCS')] },
    variants: { nodes: single('brembo-19rcs-master-cylinder', 'Brembo 19 RCS Corsa Corta Master Cylinder', 379.0) },
    options: null,
  },

  // ─── Race Consumables ────────────────────────────────────────────────────────

  {
    id: 'gid://shopify/Product/100000000009',
    schema: 'SmallProductSchema',
    title: 'Pirelli Diablo Supercorsa SP Front 120/70ZR17',
    handle: 'pirelli-supercorsa-sp-front',
    tags: ['tires', 'pirelli', 'supercorsa', 'front', 'track'],
    productType: 'Tires',
    vendor: 'Pirelli',
    description:
      'DOT-legal race-compound front tire. Supercorsa SP compound provides maximum grip within 1–2 laps from cold. Suitable for track days and club racing.',
    descriptionHtml:
      '<p>DOT-legal race-compound front tire. Supercorsa SP compound provides maximum grip within 1–2 laps from cold.</p><p>Suitable for track days and club racing. 120/70ZR17.</p>',
    collectionHandles: ['race-consumables'],
    featuredImage: img('pirelli-supercorsa-sp-front', 'Supercorsa SP Front'),
    images: { nodes: [img('pirelli-supercorsa-sp-front', 'Supercorsa SP Front')] },
    variants: {
      nodes: [
        mkVariant('pirelli-supercorsa-sp-front', 'Pirelli Diablo Supercorsa SP Front 120/70ZR17', 189.0, 'Version', 'V2'),
        mkVariant('pirelli-supercorsa-sp-front', 'Pirelli Diablo Supercorsa SP Front 120/70ZR17', 199.0, 'Version', 'V3'),
      ],
    },
    options: [
      {
        id: 'gid://shopify/ProductOption/400000000009',
        name: 'Version',
        values: ['V2', 'V3'],
      },
    ],
  },

  {
    id: 'gid://shopify/Product/100000000010',
    schema: 'SmallProductSchema',
    title: 'Pirelli Diablo Supercorsa SP Rear 200/55ZR17',
    handle: 'pirelli-supercorsa-sp-rear',
    tags: ['tires', 'pirelli', 'supercorsa', 'rear', 'track'],
    productType: 'Tires',
    vendor: 'Pirelli',
    description:
      'DOT-legal race-compound rear tire for 1000cc+ superbikes. Match with Supercorsa SP Front for consistent corner-to-corner balance.',
    descriptionHtml:
      '<p>DOT-legal race-compound rear tire for 1000cc+ superbikes. Match with Supercorsa SP Front for consistent corner-to-corner balance.</p><p>200/55ZR17.</p>',
    collectionHandles: ['race-consumables'],
    featuredImage: img('pirelli-supercorsa-sp-rear', 'Supercorsa SP Rear'),
    images: { nodes: [img('pirelli-supercorsa-sp-rear', 'Supercorsa SP Rear')] },
    variants: {
      nodes: [
        mkVariant('pirelli-supercorsa-sp-rear', 'Pirelli Diablo Supercorsa SP Rear 200/55ZR17', 219.0, 'Version', 'V2'),
        mkVariant('pirelli-supercorsa-sp-rear', 'Pirelli Diablo Supercorsa SP Rear 200/55ZR17', 229.0, 'Version', 'V3'),
      ],
    },
    options: [
      {
        id: 'gid://shopify/ProductOption/400000000010',
        name: 'Version',
        values: ['V2', 'V3'],
      },
    ],
  },

  {
    id: 'gid://shopify/Product/100000000011',
    schema: 'SmallProductSchema',
    title: 'Motul 300V 4T Racing Oil 10W40',
    handle: 'motul-300v-10w40',
    tags: ['consumables', 'oil', 'motul', 'engine-oil'],
    productType: 'Engine Oil',
    vendor: 'Motul',
    description:
      'Full-synthetic ester-based engine oil for high-revving race engines. Consistent viscosity across the full operating temperature range.',
    descriptionHtml:
      '<p>Full-synthetic ester-based engine oil for high-revving race engines. Consistent viscosity across the full operating temperature range.</p><p>10W40 grade. Suitable for 4-stroke competition engines with wet clutch.</p>',
    collectionHandles: ['race-consumables'],
    featuredImage: img('motul-300v-10w40', 'Motul 300V'),
    images: { nodes: [img('motul-300v-10w40', 'Motul 300V')] },
    variants: {
      nodes: [
        mkVariant('motul-300v-10w40', 'Motul 300V 4T Racing Oil 10W40', 29.95, 'Size', '1L'),
        mkVariant('motul-300v-10w40', 'Motul 300V 4T Racing Oil 10W40', 89.95, 'Size', '4L'),
      ],
    },
    options: [
      {
        id: 'gid://shopify/ProductOption/400000000011',
        name: 'Size',
        values: ['1L', '4L'],
      },
    ],
  },

  {
    id: 'gid://shopify/Product/100000000012',
    schema: 'SmallProductSchema',
    title: 'DID ERG2 520 Race Chain 120L',
    handle: 'did-erg2-520-chain',
    tags: ['consumables', 'chain', 'did', 'drivetrain'],
    productType: 'Drivetrain',
    vendor: 'DID',
    description:
      "DID's top-spec 520 pitch race chain. ERG2 sealed O-ring design with chromised pins for extended service life on track.",
    descriptionHtml:
      "<p>DID's top-spec 520 pitch race chain. ERG2 sealed O-ring design with chromised pins for extended service life on track.</p><ul><li>520 pitch, 120 links</li><li>Includes master link</li><li>Available in gold or silver</li></ul>",
    collectionHandles: ['race-consumables'],
    featuredImage: img('did-erg2-520-chain', 'DID ERG2 Chain'),
    images: { nodes: [img('did-erg2-520-chain', 'DID ERG2 Chain')] },
    variants: {
      nodes: [
        mkVariant('did-erg2-520-chain', 'DID ERG2 520 Race Chain 120L', 149.0, 'Color', 'Gold'),
        mkVariant('did-erg2-520-chain', 'DID ERG2 520 Race Chain 120L', 139.0, 'Color', 'Silver'),
      ],
    },
    options: [
      {
        id: 'gid://shopify/ProductOption/400000000012',
        name: 'Color',
        values: ['Gold', 'Silver'],
      },
    ],
  },
];
