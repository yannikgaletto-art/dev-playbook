# OUTREACH & LEAD MAGNET DIRECTIVE
**Status:** ACTIVE
**Method:** Waterfall Enrichment & Casualization

## 1. THE WATERFALL (Validation)
Never send to raw data.
1.  **Scrape:** Get raw list (LinkedIn/Maps).
2.  **Validate:** Check Email Deliverability (Bounce Check).
3.  **Enrich:** If Email is missing, try Waterfall (Clay -> Apollo -> Google).

## 2. CASUALIZATION (Critical)
Clean data to look "human typed".
* `"MR. JOHN DOE "` -> `"John"`
* `"Jane Smith, PhD"` -> `"Jane"`
* `"APPLE INC."` -> `"Apple"`

## 3. COLD OUTREACH LOOP
* **Trigger:** When user says "Start Campaign".
* **First Line:** Personalize based on recent news via Perplexity/Search.
* **Deploy:** Use Gmail MCP or Smartlead Webhook. Max 50 emails/day/inbox.
