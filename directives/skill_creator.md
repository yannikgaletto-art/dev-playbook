# SKILL CREATOR PROTOCOL
**Trigger:** User says "Save this as a skill" or "Learn this".
**Target Folder:** `/skills/`

## 1. ANALYSIS
When a script in `execution/` works perfectly, we must immortalize it.
* **Input:** The working script (e.g., `execution/temp_scraper.py`).
* **Goal:** Create a generalized, reusable module.

## 2. REFACTORING RULES (The Generalization)
1.  **Remove Hardcoding:** Replace specific URLs or IDs with arguments/variables.
2.  **Add Documentation:** The file MUST have a Docstring at the top explaining:
    * What it does.
    * Required Inputs (Arguments).
    * Output Format.
3.  **Error Handling:** Ensure the skill doesn't crash silently (Try/Except blocks).

## 3. NAMING CONVENTION
* Format: `[verb]_[object].py` (e.g., `scrape_linkedin.py`, `deploy_modal.py`).
* Language: Python (default) or TypeScript.

## 4. STORAGE
1.  Save the clean file to `/skills/`.
2.  **Register:** Append a one-line description of the new skill to `CLAUDE.md` (under Layer 4: Skills) so you know it exists.

## 5. FINAL CONFIRMATION
Output: "Skill [Name] saved. I can now execute this task instantly in the future."
