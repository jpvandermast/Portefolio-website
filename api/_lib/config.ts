// Instelbare grenzen voor de chatbot.
export const MAX_MESSAGE_LENGTH = 500; // tekens per gebruikersbericht
export const MAX_OUTPUT_TOKENS = 1024; // maximaal aantal tokens in het antwoord (incl. eventuele "thinking")
export const MAX_HISTORY_MESSAGES = 10; // berichten uit de sessie die als geschiedenis meegaan
export const MAX_RETURNED_MESSAGES = 100; // berichten die GET /api/chat teruggeeft
export const RATE_LIMIT_MESSAGES = 20; // gebruikersberichten per ip_hash ...
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // ... per uur
export const CONTEXT_CACHE_MS = 5 * 60 * 1000; // portfolio-context 5 minuten in het geheugen
