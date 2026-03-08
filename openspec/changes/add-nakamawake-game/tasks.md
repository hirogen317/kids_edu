## 1. Route And Mock Question Setup

- [x] 1.1 Add a dedicated `なかまわけゲーム` route in `apps/web` without replacing the existing home page or `ことばカード`.
- [x] 1.2 Define the frontend mock question and choice data structures needed for one-question classification gameplay.
- [x] 1.3 Create a small authored question set covering category prompts and attribute prompts such as color, size, and shape.

## 2. Core Game Experience

- [x] 2.1 Build the one-question-per-screen layout with the prompt at the top and three large visual answer choices below.
- [x] 2.2 Implement tap-based answer selection with immediate feedback on the active question.
- [x] 2.3 Add positive feedback behavior for correct answers, including lightweight animation and short audio or voice support.
- [x] 2.4 Add gentle retry behavior for incorrect answers so the child can try the same question again without harsh failure states.
- [x] 2.5 Add session progression behavior across the authored question set.

## 3. Validation And Readiness

- [x] 3.1 Verify the game works entirely from mock data without database or AI services.
- [x] 3.2 Validate the touch-first answer flow and feedback behavior on both correct and incorrect selections.
- [x] 3.3 Run the relevant workspace validation commands for the web app, including lint and typecheck.
