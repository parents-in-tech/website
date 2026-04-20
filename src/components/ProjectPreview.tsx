import { useEffect, useState } from 'react';
import { ProjectCard } from '@/components/ProjectCard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { mapRepo, sortProjects, type GitHubRepo, type ProjectSummary } from '@/lib/projects';

interface ProjectPreviewProps {
  limit?: number;
  title?: string;
  lead?: string;
}

export function ProjectPreview({
  limit = 3,
  title = 'Projects worth exploring next',
  lead = 'Browse the live repositories in the GitHub organization, including demo links when a project exposes one.',
}: ProjectPreviewProps) {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let active = true;

    async function loadProjects() {
      try {
        setStatus('loading');
        const response = await fetch('/api/repos');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const repos = (await response.json()) as GitHubRepo[];
        if (!active) {
          return;
        }

        setProjects(sortProjects(repos.map(mapRepo), 'all').slice(0, limit));
        setStatus('ready');
      } catch (error) {
        console.error('Unable to load project preview', error);
        if (active) {
          setStatus('error');
        }
      }
    }

    void loadProjects();

    return () => {
      active = false;
    };
  }, [limit]);

  return (
    <section className="section-space pt-4">
      <div className="page-shell">
        <div className="section-heading">
          <div className="eyebrow">Live from GitHub</div>
          <h2 className="text-4xl leading-tight text-balance md:text-5xl">{title}</h2>
          <p className="section-lead">{lead}</p>
        </div>

        {status === 'loading' && (
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {Array.from({ length: limit }).map((_, index) => (
              <div key={index} className="editorial-panel p-6">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="mt-6 h-8 w-2/3" />
                <Skeleton className="mt-4 h-20 w-full" />
                <Skeleton className="mt-6 h-10 w-40" />
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="editorial-panel mt-10 p-8">
            <Badge variant="outline">Repo preview unavailable</Badge>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              The GitHub API did not respond with repository data. You can still head to the GitHub organization directly and browse the repos there.
            </p>
          </div>
        )}

        {status === 'ready' && (
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
