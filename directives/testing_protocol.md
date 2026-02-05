# TESTING PROTOCOL (The Sentinel)
**Status:** MANDATORY for all `execution/` scripts.
**Tools:** `pytest` (Python), `npm test` (Unit), `npx playwright` (UI/E2E).

## 1. THE RULE OF "ZERO TRUST"
Code that is written by AI is "Guilty until proven Innocent".
* You must NEVER assume code works just because it looks correct.
* **Reviewer Sub-Agent:** For critical code reviews, spawn a fresh Sub-Agent with NO prior context to review the code objectively (prevents hallucination bias).

## 2. THE TDD LOOP (Test Driven Development)
Before marking a task as DONE:
1.  **Write the Test:** Create `tests/test_[script_name].py`.
2.  **Run the Test:** Execute `pytest tests/`.
3.  **Visual Check (UI):** If building a web interface (Vibecoding), use Playwright to verify the page loads and no console errors exist.
4.  **Fix:** If it fails, fix the code (Self-Annealing Loop).
5.  **Pass:** Only when ALL tests pass, you may commit.

## 3. REMOTION TESTING
For Video Engine Tasks:
* Render a 1-second preview/still frame to check for React crashes.
* Command: `npx remotion render AppleIntro --frames=0-1`
