import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, ArrowRight, Download, FileQuestion, FileText, RefreshCw, Sparkles } from 'lucide-react';
import { Lightbox, LightboxImage } from '../components/story/Lightbox';
import { StoryMarkdown } from '../components/story/StoryMarkdown';
import { Button } from '../components/ui/Button';
import { LuChip, SprintChip, TypeChip } from '../components/ui/Chip';
import { Container } from '../components/ui/Container';
import { EmptyState } from '../components/ui/EmptyState';
import { Breadcrumbs, PageHeader } from '../components/ui/PageHeader';
import { Skeleton } from '../components/ui/Skeleton';
import { cn } from '../components/ui/cn';
import { neighbours } from '../lib/derive';
import { getLearningOutcome, LU_STYLES, luPath } from '../lib/lu';
import { getStory, publicUrl, STORY_TYPE_LABELS } from '../lib/stories';
import { useChat } from '../lib/ChatContext';
import { useStories } from '../lib/StoriesContext';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import type { Story, StoryFile, StoryOverviewItem } from '../types';

const SECTIONS: { key: 'opdracht_md' | 'gedaan_md' | 'resultaat_md' | 'geleerd_md'; heading: string; id: string }[] = [
  { key: 'opdracht_md', heading: 'Wat was de opdracht?', id: 'opdracht' },
  { key: 'gedaan_md', heading: 'Wat heb ik gedaan?', id: 'gedaan' },
  { key: 'resultaat_md', heading: 'Wat was het resultaat?', id: 'resultaat' },
  { key: 'geleerd_md', heading: 'Wat heb ik geleerd?', id: 'geleerd' },
];

const IMAGE_PATTERN = /!\[([^\]]*)\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g;

function extractImages(story: Story): LightboxImage[] {
  const images: LightboxImage[] = [];
  for (const { key } of SECTIONS) {
    for (const match of story[key].matchAll(IMAGE_PATTERN)) images.push({ alt: match[1], src: match[2] });
  }
  return images;
}

