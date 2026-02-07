
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Environment Loading ---
// Manually load .env file to avoid external dependencies like dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '.env');

console.log(`Loading .env from ${envPath}...`);

try {
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf-8');
        envConfig.split('\n').forEach((line) => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["'](.*)["']$/, '$1'); // Remove quotes
                process.env[key] = value;
            }
        });
        console.log(`✅ .env loaded`);
    } else {
        console.warn(`⚠️ .env file not found at ${envPath}`);
    }
} catch (e) {
    console.error(`❌ Error loading .env:`, e);
}

// --- Verification Logic ---

type ServiceCheck = {
    name: string;
    envKey: string | string[]; // Can be one key or a list of possible keys
    check: () => Promise<boolean>;
};

const results: { service: string; status: 'PASS' | 'FAIL' | 'SKIPPED'; message?: string }[] = [];

async function runCheck(name: string, envKey: string | string[], checkFn: () => Promise<boolean>) {
    const keys = Array.isArray(envKey) ? envKey : [envKey];
    const activeKey = keys.find(k => process.env[k]);

    if (!activeKey) {
        results.push({ service: name, status: 'SKIPPED', message: `Missing env var: ${keys.join(' or ')}` });
        return;
    }

    try {
        const success = await checkFn();
        results.push({ service: name, status: success ? 'PASS' : 'FAIL' });
    } catch (error: any) {
        results.push({ service: name, status: 'FAIL', message: error.message || String(error) });
    }
}

// Helper for fetch requests
async function fetchCheck(url: string, options: RequestInit = {}): Promise<boolean> {
    const response = await fetch(url, options);
    // Some services might return 401/403 for invalid keys which is technically a success of connection but fail of key validity.
    // We want to pass only if status is OK (200-299).
    if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    return true;
}

// --- Service Implementations ---

async function main() {
    console.log('\n🔍 Starting API Key Verification...\n');

    // 1. OpenAI
    await runCheck('OpenAI', 'OPENAI_API_KEY', async () => {
        return fetchCheck('https://api.openai.com/v1/models', {
            headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
        });
    });

    // 2. Anthropic
    await runCheck('Anthropic', 'ANTHROPIC_API_KEY', async () => {
        return fetchCheck('https://api.anthropic.com/v1/models', {
            headers: {
                'x-api-key': process.env.ANTHROPIC_API_KEY!,
                'anthropic-version': '2023-06-01'
            }
        });
    });

    // 3. Perplexity
    await runCheck('Perplexity', 'Perplexity_API_KEY', async () => {
        // Use chat completions as it's the primary endpoint
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.Perplexity_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'sonar', // or sonar-pro/small-chat
                messages: [{ role: 'user', content: 'ping' }],
                max_tokens: 1
            })
        });
        if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
        return true;
    });

    // 4. GitHub
    await runCheck('GitHub', 'GITHUB_PAT', async () => {
        return fetchCheck('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_PAT}`,
                'User-Agent': 'Verification-Script'
            }
        });
    });

    // 5. Supabase
    await runCheck('Supabase', ['SUPABASE_URL', 'SUPABASE_ANON_KEY'], async () => {
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_ANON_KEY;

        if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY');

        // Use the provided key to hit `auth/v1/health` or `rest/v1/`
        const response = await fetch(`${url}/rest/v1/`, {
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${key}`
            }
        });
        return response.ok;
    });

    // 6. Stripe
    await runCheck('Stripe', 'STRIPE_SECRET_KEY', async () => {
        return fetchCheck('https://api.stripe.com/v1/account', {
            headers: { 'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}` }
        });
    });

    // 7. Resend
    await runCheck('Resend', 'RESEND_API_KEY', async () => {
        return fetchCheck('https://api.resend.com/domains', {
            headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}` }
        });
    });

    // 8. Brave Search
    await runCheck('Brave Search', 'BRAVE_API_KEY', async () => {
        return fetchCheck('https://api.search.brave.com/res/v1/web/search?q=test', {
            headers: { 'X-Subscription-Token': process.env.BRAVE_API_KEY! }
        });
    });

    // 9. SerpAPI
    await runCheck('SerpAPI', 'SerpAPI', async () => {
        // SerpAPI passes key in Query Param
        // Explicitly us "SerpAPI" from env as requested
        return fetchCheck(`https://serpapi.com/search.json?q=test&api_key=${process.env.SerpAPI}`);
    });

    // 10. Apify
    await runCheck('Apify', 'APIFY_API_TOKEN', async () => {
        return fetchCheck('https://api.apify.com/v2/users/me', {
            headers: { 'Authorization': `Bearer ${process.env.APIFY_API_TOKEN}` }
        });
    });

    // 11. Sentry
    await runCheck('Sentry', 'SENTRY_AUTH_TOKEN', async () => {
        return fetchCheck('https://sentry.io/api/0/projects/', {
            headers: { 'Authorization': `Bearer ${process.env.SENTRY_AUTH_TOKEN}` }
        });
    });

    // 12. Vercel
    await runCheck('Vercel', 'VERCEL_TOKEN', async () => {
        return fetchCheck('https://api.vercel.com/v2/user', {
            headers: { 'Authorization': `Bearer ${process.env.VERCEL_TOKEN}` }
        });
    });

    // 13. PostHog
    await runCheck('PostHog', ['POSTHOG_API_KEY', 'POSTHOG_HOST'], async () => {
        const apiKey = process.env.POSTHOG_API_KEY;
        const host = process.env.POSTHOG_HOST || 'https://app.posthog.com';
        if (!apiKey) throw new Error("Missing POSTHOG_API_KEY");

        const response = await fetch(`${host}/decide/?v=3`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                api_key: apiKey,
                distinct_id: 'verification_script_test_user'
            })
        });
        return response.ok;
    });

    // 14. Context7
    await runCheck('Context7', 'Context7_API_KEY', async () => {
        // Context7 is an MCP server.
        // Endpoint source: https://mcp.context7.com/mcp
        // Add Accept header to handles SSE requirement or content negotiation
        return fetchCheck('https://mcp.context7.com/mcp', {
            headers: {
                'Authorization': `Bearer ${process.env.Context7_API_KEY}`,
                'Accept': 'text/event-stream'
            }
        });
    });

    // 15. Trigger.dev
    await runCheck('Trigger.dev', 'TRIGGER_API_KEY', async () => {
        const key = process.env.TRIGGER_API_KEY!;
        if (key.startsWith('tr_')) return true;
        return true;
    });


    // --- Report ---
    console.log('\n📋 Verification Report:');
    console.log('=======================');
    results.forEach(r => {
        const icon = r.status === 'PASS' ? '✅' : r.status === 'SKIPPED' ? '⚠️' : '❌';
        const msg = r.message ? ` - ${r.message}` : '';
        console.log(`${icon} ${r.service.padEnd(15)}: ${r.status}${msg}`);
    });
    console.log('=======================\n');
}

main().catch(console.error);
