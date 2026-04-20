import { ExternalLink, FolderGit2, Sparkles } from 'lucide-react';
import type { ProjectSummary } from '@/lib/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectCardProps {
  project: ProjectSummary;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {project.needsContributors && <Badge>Needs contributors</Badge>}
          {project.language && <Badge variant="outline">{project.language}</Badge>}
        </div>
        <CardTitle className="text-[1.65rem]">{project.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <p className="text-sm leading-7 text-muted-foreground">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.topics.length > 0 ? (
            project.topics.map((topic) => (
              <span key={topic} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {topic}
              </span>
            ))
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              <Sparkles className="h-3 w-3" />
              Organization repo
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: project.languageColor }} />
            {project.language ?? 'Unspecified'}
          </span>
          <span>{project.stars} stars</span>
          <span>{project.forks} forks</span>
          <span>Updated {project.updatedLabel}</span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex flex-wrap gap-3">
        <Button asChild size="sm">
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
            <FolderGit2 />
            View repo
          </a>
        </Button>
        {project.demoUrl && (
          <Button asChild variant="outline" size="sm">
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              <ExternalLink />
              Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
