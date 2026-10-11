import React, { useEffect, useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { ArrowRight, ArrowUpRight, Bot, Download, FlaskConical, Maximize2 } from 'lucide-react';
import type { Project, StoryFile } from '../../types';
import { onderzoekUrl } from '../../lib/projecten';
import { getStoryDocuments, publicUrl } from '../../lib/stories';
import { useStories } from '../../lib/StoriesContext';
import { Lightbox } from '../story/Lightbox';
import { Button } from '../ui/Button';
import { Chip } from '../ui/Chip';
import { cn } from '../ui/cn';

// Beschrijving mag markdown zijn (alinea's, lijstjes, vet, links); geen ruwe HTML.
const md: Components = {
  p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="mb-3 last:mb-0 pl-5 list-disc space-y-1 marker:text-subtle">{children}</ul>,
  ol: ({ children }) => <ol className="mb-3 last:mb-0 pl-5 list-decimal space-y-1 marker:text-subtle">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  h1: ({ children }) => <p className="mt-4 mb-1.5 font-semibold text-ink">{children}</p>,
  h2: ({ children }) => <p className="mt-4 mb-1.5 font-semibold text-ink">{children}</p>,
  h3: ({ children }) => <p className="mt-4 mb-1.5 font-semibold text-ink">{children}</p>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-accent underline decoration-accent/30 underline-offset-[3px] hover:decoration-accent">
      {children}
    </a>
  ),
};

/** Bijlagen van de gekoppelde story; leeg als er geen (zichtbare) story is of het laden mislukt. */
function useStoryDocuments(storyId: string | undefined): StoryFile[] {
  const [docs, setDocs] = useState<StoryFile[]>([]);
  useEffect(() => {
    if (!storyId) return;
    let cancelled = false;
    getStoryDocuments(storyId)
      .then((d) => !cancelled && setDocs(d))
      .catch((err) => console.error('Bijlagen laden mislukt', err));
    return () => {
      cancelled = true;
    };
  }, [storyId]);
  return storyId ? docs : [];
}

interface ProjectCardProps {
  project: Project;
  /** feature = grote kaart (onderzoek), default = kaart in een grid */
  variant?: 'default' | 'feature';
  headingLevel?: 'h2' | 'h3';
}

/** Kaart voor een rij uit de tabel `projecten` (onderzoek of AI-oplossing). */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, variant = 'default', headingLevel: H = 'h3' }) => {
  const isOnderzoek = project.type === 'onderzoek';
  const Icon = isOnderzoek ? FlaskConical : Bot;
  const feature = variant === 'feature';
  const { stories } = useStories();
  // Koppeling met de story alleen bij de grote onderzoekskaart; onbekende slug = geen knoppen.
  const story = feature && project.story_slug ? stories.find((s) => s.slug === project.story_slug) : undefined;
  const documents = useStoryDocuments(story?.id);
  const imageUrl = feature && project.afbeelding_pad ? onderzoekUrl(project.afbeelding_pad) : null;
  const imageAlt = project.afbeelding_alt || `Visualisatie bij ${project.titel}`;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  return (
    <article className="flex flex-col bg-card rounded-card ring-1 ring-line shadow-card overflow-hidden">
      <div className={cn('flex flex-col flex-1', feature && 'lg:flex-row')}>
        <div
          className={cn(
            'on-dark relative overflow-hidden bg-night text-white',
            feature ? 'p-7 sm:p-9 lg:w-[38%] lg:shrink-0 flex flex-col' : 'p-6',
          )}
        >
          <div aria-hidden="true" className="absolute -top-16 -right-10 w-48 h-48 rounded-full bg-[#5b2fc2]/35 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-[#1d3f8f]/50 blur-3xl" />
          <div className="relative flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full bg-white/10 ring-1 ring-inset ring-white/15 text-[0.75rem] font-medium">
              <Icon className="w-3.5 h-3.5 text-ai-cyan" aria-hidden="true" />
              {isOnderzoek ? 'Onderzoek' : 'AI-oplossing'}
            </span>
            {project.sprint != null && (
              <span className="font-mono text-[0.72rem] text-white/65">Sprint {project.sprint}</span>
            )}
          </div>
          <H className={cn('relative mt-4 text-white', feature ? 'text-h2' : 'text-h3')}>{project.titel}</H>
          {feature && (story || project.link_url) && (
            <div className="relative mt-auto pt-8 flex flex-wrap gap-3">
              {story && (
                <Button to={`/stories/${story.slug}`} variant="light" className="group">
                  Bekijk de research story
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Button>
              )}
              {project.link_url && (
                <Button href={project.link_url} target="_blank" rel="noopener noreferrer" variant={story ? 'glass' : 'light'}>
                  {project.link_label || 'Bekijk het onderzoek'}
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              )}
            </div>
          )}
        </div>

        <div className={cn('flex flex-col flex-1', feature ? 'p-7 sm:p-9' : 'p-6')}>
          {project.beschrijving && (
            <div className={cn('text-muted', feature ? 'text-[1rem] leading-[1.75]' : 'text-[0.925rem]')}>
              <ReactMarkdown components={md}>{project.beschrijving}</ReactMarkdown>
            </div>
          )}
          {project.tools?.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Gebruikte tools">
              {project.tools.map((t) => (
                <li key={t}>
                  <Chip className="bg-accent-soft text-accent">{t}</Chip>
                </li>
              ))}
            </ul>
          )}
          {documents.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Downloads">
              {documents.map((f) => {
                const name = f.bestandsnaam.split('/').pop() ?? f.bestandsnaam;
                return (
                  <li key={f.id} className="max-w-full">
                    <Button
                      href={publicUrl(f.storage_path, name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="sm"
                      className="h-auto! min-h-9 py-2 max-w-full whitespace-normal! text-left"
                    >
                      <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>
                        {f.alt_of_weergavenaam || name}
                        <span className="sr-only"> (pdf)</span>
                      </span>
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
          {project.link_url && !feature && (
            <div className="mt-auto pt-6">
              <Button href={project.link_url} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">
                {project.link_label || 'Bekijken'}
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {imageUrl && (
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Vergroten: ${imageAlt}`}
          className="group relative block w-full border-t border-line bg-night cursor-zoom-in focus-visible:outline-offset-[-3px]"
        >
          <img
            src={imageUrl}
            alt={imageAlt}
            width={2400}
            height={1350}
            loading="lazy"
            decoding="async"
            className="block w-full aspect-video object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-night/75 text-white text-[0.8rem] font-medium ring-1 ring-inset ring-white/15 backdrop-blur transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Vergroten
          </span>
        </button>
      )}
      {lightboxOpen && imageUrl && (
        <Lightbox images={[{ src: imageUrl, alt: imageAlt }]} index={0} onIndexChange={() => {}} onClose={() => setLightboxOpen(false)} />
      )}
    </article>
  );
};
