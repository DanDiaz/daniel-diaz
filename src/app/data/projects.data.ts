import { FoundationBlock, Project } from './content.model';

/**
 * Featured projects. `repoUrl` is intentionally unset: the repositories are
 * private, so the cards carry no links. Set it when a repo goes public and the
 * card renders a Source link by itself.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'children-of-the-sun',
    kind: 'Game · solo · in development',
    name: 'Children of the Sun',
    summary:
      'A third-person action RPG set in a neon-lit Aztec lagoon city. The interesting part is ' +
      'the plumbing under it: a turn-based battle system with timing-judged combo "Additions", a ' +
      'data-driven ability and transformation system, and an overworld baked from a traced ' +
      'geographic blueprint.',
    highlights: [
      'Timing-based attacks judged against animation impact frames, with mastery tiers and a ' +
        'combat resource economy.',
      'Solar Arts and Solar Ascension authored entirely as .tres resources — new abilities and ' +
        'transformations need no core code changes.',
      'Overworld terrain, walk masks and settlements baked from a JSON blueprint by a Python ' +
        'pipeline, with a reusable bidirectional scene-transition system.',
      'The full-scale city is generated in Blender from the same geography, exported to glTF with ' +
        'merged architecture and a single collision mesh.',
      '~20 headless QA probes drive the real input bindings and exit non-zero on failure.',
    ],
    stack: ['Godot 4.7', 'GDScript', 'Jolt Physics', 'Python', 'Blender', 'glTF', 'Headless testing'],
    media: {
      kind: 'image',
      image: {
        base: '/assets/img/cots-city',
        alt: 'A neon-lit Aztec city across a lagoon at sunset, seen from a causeway with a spear-carrying hero in the foreground.',
        caption: 'Children of the Sun — the city of Tonatiuhcan, rendered in-engine.',
        width: 1400,
        height: 933,
      },
    },
  },
  {
    slug: 'signal-ghost',
    kind: 'Engine & framework · solo',
    name: 'SIGNAL//GHOST',
    summary:
      'A minimal, extensible first-person framework for 3D games: a space-station level that ' +
      'exercises every system in it. The goal was reusable mechanics that other people can drop ' +
      'a level into, with as little hand-authored geometry as possible.',
    highlights: [
      'FPS controller with momentum-conserving jetpack flight, camera-relative thrust, and ' +
        'landing pads that gate where you can stow the pack.',
      'Thirty-one proximity doors built at runtime from exported dimensions by a @tool script — ' +
        'resizing an opening is a number change, not a geometry rebuild.',
      'A maintenance rover that routes itself around the crew deck from its own map of the floor.',
      'A 1,360-unit landmark asteroid baked by a Python script: procedural icosphere, quarry-cut ' +
        'bench shelves, a bore tunnel, and a matching concave collider.',
      'Docking against a cradle that moves with the rotating rock, using the rock as a reference ' +
        'frame.',
    ],
    stack: ['Godot 4.7', 'GDScript', 'Jolt Physics', 'GDShader', 'Procedural geometry', 'Python'],
    media: {
      kind: 'image',
      image: {
        base: '/assets/img/signal-ghost-wide',
        alt: 'A three-deck space station floating in a debris field with the Milky Way behind it.',
        caption: 'SIGNAL//GHOST — Outpost K-17 in the Oort Cloud, in-engine.',
        width: 1400,
        height: 875,
      },
    },
  },
  {
    slug: 'sparky-chat',
    kind: 'Mobile · solo',
    name: 'Sparky Chat',
    summary:
      'A chat client for local LLMs, built as one Kotlin Multiplatform codebase that ships to ' +
      'both Android and iOS. Screens, ViewModel, networking, database and settings all live in ' +
      'commonMain; the platforms only launch it.',
    highlights: [
      "Streaming responses from Ollama over SSE, with the model's reasoning shown or hidden per a " +
        'persisted setting.',
      'Room database and DataStore settings shared across both platforms; expect/actual seams for ' +
        'clipboard, toast, theme and clock.',
      'Beyond chat: a model recommender that advises on hardware fit, and a benchmark screen for ' +
        'comparing models on-device.',
      'Documented iOS build path so the same repository builds on a Mac with no extra glue code.',
    ],
    stack: [
      'Kotlin',
      'Kotlin Multiplatform',
      'Compose Multiplatform',
      'Android',
      'iOS',
      'Room',
      'DataStore',
      'REST/SSE',
    ],
    media: { kind: 'chat-mock' },
  },
];

/** The "Foundations" card: fundamentals work from the resume. */
export const FOUNDATIONS: {
  summary: string;
  blocks: FoundationBlock[];
  stack: string[];
} = {
  summary:
    'The projects I keep coming back to, because they are the ones that taught me how things ' +
    'actually work.',
  blocks: [
    {
      title: 'DirectX 12 graphics engine',
      points: [
        'Applied vector mathematics in a real pipeline; pixel and vertex shaders in HLSL.',
        'Wrote an .obj parser that reads and draws complex 3D models.',
        'Ambient, directional and specular lighting; a third-person camera bound to a model; ' +
          'gamepad input through XInput.',
        'Boids flocking to populate the scene with bird-like motion.',
      ],
    },
    {
      title: 'Two-pass assembler',
      points: [
        'Executes assembly programs across ADD, MUL, JMP, MOV, LDA, CMP, BNZ and more.',
        'Handles loops and function calls by building activation records.',
      ],
    },
    {
      title: 'Compiler for a high-level language',
      points: [
        'Lexical analysis into identifiers, datatypes, relational operators and keywords for the ' +
          'KXI language.',
        'Syntax analysis against the language grammar; semantic analysis for type checking, ' +
          'uniqueness, existence and flow of control.',
        'Emits QUADS intermediate code, then target assembly that runs on the two-pass assembler.',
      ],
    },
  ],
  stack: ['C++', 'DirectX 12', 'HLSL', 'XInput', 'Compilers', 'Vector math'],
};

