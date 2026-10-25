import { NavItem } from '../data/content.model';

/**
 * Everything site-wide that a client might want renamed, retargeted or
 * removed. Contact details on purpose: no phone number, no street address.
 */
export const SITE = {
  name: 'Daniel Diaz',
  role: 'Senior Software Engineer · Identity & Access',
  tagline:
    'I spend my days on the parts of software that decide who is allowed in — OAuth 2.0, ' +
    'SAML 2.0 and second-factor authentication. My nights go to building worlds in Godot ' +
    'and pointing a camera at the Milky Way.',
  location: 'Covington, WA — Seattle area',
  email: 'danielhdiaz88@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/dadiaz182',
    linkedinLabel: 'linkedin.com/in/dadiaz182',
    instagram: 'https://www.instagram.com/maybe_im_dan/',
    instagramLabel: '@maybe_im_dan',
  },
  /** the "Currently" facts under the hero name */
  facts: [
    { strong: '9+ years', text: 'shipping identity & authentication software' },
    { strong: 'Senior Software Engineer', text: 'at OpenText' },
    { strong: 'Covington, WA', text: '— Seattle area' },
  ],
  availability: [
    'Senior / lead individual-contributor engineering roles',
    'Identity, authentication & security product work',
    'Backend-heavy teams that care about testability',
    'Remote or Seattle-area hybrid',
  ],
  credits: {
    sky: 'Sky panorama: ESO / S. Brunier (CC BY 4.0)',
    images: 'Game images captured in-engine from my own projects',
    type: 'Type: Inter & Space Grotesk (SIL OFL)',
  },
} as const;

/** Section ids must match the id attribute on each section element. */
export const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'astro', label: 'Astrophotography' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
