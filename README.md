# Portfolio Josse van der Mast

Portfolio voor de HU-minor "Future-proof met AI!". Vite + React 19 + TypeScript + Tailwind 4, gedeployed via GitHub naar Vercel.

## Opzet

- **Frontend** (`src/`): losse pagina's met react-router, elk als eigen chunk (lazy loading). Data komt uit Supabase en wordt bij elk bezoek opgehaald, niet tijdens de build. Er staat geen story-inhoud in de code.
- **Chatbot**: een Vercel Function in `api/chat.ts` die Gemini aanroept (streamend, met terugval naar een gewone aanroep) en gesprekken opslaat in Supabase. De system prompt staat in `api/_lib/systemPrompt.ts`, de grenzen (berichtlengte, tokens, rate limit) in `api/_lib/config.ts`.
- **Gedeeld** (`shared/`): "over mij"-gegevens en de officiële leeruitkomsten (met minimumnorm), gebruikt door de frontend én de chatbot.
- Alle tabellen, wie erin schrijft en wie mag lezen: zie [`docs/database.md`](docs/database.md).

### Routes

| Route | Pagina |
|---|---|
| `/` | Homepage: hero met AI-vraagbalk, live cijfers en bewijs-constellatie; bento-overzicht |
| `/stories` | Alle stories (menulabel "Bewijs"); filters in de URL: `?q=`, `?sprint=`, `?type=US\|RS\|LS`, `?lu=1-5` |
| `/stories/:slug` | Eén story. **Deze URL nooit wijzigen**: links staan in ingeleverde opdrachten |
| `/leeruitkomsten`, `/leeruitkomsten/lu1` … `lu5` | Officiële LU-tekst, minimumnorm en gekoppelde stories |
| `/sprints` (`?sprint=N`) | Tijdlijn; standaard de huidige sprint (op datum, uit `src/data/sprints.ts`) |
| `/over-mij` | Persoonlijk verhaal en contact |
| `/onderzoek` | Onderzoek (tabel `projecten`, type `onderzoek`); "volgt binnenkort" zolang leeg |
| `/ai-oplossingen` | AI-oplossingen (tabel `projecten`, type `project`); `/projecten` stuurt hierheen door |
| overig | 404 |

`vercel.json` herschrijft alle routes naar `index.html`, behalve `/api/*` en bestanden met een extensie.

### Structuur van `src/`

```
src/
  pages/              één bestand per route (lazy geladen)
  components/
    ui/               designsysteem: Button, Chip, Card, SectionHeader, PageHeader, EmptyState, Skeleton, Reveal
    layout/           Header, MobileMenu, Footer, CommandPalette (Cmd/Ctrl+K), RouteEffects
    home/             Hero, AskBar, Constellation, HeroStats, Bento, WorkTeaser, ContactStrip
    projecten/        ProjectTypePage, ProjectCard, ComingSoon (onderzoek en AI-oplossingen)
    story/            StoryCard, StoryGrid, StoryMarkdown, Lightbox
    chat/             ChatWidget (launcher), ChatPanel, AssistantMessage, followUps
  lib/                datalaag (supabase, stories, projecten, chat), contexts, hooks, afgeleide cijfers
  data/               sprints.ts (semesterplanning), navigation.ts
  index.css           designtokens in Tailwind 4 @theme (kleuren, vaste kleur per LU, radius, schaduwen, type)
```

Sprintdata staat in `src/data/sprints.ts`; pas die aan als de semesterplanning wijzigt.

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

## Onderzoek en AI-oplossingen toevoegen

Supabase → Table Editor → tabel `projecten` → Insert row. Vul minimaal `titel` en `type` (`onderzoek` → `/onderzoek`, `project` → `/ai-oplossingen`) in; `beschrijving` mag markdown zijn. Zie [`docs/database.md`](docs/database.md). `link_url` en `link_label` geven een knop naar een externe link, `tools` is een lijst en een lage `volgorde` komt eerst. Zet `zichtbaar` uit om een rij te verbergen. Bij een onderzoek koppelt `story_slug` de Research Story (downloads en knop naar de story) en tonen `afbeelding_pad` + `afbeelding_alt` een visualisatie uit bucket `onderzoeken` onder de kaart. Ook dit is direct zichtbaar zonder deploy.

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
