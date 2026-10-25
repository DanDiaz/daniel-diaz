import { DefinitionItem, EducationEntry, Interest } from './content.model';

/** The "About" paragraphs, in reading order. */
export const ABOUT_COPY: string[] = [
  "I'm a Computer Science graduate (Utah Valley University) who has spent most of a career on " +
    'one deceptively difficult problem: proving somebody is who they say they are, and then ' +
    'letting them through without getting in their way.',
  'At OpenText I work across the whole stack of that problem — protocol features in Identity ' +
    'Management and 2nd Factor Authentication, an Angular + Quarkus application that lets ' +
    'customers configure the product to their own environment, and the automated framework my ' +
    "team uses to attack it on purpose. Leading that automation project means reviewing other " +
    "people's code as much as writing my own.",
  'Outside of work I build things from the bottom up: a first-person framework in Godot, a ' +
    'Kotlin Multiplatform chat client that runs on Android and iOS from one codebase, a ' +
    'DirectX 12 engine, an assembler and a compiler. I would rather understand a system down to ' +
    'its activation records than have it work by luck.',
];

/** The summary card next to the About copy. */
export const SHORT_VERSION: DefinitionItem[] = [
  {
    term: 'Currently',
    detail: 'Senior Software Engineer, OpenText — Identity Management & 2FA',
  },
  {
    term: 'Core',
    detail: 'Java, Groovy, Python, C++ · OAuth 2.0, SAML 2.0, MFA · REST APIs',
  },
  { term: 'Also', detail: 'Angular, Quarkus, Jenkins, Kubernetes, Docker, Linux, Git' },
  {
    term: 'Beyond the day job',
    detail: 'Godot 4 & GDScript, Blender, Kotlin Multiplatform, graphics & compilers',
  },
  { term: 'Off the clock', detail: 'Astrophotography across the Pacific Northwest' },
];

export const INTERESTS: Interest[] = [
  {
    title: 'Game development',
    text: 'Two Godot 4 projects in flight, from gameplay systems to the Blender asset pipeline that feeds them.',
  },
  {
    title: 'Graphics & compilers',
    text: 'A DirectX 12 engine, shaders, an assembler and a compiler — the layer under the abstraction.',
  },
  {
    title: 'Astrophotography',
    text: 'Chasing clear nights in the Pacific Northwest for the Milky Way, the Moon and deep-sky targets.',
  },
  {
    title: 'Local AI tooling',
    text: 'Running models on-device and building the clients around them — streaming, reasoning traces, benchmarks.',
  },
];

export const EDUCATION: EducationEntry[] = [
  { school: 'Utah Valley University', award: 'Bachelor of Computer Science' },
  { school: 'Green River Community College', award: 'Associate degree' },
];
