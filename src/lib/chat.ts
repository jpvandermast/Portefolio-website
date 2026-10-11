export const MAX_MESSAGE_LENGTH = 500; // gelijk aan api/_lib/config.ts

const SESSION_KEY = 'portfolio-chat-session';

export interface ChatMessage {
  id: string;
  rol: 'gebruiker' | 'assistent';
  inhoud: string;
}

export type ChatErrorKind = 'rate_limited' | 'invalid' | 'server' | 'network' | 'unavailable' | 'interrupted';

export class ChatError extends Error {
  constructor(public kind: ChatErrorKind, message: string) {
    super(message);
  }
}

/** Sessie-id uit localStorage; werkt ook zonder localStorage (dan geldt hij voor deze paginasessie). */
let memorySessionId: string | null = null;

export function getSessionId(): string {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) return stored;
    const id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return (memorySessionId ??= crypto.randomUUID());
  }
}

export function startNewSession(): string {
  const id = crypto.randomUUID();
  memorySessionId = id;
  try {
    localStorage.setItem(SESSION_KEY, id);
  } catch {
    /* localStorage niet beschikbaar */
  }
  return id;
}

async function readError(res: Response): Promise<ChatError> {
  let message = 'Er ging iets mis. Probeer het later opnieuw.';
  try {
    const data = await res.json();
    if (typeof data?.error?.message === 'string') message = data.error.message;
  } catch {
    /* geen JSON */
  }
  if (res.status === 429) return new ChatError('rate_limited', message);
  if (res.status === 404 || res.status === 405)
    return new ChatError('unavailable', 'De chat is hier niet beschikbaar. Lokaal werkt hij alleen via npm run dev:api.');
  if (res.status >= 400 && res.status < 500) return new ChatError('invalid', message);
  return new ChatError('server', 'De AI-assistent is even niet bereikbaar. Probeer het zo opnieuw.');
}

export async function fetchHistory(sessionId: string): Promise<ChatMessage[]> {
  let res: Response;
  try {
    res = await fetch(`/api/chat?sessionId=${encodeURIComponent(sessionId)}`);
  } catch {
    throw new ChatError('network', 'Geen verbinding. Controleer je internet en probeer het opnieuw.');
  }
  if (!res.ok) throw await readError(res);
  const data = await res.json();
  return (data.messages ?? []) as ChatMessage[];
}

export async function sendMessage(sessionId: string, message: string): Promise<string> {
  let res: Response;
  try {
    res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, message }),
    });
  } catch {
    throw new ChatError('network', 'Geen verbinding. Controleer je internet en probeer het opnieuw.');
  }
  if (!res.ok) throw await readError(res);
  const data = await res.json();
  return data.reply as string;
}

/** Kan deze browser een streamende response lezen? Anders valt de chat terug op de gewone aanroep. */
function canStream(): boolean {
  return (
    typeof ReadableStream !== 'undefined' &&
    typeof TextDecoder !== 'undefined' &&
    'getReader' in ReadableStream.prototype
  );
}

export interface StreamResult {
  text: string;
  /** true als de bezoeker op stop drukte */
  aborted: boolean;
}

/**
 * Verstuurt een vraag en geeft het antwoord stukje voor stukje door via `onText` (steeds de volledige tekst
 * tot nu toe). Valt terug op de niet-streamende aanroep als de browser geen streams kan lezen of de server
 * JSON teruggeeft. De limieten (lengte, rate limit) gelden op de server, zoals altijd.
 */
export async function sendMessageStream(
  sessionId: string,
  message: string,
  onText: (text: string) => void,
  signal: AbortSignal,
): Promise<StreamResult> {
  if (!canStream()) {
    const reply = await sendMessage(sessionId, message);
    onText(reply);
    return { text: reply, aborted: false };
  }

  let res: Response;
  try {
    res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, message, stream: true }),
      signal,
    });
  } catch (err) {
    if (signal.aborted) return { text: '', aborted: true };
    throw new ChatError('network', 'Geen verbinding. Controleer je internet en probeer het opnieuw.');
  }
  if (!res.ok) throw await readError(res);

  // Oudere server of proxy die toch JSON geeft
  if ((res.headers.get('Content-Type') ?? '').includes('application/json') || !res.body) {
    const data = await res.json();
    onText(data.reply as string);
    return { text: data.reply as string, aborted: false };
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let text = '';
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
      onText(text);
    }
  } catch {
    if (signal.aborted) return { text, aborted: true };
    throw new ChatError('interrupted', 'Het antwoord werd onderbroken. Probeer het opnieuw.');
  }
  if (!text.trim()) throw new ChatError('server', 'De AI-assistent gaf geen antwoord. Probeer het opnieuw.');
  return { text, aborted: false };
}
