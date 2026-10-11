import React from 'react';
import { Link } from 'react-router';
import { cn } from './cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'glass';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap select-none rounded-full transition-[background-color,color,box-shadow,transform] duration-200 ease-out-soft active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white shadow-card hover:bg-accent-hover',
  secondary: 'bg-card text-ink ring-1 ring-inset ring-line-strong hover:bg-sunken',
  ghost: 'text-ink hover:bg-sunken',
  /* op donkere achtergronden */
  light: 'bg-white text-navy hover:bg-white/90 shadow-[0_8px_24px_-8px_rgb(0_0_0/0.5)]',
  glass: 'text-white/90 hover:text-white bg-white/5 hover:bg-white/10 ring-1 ring-inset ring-white/15',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[0.875rem]',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-12 px-6 text-[1rem]',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps =
  | (CommonProps & { to: string } & Omit<React.ComponentProps<typeof Link>, 'to' | 'className' | 'children'>)
  | (CommonProps & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>)
  | (CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined });

/** Eén knopcomponent voor de hele site: interne link (`to`), externe link (`href`) of knop. */
export const Button = React.forwardRef<HTMLElement, ButtonProps>(function Button(props, ref) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  if ('to' in rest && rest.to !== undefined) {
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...(rest as React.ComponentProps<typeof Link>)}>
        {children}
      </Link>
    );
  }
  if ('href' in rest && rest.href !== undefined) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});
