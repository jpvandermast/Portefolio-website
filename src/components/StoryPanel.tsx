import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Download, X } from 'lucide-react';
import type { Story } from '../types';
import { getStory, publicUrl, STORY_TYPE_LABELS } from '../lib/stories';
import { useFocusTrap } from '../lib/useFocusTrap';
import { LuBadges, TypeBadge } from './StoryBadges';
import { StoryMarkdown } from './StoryMarkdown';
import { Lightbox, LightboxImage } from './Lightbox';

const SECTIONS: { key: 'opdracht_md' | 'gedaan_md' | 'resultaat_md' | 'geleerd_md'; heading: string }[] = [
  { key: 'opdracht_md', heading: 'Wat was de opdracht?' },
  { key: 'gedaan_md', heading: 'Wat heb ik gedaan?' },
  { key: 'resultaat_md', heading: 'Wat was het resultaat?' },
  { key: 'geleerd_md', heading: 'Wat heb ik geleerd?' },
];

const IMAGE_PATTERN = /!\[([^\]]*)\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g;

function extractImages(story: Story): LightboxImage[] {
  const images: LightboxImage[] = [];
  for (const { key } of SECTIONS) {
    for (const match of story[key].matchAll(IMAGE_PATTERN)) {
      images.push({ alt: match[1], src: match[2] });
    }
  }
  return images;
}

type LoadState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'notfound' }
  | { status: 'ready'; story: Story };

export const StoryPanel: React.FC<{ slug: string }> = ({ slug }) => {
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useFocusTrap(panelRef, lightboxIndex === null);

  const close = useCallback(() => {
    navigate({ pathname: '/', hash: '#sprints' });
    window.setTimeout(() => document.getElementById('sprints')?.scrollIntoView(), 50);
  }, [navigate]);

  // Story laden
  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    setLightboxIndex(null);
    getStory(slug)
      .then((story) => {
        if (!cancelled) setState(story ? { status: 'ready', story } : { status: 'notfound' });
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Story laden mislukt', err);
        setState({ status: 'error' });
      });
    return () => {
      cancelled = true;
    };
  }, [slug, attempt]);

  // Scroll-lock, focus en terugzetten van focus
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, []);

  // Esc sluit het paneel (de lightbox vangt Esc zelf af)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxIndex === null) close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close, lightboxIndex]);

  const story = state.status === 'ready' ? state.story : null;
  const images = useMemo(() => (story ? extractImages(story) : []), [story]);
  const imageUrls = useMemo(() => images.map((i) => i.src), [images]);
  const documents = story?.files.filter((f) => f.rol === 'document') ?? [];

  return (
    <div
      className="fixed inset-0 z-[60] bg-[#121D2F]/70 flex items-stretch sm:items-center justify-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-panel-title"
        // inert zolang de lightbox open is, zodat focus en schermlezer alleen de lightbox bereiken
        inert={lightboxIndex !== null}
        className="bg-white w-full sm:max-w-3xl sm:rounded-[6px] max-h-full sm:max-h-[90vh] flex flex-col shadow-xl focus:outline-none"
      >
        <div className="flex items-start justify-between gap-4 p-5 sm:p-8 pb-4 border-b border-[#e4e7ea]">
          <div className="min-w-0">
            {story ? (
              <>
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  <TypeBadge type={story.type} />
                  <span className="px-2 py-0.5 rounded-[4px] text-[11px] font-bold bg-[#f6f7f8] text-[#121D2F] border border-[#e4e7ea]">
                    Sprint {story.sprint}
                  </span>
                  <LuBadges lus={story.lus} />
                </div>
                <h2 id="story-panel-title" className="text-[22px] sm:text-[26px] font-bold text-[#121D2F] leading-tight">
                  {story.titel}
                </h2>
                <p className="sr-only">{STORY_TYPE_LABELS[story.type]}</p>
              </>
            ) : (
              <h2 id="story-panel-title" className="text-[22px] font-bold text-[#121D2F]">
                {state.status === 'notfound' ? 'Story niet gevonden' : state.status === 'error' ? 'Er ging iets mis' : 'Story laden…'}
              </h2>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Story sluiten"
            className="shrink-0 w-10 h-10 rounded-[4px] bg-[#f6f7f8] hover:bg-[#e4e7ea] text-[#121D2F] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3762AB]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-8 space-y-8">
          {state.status === 'loading' && (
            <div role="status" className="space-y-3 animate-pulse" aria-label="Story wordt geladen">
              <div className="h-4 bg-[#e4e7ea] rounded w-3/4" />
              <div className="h-4 bg-[#e4e7ea] rounded w-full" />
              <div className="h-4 bg-[#e4e7ea] rounded w-5/6" />
            </div>
          )}

          {state.status === 'notfound' && (
            <div>
              <p className="text-[15px] text-[#4a5b6b] mb-4">Deze story bestaat niet (meer) of is niet zichtbaar.</p>
              <button type="button" onClick={close} className="bg-[#121D2F] hover:bg-[#2b4d87] text-white py-2.5 px-5 rounded-[4px] font-bold text-[14px]">
                Terug naar het overzicht
              </button>
            </div>
          )}

          {state.status === 'error' && (
            <div role="alert">
              <p className="text-[15px] text-[#4a5b6b] mb-4">De story kon niet worden geladen. Controleer je verbinding en probeer het opnieuw.</p>
              <button type="button" onClick={() => setAttempt((n) => n + 1)} className="bg-[#121D2F] hover:bg-[#2b4d87] text-white py-2.5 px-5 rounded-[4px] font-bold text-[14px]">
                Opnieuw proberen
              </button>
            </div>
          )}

          {story &&
            SECTIONS.map(({ key, heading }) => (
              <section key={key} aria-labelledby={`story-${key}`}>
                <h3 id={`story-${key}`} className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#3762AB] mb-3">
                  {heading}
                </h3>
                {story[key].trim() ? (
                  <StoryMarkdown markdown={story[key]} imageUrls={imageUrls} onOpenImage={setLightboxIndex} />
                ) : (
                  <p className="text-[14px] italic text-[#6c7d8f]">Nog niet ingevuld.</p>
                )}
              </section>
            ))}

          {documents.length > 0 && (
            <section aria-labelledby="story-bijlagen">
              <h3 id="story-bijlagen" className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#3762AB] mb-3">
                Bijlagen
              </h3>
              <div className="flex flex-wrap gap-3">
                {documents.map((file) => (
                  <a
                    key={file.id}
                    href={publicUrl(file.storage_path, file.bestandsnaam.split('/').pop())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#3762AB] hover:bg-[#2b4d87] text-white py-3 px-5 rounded-[4px] font-bold text-[14px] transition-colors"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    <span>{file.alt_of_weergavenaam || file.bestandsnaam}</span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={images} index={lightboxIndex} onIndexChange={setLightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </div>
  );
};
