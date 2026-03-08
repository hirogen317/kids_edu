## Context

The current web app is a static landing page with no product route, no persisted learning content, and no existing learning-session state management. The first product feature needs to introduce a child-facing study loop without adding database or AI runtime requirements, while still leaving room for a later admin-managed content workflow.

The target user for the MVP is a parent and young child studying together. That makes the interaction model different from a keyboard-first drill app: touch interaction must be primary, and keyboard shortcuts must exist as helpers for a parent using a laptop.

## Goals / Non-Goals

**Goals:**
- Add an isolated `ことばカード` study surface to `apps/web` without replacing the current landing page.
- Deliver a frontend-only MVP that works with curated mock decks and cards.
- Define a stable card/deck content shape that can later be sourced from an admin interface.
- Support a simple, repeatable study loop: see picture, hear audio, flip card, see word and short phrase, move to next card.
- Keep the experience available when database and AI services are unconfigured.

**Non-Goals:**
- Building the admin UI, content publishing workflow, or authentication.
- Adding database persistence, user progress tracking, or analytics storage.
- Generating vocabulary or audio through AI services.
- Supporting free-form conversation or open-ended language generation in the MVP.

## Decisions

### 1. Add `ことばカード` as a dedicated product route

The MVP should live on its own route inside `apps/web` rather than replacing the existing home page. This keeps the current landing page intact, makes the first product loop easy to test in isolation, and avoids coupling marketing copy with product-state concerns.

Alternative considered:
- Replace the home page with the card experience. Rejected because it would mix product validation with marketing layout decisions and make iteration harder.

### 2. Use authored frontend mock data as the only content source for the MVP

Decks and cards should be defined as local mock data with an explicit shape that mirrors future managed content. Each deck should contain ordered cards and each card should contain the UI-facing fields needed for the session: image, spoken text, displayed word, optional short phrase, optional parent prompt, and audio metadata.

This keeps the app bootable without DB or AI dependencies while giving the team a concrete contract to carry into a later admin implementation.

Alternative considered:
- Add Prisma models and seed data now. Rejected because it would slow down the first product validation loop and violate the goal of keeping the MVP independent from database availability.

### 3. Make the interaction model tap-first with keyboard shortcuts

The primary interaction must be large on-screen targets and card tapping, because the end user is a preschool child. Keyboard shortcuts such as `Space` for audio replay and `Enter` for flip/advance should be supported as secondary controls for parents and desktop testing.

Alternative considered:
- Keyboard-only controls. Rejected because they do not match the expected child-facing device and would make the core interaction less accessible on tablets and phones.

### 4. Treat “word” and “conversation” as one card model with layered reveal

The back of a card should always show the core word in large hiragana, and may also show a short phrase or parent prompt. This avoids splitting the MVP into separate “単語 mode” and “会話 mode” products while still supporting language-building beyond pure recognition.

Alternative considered:
- Separate word cards and conversation cards. Rejected because it introduces parallel flows and content models before the first product loop has been validated.

### 5. Keep audio local to the client, with a path for graceful fallback

The card model should support pre-authored audio sources for natural Japanese playback, while keeping enough spoken text metadata to allow a client-side fallback if audio assets are temporarily unavailable during prototyping. This preserves product quality when assets exist and prevents the MVP from depending on backend text-to-speech.

Alternative considered:
- Backend or AI-generated speech. Rejected because it would add operational dependencies and complexity before the product interaction itself is validated.

## Risks / Trade-offs

- [Audio quality differs across browsers if fallback speech is used] -> Prefer curated audio assets for sample decks and treat synthesized speech as a temporary fallback only.
- [Supporting both touch and keyboard can create inconsistent state transitions] -> Model the session as a small explicit state machine with shared handlers for replay, flip, next, and completion.
- [Mock data can drift from the future admin model] -> Keep the mock schema minimal and content-oriented so the same fields can later be stored and edited through an admin UI.
- [A three-year-old learner may lose focus quickly] -> Keep decks short, reduce on-screen text on the front side, and make the core action loop understandable without reading.

## Migration Plan

This change is additive. The implementation can ship behind a new route with no data migration and no backend rollout steps. Rollback is straightforward: remove or hide the route and its associated frontend assets.

## Open Questions

- Which sample themes should ship first: food, animals, vehicles, daily actions, or another set?
- Should the short phrase be shown on every card back by default, or only when content exists?
- Do we want a completion screen with simple celebration copy in the MVP, or should the first version loop back to deck selection immediately?
