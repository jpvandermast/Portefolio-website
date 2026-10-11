# Database (Supabase)

Project-URL: `https://tzqeokyogankvajfehul.supabase.co`. Kolomnamen zijn bewust Nederlands.

| Tabel / object | Wat het is | Wie schrijft | Wie leest |
|---|---|---|---|
| `stories` | Eén rij per story (type US/RS/LS, sprint, korte versie, vier markdown-onderdelen, `zichtbaar`). | Upload-pipeline (skill `stories-supabase-upload`) | Website (anon), alleen `zichtbaar = true` |
| `story_files` | Bestanden per story: rol `klein` (kaartplaatje), `afbeelding`, `document` (pdf); pad in de bucket. | Upload-pipeline | Website (anon), alleen bij zichtbare stories |
| `story_leeruitkomsten` | Koppeling story ↔ leeruitkomst (`lu` 1-5). Bepaalt het bewijs per LU op de site. | Upload-pipeline | Website (anon), alleen bij zichtbare stories |
| `story_overzicht` (view) | Overzicht voor de kaarten: `stories` + kleine afbeelding (`klein_pad`, `klein_alt`). `security_invoker`, dus RLS blijft gelden. | Niemand (afgeleid) | Website (anon) |
| Storage-bucket `stories` | Afbeeldingen en pdf's, pad `<slug>/<bestandsnaam>`. Publiek leesbaar. | Upload-pipeline | Iedereen (publieke URL) |
| `projecten` | Projecten en onderzoeken op de site (`type` = `project` of `onderzoek`, link, tools, sprint, volgorde, `zichtbaar`). | Josse zelf, via de Table Editor | Website (anon), alleen `zichtbaar = true` |
| `chat_sessies` | Eén rij per chatgesprek; `ip_hash` = SHA-256(ip + `CHAT_IP_SALT`), nooit een plat IP-adres. | Chat-server (`SUPABASE_SECRET_KEY`) | Alleen de chat-server |
| `chat_berichten` | Vragen (`gebruiker`) en antwoorden (`assistent`) per sessie; verwijderd mee met de sessie (cascade). | Chat-server | Alleen de chat-server |

## Toegang

- **anon / publishable key** (frontend): alleen `SELECT` op de story-tabellen, de view en `projecten`, en alleen op zichtbare rijen (RLS). Geen schrijfrechten.
- **Chat-tabellen**: RLS staat aan zonder policies en de rechten van `anon` en `authenticated` zijn ingetrokken. Alleen de server met de secret key (bypasst RLS) kan lezen en schrijven.
- **Secret key** staat alleen in de serverfunctie (`/api`), nooit in de frontend.

## Migraties

Nieuwe tabellen staan in `supabase/migrations/`. De story-tabellen komen uit de upload-pipeline en worden niet vanuit deze repo gewijzigd.

- `20260930120000_projecten_en_chat.sql`: `projecten`, `chat_sessies`, `chat_berichten`.

## Onderzoek en AI-oplossingen toevoegen

De tabel `projecten` vult twee vaste pagina's:

| `type` | Verschijnt op | Weergave |
|---|---|---|
| `onderzoek` | `/onderzoek` en het blok "Wat ik onderzoek en bouw" op de homepage | Grote kaart met titel links en de beschrijving rechts |
| `project` | `/ai-oplossingen` en hetzelfde homepage-blok | Kaart in een grid |

Zolang er geen rij van een type is, toont de pagina een rustige "Volgt binnenkort"-kaart. De pagina's staan altijd in het menu.

Supabase → Table Editor → `projecten` → Insert row:

- `titel` (verplicht) en `type` (`onderzoek` of `project`).
- `beschrijving`: mag **markdown** zijn (alinea's met een lege regel ertussen, `- ` voor lijstjes, `**vet**`, `[tekst](https://...)` voor links). Geen HTML.
- `link_url` + `link_label`: de knop, bijv. naar het volledige onderzoeksverslag (pdf op OneDrive of een andere publieke link) of naar de werkende oplossing. Zonder `link_label` staat er "Bekijk het onderzoek" of "Bekijken".
- `tools`: lijst, bijv. `{Claude,Perplexity,Gemini}`.
- `sprint`: optioneel sprintnummer.
- `volgorde`: lager = eerder. `zichtbaar` uit = verborgen.

Wijzigingen zijn direct zichtbaar, zonder deploy. De chatbot kent de rijen ook (na maximaal 5 minuten).
