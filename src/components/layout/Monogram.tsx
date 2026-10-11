import React from 'react';
import { cn } from '../ui/cn';

/** Typografisch beeldmerk "JM"; staat ook in de hero en de chat-avatar. */
export const Monogram: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({ className, size = 'md' }) => (
  <span
    aria-hidden="true"
    className={cn(
      'relative inline-grid place-items-center shrink-0 font-semibold tracking-[-0.04em] text-white',
      'bg-[linear-gradient(135deg,#1e3a6e_0%,#3762ab_45%,#7c5cf0_100%)] shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]',
      size === 'sm' && 'w-7 h-7 rounded-lg text-[0.7rem]',
      size === 'md' && 'w-8 h-8 rounded-[10px] text-[0.8rem]',
      size === 'lg' && 'w-14 h-14 rounded-2xl text-[1.3rem]',
      className,
    )}
  >
    JM
  </span>
);
