# Portfolio Josse van der Mast

Portfolio voor de HU-minor "Future-proof met AI!". Vite + React 19 + TypeScript + Tailwind 4, gedeployed via GitHub naar Vercel.

Stories komen uit Supabase; de chatbot draait als Vercel Function in `/api`. Zie `docs/database.md` voor de tabellen.

## Lokaal draaien

Alleen de website (zonder chatbot):

```bash
npm install
npm run dev
```

Website **met** de chatbot (`/api` werkt alleen via Vercel Functions):

```bash
npm run dev:api
```

Dit laadt `.env.local` in je shell en start `vercel dev` (open daarna de URL die in de terminal staat, standaard http://localhost:3000). Bij de eerste keer vraagt de Vercel CLI om in te loggen en het project te koppelen; de koppeling staat al in `.vercel/`.

## Environment variables

Zie `.env.example`. Zet ze in `.env.local` (staat in `.gitignore`) en in Vercel.

| Variabele | Waar | Publiek? |
|---|---|---|
| `VITE_SUPABASE_URL` | frontend + server | ja |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | frontend | ja (alleen leesrechten via RLS) |
| `SUPABASE_SECRET_KEY` | alleen server | **nee** |
| `GEMINI_API_KEY` | alleen server | **nee** |
| `GEMINI_MODEL` | alleen server | nee |
| `CHAT_IP_SALT` | alleen server | **nee** |

Geheimen krijgen nooit een `VITE_`-prefix, want dan komen ze in de browserbundel terecht.
