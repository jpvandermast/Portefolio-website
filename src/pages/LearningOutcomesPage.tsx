import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, Info } from 'lucide-react';
import { learningOutcomes, MINIMUM_TOTAAL_VOLDOENDE } from '../../shared/portfolioContent';
import { Container } from '../components/ui/Container';
import { PageHeader } from '../components/ui/PageHeader';
import { Reveal } from '../components/ui/Reveal';
import { cn } from '../components/ui/cn';
import { storyStats } from '../lib/derive';
import { LU_STYLES, luPath } from '../lib/lu';
import { useStories } from '../lib/StoriesContext';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function LearningOutcomesPage() {
  useDocumentTitle('Leeruitkomsten', 'De vijf leeruitkomsten van de minor Future-proof met AI met de officiële omschrijving en het gekoppelde bewijs.');
  const { stories, status } = useStories();
  const stats = storyStats(stories);

  return (
    <Container className="pb-24">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Leeruitkomsten' }]}
        title="Leeruitkomsten"
        lead="De vijf leeruitkomsten van de minor, met de officiële omschrijving uit de rubriek en de stories die als bewijs gelden."
      />

      <div className="mb-8 flex items-start gap-3 rounded-card bg-accent-soft/60 px-5 py-4 text-[0.875rem] text-ink/80 max-w-3xl">
        <Info className="w-4 h-4 mt-0.5 shrink-0 text-accent" aria-hidden="true" />
        <p>
          <span className="font-medium text-ink">Over de minimumnorm:</span> volgens de minorgids moet elke leeruitkomst een
          minimaal aantal keer <em>voldoende beoordeeld</em> zijn (in totaal minimaal {MINIMUM_TOTAAL_VOLDOENDE} over 8 sprints,
          minimaal 3 leeruitkomsten per sprint). Het aantal gekoppelde stories hieronder is mijn bewijs, geen beoordeling.
        </p>
      </div>

      <ol className="space-y-4">
        {learningOutcomes.map((lu, i) => {
          const count = stats.perLu[lu.nummer] ?? 0;
          const style = LU_STYLES[lu.nummer];
          return (
            <Reveal as="li" key={lu.id} delay={i * 0.04}>
              <article className="group relative grid gap-5 md:grid-cols-[auto_minmax(0,1fr)_220px] md:items-center rounded-card bg-card ring-1 ring-line shadow-card p-6 sm:p-7 transition-[box-shadow,transform] duration-300 hover:shadow-lift hover:-translate-y-0.5">
                <span className={cn('grid place-items-center w-14 h-14 rounded-2xl font-mono text-[1.1rem] font-semibold', style.soft, style.ink)}>
                  {lu.code}
                </span>
                <div className="min-w-0">
                  <h2 className="text-h3">
                    <Link to={luPath(lu.nummer)} className="after:absolute after:inset-0 after:rounded-card focus:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent group-hover:text-accent transition-colors">
                      {lu.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-[0.925rem] text-muted max-w-2xl">{lu.shortDescription}</p>
                </div>
                <div>
                  <div className="flex items-baseline justify-between gap-3 text-[0.825rem]">
                    <span className="text-muted">
                      <span className="font-mono text-[1.4rem] font-medium text-ink tabular-nums">{status === 'ready' ? count : '–'}</span>{' '}
                      {count === 1 ? 'story' : 'stories'}
                    </span>
                    <span className="font-mono text-subtle">min. {lu.minimumVoldoende}× voldoende</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-sunken overflow-hidden" aria-hidden="true">
                    <div className={cn('h-full rounded-full', style.dot)} style={{ width: `${Math.min(count / lu.minimumVoldoende, 1) * 100}%` }} />
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 text-[0.825rem] font-medium text-accent">
                    Bekijk bewijs <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ol>
    </Container>
  );
}
