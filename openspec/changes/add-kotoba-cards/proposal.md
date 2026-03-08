## Why

The product currently has only a marketing-style landing page and no real learning loop for children to use. We need a first product surface that is simple enough to validate quickly with mock data, while matching the needs of a parent-guided Japanese vocabulary activity for a three-year-old child.

## What Changes

- Add the first interactive learning flow: `ことばカード`, a picture-first vocabulary card experience for short parent-child study sessions.
- Define a mock-data MVP with a small number of sample decks and cards so the feature can be built and tested entirely on the frontend.
- Support a simple study loop where the child sees a picture, replays spoken audio, flips the card, and sees the word plus a short phrase or prompt.
- Support both tap-first interaction and keyboard shortcuts so the experience works for children and parents during shared study.
- Shape the card and deck content model so a later admin experience can manage the same content without redefining the product contract.
- Keep the initial release independent from database and AI availability.

## Capabilities

### New Capabilities
- `kotoba-cards`: A mock-data vocabulary card experience with picture-first presentation, audio playback, flip interaction, and curated Japanese word content for early learners.

### Modified Capabilities

## Impact

- Affected code will be concentrated in `apps/web`, including the first product route, UI components, and mock content definitions.
- Shared product copy or lightweight mock content may be added in workspace packages if needed, but no database, admin UI, or AI provider integration is required for the MVP.
- The change establishes the product contract for a later admin-managed content workflow without making the current app depend on DB or AI services.
