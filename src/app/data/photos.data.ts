import { Photo } from './content.model';

/**
 * Astrophotography gallery — frames shot by Daniel.
 *
 * Source files: C:\Users\iwrot\Downloads\astro
 * Import / re-import with:  python tools/import_astro.py <folder>
 * (writes <slug>-1400 and <slug>-800 in webp + jpg, with EXIF stripped).
 *
 * `src` is the tile, `full` is what the lightbox shows. Set `placeholder: true`
 * on any tile that is still a stand-in and it gets a "placeholder" tag.
 *
 * Order is deliberate: the strongest deep-sky frames first, the wider and
 * comparative frames last.
 */
const A = '/assets/img/astro';

export const PHOTOS: Photo[] = [
  {
    src: `${A}/andromeda10-800.webp`,
    full: `${A}/andromeda10-1400.webp`,
    label: 'Andromeda · M31',
    caption: 'Messier 31 — the Andromeda Galaxy',
    alt: 'The Andromeda Galaxy tilted toward us, with a bright golden core, dust lanes across its disc and two small companion galaxies nearby.',
  },
  {
    src: `${A}/m42-800.webp`,
    full: `${A}/m42-1400.webp`,
    label: 'Orion Nebula · M42',
    caption: 'Messier 42 — the Orion Nebula',
    alt: 'The Orion Nebula glowing pink and white in the sword of Orion, with its smaller companion nebula beside it.',
  },
  {
    src: `${A}/m45-800.webp`,
    full: `${A}/m45-1400.webp`,
    label: 'Pleiades · M45',
    caption: 'Messier 45 — the Pleiades',
    alt: 'The blue stars of the Pleiades cluster wrapped in wisps of reflection nebulosity.',
  },
  {
    src: `${A}/the-cygnus-loop-800.webp`,
    full: `${A}/the-cygnus-loop-1400.webp`,
    label: 'Cygnus Loop',
    caption: 'The Cygnus Loop — supernova remnant',
    alt: 'Fine red and blue filaments of the Cygnus Loop, the expanding shell of an exploded star.',
  },
  {
    src: `${A}/ngc6888v4-800.webp`,
    full: `${A}/ngc6888v4-1400.webp`,
    label: 'Crescent Nebula · NGC 6888',
    caption: 'NGC 6888 — the Crescent Nebula',
    alt: 'The crescent-shaped shell of NGC 6888 glowing red, carved by a fast stellar wind.',
  },
  {
    src: `${A}/m101-800.webp`,
    full: `${A}/m101-1400.webp`,
    label: 'Pinwheel Galaxy · M101',
    caption: 'M101 — the Pinwheel Galaxy',
    alt: 'The Pinwheel Galaxy seen face-on, its loose blue spiral arms wound around a soft golden core.',
  },
  {
    src: `${A}/fireworks-galaxy-800.webp`,
    full: `${A}/fireworks-galaxy-1400.webp`,
    label: 'Fireworks Galaxy · NGC 6946',
    caption: 'NGC 6946 — the Fireworks Galaxy',
    alt: 'The Fireworks Galaxy seen face-on, its arms scattered with pink star-forming regions.',
  },
  {
    src: `${A}/bodes-galaxy-800.webp`,
    full: `${A}/bodes-galaxy-1400.webp`,
    label: "Bode's Galaxy · M81",
    caption: "M81 — Bode's Galaxy, with M82 at lower left",
    alt: "Bode's Galaxy, a face-on spiral with golden arms, and the edge-on Cigar Galaxy M82 at the lower edge of the frame.",
  },
  {
    src: `${A}/ngc7331-stepans-quintet-800.webp`,
    full: `${A}/ngc7331-stepans-quintet-1400.webp`,
    label: 'NGC 7331 & Stephan’s Quintet',
    caption: 'NGC 7331 with Stephan’s Quintet',
    alt: 'The barred spiral NGC 7331 filling the lower frame, with the tight compact group of Stephan’s Quintet above it.',
  },
  {
    src: `${A}/ngc-2023-800.webp`,
    full: `${A}/ngc-2023-1400.webp`,
    label: 'NGC 2023',
    caption: 'NGC 2023 — reflection nebula in Orion',
    alt: 'Red hydrogen gas and blue reflection nebulosity around NGC 2023 on the edge of the Orion molecular cloud.',
  },
  {
    src: `${A}/doublecluster-800.webp`,
    full: `${A}/doublecluster-1400.webp`,
    label: 'The Double Cluster',
    caption: 'The Double Cluster — NGC 869 / NGC 884',
    alt: 'A dense starfield in Perseus holding the two open clusters known as the Double Cluster.',
  },
  {
    src: `${A}/mars-800.webp`,
    full: `${A}/mars-1400.webp`,
    label: 'Mars & Orion, backyard',
    caption: 'Mars high in Orion, from the backyard',
    alt: 'The constellation Orion with a bright planet above the ridge line, pine trees and the roof of the house.',
  },
  {
    src: `${A}/sn-2023ixf.gif`,
    full: `${A}/sn-2023ixf.gif`,
    label: 'SN 2023ixf',
    caption: 'SN 2023ixf in the Pinwheel Galaxy — animated',
    alt: 'Animated pair of frames of the Pinwheel Galaxy M101 showing supernova SN 2023ixf in one of its spiral arms.',
  },
  {
    src: `${A}/m101-sn-800.webp`,
    full: `${A}/m101-sn-1400.webp`,
    label: 'SN position marked',
    caption: 'M101 with the position of SN 2023ixf marked',
    alt: 'The Pinwheel Galaxy with a label pointing out where supernova SN 2023ixf appeared in the arm.',
  },
  {
    src: `${A}/bode-old-800.webp`,
    full: `${A}/bode-old-1400.webp`,
    label: "Bode's Galaxy — earlier edit",
    caption: "M81 — Bode's Galaxy, an earlier processing run",
    alt: "An earlier edit of Bode's Galaxy: the same face-on spiral with a tighter crop and a darker field.",
  },
  {
    // Filename gives no target for this one - if you know it, update label and caption.
    src: `${A}/light-stack-9-800.webp`,
    full: `${A}/light-stack-9-1400.webp`,
    label: 'Galaxy pair',
    caption: 'Two galaxies in one field',
    alt: 'A tilted spiral galaxy with a golden core beside a thin edge-on galaxy at the right of the frame.',
  },
];
