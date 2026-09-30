import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';

interface StoryMarkdownProps {
  markdown: string;
  /** Alle afbeeldings-URL's van de story, in volgorde; bepaalt de index in de lightbox. */
  imageUrls: string[];
  onOpenImage: (index: number) => void;
}

/** Rendert markdown zonder ruwe HTML (geen rehype-raw). */
export const StoryMarkdown: React.FC<StoryMarkdownProps> = ({ markdown, imageUrls, onOpenImage }) => {
  const components: Components = {
    p: ({ children }) => <p className="text-[15px] text-[#22303f] leading-relaxed mb-4 last:mb-0">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-5 space-y-1.5 mb-4 text-[15px] text-[#22303f]">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1.5 mb-4 text-[15px] text-[#22303f]">{children}</ol>,
    strong: ({ children }) => <strong className="font-bold text-[#121D2F]">{children}</strong>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#3762AB] pl-4 italic text-[#4a5b6b] mb-4">{children}</blockquote>
    ),
    code: ({ children }) => (
      <code className="px-1 py-0.5 rounded-[3px] bg-[#f0f2f5] text-[13px] text-[#121D2F]">{children}</code>
    ),
    // Koppen in de markdown worden gewone vetgedrukte regels, zodat de kopstructuur van het paneel intact blijft.
    h1: ({ children }) => <p className="text-[15px] font-bold text-[#121D2F] mb-2">{children}</p>,
    h2: ({ children }) => <p className="text-[15px] font-bold text-[#121D2F] mb-2">{children}</p>,
    h3: ({ children }) => <p className="text-[15px] font-bold text-[#121D2F] mb-2">{children}</p>,
    h4: ({ children }) => <p className="text-[15px] font-bold text-[#121D2F] mb-2">{children}</p>,
    h5: ({ children }) => <p className="text-[15px] font-bold text-[#121D2F] mb-2">{children}</p>,
    h6: ({ children }) => <p className="text-[15px] font-bold text-[#121D2F] mb-2">{children}</p>,
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#3762AB] underline hover:text-[#2b4d87]">
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
          aria-label={`Afbeelding vergroten: ${alt ?? ''}`.trim()}
          className="block w-full my-4 rounded-[4px] border border-[#e4e7ea] bg-[#f6f7f8] overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3762AB]"
        >
          <img src={url} alt={alt ?? ''} loading="lazy" className="w-full h-auto min-h-[120px] block" />
        </button>
      );
    },
  };

  return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>;
};
