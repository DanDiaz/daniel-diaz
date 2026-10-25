import { Job } from './content.model';

/** Professional experience, newest first. Wording follows the PDF resume. */
export const JOBS: Job[] = [
  {
    company: 'OpenText',
    role: 'Senior Software Engineer',
    when: 'Sep 2016 – Present',
    from: '2016-09',
    bullets: [
      'Work with software development, quality assurance and product management teams to design ' +
        'and implement features and protocols for Identity Management and 2nd Factor ' +
        'Authentication solutions.',
      'Developed a web application with Angular and Quarkus that lets customers fully customize ' +
        'the Identity Management solution to suit their environment.',
      "Built an automated testing framework that implements a RESTful API against OpenText's " +
        'OAuth/SAML product — it grants access tokens with grant types, requests resources from a ' +
        'Resource Owner, and acts as an attacker attempting to abuse the authentication system.',
      'Lead a team of engineers continuously developing that automation project: direction, ' +
        'review and mentoring.',
      'Find and fix product defects using standard debugging techniques, and review and provide ' +
        'input for product development and documentation.',
      'Implemented several Continuous Integration pipelines with Jenkins, Kubernetes and Docker.',
    ],
    stack: [
      'Java',
      'Groovy',
      'Angular',
      'Quarkus',
      'OAuth 2.0',
      'SAML 2.0',
      '2FA',
      'REST',
      'Jenkins',
      'Kubernetes',
      'Docker',
      'Linux',
    ],
  },
  {
    company: 'Neovest',
    role: 'Software Development Engineer in Test',
    when: 'May 2014 – Jan 2015',
    from: '2014-05',
    to: '2015-01',
    bullets: [
      'Developed front-end UI and back-end automation tests for the Neovest software.',
      'Developed a tool that lets testers pull up a log during an automation run to check for ' +
        'exceptions thrown while the test is executing.',
    ],
    stack: ['Test automation', 'UI testing', 'Logging & diagnostics'],
  },
  {
    company: 'Lone contributor',
    role: 'Independent & personal projects',
    when: 'Ongoing',
    bullets: [
      'Ship and maintain self-directed projects end to end: design, implementation, tooling, art ' +
        'pipeline and QA. Currently: Children of the Sun, SIGNAL//GHOST and a Kotlin ' +
        'Multiplatform chat client.',
      'Founded on fundamentals work — a DirectX 12 graphics engine, a two-pass assembler and a ' +
        'compiler for a high-level language (see Foundations below).',
    ],
    stack: ['Godot 4', 'GDScript', 'Kotlin', 'C++', 'Blender', 'Python', 'Git'],
  },
];
