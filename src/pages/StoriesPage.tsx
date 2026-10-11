import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { SearchX, Search, X } from 'lucide-react';
import { learningOutcomes } from '../../shared/portfolioContent';
import { StoryGrid } from '../components/story/StoryGrid';
import { Button } from '../components/ui/Button';
import { TYPE_ICONS } from '../components/ui/Chip';
import { Container } from '../components/ui/Container';
import { EmptyState } from '../components/ui/EmptyState';
import { PageHeader } from '../components/ui/PageHeader';
import { cn } from '../components/ui/cn';
import { getSprint } from '../data/sprints';
import { groupBySprint, normalize, storyStats } from '../lib/derive';
import { LU_STYLES } from '../lib/lu';
import { STORY_TYPE_LABELS } from '../lib/stories';
import { useStories } from '../lib/StoriesContext';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import type { StoryTypeCode } from '../types';

const TYPES: { code: StoryTypeCode; uitleg: string }[] = [
  { code: 'US', uitleg: 'iets gebouwd of opgeleverd' },
  { code: 'RS', uitleg: 'iets onderzocht' },
  { code: 'LS', uitleg: 'iets nieuws geleerd' },
];

/** Knop die een filter aan/uit zet; de staat staat in de URL. */
const FilterButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
}> = ({ active, onClick, children, count }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={cn(
      'inline-flex items-center gap-2 h-11 sm:h-9 px-3.5 rounded-full text-[0.85rem] font-medium whitespace-nowrap transition-colors',
      active ? 'bg-ink text-white' : 'bg-card text-ink ring-1 ring-inset ring-line hover:bg-sunken',
    )}
  >
    {children}
    {count !== undefined && (
      <span className={cn('font-mono text-[0.7rem] tabular-nums', active ? 'text-white/70' : 'text-subtle')}>{count}</span>
    )}
  </button>
);

const FilterGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div role="group" aria-label={label} className="flex items-center gap-2 min-w-0">
    <span className="hidden md:block w-28 shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">{label}</span>
    <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 py-1">{children}</div>
  </div>
);

