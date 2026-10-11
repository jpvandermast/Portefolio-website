import React from 'react';
import { cn } from './cn';

interface EmptyStateProps {
  icon?: React.FC<{ className?: string }>;
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  /** compact = één regel in een kaart of lijst */
  compact?: boolean;
}

/** Eerlijke, compacte lege staat: nooit een grote lege kaart. */
export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, children, action, className, compact }) =>
  compact ? (
    <div className={cn('flex items-start gap-3 rounded-control bg-sunken/70 px-4 py-3 text-[0.9rem] text-muted', className)}>
      {Icon && <Icon className="w-4 h-4 mt-1 shrink-0 text-subtle" aria-hidden="true" />}
      <div>
        <p className="text-ink font-medium">{title}</p>
        {children && <div className="mt-0.5">{children}</div>}
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  ) : (
    <div className={cn('rounded-card border border-dashed border-line-strong px-6 py-10 text-center', className)}>
      {Icon && (
        <span className="mx-auto mb-4 grid place-items-center w-11 h-11 rounded-full bg-sunken text-muted">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </span>
      )}
      <p className="text-ink font-medium">{title}</p>
      {children && <div className="mt-1 text-muted text-[0.95rem] max-w-md mx-auto">{children}</div>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
