type ProjectStatus = 'active' | 'in-development' | 'coming-soon';

interface Project {
  slug: string;
  name: string;
  tagline: string;
  description?: string;
  status: ProjectStatus;
  repo?: string;
  landing?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    slug: 'tales-genie',
    name: 'Tales Genie',
    tagline: 'AI-powered illustrated bedtime stories for kids in six languages.',
    description: 'Creates gentle, narrated stories with watercolor illustrations and runs on Cloudflare’s free tier.',
    status: 'active',
    repo: 'https://github.com/parents-in-tech/tales-genie',
    demo: 'https://talesgenie.parentsintech.org',
  },
  {
    slug: 'langify',
    name: 'Langify',
    tagline: 'Personalized language learning for children aged 3–10.',
    description: 'A Flutter app with a parent-facing creation mode and an interactive learning mode for children.',
    status: 'in-development',
    repo: 'https://github.com/parents-in-tech/langify',
  },
  {
    slug: 'musicguru',
    name: 'MusicGuru',
    tagline: 'Gamified musical-instrument learning for children.',
    description: 'A Flutter app with interactive piano lessons, progress tracking, achievements, and more instruments planned.',
    status: 'in-development',
    repo: 'https://github.com/parents-in-tech/musicguru',
  },
];
