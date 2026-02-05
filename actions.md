
# TACTICAL BACKLOG

## PRIORITY 1: SYSTEM CONNECTION
- [ ] **MCP Verification:** Sicherstellen, dass Supabase, GitHub und Filesystem MCPs korrekt verbunden sind und Schreibrechte haben.
- [ ] **Environment Check:** Validieren, dass alle API-Keys (Apify, OpenAI, Anthropic, Supabase) in der `.env` gesetzt und aktiv sind.

## PRIORITY 2: FIRST EXPERIMENT (GMAPS)
- [ ] **Script Generation:** Den Agenten anweisen, basierend auf `directives/gmaps_lead_generation.md` das Python-Skript `execution/gmaps_pipeline.py` zu erstellen.
- [ ] **Dry Run:** Ausführen des Skripts für eine kleine Test-Region (z.B. "Web Design Agenturen in München", Limit: 10).
- [ ] **Data Audit:** Überprüfen, ob die Daten sauber in der Supabase-Tabelle `leads` gelandet sind.

## PRIORITY 3: SKILL EXPANSION
- [ ] **Next Directive:** Vorbereitung des `scrape_leads.md` (Apify) Workflows für breitere Suchen.
