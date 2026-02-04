<!-- FILE: directives/01_DATABASE_MIGRATION.md -->
# 01_DATABASE_MIGRATION - SUPABASE PROTOCOL

**Status:** MANDATORY
**Owner:** Lead Architect
**Reference:** Content Creation Jack, Vibecode Animated Websites

## 1. SUPABASE VIA MCP (NO MANUAL SQL)
Wir nutzen Supabase als "Microsoft Excel on Steroids" für unser Backend[10]. Der Agent interagiert NICHT über das Web-Dashboard, sondern über das MCP.

1.  **Schema Definition:**
    *   Beschreibe dem Agenten die benötigten Daten (z.B. "User Table mit Email, Name, Subscription Status").
    *   **Befehl:** "Nutze das Supabase MCP, um diese Tabelle zu erstellen. Errate kein SQL, nutze die Tools."[11].

2.  **Migrations:**
    *   Änderungen am Schema müssen über den Agenten erfolgen, der die Migrationen via MCP ausführt.
    *   **Regel:** Keine manuellen Änderungen im Dashboard, um "Drift" zwischen Code und Datenbank zu vermeiden.

## 2. ROW LEVEL SECURITY (RLS)
Sicherheit ist nicht optional. Wir schützen Nutzerdaten strikt.

*   **Wann RLS nutzen?**
    *   IMMER, wenn User-spezifische Daten gespeichert werden (z.B. Profile, Dashboards, private Notizen)[12].
    *   **Befehl:** "Enable RLS for this table." Der Agent muss Policies erstellen, die sicherstellen, dass `auth.uid() = user_id` ist[12].
    *   **Ausnahme:** Öffentlich lesbare Daten (z.B. Blog-Posts) können `public read` Policies haben.

## 3. REAL-TIME CONNECTION
*   Jedes Frontend-Dashboard muss live mit Supabase synchronisiert sein.
*   Datenbank-Updates müssen sich instantan im UI widerspiegeln (Referenz: Revenue Dashboard Update)[13].
