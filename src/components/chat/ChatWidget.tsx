import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useChat } from '../../lib/ChatContext';
import { cn } from '../ui/cn';

// Het paneel (met markdown) laadt pas bij de eerste keer openen
const ChatPanel = lazy(() => import('./ChatPanel'));

const NUDGE_KEY = 'portfolio-chat-nudge';

/** Launcher rechtsonder ("Vraag mijn AI") plus het chatpaneel. */
export const ChatWidget: React.FC = () => {
  const { open, openChat, closeChat } = useChat();
  const reduce = useReducedMotion();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [nudge, setNudge] = useState(false);

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  // Eenmalige, subtiele aandacht-animatie na een paar seconden (één keer per browsersessie)
  useEffect(() => {
    if (reduce) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(NUDGE_KEY) === '1';
    } catch {
      /* geen sessionStorage */
    }
    if (seen) return;
    const t = window.setTimeout(() => {
      setNudge(true);
      try {
        sessionStorage.setItem(NUDGE_KEY, '1');
      } catch {
        /* geen sessionStorage */
      }
    }, 5000);
    return () => window.clearTimeout(t);
  }, [reduce]);

  const returnFocus = () => window.setTimeout(() => launcherRef.current?.focus(), 0);

  return (
    <>
      {mounted && (
        <Suspense fallback={null}>
          <ChatPanel onClosed={returnFocus} />
        </Suspense>
      )}

      <motion.button
        ref={launcherRef}
        type="button"
        onClick={() => {
          if (open) {
            closeChat();
            returnFocus();
          } else openChat();
        }}
        aria-label={open ? 'Chat sluiten' : 'Vraag mijn AI-assistent'}
        aria-expanded={open}
        aria-haspopup="dialog"
        animate={nudge && !open ? { y: [0, -6, 0, -3, 0] } : { y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className={cn(
          'on-dark fixed z-[71] bottom-5 right-5 items-center gap-2 h-14 rounded-full text-white',
          'bg-night/90 backdrop-blur-xl ring-1 ring-inset ring-white/15 shadow-glow',
          'transition-[background-color,width,padding] duration-300 hover:bg-navy-700',
          open ? 'hidden sm:inline-flex w-14 justify-center' : 'inline-flex w-14 justify-center sm:w-auto sm:pl-4 sm:pr-5',
        )}
      >
        {open ? (
          <ChevronDown className="w-5 h-5" aria-hidden="true" />
        ) : (
          <>
            <span className="relative grid place-items-center" aria-hidden="true">
              <Sparkles className="w-5 h-5 text-ai-cyan" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#12b76a] ring-2 ring-night" />
            </span>
            <span className="hidden sm:inline text-[0.925rem] font-medium">Vraag mijn AI</span>
          </>
        )}
      </motion.button>
    </>
  );
};
