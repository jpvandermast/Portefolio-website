import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Mail, Search, X } from 'lucide-react';
import { aboutData } from '../../../shared/portfolioContent';
import type { NavItem } from '../../data/navigation';
import { useFocusTrap } from '../../lib/useFocusTrap';
import { useSearch } from '../../lib/SearchContext';
import { cn } from '../ui/cn';
import { Monogram } from './Monogram';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}

/** Volledig-scherm menu voor mobiel en tablet: grote tikdoelen, focus-trap, Esc sluit. */
export const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, items }) => {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const { openSearch } = useSearch();
  useFocusTrap(ref, open);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="mobiel-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="on-dark fixed inset-0 z-[60] lg:hidden bg-night text-white flex flex-col overflow-y-auto"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
          <div className="relative flex items-center justify-between h-16 px-5 sm:px-8">
            <span className="flex items-center gap-2.5 font-semibold">
              <Monogram />
              Josse van der Mast
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Menu sluiten"
              className="grid place-items-center w-11 h-11 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Hoofdmenu" className="relative px-5 sm:px-8 pt-6">
            <ul className="space-y-1">
              {[{ label: 'Home', to: '/', description: 'Overzicht' }, ...items].map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.3 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'group flex items-center justify-between min-h-14 py-2 border-b border-white/10 text-[1.6rem] font-medium tracking-tight',
                        isActive ? 'text-white' : 'text-white/70 hover:text-white',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="flex items-center gap-3">
                          {item.label}
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan" aria-hidden="true" />}
                        </span>
                        <ArrowRight className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                      </>
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="relative mt-auto px-5 sm:px-8 pb-8 pt-10 space-y-6">
            <button
              type="button"
              onClick={() => {
                onClose();
                openSearch();
              }}
              className="w-full flex items-center gap-3 h-12 px-4 rounded-full bg-white/8 ring-1 ring-inset ring-white/15 text-white/80"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              Zoek in stories en pagina's
            </button>
            <div className="flex gap-2">
              <a href={`mailto:${aboutData.email}`} className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-full bg-white/8 ring-1 ring-inset ring-white/15 text-[0.9rem]">
                <Mail className="w-4 h-4" aria-hidden="true" /> Mail
              </a>
              <a href={aboutData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-full bg-white/8 ring-1 ring-inset ring-white/15 text-[0.9rem]">
                <Linkedin className="w-4 h-4" aria-hidden="true" /> LinkedIn
              </a>
              <a href={aboutData.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/8 ring-1 ring-inset ring-white/15">
                <Github className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