export default function StoriesPage() {
  useDocumentTitle('Bewijs', 'Alle stories van Josse van der Mast voor de minor Future-proof met AI, te filteren op sprint, type en leeruitkomst.');
  const { stories } = useStories();
  const [params, setParams] = useSearchParams();

  const q = params.get('q') ?? '';
  const sprint = Number(params.get('sprint')) || null;
  const typeParam = params.get('type')?.toUpperCase();
  const type = (['US', 'RS', 'LS'] as const).find((t) => t === typeParam) ?? null;
  const lu = Number(params.get('lu')) || null;

  const update = (key: string, value: string | null, replace = false) => {
    const next = new URLSearchParams(params);
    if (value === null || value === '') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace, preventScrollReset: true });
  };
  const toggle = (key: string, value: string, current: string | number | null) =>
    update(key, String(current) === value ? null : value);
  const clear = () => setParams(new URLSearchParams(), { preventScrollReset: true });

  const stats = storyStats(stories);
  const filtered = useMemo(() => {
    const words = normalize(q).split(/\s+/).filter(Boolean);
    return stories.filter(
      (s) =>
        (!sprint || s.sprint === sprint) &&
        (!type || s.type === type) &&
        (!lu || s.lus.includes(lu)) &&
        words.every((w) => normalize(`${s.titel} ${s.korte_versie}`).includes(w)),
    );
  }, [stories, q, sprint, type, lu]);

  const anyFilter = Boolean(q || sprint || type || lu);
  const groups = groupBySprint(filtered);
  const sprintOptions = [...new Set([...stats.sprintNumbers, ...(sprint ? [sprint] : [])])].sort((a, b) => a - b);

  const emptyDescription = [sprint && `sprint ${sprint}`, type && STORY_TYPE_LABELS[type], lu && `LU${lu}`, q && `“${q}”`]
    .filter(Boolean)
    .join(' · ');

  return (
    <Container className="pb-24">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Bewijs' }]}
        title="Bewijs"
        lead="Alle stories uit de minor: wat ik onderzocht, bouwde en leerde. Filter op sprint, type of leeruitkomst."
      >
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem] text-muted" aria-label="Soorten stories">
          {TYPES.map(({ code, uitleg }) => {
            const Icon = TYPE_ICONS[code];
            return (
              <li key={code} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-subtle" aria-hidden="true" />
                <span>
                  <span className="font-medium text-ink">{STORY_TYPE_LABELS[code]}</span> — {uitleg}
                </span>
              </li>
            );
          })}
        </ul>
      </PageHeader>

      {/* Zoeken en filters */}
      <section aria-label="Zoeken en filteren" className="rounded-panel bg-card ring-1 ring-line shadow-card p-4 sm:p-5 space-y-2">
        <div className="relative mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle pointer-events-none" aria-hidden="true" />
          <label htmlFor="zoek-stories" className="sr-only">
            Zoek in titel en korte versie
          </label>
          <input
            id="zoek-stories"
            type="search"
            value={q}
            onChange={(e) => update('q', e.target.value, true)}
            placeholder="Zoek in titels en samenvattingen…"
            className="w-full h-12 pl-11 pr-4 rounded-full bg-sunken text-[1rem] sm:text-[0.95rem] text-ink placeholder:text-subtle focus:bg-card focus:outline-none focus:ring-2 focus:ring-accent/60 transition-colors"
          />
        </div>
        {sprintOptions.length > 0 && (
          <FilterGroup label="Sprint">
            {sprintOptions.map((n) => (
              <FilterButton
                key={n}
                active={sprint === n}
                onClick={() => toggle('sprint', String(n), sprint)}
                count={stories.filter((s) => s.sprint === n).length}
              >
                {getSprint(n)?.reparatie ? 'Reparatie' : `Sprint ${n}`}
              </FilterButton>
            ))}
          </FilterGroup>
        )}
        <FilterGroup label="Type">
          {TYPES.map(({ code }) => {
            const Icon = TYPE_ICONS[code];
            return (
              <FilterButton key={code} active={type === code} onClick={() => toggle('type', code, type)} count={stats.perType[code]}>
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                {STORY_TYPE_LABELS[code]}
              </FilterButton>
            );
          })}
        </FilterGroup>
        <FilterGroup label="Leeruitkomst">
          {learningOutcomes.map((o) => (
            <FilterButton key={o.id} active={lu === o.nummer} onClick={() => toggle('lu', String(o.nummer), lu)} count={stats.perLu[o.nummer]}>
              <span className={cn('w-2 h-2 rounded-full', LU_STYLES[o.nummer].dot)} aria-hidden="true" />
              {o.code}
              <span className="hidden sm:inline font-normal opacity-80">{o.label}</span>
            </FilterButton>
          ))}
        </FilterGroup>
      </section>

      <div className="mt-8 mb-6 flex items-center justify-between gap-4 min-h-9">
        <p className="text-[0.9rem] text-muted" aria-live="polite">
          <span className="font-medium text-ink">{filtered.length}</span> {filtered.length === 1 ? 'story' : 'stories'}
          {anyFilter && ' gevonden'}
        </p>
        {anyFilter && (
          <Button variant="ghost" size="sm" onClick={clear}>
            <X className="w-4 h-4" aria-hidden="true" />
            Filters wissen
          </Button>
        )}
      </div>

      {groups.length > 0 ? (
        <div className="space-y-12">
          {groups.map(([n, items]) => (
            <section key={n} aria-labelledby={`sprint-${n}`}>
              <h2 id={`sprint-${n}`} className="flex items-baseline gap-3 mb-5 text-h3">
                {getSprint(n)?.reparatie ? 'Reparatiesprint' : `Sprint ${n}`}
                <span className="font-mono text-[0.75rem] font-normal text-subtle">
                  {items.length} {items.length === 1 ? 'story' : 'stories'}
                </span>
              </h2>
              <StoryGrid stories={items} empty={null} />
            </section>
          ))}
        </div>
      ) : (
        <StoryGrid
          stories={filtered}
          skeletons={6}
          empty={
            <EmptyState
              icon={SearchX}
              title={stories.length === 0 ? 'Nog geen stories gepubliceerd' : 'Geen stories met deze filters'}
              action={
                anyFilter ? (
                  <Button variant="secondary" onClick={clear}>
                    Filters wissen
                  </Button>
                ) : undefined
              }
            >
              {anyFilter
                ? `Er is (nog) geen bewijs voor ${emptyDescription}. Nieuwe stories verschijnen hier vanzelf.`
                : 'Stories verschijnen hier zodra ze zijn opgeleverd.'}
            </EmptyState>
          }
        />
      )}
    </Container>
  );
}
