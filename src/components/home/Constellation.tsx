import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, useReducedMotion } from 'motion/react';
import { learningOutcomes } from '../../../shared/portfolioContent';
import { LU_STYLES, luPath } from '../../lib/lu';
import { STORY_TYPE_LABELS } from '../../lib/stories';
import type { StoryOverviewItem, StoryTypeCode } from '../../types';

const SIZE = 560;
const C = SIZE / 2;

interface Hub {
  id: string;
  x: number;
  y: number;
  color: string;
  code: string;
  label: string;
  to: string;
  ariaLabel: string;
}

interface Point {
  story: StoryOverviewItem;
  x: number;
  y: number;
  hubs: string[];
  color: string;
}

/** Deterministische pseudo-random waarde 0-1 per tekst, zodat de positie per story vast staat. */
function hash(text: string, salt = 0): number {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return ((h >>> 0) % 10000) / 10000;
}

const polar = (r: number, deg: number) => ({ x: C + r * Math.cos((deg * Math.PI) / 180), y: C + r * Math.sin((deg * Math.PI) / 180) });

const TYPE_COLORS: Record<StoryTypeCode, string> = {
  US: 'var(--color-ai-cyan)',
  RS: 'var(--color-accent-bright)',
  LS: 'var(--color-ai-violet)',
};

/**
 * Bouwt de constellatie. Met LU-koppelingen: vijf LU-knooppunten met stories ertussen. Zonder koppelingen
 * (nog): stories gegroepeerd per type, zodat er nooit iets verzonnen wordt.
 */
function layout(stories: StoryOverviewItem[]): { mode: 'lu' | 'type'; hubs: Hub[]; points: Point[] } {
  const mode = stories.some((s) => s.lus.length > 0) ? 'lu' : 'type';

  if (mode === 'lu') {
    const hubs: Hub[] = learningOutcomes.map((lu, i) => {
      const p = polar(205, -90 + i * 72);
      return {
        id: `lu${lu.nummer}`,
        ...p,
        color: LU_STYLES[lu.nummer].color,
        code: lu.code,
        label: lu.label,
        to: luPath(lu.nummer),
        ariaLabel: `${lu.code} ${lu.title}`,
      };
    });
    const unlinked = stories.filter((s) => s.lus.length === 0);
    const points = stories.map((story) => {
      if (story.lus.length === 0) {
        const i = unlinked.indexOf(story);
        const p = polar(78 + hash(story.slug) * 18, (360 / unlinked.length) * i + 20);
        return { story, ...p, hubs: [], color: 'rgb(255 255 255 / 0.7)' };
      }
      const linked = hubs.filter((h) => story.lus.includes(Number(h.id.slice(2))));
      const mx = linked.reduce((a, h) => a + h.x, 0) / linked.length;
      const my = linked.reduce((a, h) => a + h.y, 0) / linked.length;
      // Richting middelpunt trekken; één LU = dichtbij die LU, meerdere = ertussen
      const pull = linked.length === 1 ? 0.62 : 0.78;
      const angle = hash(story.slug) * Math.PI * 2;
      const spread = 20 + hash(story.slug, 7) * 26;
      return {
        story,
        x: C + (mx - C) * pull + Math.cos(angle) * spread,
        y: C + (my - C) * pull + Math.sin(angle) * spread,
        hubs: linked.map((h) => h.id),
        color: linked[0].color,
      };
    });
    return { mode, hubs, points };
  }

  const types: StoryTypeCode[] = ['US', 'RS', 'LS'];
  const hubs: Hub[] = types.map((type, i) => {
    const p = polar(165, -90 + i * 120);
    const count = stories.filter((s) => s.type === type).length;
    return {
      id: type,
      ...p,
      color: TYPE_COLORS[type],
      code: type,
      label: STORY_TYPE_LABELS[type].replace(' Story', ''),
      to: `/stories?type=${type}`,
      ariaLabel: `${STORY_TYPE_LABELS[type]}s, ${count} ${count === 1 ? 'story' : 'stories'}`,
    };
  });
  const points = types.flatMap((type, ti) => {
    const ofType = stories.filter((s) => s.type === type);
    const hub = hubs[ti];
    const outward = -90 + ti * 120;
    return ofType.map((story, i) => {
      // waaier aan de buitenkant van het knooppunt
      const fan = ofType.length === 1 ? 0 : (i / (ofType.length - 1) - 0.5) * 120;
      const dist = 82 + hash(story.slug) * 20;
      const a = ((outward + fan) * Math.PI) / 180;
      return { story, x: hub.x + Math.cos(a) * dist, y: hub.y + Math.sin(a) * dist, hubs: [hub.id], color: hub.color };
    });
  });
  return { mode, hubs, points };
}

