export const MAX_MESSAGE_LENGTH = 500; // gelijk aan api/_lib/config.ts

const SESSION_KEY = 'portfolio-chat-session';

export interface ChatMessage {
  id: string;
  rol: 'gebruiker' | 'assistent';
  inhoud: string;
}

export type ChatErrorKind = 'rate_limited' | 'invalid' | 'server' | 'network';

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
  if (res.status >= 400 && res.status < 500) return new ChatError('invalid', message);
  return new ChatError('server', message);
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
