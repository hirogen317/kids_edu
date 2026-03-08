## Context

The app now has a first vocabulary surface in `ことばカード`, but it does not yet have a simple recognition game centered on selecting the correct item from a small set. `なかまわけゲーム` is a strong next frontend-only feature because it matches preschool interaction patterns: one prompt, a few large choices, immediate response, and repetition through mock data.

The current repo shape favors frontend-only iteration in `apps/web`. There is no need to introduce database, admin, or AI dependencies for this planning change. The main challenge is product clarity: the first version must stay extremely understandable for a three-year-old child while still supporting multiple question styles such as category, color, size, and shape.

## Goals / Non-Goals

**Goals:**
- Add a dedicated frontend `なかまわけゲーム` route separate from the existing home page and `ことばカード`.
- Define a mock-data question model that supports category-based and attribute-based recognition prompts.
- Present one question at a time with three large visual choices and immediate feedback.
- Use encouraging feedback for both correct and incorrect taps, including lightweight sound and animation.
- Keep the interaction touch-first and cognitively simple for early learners.

**Non-Goals:**
- Building an admin UI or backend content system.
- Introducing open-ended scoring, timers, streak systems, or other gamification loops that increase complexity.
- Supporting free-form language generation or AI-driven difficulty adjustment.
- Solving every possible classification type in the MVP; the initial content should stay curated and small.

## Decisions

### 1. Use a dedicated question route with one prompt per screen

The game should be presented as a dedicated route with a single question visible at a time. Each screen should show the prompt at the top and three large answer options below it.

This keeps the interaction readable for young children and avoids extra interface noise such as multi-question lists or side panels.

Alternative considered:
- Multi-question worksheet layout. Rejected because it increases cognitive load and weakens immediate feedback.

### 2. Define a small mock question model that separates prompt type from choices

Each question should include:
- the prompt text
- a question type or grouping theme
- three visual choices
- the correct choice identifier
- correct feedback copy
- gentle retry copy for incorrect attempts

This allows the MVP to support examples like:
- `どうぶつはどれ？`
- `あかいものはどれ？`
- `おおきいものはどれ？`
- `まるいものはどれ？`

Alternative considered:
- Hardcode questions directly into JSX. Rejected because it would make the game harder to expand and test.

### 3. Make answer feedback immediate and emotionally gentle

Correct taps should trigger immediate positive feedback with light animation, a short encouraging sound or voice, and clear visual confirmation. Incorrect taps should avoid harsh failure states; instead the UI should guide the child toward retry with copy such as `こっちだよ`.

This keeps the game emotionally safe for early learners and supports repetition rather than penalizing mistakes.

Alternative considered:
- Strong failure sounds or red error-heavy states. Rejected because they can make the experience discouraging for the target age.

### 4. Keep visuals large, tappable, and image-first

The answer area should use three large, clearly separated visual cards or buttons. The child should be able to succeed by image recognition first, with text acting as supporting context rather than the primary interaction requirement.

Alternative considered:
- Smaller grid layouts or text-first buttons. Rejected because they reduce clarity on touch devices and for pre-readers.

### 5. Keep motion and audio lightweight, with accessibility safeguards

Feedback motion should be celebratory but brief, and the design should respect reduced-motion preferences. Audio should be short and additive, not required for understanding the result. If audio is unavailable, the visual feedback must still communicate the outcome.

Alternative considered:
- Heavy particle or prolonged character animations. Rejected because they may distract from the next question and complicate the implementation without improving the core loop.

## Risks / Trade-offs

- [Too many question types could make the first version feel inconsistent] -> Start with a small, authored set spanning only a few clear category and attribute patterns.
- [Incorrect feedback may still feel discouraging if phrased badly] -> Use retry-focused language and avoid failure-heavy styling or sounds.
- [Visual answer choices may become cluttered on small screens] -> Constrain the layout to one question and three large tappable options with strong spacing.
- [Audio and animation could overshadow the learning prompt] -> Keep feedback short, consistent, and optional from a comprehension standpoint.

## Migration Plan

This change is additive and frontend-only. It can ship as a new route with mock data and no migration steps. Rollback is straightforward: remove or hide the route and its related frontend assets.

## Open Questions

- Should a correct answer automatically advance after feedback, or should the child tap to continue?
- Should the first content set mix category and attribute questions in one session, or group them by deck/theme?
- Should voice feedback be a fixed phrase like `すごい` for every correct answer, or vary between a few short options?
