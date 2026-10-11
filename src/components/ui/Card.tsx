import React from 'react';
import { cn } from './cn';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Lichte lift bij hover (voor klikbare kaarten) */
  interactive?: boolean;
  as?: 'div' | 'section' | 'article';
}

export const Card: React.FC<CardProps> = ({ interactive, as = 'div', className, ...rest }) =>
  React.createElement(as, {
    className: cn(
      'bg-card rounded-card ring-1 ring-line shadow-card',
      interactive &&
        'transition-[box-shadow,transform] duration-300 ease-out-soft hover:shadow-lift hover:-translate-y-0.5 focus-within:shadow-lift',
      className,
    ),
    ...rest,
  });
