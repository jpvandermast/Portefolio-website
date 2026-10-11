import React from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, ImageIcon } from 'lucide-react';
import type { StoryOverviewItem } from '../../types';
import { publicUrl } from '../../lib/stories';
import { LuChip, SprintChip, TypeChip } from '../ui/Chip';
import { cn } from '../ui/cn';

interface StoryCardProps {
  story: StoryOverviewItem;
  /** compact = horizontale variant voor bento en zijlijsten */
  variant?: 'default' | 'compact';
  headingLevel?: 'h2' | 'h3';
}

/**
 * Story-kaart. De hele kaart is klikbaar via een uitgerekte link op de titel;
 * chips staan er los van (geen links in links).
 */
export const StoryCard: React.FC<StoryCardProps> = ({ story, variant = 'default', headingLevel: H = 'h3' }) => {
  const thumb = story.klein_pad ? publicUrl(story.klein_pad) : null;

  if (variant === 'compact') {
    return (
      <article className="group relative flex gap-4 items-center rounded-control p-2 -m-2 transition-colors hover:bg-sunken/70 focus-within:bg-sunken/70">
        <div className="w-20 sm:w-24 aspect-[4/3] shrink-0 overflow-hidden rounded-[10px] bg-sunken ring-1 ring-line">
          {thumb ? (
            <img src={thumb} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 ease-out-soft group-hover:scale-105" />
          ) : (
            <div className="w-full h-full grid place-items-center text-subtle">
              <ImageIcon className="w-5 h-5" aria-hidden="true" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[0.7rem] text-subtle mb-0.5">
            Sprint {story.sprint} · {story.type}
          </p>
          <H className="text-[0.95rem] font-medium leading-snug line-clamp-2">
            <Link to={`/stories/${story.slug}`} className="after:absolute after:inset-0 focus:outline-none after:rounded-control focus-visible:after:outline-2 focus-visible:after:outline-accent">
              {story.titel}
            </Link>
          </H>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex flex-col bg-card rounded-card ring-1 ring-line shadow-card overflow-hidden transition-[box-shadow,transform] duration-300 ease-out-soft hover:shadow-lift hover:-translate-y-0.5 focus-within:shadow-lift">
      <div className="relative aspect-[16/10] bg-sunken overflow-hidden">
        {thumb ? (
          <img
            src={thumb}
            alt={story.klein_alt ?? ''}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-subtle">
            <ImageIcon className="w-7 h-7" aria-hidden="true" />
          </div>
        )}
        <span className="absolute top-3 right-3 grid place-items-center w-8 h-8 rounded-full bg-white/90 text-ink shadow-card opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" aria-hidden="true">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <TypeChip type={story.type} />
          <SprintChip sprint={story.sprint} />
          {story.lus.map((lu) => (
            <LuChip key={lu} lu={lu} />
          ))}
        </div>
        <H className="text-h3 font-semibold">
          <Link
            to={`/stories/${story.slug}`}
            className={cn(
              'after:absolute after:inset-0 after:rounded-card focus:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent',
              'group-hover:text-accent transition-colors',
            )}
          >
            {story.titel}
          </Link>
        </H>
        <p className="mt-2 text-[0.925rem] text-muted line-clamp-3">{story.korte_versie}</p>
      </div>
    </article>
  );
};
