import React from 'react';
import { storyStats } from '../../lib/derive';
import { useCountUp } from '../../lib/useCountUp';
import { useStories } from '../../lib/StoriesContext';

const Stat: React.FC<{ value: number | null; suffix?: string; label: string }> = ({ value, suffix, label }) => {
  const shown = useCountUp(value);
  return (
    <div className="min-w-0 flex flex-col-reverse justify-end">
      <dt className="mt-2 text-[0.8rem] leading-snug text-white/60">{label}</dt>
      <dd className="font-mono text-[1.65rem] sm:text-[1.85rem] font-medium tracking-tight text-white tabular-nums leading-none">
        {shown === null ? <span className="inline-block w-8 h-7 rounded-md bg-white/10 align-middle" aria-hidden="true" /> : shown}
        {suffix && shown !== null && <span className="text-white/45">{suffix}</span>}
      </dd>
    </div>
  );
};

/** Live cijfers uit Supabase met count-up. */
export const HeroStats: React.FC = () => {
  const { stories, status } = useStories();
  const ready = status === 'ready';
  const stats = storyStats(stories);
  if (status === 'error') return null;
  return (
    <dl className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md">
      <Stat value={ready ? stats.total : null} label={stats.total === 1 ? 'story' : 'stories'} />
      <Stat value={ready ? stats.sprintsWithEvidence : null} label={stats.sprintsWithEvidence === 1 ? 'sprint met bewijs' : 'sprints met bewijs'} />
      <Stat value={ready ? stats.lusWithEvidence : null} suffix="/5" label="LU's met bewijs" />
    </dl>
  );
};
