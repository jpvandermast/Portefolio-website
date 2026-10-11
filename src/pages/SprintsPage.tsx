import React, { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router';
import { CalendarCheck2, CalendarDays, Hourglass } from 'lucide-react';
import { StoryGrid } from '../components/story/StoryGrid';
import { Container } from '../components/ui/Container';
import { EmptyState } from '../components/ui/EmptyState';
import { PageHeader } from '../components/ui/PageHeader';
import { cn } from '../components/ui/cn';
import {
  formatDay,
  formatLongDay,
  getCurrentSprint,
  getSprint,
  sprintProgress,
  SPRINTS,
  sprintStatus,
  type SprintStatus,
} from '../data/sprints';
import { useStories } from '../lib/StoriesContext';
import { useDocumentTitle } from '../lib/useDocumentTitle';

const STATUS_LABEL: Record<SprintStatus, string> = { afgerond: 'Afgerond', bezig: 'Nu bezig', gepland: 'Gepland' };

export default function SprintsPage() {
  useDocumentTitle('Sprints', 'Tijdlijn van alle sprints van de minor Future-proof met AI, met Show & Grow-data en de stories per sprint.');
  const { stories, status } = useStories();
  const [params] = useSearchParams();
  const current = getCurrentSprint();
  const selected = getSprint(Number(params.get('sprint'))) ?? current;
  const selectedStatus = sprintStatus(selected);
  const inSprint = stories.filter((s) => s.sprint === selected.nummer);
  const scrollerRef = useRef<HTMLOListElement>(null);

  // Geselecteerde sprint in beeld houden in de (op mobiel horizontaal scrollende) tijdlijn
  useEffect(() => {
    const el = scrollerRef.current?.querySelector<HTMLElement>('[aria-current="true"]');
    el?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' as ScrollBehavior });
  }, [selected.nummer]);

  const label = (n: number) => (getSprint(n)?.reparatie ? 'Reparatie' : `Sprint ${n}`);
  const { fraction, daysUntilShowAndGrow } = sprintProgress(selected);

  return (
    <Container className="pb-24">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Sprints' }]}
        title="Sprints"
        lead="De minor loopt in sprints van ongeveer twee weken, steeds afgesloten met een Show & Grow op woensdag. Kies een sprint om het bewijs te zien."
      />

      {/* Tijdlijn */}
      <nav aria-label="Tijdlijn van de sprints" className="-mx-5 sm:mx-0">
        <ol ref={scrollerRef} className="relative flex gap-2 overflow-x-auto no-scrollbar px-5 sm:px-0 pb-2 snap-x lg:grid lg:grid-cols-9">
          {SPRINTS.map((s) => {
            const st = sprintStatus(s);
            const isSelected = s.nummer === selected.nummer;
            const count = stories.filter((x) => x.sprint === s.nummer).length;
            return (
              <li key={s.nummer} className="snap-start shrink-0 w-[8.5rem] lg:w-auto">
                <Link
                  to={`/sprints?sprint=${s.nummer}`}
                  replace
                  preventScrollReset
                  aria-current={isSelected ? 'true' : undefined}
                  className={cn(
                    'group relative flex flex-col h-full rounded-card p-3.5 pt-4 transition-[background-color,box-shadow] ring-1',
                    isSelected ? 'bg-ink text-white ring-ink shadow-lift' : 'bg-card ring-line hover:shadow-card hover:ring-line-strong',
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-0 left-3.5 right-3.5 h-1 rounded-b-full',
                      st === 'bezig' ? 'bg-accent' : st === 'afgerond' ? (isSelected ? 'bg-white/50' : 'bg-ink/60') : 'bg-transparent',
                    )}
                    aria-hidden="true"
                  />
                  <span className={cn('text-[0.9rem] font-semibold', s.reparatie && !isSelected && 'text-muted')}>{label(s.nummer)}</span>
                  <span className={cn('mt-1 font-mono text-[0.68rem] leading-snug', isSelected ? 'text-white/70' : 'text-subtle')}>
                    <span className="block whitespace-nowrap">{formatDay(s.start)}</span>
                    <span className="block whitespace-nowrap">t/m {formatDay(s.showAndGrow)}</span>
                  </span>
                  <span className={cn('mt-3 flex items-center gap-1.5 text-[0.72rem]', isSelected ? 'text-white/80' : 'text-muted')}>
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        st === 'bezig' ? 'bg-accent animate-pulse' : st === 'afgerond' ? (isSelected ? 'bg-white/60' : 'bg-ink/50') : 'ring-1 ring-current',
                      )}
                      aria-hidden="true"
                    />
                    {STATUS_LABEL[st]}
                  </span>
                  {status === 'ready' && count > 0 && (
                    <span className={cn('mt-1 text-[0.72rem]', isSelected ? 'text-white/80' : 'text-muted')}>
                      {count} {count === 1 ? 'story' : 'stories'}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Geselecteerde sprint */}
      <section aria-labelledby="sprint-titel" className="mt-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div>
            <p className="flex items-center gap-2 text-[0.8rem] text-subtle font-mono uppercase tracking-[0.12em]">
              {STATUS_LABEL[selectedStatus]}
              {selected.nummer === current.nummer && selectedStatus === 'bezig' && <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />}
            </p>
            <h2 id="sprint-titel" className="mt-2 text-h1">
              {selected.reparatie ? 'Reparatiesprint' : `Sprint ${selected.nummer}`}
            </h2>
            {selected.opmerking && <p className="mt-3 text-muted">{selected.opmerking}</p>}
          </div>

          <dl className="rounded-card bg-card ring-1 ring-line shadow-card p-5 space-y-4 text-[0.9rem]">
            <div className="flex gap-3">
              <CalendarDays className="w-4 h-4 mt-1 text-subtle shrink-0" aria-hidden="true" />
              <div>
                <dt className="text-subtle text-[0.8rem]">Start</dt>
                <dd className="font-medium first-letter:uppercase">{formatLongDay(selected.start)}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <CalendarCheck2 className="w-4 h-4 mt-1 text-accent shrink-0" aria-hidden="true" />
              <div>
                <dt className="text-subtle text-[0.8rem]">Show &amp; Grow</dt>
                <dd className="font-medium first-letter:uppercase">{formatLongDay(selected.showAndGrow)}</dd>
              </div>
            </div>
            {selectedStatus === 'bezig' && (
              <div className="flex gap-3">
                <Hourglass className="w-4 h-4 mt-1 text-subtle shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <dt className="text-subtle text-[0.8rem]">Voortgang</dt>
                  <dd>
                    <span className="font-medium">
                      {daysUntilShowAndGrow === 0 ? 'Show & Grow is vandaag' : `Nog ${daysUntilShowAndGrow} ${daysUntilShowAndGrow === 1 ? 'dag' : 'dagen'}`}
                    </span>
                    <span className="mt-2 block h-1.5 rounded-full bg-sunken overflow-hidden" aria-hidden="true">
                      <span className="block h-full rounded-full bg-[linear-gradient(90deg,#3762ab,#7c5cf0)]" style={{ width: `${fraction * 100}%` }} />
                    </span>
                  </dd>
                </div>
              </div>
            )}
          </dl>
        </div>

        <h3 className="mt-12 mb-5 text-h3">Stories in deze sprint</h3>
        <StoryGrid
          stories={inSprint}
          empty={
            <EmptyState compact title={`Nog geen stories voor ${selected.reparatie ? 'de reparatiesprint' : `sprint ${selected.nummer}`}`}>
              {selectedStatus === 'gepland'
                ? `Deze sprint begint op ${formatLongDay(selected.start)}.`
                : selectedStatus === 'bezig'
                  ? 'De stories van deze sprint verschijnen hier na de oplevering.'
                  : 'Voor deze sprint zijn (nog) geen stories gepubliceerd.'}
            </EmptyState>
          }
        />
      </section>
    </Container>
  );
}
