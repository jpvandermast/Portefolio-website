import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface SearchState {
  open: boolean;
  setOpen: (open: boolean) => void;
  openSearch: () => void;
}

const SearchContext = createContext<SearchState | null>(null);

/** Command palette: open via Cmd/Ctrl+K of de zoekknop. */
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const openSearch = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ open, setOpen, openSearch }), [open, openSearch]);
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export function useSearch(): SearchState {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch buiten SearchProvider');
  return ctx;
}
