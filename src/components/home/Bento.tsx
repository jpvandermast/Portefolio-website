import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, CalendarClock, MessageCircle, Quote, RefreshCw, Sparkles } from 'lucide-react';
import { aboutData, learningOutcomes } from '../../../shared/portfolioContent';
import { formatLongDay, formatRange, getCurrentSprint, sprintProgress, sprintStatus, SPRINTS } from '../../data/sprints';
import { newestStories, storyStats } from '../../lib/derive';
import { LU_STYLES, luPath } from '../../lib/lu';
import { useChat } from '../../lib/ChatContext';
import { useStories } from '../../lib/StoriesContext';
import { StoryCard } from '../story/StoryCard';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { EmptyState } from '../ui/EmptyState';
import { Reveal } from '../ui/Reveal';
import { Eyebrow } from '../ui/SectionHeader';
import { Skeleton } from '../ui/Skeleton';
import { cn } from '../ui/cn';

const TileLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="group inline-flex items-center gap-1.5 min-h-11 text-[0.9rem] font-medium text-accent hover:text-accent-hover">
    {children}
    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
  </Link>
);

/** Vijf mini-balken: gekoppelde stories naast de minimumnorm uit de minorgids. */
const LuProgressTile: React.FC = () => {
  const { stories, status } = useStories();
  const stats = storyStats(stories);
  return (
    <Card className="p-6 sm:p-7 h-full flex flex-col">
      <Eyebrow>Leeruitkomsten</Eyebrow>
      <h3 className="mt-2 text-h3">Bewijs per leeruitkomst</h3>
      <p className="mt-1 text-[0.875rem] text-muted">Gekoppelde stories naast het minimum aantal keer voldoende uit de minorgids.</p>
      <ul className="mt-6 space-y-3.5">
        {learningOutcomes.map((lu) => {
          const count = stats.perLu[lu.nummer] ?? 0;
          const style = LU_STYLES[lu.nummer];
          return (
            <li key={lu.id}>
              <Link to={luPath(lu.nummer)} className="group grid grid-cols-[8.75rem_1fr_auto] items-center gap-3 min-h-8 rounded-md">
                <span className="flex items-center gap-2 text-[0.85rem] min-w-0">
                  <span className={cn('w-2 h-2 rounded-full shrink-0', style.dot)} aria-hidden="true" />
                  <span className="font-mono font-medium text-ink">{lu.code}</span>
                  <span className="text-muted truncate group-hover:text-ink transition-colors">{lu.label}</span>
                </span>
                <span className="h-2 rounded-full bg-sunken overflow-hidden" aria-hidden="true">
                  <span
                    className={cn('block h-full rounded-full transition-[width] duration-1000 ease-out-soft', style.dot)}
                    style={{ width: status === 'ready' ? `${Math.min(count / lu.minimumVoldoende, 1) * 100}%` : '0%' }}
                  />
                </span>
                <span className="font-mono text-[0.8rem] tabular-nums text-muted w-10 text-right">
                  {status === 'ready' ? count : '–'}
                  <span className="text-subtle">/{lu.minimumVoldoende}</span>
                  <span className="sr-only"> stories gekoppeld, minimaal {lu.minimumVoldoende} keer voldoende nodig</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {status === 'ready' && !stats.hasLuLinks && (
        <p className="mt-5 text-[0.825rem] text-subtle">Koppelingen tussen stories en leeruitkomsten volgen; de balken vullen zich dan vanzelf.</p>
      )}
      <div className="mt-auto pt-4">
        <TileLink to="/leeruitkomsten">Alle leeruitkomsten</TileLink>
      </div>
    </Card>
  );
};

const CurrentSprintTile: React.FC = () => {
  const { stories, status } = useStories();
  const sprint = getCurrentSprint();
  const { fraction, daysUntilShowAndGrow } = sprintProgress(sprint);
  const inSprint = stories.filter((s) => s.sprint === sprint.nummer).length;
  return (
    <Card className="relative p-6 sm:p-7 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between">
        <Eyebrow>Huidige sprint</Eyebrow>
        <span className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full bg-accent-soft text-accent text-[0.75rem] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          Nu bezig
        </span>
      </div>
      <p className="mt-4 text-[3rem] font-semibold tracking-[-0.04em] leading-none">
        {sprint.reparatie ? 'Reparatie' : <>Sprint {sprint.nummer}</>}
      </p>
      <p className="mt-2 font-mono text-[0.8rem] text-muted">{formatRange(sprint)}</p>

      <div className="mt-6">
        <div className="h-1.5 rounded-full bg-sunken overflow-hidden" role="img" aria-label={`${Math.round(fraction * 100)} procent van de sprint voorbij`}>
          <div className="h-full rounded-full bg-[linear-gradient(90deg,#3762ab,#7c5cf0)]" style={{ width: `${fraction * 100}%` }} />
        </div>
        <p className="mt-3 flex items-start gap-2 text-[0.875rem] text-muted">
          <CalendarClock className="w-4 h-4 mt-0.5 shrink-0 text-subtle" aria-hidden="true" />
          <span>
            Show &amp; Grow{' '}
            {daysUntilShowAndGrow === 0 ? 'is vandaag' : daysUntilShowAndGrow === 1 ? 'is morgen' : `over ${daysUntilShowAndGrow} dagen`}
            <span className="text-subtle"> · {formatLongDay(sprint.showAndGrow)}</span>
          </span>
        </p>
      </div>
      <ol className="mt-6 grid grid-cols-9 gap-1" aria-label="Alle sprints">
        {SPRINTS.map((s) => {
          const st = sprintStatus(s);
          const has = stories.some((x) => x.sprint === s.nummer);
          return (
            <li key={s.nummer} className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  'w-full h-1.5 rounded-full',
                  st === 'bezig' ? 'bg-accent' : st === 'afgerond' ? 'bg-ink/70' : 'bg-sunken ring-1 ring-inset ring-line',
                )}
                aria-hidden="true"
              />
              <span className={cn('font-mono text-[0.68rem]', st === 'bezig' ? 'text-accent font-semibold' : 'text-subtle')}>
                {s.reparatie ? 'R' : s.nummer}
                {has && <span className="sr-only"> (met bewijs)</span>}
              </span>
              <span className="sr-only">{st === 'bezig' ? 'bezig' : st === 'afgerond' ? 'afgerond' : 'gepland'}</span>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-[0.875rem] text-muted">
        {status !== 'ready'
          ? ' '
          : inSprint === 0
            ? 'Stories van deze sprint verschijnen na de oplevering.'
            : `${inSprint} ${inSprint === 1 ? 'story' : 'stories'} in deze sprint.`}
      </p>
      <div className="mt-auto pt-3">
        <TileLink to={`/sprints?sprint=${sprint.nummer}`}>Naar de tijdlijn</TileLink>
      </div>
    </Card>
  );
};

const NewestStoriesTile: React.FC = () => {
  const { stories, status, reload } = useStories();
  const newest = newestStories(stories, 3);
  return (
    <Card className="p-6 sm:p-7 h-full flex flex-col">
      <Eyebrow>Nieuwste bewijs</Eyebrow>
      <h3 className="mt-2 text-h3">Laatst toegevoegde stories</h3>
      <div className="mt-5 space-y-4 flex-1">
        {status === 'loading' &&
          [0, 1, 2].map((i) => (
            <div key={i} className="flex gap-4 items-center">
              <Skeleton className="w-24 aspect-[4/3]" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        {status === 'error' && (
          <EmptyState compact icon={RefreshCw} title="Stories konden niet worden geladen" action={<Button size="sm" variant="secondary" onClick={reload}>Opnieuw proberen</Button>} />
        )}
        {status === 'ready' && newest.length === 0 && <EmptyState compact title="Nog geen stories gepubliceerd" />}
        {status === 'ready' && newest.map((s) => <StoryCard key={s.slug} story={s} variant="compact" headingLevel="h3" />)}
      </div>
      <div className="pt-4">
        <TileLink to="/stories">Al het bewijs</TileLink>
      </div>
    </Card>
  );
};

const AboutTile: React.FC = () => (
  <Card className="p-6 sm:p-7 h-full flex flex-col">
    <Eyebrow>Over mij</Eyebrow>
    <Quote className="mt-5 w-6 h-6 text-accent/40" aria-hidden="true" />
    <blockquote className="mt-2 text-[1.15rem] leading-snug font-medium tracking-[-0.01em] text-ink text-balance">
      {aboutData.quote}
    </blockquote>
    <p className="mt-4 text-[0.875rem] text-muted">
      {aboutData.role} · {aboutData.location}
    </p>
    <div className="mt-auto pt-4">
      <TileLink to="/over-mij">Lees mijn verhaal</TileLink>
    </div>
  </Card>
);

const CHAT_TEASER_QUESTIONS = ['Wat heeft Josse in sprint 1 gedaan?', 'Welke tools gebruikt Josse?'];

const ChatTile: React.FC = () => {
  const { openChat } = useChat();
  return (
    <div className="on-dark relative h-full rounded-card p-6 sm:p-7 flex flex-col overflow-hidden bg-night text-white shadow-lift">
      <div aria-hidden="true" className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#5b2fc2]/40 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-[#0e7490]/35 blur-3xl" />
      <div className="relative">
        <span className="grid place-items-center w-10 h-10 rounded-xl bg-white/10 ring-1 ring-inset ring-white/15">
          <Sparkles className="w-5 h-5 text-ai-cyan" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-h3 text-white">Vraag het mijn AI</h3>
        <p className="mt-1.5 text-[0.875rem] text-white/65">Kent al mijn stories en antwoordt met links naar het bewijs.</p>
      </div>
      <div className="relative mt-5 flex flex-col gap-2">
        {CHAT_TEASER_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => openChat(q, { send: true })}
            className="group flex items-center justify-between gap-2 min-h-11 px-3.5 py-2 rounded-xl bg-white/[0.06] ring-1 ring-inset ring-white/12 text-left text-[0.85rem] text-white/85 hover:bg-white/10 hover:text-white transition-colors"
          >
            {q}
            <ArrowUpRight className="w-4 h-4 shrink-0 opacity-50 group-hover:opacity-100" aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="relative mt-auto pt-5">
        <Button variant="light" size="sm" onClick={() => openChat()}>
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          Open de chat
        </Button>
      </div>
    </div>
  );
};

/** Overzicht onder de hero. */
export const Bento: React.FC = () => (
  <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-12">
    <Reveal className="md:col-span-2 lg:col-span-7">
      <LuProgressTile />
    </Reveal>
    <Reveal className="lg:col-span-5" delay={0.05}>
      <CurrentSprintTile />
    </Reveal>
    <Reveal className="lg:col-span-5" delay={0.05}>
      <NewestStoriesTile />
    </Reveal>
    <Reveal className="lg:col-span-4" delay={0.1}>
      <AboutTile />
    </Reveal>
    <Reveal className="md:col-span-2 lg:col-span-3" delay={0.15}>
      <ChatTile />
    </Reveal>
  </div>
);

