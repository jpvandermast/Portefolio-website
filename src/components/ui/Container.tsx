import React from 'react';
import { cn } from './cn';

/** Vaste paginabreedte (max 1200 px) met 20/32 px zijmarge. */
export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => (
  <div className={cn('mx-auto w-full max-w-page px-5 sm:px-8', className)} {...rest} />
);
