import React from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { StoryGrid } from '../story/StoryGrid';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { EmptyState } from '../ui/EmptyState';
import { PageHeader } from '../ui/PageHeader';
import { SectionHeader } from '../ui/SectionHeader';
import { Skeleton } from '../ui/Skeleton';
import { cn } from '../ui/cn';
import { useProjecten } from '../../lib/ProjectenContext';
import { useStories } from '../../lib/StoriesContext';
import { useDocumentTitle } from '../../lib/useDocumentTitle';
import { STORY_TYPE_LABELS } from '../../lib/stories';
import type { Project, StoryTypeCode } from '../../types';
import { ComingSoon } from './ComingSoon';
import { ProjectCard } from './ProjectCard';

interface ProjectTypePageProps {
  type: Project['type'];
  title: string;
  lead: string;
  metaDescription: string;
  icon: React.FC<{ className?: string }>;
  comingSoonTitle: string;
  comingSoonText: React.ReactNode;
  /** Stories van dit type tonen als gerelateerd bewijs */
  relatedType: StoryTypeCode;
  relatedText: string;
}

/**
 * Pagina voor één soort rij uit de tabel `projecten` (onderzoek of AI-oplossing). De plek staat er altijd;
 * zolang de tabel leeg is, een "volgt binnenkort"-kaart. Nieuwe rijen verschijnen zonder deploy.
 */
export const ProjectTypePage: React.FC<ProjectTypePageProps> = ({
  type,
  title,
  lead,
  metaDescription,
  icon,
  comingSoonTitle,
  comingSoonText,
  relatedType,
  relatedText,
}) => {
  useDocumentTitle(title, metaDescription);
  const { projecten, status, reload } = useProjecten();
  const { stories } = useStories();
  const items = projecten.filter((p) => p.type === type);
  const related = stories.filter((s) => s.type === relatedType);
  const feature = type === 'onderzoek';

  return (
    <Container className="pb-24">
      <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: title }]} title={title} lead={lead} />

      {status === 'loading' && (
        <div role="status" aria-label={`${title} laden`}>
          <Skeleton className="h-72 rounded-card" />
        </div>
      )}
      {status === 'error' && (
        <EmptyState
          icon={RefreshCw}
          title="Dit onderdeel kon niet worden geladen"
          action={
            <Button variant="secondary" onClick={reload}>
              Opnieuw proberen
            </Button>
          }
        />
      )}
      {status === 'ready' && items.length === 0 && (
        <ComingSoon icon={icon} title={comingSoonTitle}>
          {comingSoonText}
        </ComingSoon>
      )}
      {status === 'ready' && items.length > 0 && (
        <div className={cn('grid gap-5', !feature && 'md:grid-cols-2')}>
          {items.map((p) => (
            <ProjectCard key={p.id} project={p} variant={feature ? 'feature' : 'default'} headingLevel="h2" />
          ))}
        </div>
      )}

      {related.length > 0 && (
        <section aria-labelledby="gerelateerd" className="mt-20">
          <SectionHeader
            id="gerelateerd"
            eyebrow="Gerelateerd bewijs"
            title={STORY_TYPE_LABELS[relatedType].replace('Story', 'Stories')}
            description={relatedText}
            action={
              <Button to={`/stories?type=${relatedType}`} variant="ghost" size="sm" className="group">
                Alle {STORY_TYPE_LABELS[relatedType].replace('Story', 'Stories')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Button>
            }
          />
          <StoryGrid stories={related} empty={null} />
        </section>
      )}
    </Container>
  );
};
