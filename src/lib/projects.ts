export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  homepage: string | null;
}

export interface ProjectSummary {
  id: number;
  name: string;
  description: string;
  repoUrl: string;
  language: string | null;
  languageColor: string;
  stars: number;
  forks: number;
  updatedAt: string;
  updatedLabel: string;
  topics: string[];
  demoUrl: string | null;
  needsContributors: boolean;
}

const languageColors: Record<string, string> = {
  JavaScript: '#d8a72f',
  TypeScript: '#2f78c8',
  Python: '#4672a8',
  Rust: '#9a5631',
  Go: '#0a9cc1',
  Astro: '#d75728',
  HTML: '#cb5d33',
  CSS: '#4a7bb7',
};

export function formatRepoDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function mapRepo(repo: GitHubRepo): ProjectSummary {
  const normalizedTopics = Array.isArray(repo.topics) ? repo.topics.slice(0, 4) : [];
  const needsContributors = normalizedTopics.some((topic) =>
    ['good-first-issue', 'help-wanted', 'starter', 'community', 'contribution'].includes(topic),
  );

  return {
    id: repo.id,
    name: repo.name,
    description: repo.description ?? 'Repository details are still light, but the project is active in the organization.',
    repoUrl: repo.html_url,
    language: repo.language,
    languageColor: languageColors[repo.language ?? ''] ?? '#8a7f95',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at,
    updatedLabel: formatRepoDate(repo.updated_at),
    topics: normalizedTopics,
    demoUrl: repo.homepage,
    needsContributors,
  };
}

export function sortProjects(projects: ProjectSummary[], mode: 'all' | 'recent' | 'contributors') {
  const base = [...projects];

  if (mode === 'contributors') {
    return base
      .filter((project) => project.needsContributors)
      .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  }

  if (mode === 'recent') {
    return base.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  }

  return base.sort((a, b) => {
    const scoreA = a.stars * 4 + a.forks * 2 + Date.parse(a.updatedAt) / 1000000000;
    const scoreB = b.stars * 4 + b.forks * 2 + Date.parse(b.updatedAt) / 1000000000;
    return scoreB - scoreA;
  });
}
