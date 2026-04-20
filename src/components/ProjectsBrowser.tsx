import { useEffect, useState } from 'react';
import { ProjectCard } from '@/components/ProjectCard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mapRepo, sortProjects, type GitHubRepo, type ProjectSummary } from '@/lib/projects';

export function ProjectsBrowser() {
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

        setProjects(repos.map(mapRepo));
        setStatus('ready');
      } catch (error) {
        console.error('Unable to load repositories', error);
        if (active) {
          setStatus('error');
        }
      }
    }

    void loadProjects();

    return () => {
      active = false;
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="editorial-panel p-6">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="mt-6 h-8 w-2/3" />
            <Skeleton className="mt-4 h-24 w-full" />
            <Skeleton className="mt-6 h-10 w-44" />
          </div>
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="editorial-panel mt-10 p-8">
        <Badge variant="outline">Projects unavailable</Badge>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
          There was an issue fetching repositories from GitHub. Please try again later or visit the GitHub organization directly.
        </p>
      </div>
    );
  }

  const all = sortProjects(projects, 'all');
  const recent = sortProjects(projects, 'recent');
  const contributors = sortProjects(projects, 'contributors');

  return (
    <Tabs defaultValue="all" className="mt-10">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="recent">Recently updated</TabsTrigger>
        <TabsTrigger value="contributors">Needs contributors</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <div className="grid gap-6 lg:grid-cols-3">
          {all.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="recent">
        <div className="grid gap-6 lg:grid-cols-3">
          {recent.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="contributors">
        {contributors.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {contributors.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="editorial-panel p-8">
            <Badge variant="outline">No contributor-marked repos yet</Badge>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              None of the current repository topics explicitly mark a project as seeking contributors right now. Browse all repos or start in the community to find where help is needed.
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
