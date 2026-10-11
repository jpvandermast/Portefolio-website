import React from 'react';
import { ArrowUpRight, FlaskConical, FolderOpen, Layers, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Chip, SprintChip } from '../components/ui/Chip';
import { Container } from '../components/ui/Container';
import { EmptyState } from '../components/ui/EmptyState';
import { PageHeader } from '../components/ui/PageHeader';
import { Skeleton } from '../components/ui/Skeleton';
import { useProjecten } from '../lib/ProjectenContext';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import type { Project } from '../types';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Card as="article" className="flex flex-col p-6">
    <div className="flex flex-wrap items-center gap-1.5">
      <Chip className="bg-sunken text-ink ring-1 ring-inset ring-line">
        {project.type === 'onderzoek' ? <FlaskConical className="w-3.5 h-3.5 text-muted" aria-hidden="true" /> : <Layers className="w-3.5 h-3.5 text-muted" aria-hidden="true" />}
        {project.type === 'onderzoek' ? 'Onderzoek' : 'Project'}
      </Chip>
      {project.sprint != null && <SprintChip sprint={project.sprint} linked />}
    </div>
    <h3 className="mt-4 text-h3">{project.titel}</h3>
    {project.beschrijving && <p className="mt-2 text-[0.925rem] text-muted whitespace-pre-line">{project.beschrijving}</p>}
    {project.tools?.length > 0 && (
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Gebruikte tools">
        {project.tools.map((t) => (
          <li key={t}>
            <Chip className="bg-accent-soft text-accent">{t}</Chip>
          </li>
        ))}
      </ul>
    )}
    {project.link_url && (
      <div className="mt-auto pt-6">
        <Button href={project.link_url} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">
          {project.link_label || 'Bekijken'}
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </Button>
      </div>
    )}
  </Card>
);

export default function ProjectsPage() {
  useDocumentTitle('Projecten', 'Projecten en onderzoeken van Josse van der Mast binnen de minor Future-proof met AI.');
  const { projecten, status, reload } = useProjecten();
  const groups = [
    { title: 'Projecten', items: projecten.filter((p) => p.type === 'project') },
    { title: 'Onderzoeken', items: projecten.filter((p) => p.type === 'onderzoek') },
  ].filter((g) => g.items.length > 0);

  return (
    <Container className="pb-24">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Projecten' }]}
        title="Projecten en onderzoek"
        lead="Grotere projecten en onderzoeken die over meerdere stories heen lopen."
      />
      {status === 'loading' && (
        <div className="grid gap-5 md:grid-cols-2" role="status" aria-label="Projecten laden">
          {[0, 1].map((i) => (
            <Skeleton key={i} className="h-48 rounded-card" />
          ))}
        </div>
      )}
      {status === 'error' && (
        <EmptyState icon={RefreshCw} title="De projecten konden niet worden geladen" action={<Button variant="secondary" onClick={reload}>Opnieuw proberen</Button>} />
      )}
      {status === 'ready' && groups.length === 0 && (
        <EmptyState compact icon={FolderOpen} title="Nog geen projecten of onderzoeken gepubliceerd" action={<Button to="/stories" size="sm" variant="secondary">Bekijk de stories</Button>}>
          Tot die tijd staat al het bewijs bij de stories.
        </EmptyState>
      )}
      <div className="space-y-14">
        {groups.map((g) => (
          <section key={g.title} aria-labelledby={`groep-${g.title}`}>
            <h2 id={`groep-${g.title}`} className="mb-5 text-h2">
              {g.title}
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {g.items.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
