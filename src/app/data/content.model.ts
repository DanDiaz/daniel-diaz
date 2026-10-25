/**
 * Shapes of all editable content on the site.
 * The values live in the neighbouring *.data.ts files.
 */

export interface NavItem {
  /** id of the section element, without the leading # */
  id: string;
  label: string;
}

export interface HeroFact {
  /** the emphasised lead-in, e.g. "9+ years" */
  strong: string;
  text: string;
}

export interface DefinitionItem {
  term: string;
  detail: string;
}

export interface Job {
  company: string;
  role: string;
  /** display range, e.g. "Sep 2016 – Present" */
  when: string;
  /** ISO date for the leading <time>, optional for "Ongoing" entries */
  from?: string;
  to?: string;
  bullets: string[];
  stack: string[];
}

export interface ProjectImage {
  /** path without the size/extension suffix, e.g. "/assets/img/cots-city".
   *  The card resolves <base>-1400.webp / .jpg and <base>-800.webp / .jpg. */
  base: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export type ProjectMedia =
  | { kind: 'image'; image: ProjectImage }
  | { kind: 'chat-mock' };

export interface Project {
  slug: string;
  kind: string;
  name: string;
  summary: string;
  highlights: string[];
  stack: string[];
  media: ProjectMedia;
  /** set once the repository is public */
  repoUrl?: string;
}

export interface FoundationBlock {
  title: string;
  points: string[];
}

export interface SkillGroup {
  title: string;
  tags: string[];
}

export interface Interest {
  title: string;
  text: string;
}

export interface EducationEntry {
  school: string;
  award: string;
}

export interface Photo {
  /** the gallery tile, e.g. "/assets/img/astro/m31-andromeda-800.webp" */
  src: string;
  /** full-size image for the lightbox; falls back to `src` */
  full?: string;
  /** short label shown on the tile */
  label: string;
  /** caption in the lightbox */
  caption: string;
  alt: string;
  /** true while the file is a generated stand-in; shows the "placeholder" tag */
  placeholder?: boolean;
}