/** Zachte zweefbeweging; t = seconden. */
function drift(id: string, t: number, amp: number) {
  const phase = hash(id, 3) * Math.PI * 2;
  const speed = 0.35 + hash(id, 5) * 0.3;
  return { dx: Math.cos(t * speed + phase) * amp, dy: Math.sin(t * speed * 1.3 + phase) * amp };
}

export const Constellation: React.FC<{ stories: StoryOverviewItem[]; loading: boolean }> = ({ stories, loading }) => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const { mode, hubs, points } = useMemo(() => layout(stories), [stories]);

  // Animatie alleen als het element in beeld is, het tabblad zichtbaar is en reduced motion uit staat
  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    let visible = true;
    let last = 0;
    const start = performance.now();
    const loop = (now: number) => {
      if (visible && !document.hidden && now - last > 33) {
        last = now;
        setT((now - start) / 1000);
      }
      frame = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    if (wrapRef.current) io.observe(wrapRef.current);
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [reduce]);

  const pos = (id: string, x: number, y: number, amp: number) => {
    const { dx, dy } = drift(id, t, amp);
    return { x: x + dx, y: y + dy };
  };
  const hubPos = Object.fromEntries(hubs.map((h) => [h.id, pos(h.id, h.x, h.y, 4)]));
  const activePoint = points.find((p) => p.story.slug === active);
  const activeHub = hubs.find((h) => h.id === active);
  const isLit = (p: Point) => !active || p.story.slug === active || (activeHub && p.hubs.includes(activeHub.id));

  const onKey = (e: React.KeyboardEvent, to: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(to);
    }
  };

  const tooltip = activePoint ?? null;
  const tipPos = tooltip ? pos(tooltip.story.slug, tooltip.x, tooltip.y, 6) : null;

  return (
    <figure ref={wrapRef} className="relative w-full max-w-[560px] aspect-square mx-auto select-none">
      <figcaption className="sr-only">
        {mode === 'lu'
          ? 'Bewijs-constellatie: de vijf leeruitkomsten met de gekoppelde stories als punten.'
          : 'Bewijs-constellatie: de stories gegroepeerd per type. Koppelingen met leeruitkomsten volgen.'}{' '}
        Elk punt is een link naar de story.
      </figcaption>

      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 w-full h-full overflow-visible" role="group" aria-label="Bewijs-constellatie">
        <defs>
          <radialGradient id="cst-glow">
            <stop offset="0%" stopColor="#5b7fd6" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#3762ab" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#3762ab" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cst-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e3a6e" />
            <stop offset="45%" stopColor="#3762ab" />
            <stop offset="100%" stopColor="#7c5cf0" />
          </linearGradient>
        </defs>

        <circle cx={C} cy={C} r={250} fill="url(#cst-glow)" />
        {[110, 175, 240].map((r) => (
          <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="white" strokeOpacity={0.06} strokeDasharray="2 6" />
        ))}

        {/* Spaken van het centrum naar de knooppunten */}
        {hubs.map((h) => (
          <line key={`spoke-${h.id}`} x1={C} y1={C} x2={hubPos[h.id].x} y2={hubPos[h.id].y} stroke="white" strokeOpacity={0.08} />
        ))}

        {/* Lijnen story -> knooppunt(en) */}
        {points.map((p) => {
          const sp = pos(p.story.slug, p.x, p.y, 6);
          const targets = p.hubs.length ? p.hubs.map((id) => hubPos[id]) : [{ x: C, y: C }];
          return targets.map((tp, i) => (
            <line
              key={`${p.story.slug}-${i}`}
              x1={sp.x}
              y1={sp.y}
              x2={tp.x}
              y2={tp.y}
              stroke={p.color}
              strokeOpacity={active ? (isLit(p) ? 0.75 : 0.06) : 0.28}
              strokeWidth={active && isLit(p) ? 1.5 : 1}
              style={{ transition: 'stroke-opacity 200ms' }}
            />
          ));
        })}

        {/* Centrum: monogram */}
        <g aria-hidden="true">
          <circle cx={C} cy={C} r={40} fill="url(#cst-core)" />
          <circle cx={C} cy={C} r={40} fill="none" stroke="white" strokeOpacity={0.25} />
          <circle cx={C} cy={C} r={54} fill="none" stroke="white" strokeOpacity={0.08} />
          <text x={C} y={C + 8} textAnchor="middle" fill="white" fontSize={24} fontWeight={600} letterSpacing={-1}>
            JM
          </text>
        </g>

        {/* Knooppunten (LU's of story-types) */}
        {hubs.map((h, i) => {
          const p = hubPos[h.id];
          const lit = active === h.id;
          const outward = Math.atan2(h.y - C, h.x - C);
          const lx = p.x + Math.cos(outward) * 38;
          const ly = p.y + Math.sin(outward) * 38;
          return (
            <motion.g
              key={h.id}
              role="link"
              tabIndex={0}
              aria-label={h.ariaLabel}
              className="cursor-pointer focus:outline-none"
              onClick={() => navigate(h.to)}
              onKeyDown={(e) => onKey(e, h.to)}
              onMouseEnter={() => setActive(h.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(h.id)}
              onBlur={() => setActive(null)}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.6 }}
            >
              <circle cx={p.x} cy={p.y} r={30} fill="transparent" />
              <circle cx={p.x} cy={p.y} r={lit ? 22 : 18} fill={h.color} fillOpacity={0.14} style={{ transition: 'r 200ms' }} />
              <circle cx={p.x} cy={p.y} r={9} fill={h.color} />
              {lit && <circle cx={p.x} cy={p.y} r={26} fill="none" stroke="var(--color-ai-cyan)" strokeWidth={2} />}
              <text
                x={lx}
                y={ly - 4}
                textAnchor="middle"
                fill="white"
                fillOpacity={lit ? 1 : 0.85}
                fontSize={13}
                fontWeight={600}
                fontFamily="var(--font-mono)"
              >
                {h.code}
              </text>
              <text x={lx} y={ly + 12} textAnchor="middle" fill="white" fillOpacity={0.55} fontSize={12}>
                {h.label}
              </text>
            </motion.g>
          );
        })}

        {/* Stories als punten */}
        {points.map((p, i) => {
          const sp = pos(p.story.slug, p.x, p.y, 6);
          const lit = active === p.story.slug;
          const to = `/stories/${p.story.slug}`;
          return (
            <motion.g
              key={p.story.slug}
              role="link"
              tabIndex={0}
              aria-label={`${p.story.titel}, ${STORY_TYPE_LABELS[p.story.type]}, sprint ${p.story.sprint}`}
              className="cursor-pointer focus:outline-none"
              onClick={() => navigate(to)}
              onKeyDown={(e) => onKey(e, to)}
              onMouseEnter={() => setActive(p.story.slug)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(p.story.slug)}
              onBlur={() => setActive(null)}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: isLit(p) ? 1 : 0.35 }}
              transition={{ delay: active ? 0 : 0.5 + i * 0.06, duration: active ? 0.2 : 0.5 }}
            >
              <circle cx={sp.x} cy={sp.y} r={16} fill="transparent" />
              <circle cx={sp.x} cy={sp.y} r={lit ? 7 : 5} fill={p.color} style={{ transition: 'r 160ms' }} />
              <circle cx={sp.x} cy={sp.y} r={lit ? 12 : 9} fill={p.color} fillOpacity={0.18} style={{ transition: 'r 160ms' }} />
              {lit && <circle cx={sp.x} cy={sp.y} r={14} fill="none" stroke="var(--color-ai-cyan)" strokeWidth={2} />}
            </motion.g>
          );
        })}
      </svg>

      {loading && (
        <div className="absolute inset-0 grid place-items-center" role="status" aria-label="Stories laden">
          <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse-soft" />
        </div>
      )}

      {tooltip && tipPos && (
        <div
          className="pointer-events-none absolute z-10 w-max max-w-[240px] -translate-x-1/2 -translate-y-[calc(100%+16px)] rounded-xl bg-white px-3.5 py-2.5 text-ink shadow-panel"
          style={{ left: `${(tipPos.x / SIZE) * 100}%`, top: `${(tipPos.y / SIZE) * 100}%` }}
          aria-hidden="true"
        >
          <p className="font-mono text-[0.68rem] text-subtle">
            Sprint {tooltip.story.sprint} · {STORY_TYPE_LABELS[tooltip.story.type]}
          </p>
          <p className="text-[0.85rem] font-medium leading-snug">{tooltip.story.titel}</p>
        </div>
      )}

      <p className="absolute -bottom-2 inset-x-0 text-center text-[0.75rem] text-white/50">
        {mode === 'lu'
          ? 'Elke stip is een story · lijnen tonen de leeruitkomst'
          : 'Elke stip is een story, gegroepeerd per type · koppelingen met leeruitkomsten volgen'}
      </p>
    </figure>
  );
};
