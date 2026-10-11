import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Maximize2 } from 'lucide-react';

interface StoryMarkdownProps {
  markdown: string;
  /** Alle afbeeldings-URL's van de story, in volgorde; bepaalt de index in de lightbox. */
  imageUrls: string[];
  onOpenImage: (index: number) => void;
}

const heading = ({ children }: { children?: React.ReactNode }) => (
  <p className="mt-6 mb-2 font-semibold text-ink">{children}</p>
);

/** Rendert markdown uit de database zonder ruwe HTML (geen rehype-raw); links worden niet herschreven. */
export const StoryMarkdown: React.FC<StoryMarkdownProps> = ({ markdown, imageUrls, onOpenImage }) => {
  const components: Components = {
    p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
    ul: ({ children }) => <ul className="mb-4 pl-5 list-disc space-y-1.5 marker:text-subtle">{children}</ul>,
    ol: ({ children }) => <ol className="mb-4 pl-5 list-decimal space-y-1.5 marker:text-subtle">{children}</ol>,
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    blockquote: ({ children }) => (
      <blockquote className="my-5 border-l-2 border-accent pl-4 text-muted italic">{children}</blockquote>
    ),
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded-md bg-sunken font-mono text-[0.85em] text-ink">{children}</code>
    ),
    // Koppen in de markdown worden vetgedrukte regels, zodat de kopstructuur van de pagina intact blijft.
    h1: heading,
    h2: heading,
    h3: heading,
    h4: heading,
    h5: heading,
    h6: heading,
    hr: () => <hr className="my-6 border-line" />,
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-accent underline decoration-accent/30 underline-offset-[3px] hover:decoration-accent transition-colors"
      >
        {children}
      </a>
    ),
    img: ({ src, alt }) => {
      const url = typeof src === 'string' ? src : '';
      const index = imageUrls.indexOf(url);
      return (
        <button
          type="button"
          onClick={() => onOpenImage(Math.max(index, 0))}
          aria-label={`Afbeelding vergroten${alt ? `: ${alt}` : ''}`}
          className="group/img relative block w-full my-6 overflow-hidden rounded-card ring-1 ring-line bg-sunken cursor-zoom-in"
        >
          <img src={url} alt={alt ?? ''} loading="lazy" className="w-full h-auto min-h-[120px] block" />
          <span className="absolute bottom-3 right-3 grid place-items-center w-9 h-9 rounded-full bg-night/70 text-white backdrop-blur opacity-0 group-hover/img:opacity-100 group-focus-visible/img:opacity-100 transition-opacity" aria-hidden="true">
            <Maximize2 className="w-4 h-4" />
          </span>
        </button>
      );
    },
  };

  return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>;
};
