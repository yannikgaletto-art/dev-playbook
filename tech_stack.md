# TECH STACK PROTOCOLS - CTO DIRECTIVES

**Status:** MANDATORY
**Version:** 2.0 (Hybrid Intelligence Model)
**Maintainer:** Lead Architect

Dieses Dokument definiert den technischen Standard. Der Agent ist verpflichtet, die hier definierten Werkzeuge und Modelle für ihre spezifischen Zwecke zu nutzen.

---

## 1. INTELLIGENCE LAYER: THE HYBRID MODEL
**"Smart Head, Fast Hands"**

Wir nutzen nicht ein Modell für alles. Wir nutzen Spezialisten.

### 🧠 Phase A: Architecture & Planning (Claude 4.5)
* **Rolle:** Der Architekt / CTO.
* **Wann nutzen:** Ausschließlich in der **Directive-Phase** (DO-Framework).
* **Aufgabe:** Erstellen von `mission.md`, komplexen Strategien und der initialen Architektur-Planung.
* **Warum:** Claude 4.5 hat das höchste "Reasoning". Es macht keine logischen Fehler bei der Planung.

### ⚡ Phase B: Execution & Refactoring (Claude 3.5 Sonnet)
* **Rolle:** Der Senior Developer.
* **Wann nutzen:** In der **Execution-Phase** (Schreiben von Code in `/executions/`).
* **Aufgabe:** Schreiben von Python/TypeScript Skripten, Bug-Fixing und "Vibecoding".
* **Warum:** Sonnet ist schneller, günstiger und halluziniert weniger beim Coden als 4.5. Es ist das präziseste Coding-Modell.

### 🤖 Phase C: Grunt Work (Open Code / Llama 3 / Haiku)
* **Rolle:** Der Junior Dev.
* **Wann nutzen:** Für Unit-Tests, Kommentare schreiben, Daten formatieren.
* **Regel:** "Verschwende keine $20-Token für Aufgaben, die ein 5-Cent-Modell lösen kann."

---

## 2. BACKEND & DATA: SUPABASE INTEGRATION
**"Microsoft Excel on Steroids"**

### 🛑 Die Eiserne Regel
> **"Nutze Supabase für alle Backend-Daten. Keine lokalen JSON-Dateien für User-Daten."**

### 🛠️ Implementierung via MCP
1.  **Schema Generation:** Nutze das Supabase MCP, um Tabellen basierend auf der `mission.md` zu erstellen.
2.  **Security First (RLS):** KEINE Tabelle wird ohne **Row Level Security (RLS)** erstellt.
3.  **Real-Time Sync:** Jedes Dashboard muss via Supabase Realtime-Subscription live sein. Keine Refresh-Buttons!

---

## 3. FRONTEND & VIBECODING
**"Beautiful, Animated, Responsive"**

### ✨ UI Standard (Tailwind + Framer)
* **Styling:** Nutze ausschließlich **Tailwind CSS**. Kein Vanilla CSS.
* **Motion:** Nutze **Framer Motion** für *jedes* interaktive Element (Hover, Click, Page Transition). Das UI muss sich "flüssig" anfühlen.
* **Visual Validation:** Nutze den integrierten Browser, um Design-Fehler zu erkennen. Verlasse dich nicht auf den Code, sondern auf das visuelle Ergebnis.

### 🎥 Remotion (Video)
* Wenn Video-Content generiert werden soll, nutze die **Remotion** Library.
* Behandle Video-Erstellung wie Software-Entwicklung (Code-basierte Videos).

---

## 4. MCP MASTER CONFIGURATION
**"The Universal Connector"**

Damit der Agent Zugriff auf das System hat, muss diese Konfiguration in `mcp_config.json` übernommen werden.

**Anweisung:** Füge dies in deine Settings ein. Achte darauf, dass der `filesystem` Pfad dynamisch oder korrekt auf das Projekt-Root gesetzt ist.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "." 
      ]
    },
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-supabase"
      ],
      "env": {
        "SUPABASE_URL": "[https://DEIN-PROJEKT.supabase.co](https://DEIN-PROJEKT.supabase.co)",
        "SUPABASE_KEY": "PLACEHOLDER_NUTZE_ENV_FILE"
      }
    },
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "PLACEHOLDER_NUTZE_ENV_FILE"
      }
    }
  }
}

Warnung: Credentials gehören in die .env Datei, niemals in dieses JSON.
