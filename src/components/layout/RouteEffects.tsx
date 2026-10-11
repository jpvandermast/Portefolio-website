import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router';

/**
 * Bij een paginawissel (ander pad, niet alleen andere filters): naar boven scrollen en de focus op de
 * nieuwe paginatitel zetten, zodat toetsenbord- en schermlezergebruikers weten dat de pagina is gewisseld.
 * Bij terug/vooruit (POP) laat de browser zijn eigen scrollpositie staan.
 */
export function RouteEffects() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (navigationType !== 'POP') window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    // Wachten tot de (lazy) pagina zijn titel heeft gerenderd
    let tries = 0;
    const focusTitle = () => {
      const title = document.getElementById('page-title');
      if (title) title.focus({ preventScroll: true });
      else if (tries++ < 20) window.setTimeout(focusTitle, 50);
    };
    focusTitle();
  }, [pathname, navigationType]);

  return null;
}
