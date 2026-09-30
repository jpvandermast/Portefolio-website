import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Link } from 'react-router';
import { MessageCircle, RotateCcw, Send, X } from 'lucide-react';
import {
  ChatError,
  ChatMessage,
  fetchHistory,
  getSessionId,
  MAX_MESSAGE_LENGTH,
  sendMessage,
  startNewSession,
} from '../lib/chat';

const EXAMPLE_QUESTIONS = [
  'Wat heeft Josse in sprint 1 gedaan?',
  'Welke tools heeft Josse gebruikt?',
  'Wat is de minor Future-proof met AI?',
];

const WELCOME = 'Hoi! Ik ben de AI-assistent van Josse. Vraag me iets over zijn portfolio, zijn stories of de minor.';

// Links naar stories openen het story-paneel; op smalle schermen (chat = volledig scherm) sluit de chat daarbij.
// Externe links openen in een nieuw tabblad.
function makeMarkdownComponents(onStoryLink: () => void): Components {
  return {
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>,
    a: ({ href, children }) =>
      href?.startsWith('/stories/') ? (
        <Link to={href} onClick={onStoryLink} className="font-semibold text-[#3762AB] underline">
          {children}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#3762AB] underline">
          {children}
        </a>
      ),
  };
}

export const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Eerdere berichten van deze sessie laden bij de eerste keer openen
  useEffect(() => {
    if (!open || sessionId) return;
    const id = getSessionId();
    setSessionId(id);
    setHistoryLoading(true);
    fetchHistory(id)
      .then(setMessages)
      .catch(() => {
        /* geen geschiedenis is geen ramp; het gesprek begint dan leeg */
      })
      .finally(() => setHistoryLoading(false));
  }, [open, sessionId]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, sending, historyLoading]);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const markdownComponents = makeMarkdownComponents(() => {
    if (window.matchMedia('(max-width: 639px)').matches) setOpen(false);
  });

  const send = async (text: string) => {
    const message = text.trim();
    if (!message || sending || !sessionId) return;
    setError(null);
    setInput('');
    setMessages((prev) => [...prev, { id: `lokaal-${Date.now()}`, rol: 'gebruiker', inhoud: message }]);
    setSending(true);
    try {
      const reply = await sendMessage(sessionId, message);
      setMessages((prev) => [...prev, { id: `antwoord-${Date.now()}`, rol: 'assistent', inhoud: reply }]);
    } catch (err) {
      setError(err instanceof ChatError ? err.message : 'Er ging iets mis. Probeer het later opnieuw.');
      // Bij een fout is de vraag niet opgeslagen: zet hem terug in het invoerveld
      setMessages((prev) => prev.slice(0, -1));
      setInput(message);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const newConversation = () => {
    setSessionId(startNewSession());
    setMessages([]);
    setError(null);
    setInput('');
  };

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Chat met de AI-assistent"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.stopPropagation(); // sluit alleen de chat, niet ook een open story-paneel
              close();
            }
          }}
          className="fixed z-[70] inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[390px] sm:h-[560px] sm:max-h-[calc(100vh-7rem)] bg-white sm:rounded-[6px] sm:border border-[#e4e7ea] shadow-xl flex flex-col"
        >
          <div className="flex items-center justify-between gap-2 px-4 py-3 bg-[#121D2F] text-white sm:rounded-t-[6px]">
            <div className="font-bold text-[15px] truncate">AI-assistent</div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={newConversation}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] text-xs font-bold whitespace-nowrap hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Nieuw gesprek
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Chat sluiten"
                className="w-9 h-9 rounded-[4px] flex items-center justify-center hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div ref={listRef} role="log" aria-live="polite" aria-label="Gesprek" className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f6f7f8]">
            <div className="max-w-[88%] rounded-[6px] bg-white border border-[#e4e7ea] px-3.5 py-2.5 text-[14px] text-[#22303f] leading-relaxed">
              {WELCOME}
            </div>

            {historyLoading && <p className="text-[13px] text-[#6c7d8f] animate-pulse">Eerdere berichten laden…</p>}

            {!historyLoading && messages.length === 0 && (
              <div className="flex flex-col items-start gap-2 pt-1">
                {EXAMPLE_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    disabled={sending}
                    className="text-left text-[13px] font-semibold text-[#2b4d87] bg-[#eaf0fa] hover:bg-[#dbe6f7] border border-[#3762AB]/30 rounded-[4px] px-3 py-2 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3762AB]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m) =>
              m.rol === 'gebruiker' ? (
                <div key={m.id} className="ml-auto max-w-[88%] rounded-[6px] bg-[#121D2F] text-white px-3.5 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap break-words">
                  {m.inhoud}
                </div>
              ) : (
                <div key={m.id} className="max-w-[88%] rounded-[6px] bg-white border border-[#e4e7ea] px-3.5 py-2.5 text-[14px] text-[#22303f] leading-relaxed break-words">
                  <ReactMarkdown components={markdownComponents}>{m.inhoud}</ReactMarkdown>
                </div>
              ),
            )}

            {sending && (
              <div role="status" aria-label="De assistent typt" className="inline-flex items-center gap-1 rounded-[6px] bg-white border border-[#e4e7ea] px-3.5 py-3">
                {[0, 150, 300].map((delay) => (
                  <span key={delay} className="w-1.5 h-1.5 rounded-full bg-[#3762AB] animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            )}

            {error && (
              <div role="alert" className="rounded-[4px] bg-[#fdecec] border border-[#f3b6b6] text-[#8a1f1f] text-[13px] px-3 py-2">
                {error}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t border-[#e4e7ea] bg-white sm:rounded-b-[6px]"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder="Stel een vraag…"
                aria-label="Je vraag"
                disabled={sending}
                className="flex-1 min-w-0 border border-[#cbd2d9] rounded-[4px] px-3 py-2.5 text-[16px] sm:text-[14px] focus:outline-none focus:border-[#3762AB] focus:ring-1 focus:ring-[#3762AB] disabled:bg-[#f6f7f8]"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Verstuur"
                className="w-11 h-11 shrink-0 rounded-[4px] bg-[#3762AB] hover:bg-[#2b4d87] text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121D2F]"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-[#6c7d8f]">
              Gesprekken worden opgeslagen om de chatbot te verbeteren. Antwoorden komen van een AI en kunnen fouten bevatten.
            </p>
          </form>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={open ? 'Chat sluiten' : 'Chat met de AI-assistent openen'}
        aria-expanded={open}
        className={`fixed z-[70] bottom-5 right-5 sm:bottom-6 sm:right-6 w-14 h-14 rounded-full bg-[#121D2F] hover:bg-[#2b4d87] text-white shadow-lg flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3762AB] ${open ? 'hidden sm:flex' : 'flex'}`}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </>
  );
};
