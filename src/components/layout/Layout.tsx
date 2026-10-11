import React, { Suspense, lazy } from 'react';
import { Outlet } from 'react-router';
import { useSearch } from '../../lib/SearchContext';
import { Footer } from './Footer';
import { Header } from './Header';
import { RouteEffects } from './RouteEffects';
import { ChatWidget } from '../chat/ChatWidget';

const CommandPalette = lazy(() => import('./CommandPalette'));

/** Vaste schil om elke pagina: skiplink, header, inhoud, footer, chat en zoeken. */
export const Layout: React.FC = () => {
  const { open } = useSearch();
  const [paletteLoaded, setPaletteLoaded] = React.useState(false);
  React.useEffect(() => {
    if (open) setPaletteLoaded(true);
  }, [open]);

  return (
    <div className="min-h-dvh flex flex-col">
      <a
        href="#inhoud"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-3 focus:left-3 focus:px-4 focus:py-2.5 focus:rounded-full focus:bg-ink focus:text-white"
      >
        Naar de inhoud
      </a>
      <RouteEffects />
      <Header />
      <main id="inhoud" className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ChatWidget />
      {paletteLoaded && (
        <Suspense fallback={null}>
          <CommandPalette />
        </Suspense>
      )}
    </div>
  );
};

/** Rustige laadstaat tijdens het ophalen van een pagina-chunk. */
const PageFallback: React.FC = () => (
  <div className="mx-auto max-w-page px-5 sm:px-8 pt-12 pb-24" role="status" aria-label="Pagina laden">
    <div className="skeleton h-4 w-40 rounded-full" />
    <div className="skeleton h-12 w-2/3 max-w-xl mt-6 rounded-xl" />
    <div className="skeleton h-5 w-1/2 max-w-md mt-4 rounded-full" />
  </div>
);
