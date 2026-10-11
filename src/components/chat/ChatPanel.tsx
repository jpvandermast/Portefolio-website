import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowDown,
  ArrowUp,
  CalendarRange,
  Info,
  Maximize2,
  Minimize2,
  RefreshCw,
  SquarePen,
  Square,
  Target,
  UserRound,
  Wrench,
  X,
} from 'lucide-react';
import {
  ChatError,
  ChatMessage,
  fetchHistory,
  getSessionId,
  MAX_MESSAGE_LENGTH,
  sendMessageStream,
  startNewSession,
} from '../../lib/chat';
import { useChat } from '../../lib/ChatContext';
import { useFocusTrap } from '../../lib/useFocusTrap';
import { cn } from '../ui/cn';
import { AiAvatar } from './AiAvatar';
import { AssistantMessage } from './AssistantMessage';
import { followUps } from './followUps';

const SUGGESTIONS = [
  { icon: CalendarRange, title: 'Sprint 1', question: 'Wat heeft Josse in sprint 1 gedaan?' },
  { icon: Wrench, title: 'Tools', question: 'Welke AI-tools heeft Josse gebruikt?' },
  { icon: Target, title: 'Leeruitkomsten', question: 'Hoe werkt Josse aan de leeruitkomsten?' },
  { icon: UserRound, title: 'Wie is Josse?', question: 'Wie is Josse en wat drijft hem?' },
];

interface UiMessage extends ChatMessage {
  streaming?: boolean;
}

interface UiError {
  message: string;
  /** vraag om opnieuw te versturen */
  retry?: string;
}

const isMobile = () => window.matchMedia('(max-width: 639px)').matches;

/**
 * Chatpaneel. Blijft na de eerste keer openen gemonteerd (ook als hij dicht is), zodat een lopend
 * antwoord en de scrollpositie bewaard blijven.
 */
