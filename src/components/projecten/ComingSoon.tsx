import React from 'react';
import { Clock } from 'lucide-react';

interface ComingSoonProps {
  icon: React.FC<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}

/** Vaste plek voor inhoud die nog volgt: zichtbaar, maar rustig en eerlijk (geen verzonnen inhoud). */
export const ComingSoon: React.FC<ComingSoonProps> = ({ icon: Icon, title, children }) => (
  <div className="relative overflow-hidden rounded-card border border-dashed border-line-strong bg-card/60 p-7 sm:p-9">
    <div className="flex flex-col sm:flex-row gap-5 sm:items-start">
      <span className="grid place-items-center w-12 h-12 shrink-0 rounded-2xl bg-accent-soft text-accent">
        <Icon className="w-5 h-5" aria-hidden="true" />
      </span>
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full bg-sunken text-[0.75rem] font-medium text-muted">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          Volgt binnenkort
        </p>
        <h2 className="mt-3 text-h3">{title}</h2>
        <div className="mt-2 text-muted">{children}</div>
      </div>
    </div>
  </div>
);
