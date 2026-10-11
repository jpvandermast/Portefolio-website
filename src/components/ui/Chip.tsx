import React from 'react';
import { Link } from 'react-router';
import { FlaskConical, GraduationCap, Wrench } from 'lucide-react';
import { STORY_TYPE_LABELS } from '../../lib/stories';
import { getLearningOutcome, LU_STYLES, luPath } from '../../lib/lu';
import type { StoryTypeCode } from '../../types';
import { cn } from './cn';

const chipBase =
  'inline-flex items-center gap-1.5 h-6 px-2.5 rounded-chip text-[0.75rem] font-medium leading-none whitespace-nowrap';

interface ChipProps {
  children: React.ReactNode;
  className?: string;
  to?: string;
  title?: string;
}

/** Basischip; met `to` wordt het een link (met hover-staat). */
export const Chip: React.FC<ChipProps> = ({ children, className, to, title }) =>
  to ? (
    <Link to={to} title={title} className={cn(chipBase, 'relative transition-[filter,box-shadow] hover:brightness-95 hover:shadow-card after:absolute after:inset-x-0 after:-inset-y-2.5', className)}>
      {children}
    </Link>
  ) : (
    <span title={title} className={cn(chipBase, className)}>
      {children}
    </span>
  );

export const TYPE_ICONS: Record<StoryTypeCode, React.FC<{ className?: string }>> = {
  US: Wrench,
  RS: FlaskConical,
  LS: GraduationCap,
};

export const TypeChip: React.FC<{ type: StoryTypeCode; linked?: boolean; short?: boolean }> = ({ type, linked, short }) => {
  const Icon = TYPE_ICONS[type];
  return (
    <Chip to={linked ? `/stories?type=${type}` : undefined} className="bg-sunken text-ink ring-1 ring-inset ring-line">
      <Icon className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
      {short ? type : STORY_TYPE_LABELS[type]}
    </Chip>
  );
};

export const SprintChip: React.FC<{ sprint: number; linked?: boolean }> = ({ sprint, linked }) => (
  <Chip to={linked ? `/stories?sprint=${sprint}` : undefined} className="bg-card text-muted ring-1 ring-inset ring-line font-mono text-[0.7rem] tracking-tight">
    Sprint {sprint}
  </Chip>
);

export const LuChip: React.FC<{ lu: number; linked?: boolean; withLabel?: boolean }> = ({ lu, linked, withLabel }) => {
  const style = LU_STYLES[lu];
  const outcome = getLearningOutcome(lu);
  if (!style || !outcome) return null;
  return (
    <Chip
      to={linked ? luPath(lu) : undefined}
      title={`${outcome.code} · ${outcome.title}`}
      className={cn(style.soft, style.ink)}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', style.dot)} aria-hidden="true" />
      {outcome.code}
      {withLabel && <span className="font-normal">· {outcome.label}</span>}
    </Chip>
  );
};

/** Kleine LU-stip met label, bijv. in legenda's. */
export const LuDot: React.FC<{ lu: number; className?: string }> = ({ lu, className }) => (
  <span className={cn('inline-block w-2 h-2 rounded-full shrink-0', LU_STYLES[lu]?.dot, className)} aria-hidden="true" />
);