export default function ChatPanel({ onClosed }: { onClosed: () => void }) {
  const { open, closeChat, request, consumeRequest } = useChat();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const atBottomRef = useRef(true);
  // Typemachine: ontvangen tekst wordt woord voor woord getoond
  const targetRef = useRef('');
  const shownRef = useRef('');
  const frameRef = useRef(0);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [historyState, setHistoryState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<UiError | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [showJump, setShowJump] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useFocusTrap(panelRef, open);

  // Geschiedenis van deze sessie laden bij de eerste keer openen
  useEffect(() => {
    if (!open || sessionId) return;
    const id = getSessionId();
    setSessionId(id);
    setHistoryState('loading');
    fetchHistory(id)
      // Nooit een gesprek overschrijven dat intussen al begonnen is
      .then((m) => setMessages((prev) => (prev.length ? prev : m)))
      .catch(() => {
        /* geen geschiedenis is geen ramp; het gesprek begint dan leeg */
      })
      .finally(() => setHistoryState('done'));
  }, [open, sessionId]);

  // Focus in het invoerveld bij openen; scroll-lock op mobiel (volledig scherm)
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 60);
    let restore: (() => void) | undefined;
    if (isMobile()) {
      const overflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      restore = () => (document.body.style.overflow = overflow);
    }
    return () => {
      window.clearTimeout(t);
      restore?.();
    };
  }, [open]);

  const scrollToBottom = useCallback((smooth = false) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth && !reduce ? 'smooth' : 'auto' });
    atBottomRef.current = true;
    setShowJump(false);
  }, [reduce]);

  // Alleen meescrollen als de bezoeker al onderaan was
  useLayoutEffect(() => {
    if (messages.length === 0) {
      listRef.current?.scrollTo({ top: 0 });
      return;
    }
    if (atBottomRef.current) scrollToBottom();
    else setShowJump(true);
  }, [messages, busy, error, historyState, scrollToBottom]);

  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 64;
    atBottomRef.current = atBottom;
    if (atBottom) setShowJump(false);
  };

  // Meegroeiende textarea (max ±5 regels)
  useLayoutEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 136)}px`;
  }, [input, open]);

  const close = useCallback(() => {
    closeChat();
    onClosed();
  }, [closeChat, onClosed]);

  const setStreamingText = (text: string) =>
    setMessages((prev) => prev.map((m) => (m.streaming ? { ...m, inhoud: text } : m)));

  const stopTypewriter = () => cancelAnimationFrame(frameRef.current);

  /** Laat de getoonde tekst in stapjes van een paar woorden naar de ontvangen tekst toe lopen. */
  const pump = () => {
    const target = targetRef.current;
    let shown = shownRef.current;
    if (shown.length < target.length) {
      const backlog = target.length - shown.length;
      const step = Math.max(1, Math.ceil(backlog / 12));
      let next = shown.length + step;
      // tot het eind van een woord doorlopen
      while (next < target.length && !/\s/.test(target[next])) next++;
      shown = target.slice(0, next);
      shownRef.current = shown;
      setStreamingText(shown);
    }
    frameRef.current = requestAnimationFrame(pump);
  };

  const send = useCallback(
    async (text: string) => {
      const message = text.trim();
      if (!message || busy || !sessionId || message.length > MAX_MESSAGE_LENGTH) return;
      setError(null);
      setInput('');
      setBusy(true);
      setAnnouncement('');
      const controller = new AbortController();
      abortRef.current = controller;
      targetRef.current = '';
      shownRef.current = '';

      const stamp = Date.now();
      setMessages((prev) => [
        ...prev,
        { id: `vraag-${stamp}`, rol: 'gebruiker', inhoud: message },
        { id: `antwoord-${stamp}`, rol: 'assistent', inhoud: '', streaming: true },
      ]);
      atBottomRef.current = true;
      if (!reduce) frameRef.current = requestAnimationFrame(pump);

      try {
        const result = await sendMessageStream(
          sessionId,
          message,
          (t) => {
            targetRef.current = t;
            if (reduce) setStreamingText(t);
          },
          controller.signal,
        );
        // Typemachine laten uitlopen (max. 2 s), zodat het einde niet in één keer verschijnt
        if (!reduce && !result.aborted) {
          const until = Date.now() + 2000;
          await new Promise<void>((resolve) => {
            const check = () =>
              shownRef.current.length >= targetRef.current.length || Date.now() > until ? resolve() : window.setTimeout(check, 30);
            check();
          });
        }
        stopTypewriter();
        const final = result.text.trim();
        if (result.aborted && !final) {
          // Gestopt voordat er tekst was: niets opgeslagen, vraag terug in het veld
          setMessages((prev) => prev.filter((m) => m.id !== `vraag-${stamp}` && m.id !== `antwoord-${stamp}`));
          setInput(message);
        } else {
          setMessages((prev) =>
            prev.map((m) => (m.id === `antwoord-${stamp}` ? { ...m, inhoud: final, streaming: false } : m)),
          );
          setAnnouncement(`Antwoord van de assistent: ${final}`);
        }
      } catch (err) {
        stopTypewriter();
        // Bij een fout is niets opgeslagen: bericht weghalen en de vraag terugzetten
        setMessages((prev) => prev.filter((m) => m.id !== `vraag-${stamp}` && m.id !== `antwoord-${stamp}`));
        setInput(message);
        const kind = err instanceof ChatError ? err.kind : 'server';
        setError({
          message: err instanceof ChatError ? err.message : 'Er ging iets mis. Probeer het later opnieuw.',
          retry: kind === 'network' || kind === 'server' || kind === 'interrupted' ? message : undefined,
        });
      } finally {
        abortRef.current = null;
        setBusy(false);
        if (!isMobile()) inputRef.current?.focus({ preventScroll: true });
      }
    },
    [busy, sessionId, reduce],
  );

  // Vraag vanuit de hero, de command palette of een storypagina
  useEffect(() => {
    if (!open || !request || !sessionId || historyState !== 'done' || busy) return;
    consumeRequest();
    if (request.send) send(request.question);
    else {
      setInput(request.question);
      window.setTimeout(() => {
        const el = inputRef.current;
        el?.focus();
        el?.setSelectionRange(el.value.length, el.value.length);
      }, 80);
    }
  }, [open, request, sessionId, historyState, busy, consumeRequest, send]);

  const stop = () => abortRef.current?.abort();

  const newConversation = () => {
    abortRef.current?.abort();
    stopTypewriter();
    setSessionId(startNewSession());
    setHistoryState('done');
    setMessages([]);
    setError(null);
    setInput('');
    setAnnouncement('Nieuw gesprek gestart');
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(input);
    }
  };

  const onNavigate = useCallback(() => {
    if (isMobile() || expanded) close();
  }, [expanded, close]);

  const empty = historyState === 'done' && messages.length === 0;
  const last = messages[messages.length - 1];
  const lastQuestion = [...messages].reverse().find((m) => m.rol === 'gebruiker');
  const suggestions =
    !busy && last?.rol === 'assistent' && !last.streaming && lastQuestion
      ? followUps(lastQuestion.inhoud, last.inhoud, messages.filter((m) => m.rol === 'gebruiker').map((m) => m.inhoud))
      : [];
  const count = input.length;

  const variants = {
    open: { opacity: 1, scale: 1, y: 0, visibility: 'visible' as const },
    closed: reduce
      ? { opacity: 0, transitionEnd: { visibility: 'hidden' as const } }
      : { opacity: 0, scale: 0.96, y: 16, transitionEnd: { visibility: 'hidden' as const } },
  };

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-titel"
      aria-hidden={!open}
      inert={!open}
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.stopPropagation(); // sluit alleen de chat
          close();
        }
      }}
      initial="closed"
      animate={open ? 'open' : 'closed'}
      variants={variants}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: 'bottom right' }}
      className={cn(
        'fixed z-[70] flex flex-col overflow-hidden focus:outline-none',
        'inset-0 bg-surface',
        'sm:inset-auto sm:right-5 sm:bottom-[5.5rem] sm:rounded-panel sm:ring-1 sm:ring-black/5 sm:shadow-panel',
        'sm:bg-surface/[0.94] sm:backdrop-blur-2xl sm:backdrop-saturate-150',
        expanded
          ? 'sm:w-[min(780px,calc(100vw-2.5rem))] sm:h-[calc(100dvh-10.5rem)]'
          : 'sm:w-[400px] sm:h-[min(640px,calc(100dvh-7.5rem))]',
        'transition-[width,height] duration-300 ease-out-soft',
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-16 shrink-0 border-b border-line/80 bg-card/60">
        <AiAvatar />
        <div className="min-w-0 flex-1">
          <h2 id="chat-titel" className="text-[0.95rem] font-semibold leading-tight truncate">
            Josse's AI-assistent
          </h2>
          <p className="flex items-center gap-1.5 text-[0.75rem] text-subtle truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#12b76a]" aria-hidden="true" />
            Kent al mijn stories · Gemini
          </p>
        </div>
        <div className="flex items-center">
          <HeaderButton label="Nieuw gesprek" onClick={newConversation}>
            <SquarePen className="w-[18px] h-[18px]" />
          </HeaderButton>
          <HeaderButton label={expanded ? 'Verkleinen' : 'Vergroten'} onClick={() => setExpanded((x) => !x)} className="hidden sm:grid">
            {expanded ? <Minimize2 className="w-[18px] h-[18px]" /> : <Maximize2 className="w-[18px] h-[18px]" />}
          </HeaderButton>
          <HeaderButton label="Chat sluiten" onClick={close}>
            <X className="w-5 h-5" />
          </HeaderButton>
        </div>
      </div>

      {/* Berichten */}
      <div className="relative flex-1 min-h-0">
        <div
          ref={listRef}
          onScroll={onScroll}
          role="log"
          aria-live="off"
          aria-label="Gesprek"
          className="h-full overflow-y-auto overscroll-contain px-4 sm:px-5 py-5"
        >
          <div className={cn('mx-auto space-y-6', expanded && 'max-w-2xl')}>
            {historyState === 'loading' && (
              <div className="space-y-3" role="status" aria-label="Eerdere berichten laden">
                <div className="skeleton h-9 w-2/3 ml-auto rounded-2xl" />
                <div className="flex gap-3">
                  <div className="skeleton w-7 h-7 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="skeleton h-3.5 w-full rounded-full" />
                    <div className="skeleton h-3.5 w-4/5 rounded-full" />
                  </div>
                </div>
              </div>
            )}

            {empty && (
              <div className="pt-4 sm:pt-6">
                <AiAvatar size="lg" />
                <p className="mt-5 text-[1.6rem] font-semibold tracking-[-0.025em] leading-tight">Hoi! Wat wil je weten?</p>
                <p className="mt-2 text-[0.9rem] text-muted">Ik ken alle stories van Josse en antwoord met links naar het bewijs.</p>
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  {SUGGESTIONS.map(({ icon: Icon, title, question }) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => send(question)}
                      disabled={busy || !sessionId}
                      className="group flex flex-col items-start gap-2.5 rounded-2xl bg-card p-3.5 text-left ring-1 ring-line shadow-card transition-[box-shadow,transform] hover:shadow-lift hover:-translate-y-px disabled:opacity-50"
                    >
                      <span className="grid place-items-center w-8 h-8 rounded-lg bg-accent-soft text-accent">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[0.85rem] font-medium text-ink">{title}</span>
                        <span className="block mt-0.5 text-[0.78rem] leading-snug text-muted">{question}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) =>
              m.rol === 'gebruiker' ? (
                <div key={m.id} className="flex justify-end">
                  <p className="max-w-[85%] rounded-[18px] rounded-br-md bg-accent px-4 py-2.5 text-[0.925rem] leading-relaxed text-white whitespace-pre-wrap break-words shadow-card">
                    <span className="sr-only">Jij: </span>
                    {m.inhoud}
                  </p>
                </div>
              ) : m.streaming && !m.inhoud ? (
                <div key={m.id} className="flex gap-3 items-center" role="status" aria-label="De assistent denkt na">
                  <AiAvatar size="sm" />
                  <span className="inline-flex gap-1" aria-hidden="true">
                    {[0, 160, 320].map((d) => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </span>
                  <span className="text-[0.8rem] text-subtle">denkt na…</span>
                </div>
              ) : (
                <AssistantMessage key={m.id} content={m.inhoud} streaming={m.streaming} onNavigate={onNavigate} />
              ),
            )}

            {suggestions.length > 0 && (
              <div className="pl-10 flex flex-wrap gap-2" aria-label="Vervolgvragen">
                {suggestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="min-h-9 px-3.5 py-1.5 rounded-full bg-card text-left text-[0.8rem] text-ink ring-1 ring-line hover:ring-accent/40 hover:text-accent transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {error && (
              <div role="alert" className="flex items-start gap-3 rounded-2xl bg-danger-soft px-4 py-3 text-[0.85rem] text-danger">
                <Info className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <p>{error.message}</p>
                  {error.retry && (
                    <button
                      type="button"
                      onClick={() => send(error.retry!)}
                      className="mt-1.5 inline-flex items-center gap-1.5 min-h-8 font-medium underline underline-offset-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                      Opnieuw proberen
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {showJump && (
          <button
            type="button"
            onClick={() => scrollToBottom(true)}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-ink text-white text-[0.8rem] shadow-lift"
          >
            <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
            Naar nieuwste
          </button>
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      {/* Invoer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="shrink-0 px-3 sm:px-4 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <div className={cn('mx-auto', expanded && 'max-w-2xl')}>
          <div className="flex items-end gap-2 rounded-[22px] bg-card p-1.5 pl-4 ring-1 ring-line shadow-card focus-within:ring-2 focus-within:ring-accent/60 transition-shadow">
            <label htmlFor="chat-invoer" className="sr-only">
              Je vraag
            </label>
            <textarea
              id="chat-invoer"
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              maxLength={MAX_MESSAGE_LENGTH}
              placeholder="Stel een vraag…"
              aria-describedby="chat-hint"
              className="flex-1 min-w-0 resize-none bg-transparent py-2.5 text-[16px] sm:text-[0.925rem] leading-6 text-ink placeholder:text-subtle focus:outline-none"
              style={{ outline: 'none' }}
            />
            {busy ? (
              <button
                type="button"
                onClick={stop}
                aria-label="Stoppen met genereren"
                className="grid place-items-center w-10 h-10 shrink-0 rounded-full bg-ink text-white hover:bg-ink/85 transition-colors"
              >
                <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim() || !sessionId}
                aria-label="Versturen"
                className="grid place-items-center w-10 h-10 shrink-0 rounded-full bg-accent text-white hover:bg-accent-hover disabled:bg-line-strong disabled:text-white transition-colors"
              >
                <ArrowUp className="w-[18px] h-[18px]" aria-hidden="true" />
              </button>
            )}
          </div>
          <div id="chat-hint" className="mt-2 flex items-center justify-between gap-3 px-2 text-[0.7rem] text-subtle">
            <span>Gesprekken worden opgeslagen om de chatbot te verbeteren · AI kan fouten maken</span>
            {count >= 400 && (
              <span className={cn('font-mono tabular-nums shrink-0', count >= MAX_MESSAGE_LENGTH && 'text-danger')}>
                {count}/{MAX_MESSAGE_LENGTH}
              </span>
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
}

const HeaderButton: React.FC<{ label: string; onClick: () => void; children: React.ReactNode; className?: string }> = ({
  label,
  onClick,
  children,
  className,
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    className={cn('grid place-items-center w-11 h-11 rounded-full text-muted hover:text-ink hover:bg-sunken transition-colors', className)}
  >
    <span aria-hidden="true">{children}</span>
  </button>
);
