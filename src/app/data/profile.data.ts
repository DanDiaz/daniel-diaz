import { DefinitionItem, EducationEntry, Interest } from './content.model';

/** The "About" paragraphs, in reading order. */
export const ABOUT_COPY: string[] = [
  "I'm a Computer Science graduate (Utah Valley University) who has spent most of a career on " +
    'one deceptively difficult problem: proving somebody is who they say they are, and then ' +
    'letting them through without getting in their way.',
  'At OpenText I work across the whole stack of that problem — OAuth 2.0 and SAML 2.0 protocol ' +
    'features in Identity Management, multi-factor work that runs from facial recognition and ' +
    'fingerprint through FIDO2 / WebAuthn down to the Tomcat and Jetty containers the handshakes ' +
    'land on, an Angular application that lets customers configure the product to their own ' +
    'environment, and the automated framework my team uses to attack it on purpose. I am also ' +
    'named Security Champion for the product, which means the CVE and dependency scanning is ' +
    'mine to run and the findings are mine to drive to resolution. Leading that automation ' +
    "project means reviewing other people's code as much as writing my own.",
  'Outside of work I build things from the bottom up: a first-person framework in Godot, a ' +
    'Kotlin Multiplatform chat client that runs on Android and iOS from one codebase, a ' +
    'DirectX 12 engine, an assembler and a compiler. I would rather understand a system down to ' +
    'its activation records than have it work by luck.',
];

/** The summary card next to the About copy. */
export const SHORT_VERSION: DefinitionItem[] = [
  {
    term: 'Currently',
    detail: 'Lead Software Engineer, OpenText — Identity Management & MFA',
  },
  {
    term: 'Core',
    detail: 'Java, Groovy, Python, C++ · OAuth 2.0, SAML 2.0, MFA · REST APIs',
  },
  {
    term: 'Security',
    detail:
      'Named Security Champion for the product — CVE and dependency scanning with OWASP ' +
      'Dependency-Check and Black Duck, triage and remediation',
  },
  {
    term: 'Also',
    detail: 'Angular, Tomcat, Jetty, Jenkins, Kubernetes, Docker, Linux, Git',
  },
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
