import React from 'react';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { cn } from './cn';

export interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  crumbs: Crumb[];
  title: React.ReactNode;
  lead?: React.ReactNode;
  eyebrow?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Paginakop met breadcrumb. De h1 heeft id "page-title" en tabIndex -1, zodat de focus er bij een
 * paginawissel naartoe kan (zie RouteEffects).
 */
export const PageHeader: React.FC<PageHeaderProps> = ({ crumbs, title, lead, eyebrow, children, className }) => (
  <header className={cn('pt-8 sm:pt-12 pb-8 sm:pb-10', className)}>
    <Breadcrumbs crumbs={crumbs} />
    {eyebrow && <div className="mt-6">{eyebrow}</div>}
    <h1 id="page-title" tabIndex={-1} className={cn('text-h1 max-w-4xl focus:outline-none', eyebrow ? 'mt-3' : 'mt-6')}>
      {title}
    </h1>
    {lead && <p className="mt-4 text-lead text-muted max-w-2xl">{lead}</p>}
    {children}
  </header>
);

export const Breadcrumbs: React.FC<{ crumbs: Crumb[] }> = ({ crumbs }) => (
  <nav aria-label="Kruimelpad">
    <ol className="flex flex-wrap items-center gap-1 text-[0.8125rem] text-subtle">
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1;
        return (
          <li key={`${c.label}-${i}`} className="flex items-center gap-1 min-w-0">
            {c.to && !last ? (
              <Link to={c.to} className="relative rounded px-1 -mx-1 py-0.5 hover:text-ink transition-colors after:absolute after:-inset-x-1 after:-inset-y-2.5">
                {c.label}
              </Link>
            ) : (
              <span aria-current={last ? 'page' : undefined} className={cn(last && 'text-ink font-medium truncate max-w-[60vw] sm:max-w-md')}>
                {c.label}
              </span>
            )}
            {!last && <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  </nav>
);
