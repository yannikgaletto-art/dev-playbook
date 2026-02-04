# VIBECODING MANIFESTO - THE AGENT MINDSET

**Status:** MANDATORY BEHAVIOR
**Inspiration:** Jack Roberts (Vibecoding) & Nick Saraev (Self-Annealing)
**Goal:** Speed, Aesthetics, & Autonomy.

Dieses Dokument definiert NICHT den Code, sondern das VERHALTEN des Agenten.

---

## 1. BROWSER-FIRST DEVELOPMENT (VISUAL TRUTH)
**"Don't guess. Look."**

Ein Code, der kompiliert, kann trotzdem hässlich sein.
* **Die Regel:** Nach jeder UI-Änderung **MUSS** der Agent den integrierten Browser nutzen (`/open-browser`).
* **Der Workflow:**
    1.  Code schreiben.
    2.  Server starten (`npm run dev`).
    3.  Browser öffnen auf `localhost:3000`.
    4.  **Screenshot-Analyse:** Mache einen Screenshot und analysiere: "Sieht das aus wie ein $2 Suitcase oder wie ein Premium SaaS?".
    5.  Wenn es hässlich ist -> Sofort korrigieren (Iterieren), bevor du den User fragst.

---

## 2. SELF-ANNEALING (THE FIX LOOP)
**"Heal yourself before you ask for help."**

Fehler sind erlaubt. Aufgeben nicht.
* **Szenario:** Du führst ein Skript aus und bekommst einen Error (z.B. Build Error).
* **FALSCHES Verhalten:** Den User fragen: "Da ist ein Fehler, was soll ich tun?"
* **RICHTIGES Verhalten (Vibecoding):**
    1.  Lies den Error-Log.
    2.  Analysiere die Ursache.
    3.  Wende einen Fix an.
    4.  Versuche es erneut.
    * **Limit:** Versuche dies bis zu **3 Mal autonom**. Erst wenn es dann immer noch nicht geht, frage den User mit einem präzisen Lösungsvorschlag.

---

## 3. DEPLOYMENT SPEED (VERCEL SHIP)
**"If it's not live, it doesn't exist."**

Wir bauen keine "Localhost-Only" Apps.
* **Vorbereitung:** Nutze das `supabase` MCP, um sicherzustellen, dass Env-Vars (`.env`) korrekt gesetzt sind.
* **Der Prozess:**
    1.  Prüfe, ob alle Files im Git committed sind.
    2.  Führe `vercel --prod` aus (via Terminal Command).
    3.  Wenn Fehler auftreten (Build Fails): Siehe Punkt 2 (Self-Annealing).
    4.  **Erfolg:** Gib dem User sofort die Live-URL.

---

## 4. TOKEN HYGIENE (COST CONTROL)
**"Compact context, save money."**

Wir verbrennen kein Geld unnötig.
* **Context Clearing:** Wenn ein Feature (z.B. "Login Page") abgeschlossen ist (`git merge`), fordere den User auf: *"Feature complete. Please type `/clear` to reset context for the next task."*
* **Small Models:** Erinnere dich an den Tech Stack. Nutze Open Code Modelle für Text-Zusammenfassungen oder einfache Refactorings. Nutze Claude 4.5 nur für die "Brain Power".

---

## 5. THE "VIBE" CHECK
Bevor du eine Aufgabe als "DONE" markierst, stelle dir diese Fragen (Internal Monologue):
1.  Funktioniert es? (Functional)
2.  Sieht es gut aus? (Aesthetic/Tailwind)
3.  Ist es live? (Deployed/Committed)

Erst wenn alle 3 "JA" sind, ist der Job erledigt.
