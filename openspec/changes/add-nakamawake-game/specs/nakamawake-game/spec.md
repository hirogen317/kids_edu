## ADDED Requirements

### Requirement: The system SHALL provide a complete mock-data classification session
The system SHALL provide a frontend-only `なかまわけゲーム` session backed by curated mock questions that can be played without database or AI services.

#### Scenario: Game session starts from mock data
- **WHEN** a user opens the `なかまわけゲーム` experience in a local environment without backend services
- **THEN** the system displays a playable set of mock questions
- **AND** the user can begin the game without any database or AI dependency

### Requirement: The system SHALL present one question with three large choices
The system SHALL present one question per screen with the prompt shown above three large visual answer choices.

#### Scenario: User sees a single prompt and three answers
- **WHEN** a question is active
- **THEN** the system shows exactly one prompt for that question
- **AND** the system shows three large answer choices below the prompt

#### Scenario: Answer choices are image-first
- **WHEN** a question is displayed
- **THEN** the answer choices prioritize large visual recognition cues
- **AND** the child is not required to read long text to participate

### Requirement: The system SHALL support category and attribute questions
The system SHALL support mock questions that ask the child to identify a correct item by category or by visible attribute.

#### Scenario: Category question is supported
- **WHEN** a mock question asks for a group such as `どうぶつ`, `たべもの`, or `のりもの`
- **THEN** the system presents answer choices where one choice matches the requested category

#### Scenario: Attribute question is supported
- **WHEN** a mock question asks for an attribute such as `あかい`, `あおい`, `おおきい`, `ちいさい`, `まるい`, or `しかくい`
- **THEN** the system presents answer choices where one choice matches the requested attribute

### Requirement: The system SHALL provide immediate positive feedback for correct answers
The system SHALL respond immediately when the child taps the correct choice, including lightweight celebratory feedback with sound, animation, and encouraging voice or copy.

#### Scenario: Child taps the correct answer
- **WHEN** the child selects the correct answer choice
- **THEN** the system immediately shows a positive feedback state
- **AND** the feedback includes celebratory audio or voice support
- **AND** the feedback includes light animation or motion

### Requirement: The system SHALL provide gentle retry feedback for incorrect answers
The system SHALL respond immediately when the child taps an incorrect choice, but it SHALL avoid harsh failure messaging and SHALL allow the child to try again.

#### Scenario: Child taps an incorrect answer
- **WHEN** the child selects an incorrect answer choice
- **THEN** the system shows gentle retry feedback such as `こっちだよ`
- **AND** the system does not end the session or lock the question in a failure state
- **AND** the child can attempt the same question again
