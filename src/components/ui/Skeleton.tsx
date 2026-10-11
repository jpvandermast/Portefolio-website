import React from 'react';
import { cn } from './cn';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div aria-hidden="true" className={cn('skeleton rounded-control', className)} />
);

/** Placeholder in de vorm van een StoryCard. */
export const StoryCardSkeleton: React.FC = () => (
  <div aria-hidden="true" className="bg-card rounded-card ring-1 ring-line overflow-hidden">
    <Skeleton className="aspect-[16/10] rounded-none" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-5 w-24 rounded-chip" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);
