import React from 'react';
import { RefreshCw } from 'lucide-react';
import type { StoryOverviewItem } from '../../types';
import { useStories } from '../../lib/StoriesContext';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import { StoryCardSkeleton } from '../ui/Skeleton';
import { StoryCard } from './StoryCard';

interface StoryGridProps {
  stories: StoryOverviewItem[];
  /** Wat er staat als de (gefilterde) lijst leeg is */
  empty: React.ReactNode;
  headingLevel?: 'h2' | 'h3';
  skeletons?: number;
}

/** Kaartgrid met laadstaat (skeletons), foutstaat en lege staat. */
export const StoryGrid: React.FC<StoryGridProps> = ({ stories, empty, headingLevel = 'h3', skeletons = 3 }) => {
  const { status, reload } = useStories();
  if (status === 'loading') {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Stories laden">
        {Array.from({ length: skeletons }, (_, i) => (
          <StoryCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (status === 'error') {
    return (
      <EmptyState
        icon={RefreshCw}
        title="De stories konden niet worden geladen"
        action={
          <Button variant="secondary" onClick={reload}>
            Opnieuw proberen
          </Button>
        }
      >
        Controleer je verbinding en probeer het opnieuw.
      </EmptyState>
    );
  }
  if (stories.length === 0) return <>{empty}</>;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stories.map((s) => (
        <li key={s.slug} className="flex">
          <div className="flex-1 flex flex-col [&>article]:flex-1">
            <StoryCard story={s} headingLevel={headingLevel} />
          </div>
        </li>
      ))}
    </ul>
  );
};
