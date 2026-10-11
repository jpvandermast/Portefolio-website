import React, { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Menu, Search } from 'lucide-react';
import { useSearch } from '../../lib/SearchContext';
import { cn } from '../ui/cn';
import { Monogram } from './Monogram';
import { MobileMenu } from './MobileMenu';
import { useNavItems } from './useNavItems';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

/**
 * Sticky header. Op de homepage begint hij transparant boven de donkere hero en wordt hij bij scrollen
 * een lichte glasbalk; op andere pagina's is hij altijd licht.
 */
export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { openSearch } = useSearch();
  const items = useNavItems();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overHero = pathname === '/' && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 h-16 transition-[background-color,border-color,backdrop-filter] duration-300',
          overHero
            ? 'on-dark bg-transparent border-b border-transparent'
            : 'bg-surface/80 backdrop-blur-xl backdrop-saturate-150 border-b border-line/80',
        )}
      >
        <div className="mx-auto max-w-page h-full px-5 sm:px-8 flex items-center gap-4">
          <Link
            to="/"
            className={cn('flex items-center gap-2.5 rounded-lg shrink-0 font-semibold tracking-tight', overHero ? 'text-white' : 'text-ink')}
          >
            <Monogram size="md" />
            <span className="text-[0.95rem]">Josse van der Mast</span>
            <span className="sr-only">, naar de homepage</span>
          </Link>

          <nav aria-label="Hoofdmenu" className="hidden lg:block ml-auto">
            <ul className="flex items-center gap-1">
              {items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'relative inline-flex items-center h-9 px-3.5 rounded-full text-[0.9rem] font-medium transition-colors',
                        overHero
                          ? isActive
                            ? 'bg-white/12 text-white'
                            : 'text-white/75 hover:text-white hover:bg-white/8'
                          : isActive
                            ? 'bg-ink text-white'
                            : 'text-muted hover:text-ink hover:bg-sunken',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto lg:ml-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Zoeken (Ctrl of Cmd + K)"
              aria-keyshortcuts="Control+K Meta+K"
              className={cn(
                'inline-flex items-center gap-2 h-11 sm:h-9 rounded-full transition-colors',
                'w-11 sm:w-auto justify-center sm:justify-start sm:pl-3 sm:pr-1.5',
                overHero
                  ? 'text-white/80 hover:text-white sm:bg-white/8 sm:ring-1 sm:ring-inset sm:ring-white/15 hover:bg-white/12'
                  : 'text-muted hover:text-ink sm:bg-card sm:ring-1 sm:ring-inset sm:ring-line hover:bg-sunken',
              )}
            >
              <Search className="w-[18px] h-[18px] sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="hidden sm:inline text-[0.85rem]">Zoeken</span>
              <kbd
                className={cn(
                  'hidden sm:inline-flex items-center h-6 px-1.5 rounded-md font-mono text-[0.7rem]',
                  overHero ? 'bg-white/10 text-white/70' : 'bg-sunken text-subtle',
                )}
              >
                {isMac ? '⌘K' : 'Ctrl K'}
              </kbd>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu openen"
              aria-expanded={menuOpen}
              aria-controls="mobiel-menu"
              className={cn(
                'lg:hidden grid place-items-center w-11 h-11 rounded-full transition-colors',
                overHero ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-sunken',
              )}
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} items={items} />
    </>
  );
};
