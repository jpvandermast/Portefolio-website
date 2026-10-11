import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../ui/cn';

/** Avatar van de assistent: gradiënt met sparkle. */
export const AiAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ size = 'md', className }) => (
  <span
    aria-hidden="true"
    className={cn(
      'relative inline-grid place-items-center shrink-0 text-white',
      'bg-[conic-gradient(from_210deg,#3762ab,#7c5cf0,#22b8cf,#3762ab)] shadow-[inset_0_1px_0_rgb(255_255_255/0.3)]',
      size === 'sm' && 'w-7 h-7 rounded-lg',
      size === 'md' && 'w-9 h-9 rounded-xl',
      size === 'lg' && 'w-14 h-14 rounded-2xl',
      className,
    )}
  >
    <Sparkles className={cn(size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-[18px] h-[18px]' : 'w-7 h-7')} />
  </span>
);
