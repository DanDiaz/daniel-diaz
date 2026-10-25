import { SkillGroup } from './content.model';

/** Grouped skills. Keep each group short — the grid is three columns wide. */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Languages',
    tags: ['Java', 'Groovy', 'Python', 'C++', 'Kotlin', 'JavaScript', 'GDScript', 'Bash', 'HLSL'],
  },
  {
    title: 'Identity & security',
    tags: [
      'OAuth 2.0',
      'SAML 2.0',
      'MFA / 2nd Factor',
      'FIDO2 / WebAuthn',
      'Biometric auth (face, fingerprint)',
      'Identity Management',
      'Session & token flows',
      'Adversarial / abuse-case testing',
      'CVE & dependency scanning',
      'OWASP Dependency-Check',
      'Black Duck',
    ],
  },
  {
    title: 'Build, test, ship',
    tags: [
      'Git',
      'Jenkins',
      'Kubernetes',
      'Docker',
      'Linux',
      'Tomcat',
      'Jetty',
      'REST API automation',
      'CI/CD pipelines',
      'Debugging & profiling',
    ],
  },
  {
    title: 'Applications & UI',
    tags: [
      'Angular',
      'Compose Multiplatform',
      'Jetpack Compose',
      'Godot 4',
      'IntelliJ IDEA',
      'Visual Studio',
    ],
  },
  {
    title: 'Graphics & 3D',
    tags: [
      'DirectX 12',
      'HLSL shaders',
      'Vector mathematics',
      'Procedural geometry',
      'Blender & Python pipelines',
      'glTF export',
    ],
  },
  {
    title: 'Ways of working',
    tags: [
      'Team leadership',
      'Cross-team collaboration',
      'Code review',
      'Technical documentation',
      'Requirements to shipped feature',
    ],
  },
];
