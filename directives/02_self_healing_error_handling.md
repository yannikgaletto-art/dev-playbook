s/02_ERROR_HANDLING.md -->
# 02_ERROR_HANDLING - SELF-ANNEALING PROTOCOL

**Status:** MANDATORY
**Owner:** Nick Saraev (DO Framework)
**Reference:** Nick - Agentic Workflow

## 1. THE SELF-ANNEALING LOOP (SELBSTHEILUNG)
Wenn ein Execution-Skript oder ein Agenten-Task fehlschlägt, darf der Prozess NICHT einfach abbrechen. Wir nutzen Fehler als Datenpunkte zur Härtung des Systems[14].

**Der 4-Schritte-Zyklus:**
1.  **Error Encounter:** Der Agent bemerkt einen Fehler (z.B. API Timeout, Syntax Error)[15].
2.  **Diagnose:** Der Agent analysiert den Fehler im Terminal/Output. Er liest die Fehlermeldung präzise.
3.  **Fix (Attempt):** Der Agent schreibt das Skript um oder passt den API-Call an[15].
4.  **UPDATE (CRITICAL):** Wenn der Fix funktioniert, **MUSS** der Agent die `directives/` Datei oder das Skript permanent aktualisieren ("Update the directive to handle similar errors in the future")[16].
    *   *Ziel:* Das System wird mit jedem Fehler robuster (wie gehärteter Stahl)[17].

## 2. LOOP BREAKER (CIRCUIT BREAKER)
Vermeide, dass der Agent in einer Endlosschleife denselben Fehler wiederholt ("Insanity Loop").

*   **Regel:** Wenn der Agent 3x denselben Fehler hintereinander produziert:
    1.  **STOPP:** Pausiere die Execution.
    2.  **Reflect:** Der Agent muss einen Schritt zurücktreten und den Ansatz fundamental ändern (z.B. andere Library nutzen, User um Hilfe bitten).
    3.  **Prompt:** "Du wiederholst dich. Stoppe. Analysiere die Root Cause. Schlage eine alternative Route vor."[18].

## 3. LOGGING & OBSERVABILITY
*   Bei Cloud-Workflows (Modal/Background Tasks) ist Logging Pflicht.
*   Der Agent sieht Fehler nicht direkt im Terminal.
*   **Anweisung:** "Füge Logging hinzu, das mir bei jedem Run eine Statusmeldung (Success/Fail) in den Slack-Channel/Log
