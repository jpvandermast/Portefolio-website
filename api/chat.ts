import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import {
  MAX_HISTORY_MESSAGES,
  MAX_MESSAGE_LENGTH,
  MAX_OUTPUT_TOKENS,
  MAX_RETURNED_MESSAGES,
  RATE_LIMIT_MESSAGES,
  RATE_LIMIT_WINDOW_MS,
} from './_lib/config.js';
import { getPortfolioContext } from './_lib/context.js';
import { getClientIp, hashIp } from './_lib/ip.js';
import { buildSystemPrompt } from './_lib/systemPrompt.js';
import { supabaseAdmin } from './_lib/supabaseAdmin.js';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

/** Foutmeldingen voor de browser bevatten nooit interne details. */
function fail(status: 400 | 405 | 429 | 500, code: string, message: string, headers?: Record<string, string>) {
  return json({ error: { code, message } }, status, headers);
}

async function handleGet(request: Request) {
  const sessionId = new URL(request.url).searchParams.get('sessionId') ?? '';
  if (!UUID.test(sessionId)) return fail(400, 'invalid_session', 'Ongeldig sessie-id.');

  const { data, error } = await supabaseAdmin()
    .from('chat_berichten')
    .select('id, rol, inhoud, created_at')
    .eq('sessie_id', sessionId)
    .order('created_at', { ascending: true })
    .limit(MAX_RETURNED_MESSAGES);
  if (error) throw error;
  return json({ messages: data ?? [] });
}

async function handlePost(request: Request) {
  let body: { sessionId?: unknown; message?: unknown; stream?: unknown };
  try {
    body = await request.json();
  } catch {
    return fail(400, 'invalid_json', 'Ongeldige aanvraag.');
  }

  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
  if (!UUID.test(sessionId)) return fail(400, 'invalid_session', 'Ongeldig sessie-id.');
  if (typeof body.message !== 'string') return fail(400, 'invalid_message', 'Typ eerst een vraag.');
  const message = body.message.trim();
  if (!message) return fail(400, 'empty_message', 'Typ eerst een vraag.');
  if (message.length > MAX_MESSAGE_LENGTH) {
    return fail(400, 'message_too_long', `Je bericht is te lang (maximaal ${MAX_MESSAGE_LENGTH} tekens).`);
  }
  const wantsStream = body.stream === true;

  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL;
  if (!apiKey || !model) throw new Error('Gemini-configuratie ontbreekt');

  const db = supabaseAdmin();
  const ipHash = hashIp(getClientIp(request));

  // Rate limit: gebruikersberichten van de afgelopen periode per ip_hash (via de sessies van dat ip_hash).
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  const { count, error: countError } = await db
    .from('chat_berichten')
    .select('id, chat_sessies!inner(ip_hash)', { count: 'exact', head: true })
    .eq('rol', 'gebruiker')
    .gte('created_at', since)
    .eq('chat_sessies.ip_hash', ipHash);
  if (countError) throw countError;
  if ((count ?? 0) >= RATE_LIMIT_MESSAGES) {
    return fail(429, 'rate_limited', 'Je hebt veel vragen gesteld. Probeer het over een tijdje opnieuw.', {
      'Retry-After': String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)),
    });
  }

  // Sessie aanmaken als die nog niet bestaat
  const { data: existing, error: sessionError } = await db
    .from('chat_sessies')
    .select('id')
    .eq('id', sessionId)
    .maybeSingle();
  if (sessionError) throw sessionError;
  if (!existing) {
    const { error } = await db.from('chat_sessies').insert({ id: sessionId, ip_hash: ipHash });
    if (error) throw error;
  }

  // Laatste berichten als geschiedenis
  const { data: recent, error: historyError } = await db
    .from('chat_berichten')
    .select('rol, inhoud')
    .eq('sessie_id', sessionId)
    .order('created_at', { ascending: false })
    .limit(MAX_HISTORY_MESSAGES);
  if (historyError) throw historyError;
  const history = (recent ?? []).reverse();

  const context = await getPortfolioContext();
  const ai = new GoogleGenAI({ apiKey });
  const params = {
    model,
    contents: [
      ...history.map((m) => ({
        role: m.rol === 'assistent' ? 'model' : 'user',
        parts: [{ text: m.inhoud as string }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ],
    config: {
      systemInstruction: buildSystemPrompt(context),
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      temperature: 0.4,
      // Minimaal "denken": anders gaat het tokenbudget op aan thinking en wordt het antwoord afgekapt.
      thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
    },
  };

  // Vraag en antwoord samen opslaan (met expliciete tijdstippen voor de volgorde)
  const save = async (reply: string) => {
    const now = Date.now();
    const { error: insertError } = await db.from('chat_berichten').insert([
      { sessie_id: sessionId, rol: 'gebruiker', inhoud: message, created_at: new Date(now).toISOString() },
      { sessie_id: sessionId, rol: 'assistent', inhoud: reply, created_at: new Date(now + 1).toISOString() },
    ]);
    if (insertError) throw insertError;
    await db.from('chat_sessies').update({ laatst_actief: new Date().toISOString() }).eq('id', sessionId);
  };

  if (!wantsStream) {
    const response = await ai.models.generateContent(params);
    const reply = response.text?.trim();
    if (!reply) throw new Error('Gemini gaf geen antwoord');
    await save(reply);
    return json({ reply });
  }

  // Streaming: tekst gaat stukje voor stukje naar de browser; het volledige antwoord wordt daarna opgeslagen.
  // Fouten vóór het eerste stukje worden een gewone JSON-fout (zie de catch in fetch()).
  const stream = await ai.models.generateContentStream(params);
  const iterator = stream[Symbol.asyncIterator]();
  const first = await iterator.next();
  const encoder = new TextEncoder();
  let full = '';
  let cancelled = false;

  const output = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        let result = first;
        while (!result.done && !cancelled) {
          const text = result.value.text;
          if (text) {
            full += text;
            controller.enqueue(encoder.encode(text));
          }
          result = await iterator.next();
        }
        const reply = full.trim();
        if (!reply) throw new Error('Gemini gaf geen antwoord');
        // Ook een afgebroken antwoord (stopknop) wordt bewaard, zodat de geschiedenis klopt met wat de bezoeker zag.
        await save(reply);
        if (!cancelled) controller.close();
      } catch (err) {
        console.error('chat-streamfout:', err instanceof Error ? err.message : 'onbekend');
        if (!cancelled) controller.error(err);
      }
    },
    cancel() {
      cancelled = true;
    },
  });

  return new Response(output, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export default {
  async fetch(request: Request) {
    try {
      if (request.method === 'GET') return await handleGet(request);
      if (request.method === 'POST') return await handlePost(request);
      return fail(405, 'method_not_allowed', 'Ongeldige aanvraag.', { Allow: 'GET, POST' });
    } catch (err) {
      // Alleen serverzijde loggen; naar de browser gaat een generieke melding.
      console.error('chat-fout:', err instanceof Error ? err.message : 'onbekend');
      return fail(500, 'server_error', 'Er ging iets mis aan onze kant. Probeer het later opnieuw.');
    }
  },
};
