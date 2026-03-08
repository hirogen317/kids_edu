## ADDED Requirements

### Requirement: Mock decks SHALL provide a complete study session
The system SHALL provide a `ことばカード` experience backed by curated frontend mock data, with at least one ordered deck of cards that can be completed without database or AI services.

#### Scenario: Study deck is available with no backend services
- **WHEN** a user opens the `ことばカード` experience in a local environment where database and AI services are unavailable
- **THEN** the system displays at least one sample deck sourced from frontend mock data
- **AND** the user can start a study session without any backend dependency

#### Scenario: Deck can be completed
- **WHEN** a user finishes the final card in a sample deck
- **THEN** the system indicates that the study session is complete

### Requirement: Card fronts SHALL be picture-first and support audio replay
The system SHALL present the front of each card as a picture-first view and SHALL allow the learner or parent to replay the card audio before the card is flipped.

#### Scenario: User sees picture before text
- **WHEN** a user opens a card that has not been flipped yet
- **THEN** the front of the card shows the card image as the primary content
- **AND** the front does not reveal the answer word as the primary learning cue

#### Scenario: User replays audio from the front
- **WHEN** a user activates the audio replay control on the front of the card
- **THEN** the system plays the spoken vocabulary for that card

### Requirement: Card backs SHALL reveal the vocabulary answer
The system SHALL reveal the answer side of the card after the learner or parent flips it, including the vocabulary word in large hiragana and any authored short phrase or prompt associated with that card.

#### Scenario: Flipping a card reveals the word
- **WHEN** a user flips a card
- **THEN** the system shows the vocabulary word for that card in a clearly readable hiragana presentation

#### Scenario: Card includes extended language content
- **WHEN** a flipped card has an authored short phrase or parent prompt
- **THEN** the system displays that additional language content on the answer side of the card

### Requirement: The study flow SHALL support touch and keyboard input
The system SHALL support both tap-first interaction and keyboard shortcuts so the experience works for child-facing touch devices and parent-guided desktop use.

#### Scenario: User controls the card with touch
- **WHEN** a user taps the visible card controls or card surface
- **THEN** the system performs the corresponding replay, flip, or next-card action

#### Scenario: User controls the card with keyboard shortcuts
- **WHEN** a user presses `Space` during a card session
- **THEN** the system replays the current card audio
- **AND WHEN** a user presses `Enter` during a card session
- **THEN** the system flips the current card or advances to the next step in the study loop

### Requirement: The MVP SHALL remain independent from admin workflows
The system SHALL use a consistent deck and card content structure in the frontend MVP so the same learning model can later be managed through an admin workflow without redefining the user-visible behavior.

#### Scenario: Mock card content follows the user-visible model
- **WHEN** a sample deck is defined for the MVP
- **THEN** each card includes the user-visible content needed for the study loop, including picture, spoken vocabulary, displayed word, and optional extended language content
