import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { ArrowUpRight, Bot, FlaskConical } from 'lucide-react';
import type { Project } from '../../types';
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
  return (
    <article className={cn('flex flex-col bg-card rounded-card ring-1 ring-line shadow-card overflow-hidden', feature && 'lg:flex-row')}>
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
        {project.link_url && feature && (
          <div className="relative mt-auto pt-8">
            <Button href={project.link_url} target="_blank" rel="noopener noreferrer" variant="light">
              {project.link_label || 'Bekijk het onderzoek'}
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Button>
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
        {project.link_url && !feature && (
          <div className="mt-auto pt-6">
            <Button href={project.link_url} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">
              {project.link_label || 'Bekijken'}
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </article>
  );
};
