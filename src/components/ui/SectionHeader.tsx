import React from 'react';
import { cn } from './cn';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  id?: string;
  className?: string;
  as?: 'h2' | 'h3';
}

/** Kop voor een sectie: klein label, titel, optionele uitleg en actie rechts. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, description, action, id, className, as: Tag = 'h2' }) => (
  <div className={cn('flex flex-wrap items-end justify-between gap-x-6 gap-y-3 mb-6 sm:mb-8', className)}>
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow className="mb-2">{eyebrow}</Eyebrow>}
      <Tag id={id} className={Tag === 'h2' ? 'text-h2' : 'text-h3'}>
        {title}
      </Tag>
      {description && <p className="mt-2 text-muted">{description}</p>}
    </div>
    {action}
  </div>
);

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={cn('font-mono text-[0.75rem] uppercase tracking-[0.12em] text-subtle', className)}>{children}</p>
);
