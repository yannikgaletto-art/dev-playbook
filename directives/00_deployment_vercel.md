<!-- FILE: directives/00_DEPLOYMENT_SOP.md -->
# 00_DEPLOYMENT_SOP - VERCEL PROTOCOL

**Status:** MANDATORY
**Owner:** Senior Ops Engineer
**Reference:** Vibecode Animated Websites, Jack Roberts

## 1. PRE-DEPLOYMENT CHECK (GIT & BUILD)
Bevor ein Deployment angestoßen wird, muss der Code sicher im Repository liegen.

1.  **Commit & Push:**
    *   Stelle sicher, dass alle Änderungen im lokalen `git worktree` committet sind.
    *   Push den Branch zu GitHub: `git push origin <branch_name>`.
    *   **Regel:** Deploye niemals lokalen Code direkt. Vercel ist ein Spiegel von GitHub[1], [2].

2.  **Build Check:**
    *   Führe lokal `npm run build` (oder den entsprechenden Befehl) aus, um sicherzustellen, dass keine Kompilierungsfehler vorliegen.

## 2. VERCEL PROJECT SETUP
Nutze das Vercel Dashboard oder das Vercel MCP für die Initialisierung.

1.  **Import:**
    *   Importiere das GitHub Repository in Vercel[3].
    *   Lasse die Framework-Presets (Next.js, Vite, etc.) auf Default, sofern keine spezifische Custom-Config nötig ist[4].

2.  **ENVIRONMENT VARIABLES (CRITICAL)**
    *   **Warnung:** Der häufigste Fehler (404/500 Errors nach Deploy) sind fehlende Env-Vars[5].
    *   **Aktion:** Übertrage alle Secrets aus der lokalen `.env` Datei in die Vercel Project Settings unter "Environment Variables".
    *   **MCP Shortcut:** Nutze das Vercel MCP, um Variablen sicher zu übertragen:
        `"Hey Agent, nutze das Vercel MCP, um die Env-Vars für Supabase in das Projekt zu injizieren."`[6].
    *   **Referenz:** Credentials gehören NIEMALS in den Code, sondern immer in die Env-Vars[7].

## 3. GO-LIVE & VERIFICATION
1.  **Deploy:** Klicke "Deploy" oder pushe den Main-Branch.
2.  **Visual Check:** Öffne die Production-URL. Prüfe sofort:
    *   Laden dynamische Daten aus Supabase? (Wenn nein: RLS oder Env-Vars prüfen)[8].
    *   Funktionieren Auth-Flows?
3.  **Domain:** Falls gefordert, verbinde eine Custom Domain via Vercel Settings -> Domains[9].