function formatBytes(bytes: number | null): string | null {
  if (!bytes) return null;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} kB`;
  return `${(bytes / (1024 * 1024)).toLocaleString('nl-NL', { maximumFractionDigits: 1 })} MB`;
}

type LoadState = { status: 'loading' } | { status: 'error' } | { status: 'notfound' } | { status: 'ready'; story: Story };

/** Dunne balk onder de header die laat zien hoe ver je in de story bent. */
const ReadingProgress: React.FC = () => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-16 z-40 h-0.5 origin-left bg-[linear-gradient(90deg,#3762ab,#7c5cf0,#22b8cf)]"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
};

const AttachmentCard: React.FC<{ file: StoryFile }> = ({ file }) => {
  const name = file.bestandsnaam.split('/').pop() ?? file.bestandsnaam;
  const size = formatBytes(file.bytes);
  return (
    <a
      href={publicUrl(file.storage_path, name)}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-card bg-card p-4 ring-1 ring-line shadow-card transition-[box-shadow,transform] hover:shadow-lift hover:-translate-y-0.5"
    >
      <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-danger-soft text-danger">
        <FileText className="w-5 h-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-ink leading-snug group-hover:text-accent transition-colors">
          {file.alt_of_weergavenaam || name}
        </span>
        <span className="block mt-0.5 font-mono text-[0.72rem] text-subtle">
          PDF{size && ` · ${size}`}
        </span>
      </span>
      <span className="grid place-items-center w-9 h-9 shrink-0 rounded-full bg-sunken text-muted group-hover:bg-accent group-hover:text-white transition-colors">
        <Download className="w-4 h-4" aria-hidden="true" />
        <span className="sr-only">Downloaden</span>
      </span>
    </a>
  );
};

const NeighbourCard: React.FC<{ story: StoryOverviewItem; direction: 'previous' | 'next' }> = ({ story, direction }) => (
  <Link
    to={`/stories/${story.slug}`}
    className={cn(
      'group flex flex-col gap-1 rounded-card bg-card p-5 ring-1 ring-line shadow-card transition-[box-shadow,transform] hover:shadow-lift hover:-translate-y-0.5',
      direction === 'next' && 'sm:items-end sm:text-right',
    )}
  >
    <span className="flex items-center gap-1.5 text-[0.8rem] text-subtle">
      {direction === 'previous' && <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />}
      {direction === 'previous' ? 'Vorige story' : 'Volgende story'}
      {direction === 'next' && <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
    </span>
    <span className="font-medium text-ink group-hover:text-accent transition-colors">{story.titel}</span>
    <span className="font-mono text-[0.72rem] text-subtle">
      Sprint {story.sprint} · {STORY_TYPE_LABELS[story.type]}
    </span>
  </Link>
);

export default function StoryPage() {
  const { slug = '' } = useParams();
  const { stories } = useStories();
  const { openChat } = useChat();
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('opdracht');
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    setLightboxIndex(null);
    getStory(slug)
      .then((story) => !cancelled && setState(story ? { status: 'ready', story } : { status: 'notfound' }))
      .catch((err) => {
        if (cancelled) return;
        console.error('Story laden mislukt', err);
        setState({ status: 'error' });
      });
    return () => {
      cancelled = true;
    };
  }, [slug, attempt]);

  const story = state.status === 'ready' ? state.story : null;
  useDocumentTitle(
    story ? story.titel : state.status === 'notfound' ? 'Story niet gevonden' : null,
    story?.korte_versie,
  );

  const images = useMemo(() => (story ? extractImages(story) : []), [story]);
  const imageUrls = useMemo(() => images.map((i) => i.src), [images]);
  const documents = story?.files.filter((f) => f.rol === 'document') ?? [];
  const { previous, next } = neighbours(stories, slug);

  // De laad-titel had de focus (paginawissel); zet die op de echte titel zodra de story er is
  useEffect(() => {
    if (story && document.activeElement === document.body) document.getElementById('page-title')?.focus({ preventScroll: true });
  }, [story]);

  // Actieve sectie in de inhoudsopgave
  useEffect(() => {
    if (!story) return;
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -60% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [story]);

  const askAi = () =>
    story && openChat(`Vertel me meer over de story "${story.titel}". Wat heeft Josse gedaan en wat heeft hij geleerd?`);

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Bewijs', to: '/stories' },
    ...(story ? [{ label: `Sprint ${story.sprint}`, to: `/stories?sprint=${story.sprint}` }] : []),
    { label: story?.titel ?? (state.status === 'notfound' ? 'Niet gevonden' : 'Story') },
  ];

  if (state.status === 'notfound' || state.status === 'error') {
    return (
      <Container className="pb-24">
        <PageHeader
          crumbs={crumbs}
          title={state.status === 'notfound' ? 'Story niet gevonden' : 'Er ging iets mis'}
          lead={
            state.status === 'notfound'
              ? 'Deze story bestaat niet (meer) of is (nog) niet zichtbaar.'
              : 'De story kon niet worden geladen. Controleer je verbinding en probeer het opnieuw.'
          }
        />
        {state.status === 'notfound' ? (
          <EmptyState icon={FileQuestion} title="Zoek je een bepaald bewijsstuk?" action={<Button to="/stories">Naar alle stories</Button>}>
            Bekijk het overzicht met alle stories, of zoek met Ctrl/Cmd + K.
          </EmptyState>
        ) : (
          <Button variant="secondary" onClick={() => setAttempt((n) => n + 1)}>
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            Opnieuw proberen
          </Button>
        )}
      </Container>
    );
  }

  return (
    <>
      <ReadingProgress />
      <Container className="pb-24">
        {!story ? (
          <div className="pt-8 sm:pt-12" role="status" aria-label="Story laden">
            <Breadcrumbs crumbs={crumbs} />
            <h1 id="page-title" tabIndex={-1} className="sr-only">
              Story laden
            </h1>
            <div className="mt-6 flex gap-2">
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="mt-5 h-12 w-3/4 max-w-2xl rounded-xl" />
            <Skeleton className="mt-4 h-5 w-2/3 max-w-xl" />
            <div className="mt-12 max-w-prose space-y-3">
              {['w-full', 'w-11/12', 'w-5/6', 'w-full', 'w-3/5'].map((w, i) => (
                <Skeleton key={i} className={cn('h-4', w)} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <PageHeader
              crumbs={crumbs}
              eyebrow={
                <div className="flex flex-wrap items-center gap-1.5">
                  <TypeChip type={story.type} linked />
                  <SprintChip sprint={story.sprint} linked />
                  {story.lus.map((lu) => (
                    <LuChip key={lu} lu={lu} linked withLabel />
                  ))}
                </div>
              }
              title={story.titel}
              lead={story.korte_versie}
            />

            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16 items-start">
              <article ref={articleRef} className="min-w-0 max-w-prose text-[1.05rem] leading-[1.75] text-ink/85">
                {SECTIONS.map(({ key, heading, id }, i) => (
                  <section key={key} aria-labelledby={id} className="pt-8 first:pt-0 mt-8 first:mt-0 border-t first:border-t-0 border-line">
                    <h2 id={id} className="flex items-baseline gap-3 mb-4 text-h2">
                      <span className="font-mono text-[0.8rem] font-medium text-accent tabular-nums">0{i + 1}</span>
                      {heading}
                    </h2>
                    {story[key].trim() ? (
                      <StoryMarkdown markdown={story[key]} imageUrls={imageUrls} onOpenImage={setLightboxIndex} />
                    ) : (
                      <p className="italic text-subtle">Nog niet ingevuld.</p>
                    )}
                  </section>
                ))}

                {documents.length > 0 && (
                  <section aria-labelledby="bijlagen" className="pt-8 mt-8 border-t border-line">
                    <h2 id="bijlagen" className="mb-5 text-h2">
                      Bijlagen
                    </h2>
                    <div className="grid gap-3">
                      {documents.map((f) => (
                        <AttachmentCard key={f.id} file={f} />
                      ))}
                    </div>
                  </section>
                )}
              </article>

              <aside className="lg:sticky lg:top-24 space-y-6" aria-label="Over deze story">
                <nav aria-label="In deze story" className="hidden lg:block">
                  <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">In deze story</p>
                  <ol className="space-y-0.5 border-l border-line">
                    {[...SECTIONS, ...(documents.length ? [{ id: 'bijlagen', heading: 'Bijlagen' }] : [])].map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          aria-current={activeSection === s.id ? 'true' : undefined}
                          className={cn(
                            '-ml-px block border-l-2 py-1.5 pl-4 text-[0.875rem] transition-colors',
                            activeSection === s.id ? 'border-accent text-ink font-medium' : 'border-transparent text-muted hover:text-ink',
                          )}
                        >
                          {s.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="rounded-card bg-card ring-1 ring-line shadow-card p-5">
                  <p className="flex items-center gap-2 font-medium text-ink">
                    <Sparkles className="w-4 h-4 text-accent" aria-hidden="true" />
                    Vragen over deze story?
                  </p>
                  <p className="mt-1 text-[0.85rem] text-muted">Mijn AI-assistent kent de volledige inhoud.</p>
                  <Button size="sm" className="mt-4 w-full" onClick={askAi}>
                    Vraag de AI over deze story
                  </Button>
                </div>

                {story.lus.length > 0 && (
                  <div>
                    <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">Bewijs voor</p>
                    <ul className="space-y-2">
                      {story.lus.map((lu) => {
                        const o = getLearningOutcome(lu);
                        return (
                          o && (
                            <li key={lu}>
                              <Link to={luPath(lu)} className="group flex items-center gap-2.5 text-[0.875rem]">
                                <span className={cn('w-2 h-2 rounded-full', LU_STYLES[lu].dot)} aria-hidden="true" />
                                <span className="font-mono font-medium">{o.code}</span>
                                <span className="text-muted group-hover:text-ink transition-colors">{o.title}</span>
                              </Link>
                              {story.luNotities?.[lu] && (
                                <p className="mt-1 pl-[1.15rem] text-[0.8rem] leading-snug text-subtle">{story.luNotities[lu]}</p>
                              )}
                            </li>
                          )
                        );
                      })}
                    </ul>
                  </div>
                )}
              </aside>
            </div>

            {(previous || next) && (
              <nav aria-label="Andere stories" className="mt-16 pt-8 border-t border-line grid gap-4 sm:grid-cols-2">
                <div>{previous && <NeighbourCard story={previous} direction="previous" />}</div>
                <div>{next && <NeighbourCard story={next} direction="next" />}</div>
              </nav>
            )}
          </>
        )}
      </Container>

      {lightboxIndex !== null && (
        <Lightbox images={images} index={lightboxIndex} onIndexChange={setLightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
}
