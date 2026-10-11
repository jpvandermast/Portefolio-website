import React, { useMemo, useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Link } from 'react-router';
import { ArrowUpRight, Check, Copy, ImageIcon } from 'lucide-react';
import { publicUrl, STORY_TYPE_LABELS } from '../../lib/stories';
import { useStories } from '../../lib/StoriesContext';
import { AiAvatar } from './AiAvatar';

/** Slugs van alle story-links in een antwoord, in volgorde en zonder dubbelen. */
function storySlugs(markdown: string): string[] {
  const slugs = [...markdown.matchAll(/\]\(\/stories\/([^)\s?#]+)/g)].map((m) => decodeURIComponent(m[1]));
  return [...new Set(slugs)];
}

/** Mini-kaart van een story waarnaar het antwoord verwijst (titel, type/sprint, thumbnail). */
const StoryLinkCard: React.FC<{ slug: string; onNavigate: () => void }> = ({ slug, onNavigate }) => {
  const { stories } = useStories();
  const story = stories.find((s) => s.slug === slug);
  if (!story) return null;
  return (
    <Link
      to={`/stories/${story.slug}`}
      onClick={onNavigate}
      className="group/card flex items-center gap-3 rounded-xl bg-card p-2 pr-3 ring-1 ring-line shadow-card transition-[box-shadow,transform] hover:shadow-lift hover:-translate-y-px"
    >
      <span className="w-12 h-9 shrink-0 overflow-hidden rounded-lg bg-sunken ring-1 ring-line grid place-items-center">
        {story.klein_pad ? (
          <img src={publicUrl(story.klein_pad)} alt="" loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="w-4 h-4 text-subtle" aria-hidden="true" />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.85rem] font-medium text-ink group-hover/card:text-accent">{story.titel}</span>
        <span className="block text-[0.72rem] text-subtle">
          Sprint {story.sprint} · {STORY_TYPE_LABELS[story.type]}
        </span>
      </span>
      <ArrowUpRight className="w-4 h-4 shrink-0 text-subtle group-hover/card:text-accent" aria-hidden="true" />
    </Link>
  );
};

function components(onNavigate: () => void): Components {
  return {
    p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
    ul: ({ children }) => <ul className="mb-3 last:mb-0 pl-5 list-disc space-y-1 marker:text-subtle">{children}</ul>,
    ol: ({ children }) => <ol className="mb-3 last:mb-0 pl-5 list-decimal space-y-1 marker:text-subtle">{children}</ol>,
    li: ({ children }) => <li className="pl-0.5">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    h1: ({ children }) => <p className="mt-4 mb-1.5 font-semibold text-ink">{children}</p>,
    h2: ({ children }) => <p className="mt-4 mb-1.5 font-semibold text-ink">{children}</p>,
    h3: ({ children }) => <p className="mt-3 mb-1 font-semibold text-ink">{children}</p>,
    code: ({ children }) => <code className="px-1.5 py-0.5 rounded-md bg-sunken font-mono text-[0.85em]">{children}</code>,
    pre: ({ children }) => <pre className="my-3 p-3 rounded-xl bg-sunken overflow-x-auto text-[0.8rem]">{children}</pre>,
    blockquote: ({ children }) => <blockquote className="my-3 border-l-2 border-accent/40 pl-3 text-muted">{children}</blockquote>,
    a: ({ href, children }) =>
      href?.startsWith('/') ? (
        <Link to={href} onClick={onNavigate} className="font-medium text-accent underline decoration-accent/30 underline-offset-2">
          {children}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-accent underline decoration-accent/30 underline-offset-2">
          {children}
        </a>
      ),
  };
}

interface AssistantMessageProps {
  content: string;
  streaming?: boolean;
  onNavigate: () => void;
}

/** Antwoord van de assistent: geen bubbel, avatar links, nette markdown en een kopieerknop. */
export const AssistantMessage: React.FC<AssistantMessageProps> = ({ content, streaming, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const slugs = useMemo(() => storySlugs(content), [content]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* klembord niet beschikbaar */
    }
  };
  return (
    <div className="group/msg flex gap-3">
      <AiAvatar size="sm" className="mt-0.5" />
      <div className="min-w-0 flex-1">
        <div className="text-[0.925rem] leading-relaxed text-ink/90 break-words">
          <ReactMarkdown components={components(onNavigate)}>{content}</ReactMarkdown>
          {streaming && <span className="inline-block w-[2px] h-[1.05em] -mb-[0.18em] ml-0.5 bg-accent animate-blink" aria-hidden="true" />}
        </div>
        {!streaming && slugs.length > 0 && (
          <div className="mt-3 grid gap-2 sm:max-w-md" aria-label="Genoemde stories">
            {slugs.slice(0, 4).map((slug) => (
              <StoryLinkCard key={slug} slug={slug} onNavigate={onNavigate} />
            ))}
          </div>
        )}
        {!streaming && content && (
          <div className="mt-1.5 -ml-1.5 flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover/msg:opacity-100 sm:group-focus-within/msg:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 h-8 px-2 rounded-lg text-[0.75rem] text-subtle hover:text-ink hover:bg-sunken transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-success" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
              {copied ? 'Gekopieerd' : 'Kopiëren'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
