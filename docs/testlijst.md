# Testlijst (zelf afvinken)

Doe elke test **twee keer**: lokaal (`npm run dev:api`) en op de Vercel preview-deploy van branch `feature/database-chatbot`. Doe de chat- en paneltests ook op telefoonformaat (375 px breed; in Chrome: F12 → apparaatweergave).

| # | Test | Desktop lokaal | 375 px lokaal | Preview desktop | Preview 375 px |
|---|---|:-:|:-:|:-:|:-:|
| 1 | **Homepage** laadt, geen foutmeldingen, sprint 1 toont 5 story-kaarten met plaatje | ☐ | ☐ | ☐ | ☐ |
| 2 | **Story openen**: klik een kaart, paneel toont de vier koppen (opdracht, gedaan, resultaat, geleerd) | ☐ | ☐ | ☐ | ☐ |
| 3 | **Deep link**: open `/stories/s1-rs-impact-ai-webontwikkelaar` direct en ververs | ☐ | ☐ | ☐ | ☐ |
| 4 | **Sluiten** (kruisje, Esc, klik buiten) brengt je terug naar `/#sprints` | ☐ | ☐ | ☐ | ☐ |
| 5 | **Onbekende slug** `/stories/bestaat-niet` toont "Story niet gevonden" | ☐ | ☐ | ☐ | ☐ |
| 6 | **PDF**: klik een bijlage bij de Research Story over AI-impact, de pdf downloadt of opent | ☐ | ☐ | ☐ | ☐ |
| 7 | **Lightbox**: klik een afbeelding, sluit met Esc en met klik buiten (Esc sluit alleen de lightbox) | ☐ | ☐ | ☐ | ☐ |
| 8 | **Chat**: knop rechtsonder, voorbeeldvraag geeft antwoord met story-link | ☐ | ☐ | ☐ | ☐ |
| 9 | **Chat bewaard**: ververs de pagina, open de chat, vraag én antwoord staan er nog | ☐ | ☐ | ☐ | ☐ |
| 10 | **Chat boven paneel**: open een story en daarna de chat, klik een story-link in een antwoord | ☐ | ☐ | ☐ | ☐ |
| 11 | **Nieuw gesprek** start leeg; het oude gesprek blijft in Supabase staan | ☐ | ☐ | ☐ | ☐ |
| 12 | **Projecten/Onderzoek** tonen de "binnenkort"-staat (of je eigen rij uit `projecten`) | ☐ | ☐ | ☐ | ☐ |
| 13 | **Leeruitkomsten** tonen "Nog geen bewijs gekoppeld" (of bewijs, zodra `story_leeruitkomsten` gevuld is) | ☐ | ☐ | ☐ | ☐ |
| 14 | Geen horizontale scroll op 375 px | – | ☐ | – | ☐ |

Extra op de preview-deploy:

- ☐ Chat werkt (dus `SUPABASE_SECRET_KEY`, `GEMINI_API_KEY`, `GEMINI_MODEL` en `CHAT_IP_SALT` staan ook voor het **Preview**-doel in Vercel).
- ☐ Directe link naar een story geeft geen 404 (SPA-rewrite).
