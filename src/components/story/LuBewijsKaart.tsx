import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import type { StoryOverviewItem } from '../../types';
import { TypeChip } from '../ui/Chip';

interface LuBewijsKaartProps {
  story: StoryOverviewItem;
  /** Leeruitkomst (1-5) waarvoor deze story bewijs is */
  lu: number;
}

/**
 * Bewijskaart op een leeruitkomst-pagina: titel, korte onderbouwing waarom deze story bewijs is voor
 * deze LU (story_leeruitkomsten.onderbouwing) en een link naar de volledige story.
 * De hele kaart is klikbaar via een uitgerekte link op de titel (zelfde patroon als StoryCard).
 */
export const LuBewijsKaart: React.FC<LuBewijsKaartProps> = ({ story, lu }) => {
  const onderbouwing = story.luNotities?.[lu]?.trim();
  return (
    <article className="group relative flex h-full flex-col gap-3 rounded-card bg-card p-5 ring-1 ring-line shadow-card transition-[box-shadow,transform] duration-300 ease-out-soft hover:shadow-lift hover:-translate-y-0.5 focus-within:shadow-lift">
      <div className="flex flex-wrap items-center gap-1.5">
        <TypeChip type={story.type} />
      </div>
      <h4 className="text-h3 font-semibold">
        <Link
          to={`/stories/${story.slug}`}
          className="transition-colors group-hover:text-accent after:absolute after:inset-0 after:rounded-card focus:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
        >
          {story.titel}
        </Link>
      </h4>
      <p className="text-[0.925rem] text-muted">{onderbouwing || story.korte_versie}</p>
      <span
        className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[0.85rem] font-medium text-accent"
        aria-hidden="true"
      >
        Lees de hele story
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  );
};
