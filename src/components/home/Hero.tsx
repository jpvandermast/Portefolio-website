import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useStories } from '../../lib/StoriesContext';
import { Button } from '../ui/Button';
import { AskBar } from './AskBar';
import { Constellation } from './Constellation';
import { HeroStats } from './HeroStats';

/**
 * Donkere hero: bewegend mesh, fijn raster en (alleen desktop) een spotlight die de muis volgt.
 * Bij prefers-reduced-motion staat alles stil.
 */
export const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { stories, status } = useStories();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !window.matchMedia('(pointer: fine)').matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
        el.style.setProperty('--spot', '1');
      });
    };
    const onLeave = () => el.style.setProperty('--spot', '0');
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [reduce]);

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      ref={ref}
      aria-labelledby="page-title"
      className="on-dark relative isolate -mt-16 pt-16 overflow-hidden bg-night text-white"
      style={{ '--mx': '70%', '--my': '30%', '--spot': '0' } as React.CSSProperties}
    >
      {/* Achtergrond: mesh, raster, spotlight */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[820px] max-h-[820px] rounded-full bg-[#1d3f8f]/45 blur-[110px] animate-mesh" />
        <div className="absolute top-[10%] right-[-15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-[#5b2fc2]/25 blur-[120px] animate-mesh-slow" />
        <div className="absolute bottom-[-30%] left-[30%] w-[45vw] h-[45vw] max-w-[620px] max-h-[620px] rounded-full bg-[#0e7490]/22 blur-[120px] animate-mesh" />
        <div className="absolute inset-0 bg-grid" />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: 'var(--spot)',
            background: 'radial-gradient(520px circle at var(--mx) var(--my), rgb(94 231 245 / 0.09), transparent 45%)',
          }}
        />
        <div
          className="absolute inset-0 bg-grid transition-opacity duration-500"
          style={{
            opacity: 'var(--spot)',
            filter: 'brightness(2.2)',
            maskImage: 'radial-gradient(260px circle at var(--mx) var(--my), black, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(260px circle at var(--mx) var(--my), black, transparent 70%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-night" />
      </div>

      <div className="mx-auto max-w-page px-5 sm:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center lg:min-h-[min(760px,calc(100svh-4rem))]">
        <div className="min-w-0">
          <motion.div {...enter(0)} className="flex items-center gap-3">
            <p className="inline-flex items-center gap-2 h-7 px-3 rounded-full bg-white/[0.06] ring-1 ring-inset ring-white/12 font-mono text-[0.7rem] sm:text-[0.72rem] uppercase tracking-[0.1em] text-white/75">
              <span className="relative flex w-1.5 h-1.5" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-ai-cyan animate-ping opacity-60" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-ai-cyan" />
              </span>
              Minor Future-proof met AI · HU
            </p>
          </motion.div>

          <motion.h1
            {...enter(0.08)}
            id="page-title"
            tabIndex={-1}
            className="mt-6 text-display font-semibold text-white focus:outline-none"
          >
            Josse van
            <br className="hidden sm:block" /> der Mast
          </motion.h1>

          <motion.p {...enter(0.16)} className="mt-5 text-lead text-white/70 max-w-lg">
            Commerciële Economie <span className="text-white/40">×</span> AI. Ik onderzoek, bouw en leer —{' '}
            <span className="text-gradient-ai font-medium">hier staat het bewijs.</span>
          </motion.p>

          <motion.div {...enter(0.24)} className="mt-8">
            <AskBar />
          </motion.div>

          <motion.div {...enter(0.32)} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button to="/stories" variant="light" size="lg" className="group">
              Bekijk mijn bewijs
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Button>
            <Button to="/over-mij" variant="glass" size="lg">
              Over mij
            </Button>
          </motion.div>

          <motion.div {...enter(0.4)} className="mt-12 pt-8 border-t border-white/10">
            <HeroStats />
          </motion.div>
        </div>

        <div className="hidden lg:block">
          <Constellation stories={stories} loading={status === 'loading'} />
        </div>
      </div>
    </section>
  );
};
