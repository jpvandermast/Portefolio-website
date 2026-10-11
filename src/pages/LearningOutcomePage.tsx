import React from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, Link2Off } from 'lucide-react';
import { learningOutcomes } from '../../shared/portfolioContent';
import { StoryGrid } from '../components/story/StoryGrid';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { EmptyState } from '../components/ui/EmptyState';
import { PageHeader } from '../components/ui/PageHeader';
import { cn } from '../components/ui/cn';
import { getSprint } from '../data/sprints';
import { groupBySprint } from '../lib/derive';
import { getLearningOutcome, LU_STYLES, luPath, parseLuParam } from '../lib/lu';
import { useStories } from '../lib/StoriesContext';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import NotFoundPage from './NotFoundPage';

export default function LearningOutcomePage() {
  const { lu: param } = useParams();
  const nummer = parseLuParam(param);
  const outcome = nummer ? getLearningOutcome(nummer) : undefined;
  const { stories, status } = useStories();
  useDocumentTitle(outcome ? `${outcome.code} · ${outcome.title}` : null, outcome?.shortDescription);

  if (!outcome || !nummer) return <NotFoundPage />;

  const style = LU_STYLES[nummer];
  const linked = stories.filter((s) => s.lus.includes(nummer));
  const groups = groupBySprint(linked);
  const prev = learningOutcomes.find((l) => l.nummer === nummer - 1);
  const next = learningOutcomes.find((l) => l.nummer === nummer + 1);

  return (
    <Container className="pb-24">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Leeruitkomsten', to: '/leeruitkomsten' }, { label: outcome.code }]}
        eyebrow={
          <span className={cn('inline-flex items-center gap-2 h-7 px-3 rounded-full font-mono text-[0.75rem] font-medium', style.soft, style.ink)}>
            <span className={cn('w-2 h-2 rounded-full', style.dot)} aria-hidden="true" />
            {outcome.code} · {outcome.label}
          </span>
        }
        title={outcome.title}
      >
        <blockquote className={cn('mt-6 max-w-3xl border-l-2 pl-5 text-lead text-ink/80')} style={{ borderColor: style.color }}>
          {outcome.shortDescription}
          <footer className="mt-2 text-[0.8rem] text-subtle">Officiële omschrijving, Canvas-rubriek</footer>
        </blockquote>
      </PageHeader>

      <dl className="mb-12 grid grid-cols-2 sm:grid-cols-3 gap-px overflow-hidden rounded-card bg-line ring-1 ring-line max-w-3xl">
        {[
          { label: 'Gekoppelde stories', value: status === 'ready' ? linked.length : '–' },
          { label: 'Minimaal voldoende nodig', value: `${outcome.minimumVoldoende}×` },
          { label: 'Sprints met bewijs', value: status === 'ready' ? groups.length : '–' },
        ].map((item, i) => (
          <div key={item.label} className={cn('bg-card px-5 py-4 flex flex-col-reverse', i === 2 && 'col-span-2 sm:col-span-1')}>
            <dt className="mt-1 text-[0.8rem] text-muted">{item.label}</dt>
            <dd className="font-mono text-[1.5rem] font-medium tabular-nums">{item.value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mb-6 text-h2">Bewijs</h2>
      {status === 'ready' && linked.length === 0 ? (
        <EmptyState
          compact
          icon={Link2Off}
          title={`Nog geen story gekoppeld aan ${outcome.code}`}
          action={
            <Button to="/stories" variant="secondary" size="sm">
              Alle stories bekijken
            </Button>
          }
        >
          Bewijs voor deze leeruitkomst volgt in een volgende sprint en verschijnt hier vanzelf.
        </EmptyState>
      ) : status !== 'ready' ? (
        <StoryGrid stories={[]} empty={null} />
      ) : (
        <div className="space-y-10">
          {groups.map(([n, items]) => (
            <section key={n} aria-labelledby={`lu-sprint-${n}`}>
              <h3 id={`lu-sprint-${n}`} className="mb-4 flex items-baseline gap-3 text-h3">
                {getSprint(n)?.reparatie ? 'Reparatiesprint' : `Sprint ${n}`}
                <span className="font-mono text-[0.75rem] font-normal text-subtle">
                  {items.length} {items.length === 1 ? 'story' : 'stories'}
                </span>
              </h3>
              <StoryGrid stories={items} empty={null} headingLevel="h3" />
            </section>
          ))}
        </div>
      )}

      <nav aria-label="Andere leeruitkomsten" className="mt-16 pt-8 border-t border-line flex flex-wrap justify-between gap-4">
        {prev ? (
          <Link to={luPath(prev.nummer)} className="group inline-flex items-center gap-2 min-h-11 text-[0.9rem] text-muted hover:text-ink">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            <span className="font-mono">{prev.code}</span> {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={luPath(next.nummer)} className="group inline-flex items-center gap-2 min-h-11 text-[0.9rem] text-muted hover:text-ink">
            <span className="font-mono">{next.code}</span> {next.title}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        )}
      </nav>
    </Container>
  );
}
