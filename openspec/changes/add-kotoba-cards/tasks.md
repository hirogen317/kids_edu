## 1. Product Route And Mock Content

- [x] 1.1 Add a dedicated `ことばカード` route in `apps/web` without replacing the current landing page.
- [x] 1.2 Define the frontend mock deck and card data structures, including image, spoken vocabulary, displayed word, and optional phrase or prompt fields.
- [x] 1.3 Create sample decks and ordered cards that can drive a complete study session without database or AI services.

## 2. Study Session Experience

- [x] 2.1 Build the deck entry and session shell for starting a mock-data study session.
- [x] 2.2 Implement the card front and back views, including picture-first presentation and answer reveal in large hiragana.
- [x] 2.3 Implement audio replay behavior for each card using client-side audio assets or the approved fallback approach.
- [x] 2.4 Implement tap controls and keyboard shortcuts for replay, flip, next-card progression, and session completion.
- [x] 2.5 Add the end-of-deck completion state for a finished study session.

## 3. Validation And Product Readiness

- [x] 3.1 Verify the `ことばカード` route works when database and AI services are unconfigured.
- [x] 3.2 Validate that touch and keyboard interactions behave consistently across the study flow.
- [x] 3.3 Run the relevant workspace validation commands for the web app, including lint and typecheck.
