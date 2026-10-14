import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, Bot, Clock, FlaskConical } from 'lucide-react';
import { useProjecten } from '../../lib/ProjectenContext';
import type { Project } from '../../types';
import { Reveal } from '../ui/Reveal';
import { Eyebrow } from '../ui/SectionHeader';
import { Skeleton } from '../ui/Skeleton';

const BLOCKS: {
  type: Project['type'];
  to: string;
  eyebrow: string;
  title: string;
  empty: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  {
    type: 'onderzoek',
    to: '/onderzoek',
    eyebrow: 'Onderzoek',
    title: 'De toekomst van AI in het vakgebied van de webontwikkelaar',
    empty: 'Het onderzoek is afgerond en verschijnt hier binnenkort.',
    icon: FlaskConical,
  },
  {
    type: 'project',
    to: '/ai-oplossingen',
    eyebrow: 'AI-oplossingen',
    title: 'Gebouwde AI-oplossingen en prototypes',
    empty: 'De oplossingen die ik in de komende sprints bouw, komen hier te staan.',
    icon: Bot,
  },
];

/** Twee vaste plekken op de homepage: onderzoek en AI-oplossingen (tabel `projecten`). */
export const WorkTeaser: React.FC = () => {
  const { projecten, status } = useProjecten();
  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
      {BLOCKS.map((b, i) => {
        const items = projecten.filter((p) => p.type === b.type);
        const Icon = b.icon;
        return (
          <Reveal key={b.type} delay={i * 0.05}>
            <Link
              to={b.to}
              className="group relative flex flex-col h-full rounded-card bg-card ring-1 ring-line shadow-card p-6 sm:p-7 transition-[box-shadow,transform] duration-300 hover:shadow-lift hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-accent-soft text-accent">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                {status === 'ready' && items.length === 0 && (
                  <span className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full bg-sunken text-[0.75rem] font-medium text-muted">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    Volgt binnenkort
                  </span>
                )}
              </div>
              <Eyebrow className="mt-6">{b.eyebrow}</Eyebrow>
              <h3 className="mt-2 text-h3 group-hover:text-accent transition-colors">
                {items.length === 1 ? items[0].titel : b.title}
              </h3>
              <div className="mt-2 text-[0.9rem] text-muted">
                {status === 'loading' ? (
                  <Skeleton className="h-4 w-2/3" />
                ) : items.length === 0 ? (
                  b.empty
                ) : items.length === 1 ? (
                  <span className="line-clamp-2">{items[0].beschrijving?.replace(/[#*_>`[\]]/g, '')}</span>
                ) : (
                  `${items.length} ${b.type === 'onderzoek' ? 'onderzoeken' : 'oplossingen'}: ${items.map((p) => p.titel).join(', ')}`
                )}
              </div>
              <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-accent">
                Bekijken
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
};
