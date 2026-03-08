## Why

The product now has one vocabulary interaction in `ことばカード`, but it does not yet offer a simple recognition game where a child sorts or identifies things by category or attribute. A one-question classification game is a strong next frontend feature because it is easy for young children to understand, delivers instant feedback, and can be validated quickly with mock data.

## What Changes

- Add a new frontend-only `なかまわけゲーム` learning flow with one question per screen and three large answer choices.
- Define a mock-data question model that supports both category-based prompts and attribute-based prompts such as color, size, and shape.
- Support immediate tap feedback with positive reinforcement for correct answers and gentle retry guidance for incorrect answers.
- Add lightweight feedback audio and animation patterns that feel encouraging without overwhelming the child.
- Keep the MVP independent from database, admin, or AI dependencies so the frontend interaction can be validated quickly.

## Capabilities

### New Capabilities
- `nakamawake-game`: A mock-data classification game where a child answers one prompt at a time by selecting from three large visual choices and receives immediate feedback.

### Modified Capabilities

## Impact

- Affected code will be concentrated in `apps/web`, including a new product route, frontend question data, game state management, and child-friendly feedback UI.
- Shared content definitions may be added if useful, but the MVP does not require backend storage, admin tooling, or AI services.
- This change establishes the frontend product contract for future managed content without making the game depend on backend services.
