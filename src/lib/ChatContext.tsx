import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface ChatRequest {
  /** Vraag die in het invoerveld komt */
  question: string;
  /** true = meteen versturen (hero), false = alleen invullen (storypagina) */
  send: boolean;
  /** Uniek per aanvraag, zodat dezelfde vraag twee keer kan */
  id: number;
}

interface ChatState {
  open: boolean;
  request: ChatRequest | null;
  openChat: (question?: string, options?: { send?: boolean }) => void;
  closeChat: () => void;
  consumeRequest: () => void;
}

const ChatContext = createContext<ChatState | null>(null);

/** Laat elke pagina de chat openen, eventueel met een vooraf ingevulde vraag. */
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState<ChatRequest | null>(null);

  const openChat = useCallback((question?: string, options?: { send?: boolean }) => {
    if (question?.trim()) setRequest({ question: question.trim(), send: options?.send ?? false, id: Date.now() });
    setOpen(true);
  }, []);
  const closeChat = useCallback(() => setOpen(false), []);
  const consumeRequest = useCallback(() => setRequest(null), []);

  const value = useMemo(
    () => ({ open, request, openChat, closeChat, consumeRequest }),
    [open, request, openChat, closeChat, consumeRequest],
  );
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export function useChat(): ChatState {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat buiten ChatProvider');
  return ctx;
}
