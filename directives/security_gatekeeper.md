# SECURITY GATEKEEPER
**Status:** ACTIVE
**Trigger:** Before every `git push` or `deployment`.

## 1. THE "NO LEAKS" POLICY
* **API Keys:** NEVER put keys (sk-..., supabase_key) directly in the code or `mcp_config.json`.
* **Enforcement:** Use `os.environ.get("KEY_NAME")` or `process.env.KEY_NAME`.
* **Scan:** Before committing, perform a text search for "sk-", "key", "token", "password". If found -> HALT immediately.

## 2. INPUT SANITIZATION & SQL
* If we scrape data (Waterfall Method) or write to Supabase:
    * **No Raw SQL:** Use the Supabase SDK/MCP methods, never raw f-strings in SQL queries (SQL Injection risk).
    * **Filenames:** Sanitize scraped titles before saving as files to prevent path traversal.

## 3. DEPENDENCY CHECK
* Do not install random pip packages or npm libraries without verification.
* Only install standard, trusted libraries defined in `tech_stack.md`.
* **Audit:** Run `npm audit` or `pip check` before major deployments.
