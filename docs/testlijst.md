# Testlijst (zelf afvinken)

Doe elke test **twee keer**: lokaal (`npm run dev:api`) en op de Vercel preview-deploy van branch `feature/redesign`. Doe de tests ook op telefoonformaat (390 px breed; in Chrome: F12 → apparaatweergave).

## Pagina's en navigatie

| # | Test | Desktop lokaal | 390 px lokaal | Preview desktop | Preview 390 px |
|---|---|:-:|:-:|:-:|:-:|
| 1 | **Homepage**: hero met naam, vraagbalk, live cijfers (5 stories · 1 sprint · 0/5 LU's); op desktop de constellatie met stories als punten | ☐ | ☐ | ☐ | ☐ |
| 2 | **Constellatie**: hover/Tab op een punt toont de titel, Enter/klik opent de story | ☐ | – | ☐ | – |
| 3 | **Bento**: LU-voortgang, huidige sprint (automatisch op datum), 3 nieuwste stories, over-mij en chat-teaser | ☐ | ☐ | ☐ | ☐ |
| 4 | **Menu**: actieve pagina gemarkeerd; mobiel opent een fullscreen menu, Esc sluit het | ☐ | ☐ | ☐ | ☐ |
| 5 | **Zoeken**: Ctrl/Cmd+K (of zoekknop) opent de palette; "factuur" vindt de story; Enter opent hem; Esc sluit | ☐ | ☐ | ☐ | ☐ |
| 6 | **/stories**: filters sprint/type/LU en zoeken komen in de URL (bijv. `/stories?type=RS`); terugknop werkt; "Filters wissen" | ☐ | ☐ | ☐ | ☐ |
| 7 | **Lege staat per filter**: `/stories?lu=3` toont "Geen stories met deze filters" | ☐ | ☐ | ☐ | ☐ |
| 8 | **Deep link**: open `/stories/s1-rs-impact-ai-webontwikkelaar` direct en ververs (geen 404) | ☐ | ☐ | ☐ | ☐ |
| 9 | **Storypagina**: breadcrumb, chips (klikbaar), vier koppen in vaste volgorde, leesvoortgangsbalk, vorige/volgende | ☐ | ☐ | ☐ | ☐ |
| 10 | **Onbekende slug** `/stories/bestaat-niet` toont "Story niet gevonden" | ☐ | ☐ | ☐ | ☐ |
| 11 | **PDF**: bijlage bij de Research Story over AI-impact downloadt met een nette bestandsnaam | ☐ | ☐ | ☐ | ☐ |
| 12 | **Lightbox**: klik een afbeelding; pijltjes bladeren; Esc sluit alleen de lightbox; focus terug op de afbeelding | ☐ | ☐ | ☐ | ☐ |
| 13 | **/leeruitkomsten**: officiële teksten, aantal stories naast "min. N× voldoende"; `/leeruitkomsten/lu3` toont een compacte lege staat | ☐ | ☐ | ☐ | ☐ |
| 14 | **/sprints**: huidige sprint geselecteerd en "Nu bezig"; `/sprints?sprint=1` toont de 5 stories; Show & Grow-datum zichtbaar | ☐ | ☐ | ☐ | ☐ |
| 15 | **/over-mij** en **/projecten** (lege staat zolang de tabel leeg is; Projecten staat dan niet in het menu) | ☐ | ☐ | ☐ | ☐ |
| 16 | **404**: `/bestaat-niet` toont de 404-pagina met zoekknop | ☐ | ☐ | ☐ | ☐ |
| 17 | Geen horizontale scroll; ook op 768 en 1024 px niets dat overlapt | – | ☐ | – | ☐ |

## Chat

| # | Test | Desktop lokaal | 390 px lokaal | Preview desktop | Preview 390 px |
|---|---|:-:|:-:|:-:|:-:|
| 18 | **Hero-vraagbalk**: Enter opent de chat en verstuurt de vraag; het antwoord verschijnt woord voor woord | ☐ | ☐ | ☐ | ☐ |
| 19 | **Welkomststaat**: begroeting en 4 suggestiekaarten; klik op een kaart verstuurt de vraag | ☐ | ☐ | ☐ | ☐ |
| 20 | **Story-kaartjes** onder een antwoord openen de story (mobiel sluit de chat daarbij) | ☐ | ☐ | ☐ | ☐ |
| 21 | **Vervolgvragen** onder het laatste antwoord; **kopiëren** werkt | ☐ | ☐ | ☐ | ☐ |
| 22 | **Stopknop** tijdens het antwoord; het deel tot dan blijft staan | ☐ | ☐ | ☐ | ☐ |
| 23 | **Invoer**: Enter verstuurt, Shift+Enter geeft een nieuwe regel; teller verschijnt vanaf 400 tekens, max 500 | ☐ | ☐ | ☐ | ☐ |
| 24 | **Bewaard**: ververs de pagina, open de chat: vraag én antwoord staan er nog | ☐ | ☐ | ☐ | ☐ |
| 25 | **Nieuw gesprek** start leeg; het oude gesprek blijft in Supabase staan | ☐ | ☐ | ☐ | ☐ |
| 26 | **Vergroten** (alleen desktop) en weer verkleinen | ☐ | – | ☐ | – |
| 27 | **Esc** sluit alleen de chat; focus gaat terug naar de knop "Vraag mijn AI"; Tab blijft binnen de chat zolang hij open is | ☐ | ☐ | ☐ | ☐ |
| 28 | **Vraag de AI over deze story** (storypagina) vult de vraag in zonder te versturen | ☐ | ☐ | ☐ | ☐ |
| 29 | **Rate limit**: na 20 vragen per uur een duidelijke melding (alleen testen als je wilt) | ☐ | – | ☐ | – |

## Toegankelijkheid en beweging

- ☐ Eerste Tab toont "Naar de inhoud"; alle knoppen en links hebben een zichtbare focusring.
- ☐ Bij paginawissel gaat de focus naar de paginatitel en staat de pagina bovenaan.
- ☐ Met "Beweging verminderen" aan (macOS: Toegankelijkheid → Weergave) staan mesh, spotlight, constellatie en count-up stil.

Extra op de preview-deploy:

- ☐ Chat werkt (dus `SUPABASE_SECRET_KEY`, `GEMINI_API_KEY`, `GEMINI_MODEL` en `CHAT_IP_SALT` staan ook voor het **Preview**-doel in Vercel).
- ☐ Directe links naar `/leeruitkomsten/lu2`, `/sprints?sprint=1` en een story geven geen 404 (SPA-rewrite).
