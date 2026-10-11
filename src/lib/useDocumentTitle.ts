import { useEffect } from 'react';

const SITE = 'Josse van der Mast';
const DEFAULT_DESCRIPTION =
  'Portfolio van Josse van der Mast voor de HU-minor Future-proof met AI: alle bewijsstukken per leeruitkomst en sprint, met een AI-assistent die mijn stories kent.';

/** Zet per pagina een eigen <title> en meta-description. */
export function useDocumentTitle(title: string | null, description?: string) {
  useEffect(() => {
    if (title === null) return;
    document.title = title ? `${title} · ${SITE}` : `${SITE} · Portfolio Future-proof met AI`;
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute('content', description ?? DEFAULT_DESCRIPTION);
  }, [title, description]);
}
