# Portfolio Josse van der Mast

Portfolio voor de HU-minor "Future-proof met AI!". Vite + React 19 + TypeScript + Tailwind 4, gedeployed via GitHub naar Vercel.

## Opzet

- **Frontend** (`src/`): one-page homepage met secties Over mij, Leeruitkomsten (LU1-LU5), Onderzoek, Projecten en Sprint-overzicht. `/stories/:slug` opent dezelfde pagina met het story-paneel open (deep links werken).
- **Data** komt uit Supabase en wordt bij elk bezoek opgehaald, niet tijdens de build. Er staat geen story-inhoud in de code.
- **Chatbot**: een Vercel Function in `api/chat.ts` die Gemini aanroept en gesprekken opslaat in Supabase. De system prompt staat in `api/_lib/systemPrompt.ts`, de grenzen (berichtlengte, tokens, rate limit) in `api/_lib/config.ts`.
- **Gedeeld** (`shared/`): "over mij"- en leeruitkomst-gegevens die zowel de frontend als de chatbot gebruiken.
- Alle tabellen, wie erin schrijft en wie mag lezen: zie [`docs/database.md`](docs/database.md).

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

## Nieuwe stories op de site zetten

Stories komen **niet** uit deze repo. De upload-pipeline zet ze in Supabase (tabellen `stories`, `story_files`, `story_leeruitkomsten` en de bucket `stories`). Zodra een story `zichtbaar = true` heeft, staat hij op de site, zonder code-aanpassing en zonder nieuwe deploy. De koppeling met leeruitkomsten (LU1-LU5) in `story_leeruitkomsten` bepaalt het bewijs per leeruitkomst.

## Projecten en onderzoeken toevoegen

Supabase → Table Editor → tabel `projecten` → Insert row. Vul minimaal `titel` en `type` (`project` of `onderzoek`) in. `link_url` en `link_label` geven een knop naar een externe link, `tools` is een lijst en een lage `volgorde` komt eerst. Zet `zichtbaar` uit om een rij te verbergen. Ook dit is direct zichtbaar zonder deploy.

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

Dit laadt `.env.local` in je shell en start `vercel dev`; open daarna de URL uit de terminal (standaard http://localhost:3000). Bij de eerste keer vraagt de Vercel CLI om in te loggen; de projectkoppeling staat al in `.vercel/`.

Controle voor een release:

```bash
npm run lint
npm run build
```
