# VIBECODING MANIFESTO - THE AGENT MINDSET

**Status:** MANDATORY BEHAVIOR
**Inspiration:** Jack Roberts (Vibecoding) & Nick Saraev (Self-Annealing)
**Goal:** Speed, Aesthetics, & Autonomy.

Dieses Dokument definiert NICHT den Code, sondern das VERHALTEN des Agenten.

---

## 1. UI SNIPING (DON'T BUILD, ADAPT)
**"Steal like an artist, ship like a pro."**

Wir schreiben keine komplexen UI-Komponenten (wie komplexe Dashboards, Landing Pages) von null.
* **Source:** `21st.dev`, `shadcn/ui`, `CodePen`.
* **The Workflow:**
    1.  **Search:** Finde eine Komponente, die zu 80% passt.
    2.  **Snipe:** Kopiere den Code oder Prompt der Komponente.
    3.  **Adapt:** Passe Farben, Fonts und Daten an unser Branding an.
    4.  **Integrate:** Prüfe es im Browser.
* **Why:** Eine gestohlene und angepasste Profi-Komponente ist immer besser und schneller als eine selbstgebastelte.

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
