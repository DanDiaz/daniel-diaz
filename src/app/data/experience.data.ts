import { Job } from './content.model';

/** Professional experience, newest first. Wording follows the PDF resume. */
export const JOBS: Job[] = [
  {
    company: 'OpenText',
    role: 'Lead Software Engineer',
    when: 'Jan 2023 – Present',
    from: '2023-01',
    bullets: [
      'Work with software development, quality assurance and product management teams to design ' +
        'and implement features and protocols for Identity Management and Multi-Factor ' +
        'Authentication solutions.',
      'Named Security Champion for the product: runs CVE and dependency scanning across the ' +
        'codebase with OWASP Dependency-Check and Black Duck, triages what comes back and drives ' +
        'the fixes, so the product holds up against modern security standards rather than the ' +
        'ones in place when it started.',
      "Built an automated testing framework that implements a RESTful API against OpenText's " +
        'OAuth/SAML product — it grants access tokens with grant types, requests resources from a ' +
        'Resource Owner, and acts as an attacker attempting to abuse the authentication system.',
      'Lead a team of engineers continuously developing that automation project: direction, ' +
        'review and mentoring.',
      'Implemented several Continuous Integration pipelines with Jenkins, Kubernetes and Docker.',
    ],
    stack: [
      'Java',
      'Groovy',
      'Angular',
      'OAuth 2.0',
      'SAML 2.0',
      'MFA / 2FA',
      'FIDO2 / WebAuthn',
      'CVE & dependency scanning',
      'OWASP Dependency-Check',
      'Black Duck',
      'REST',
      'Jenkins',
      'Kubernetes',
      'Docker',
      'Linux',
      'Team leadership',
    ],
  },
  {
    company: 'Micro Focus',
    role: 'Senior Software Engineer',
    when: 'Jun 2017 – Jan 2023',
    from: '2017-06',
    to: '2023-01',
    note: 'Acquired by OpenText in January 2023 — same product, same team.',
    bullets: [
      'Deep work on the authentication protocols themselves: OAuth 2.0 flows and grant types, ' +
        'SAML 2.0 assertions and federation, and the token and session handling behind them — down ' +
        'to the servlet-container layer, where the handshakes, redirects and TLS actually land on ' +
        'Tomcat and Jetty.',
      'Extended multi-factor authentication past one-time codes: biometric factors such as facial ' +
        'recognition and fingerprint, and FIDO2 / WebAuthn passkey-style flows, including the ' +
        'enrollment and verification plumbing around them.',
      'Developed the Angular web application that lets customers fully customize the Identity ' +
        'Management solution to suit their own environment.',
      'Found and fixed product defects using standard debugging techniques, and reviewed and ' +
        'provided input for product development and documentation.',
    ],
    stack: [
      'Java',
      'Groovy',
      'Angular',
      'OAuth 2.0',
      'SAML 2.0',
      'MFA / 2FA',
      'FIDO2 / WebAuthn',
      'Biometric auth',
      'Tomcat',
      'Jetty',
      'Session & token flows',
      'REST',
      'Debugging & profiling',
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
