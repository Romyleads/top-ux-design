// Self-hosted Supabase Edge Function (Deno). Answers "what can you do / how much"
// using the public catalog summary sent by the site. Works with any
// OpenAI-compatible chat endpoint configured through environment variables:
//   AI_API_URL   e.g. https://api.openai.com/v1/chat/completions
//   AI_API_KEY   secret key (never exposed to the browser)
//   AI_MODEL     model id
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM = `You are the sales assistant of PromoVisions, a German productized
marketing studio (Kleinunternehmer, no VAT shown). Answer briefly in the user's
language. Only quote prices that appear in the catalog below; for anything else
say it is priced on request. Never promise results. If the user needs a human,
suggest the "Hand over to support" button.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const url = Deno.env.get("AI_API_URL");
  const key = Deno.env.get("AI_API_KEY");
  const model = Deno.env.get("AI_MODEL");
  if (!url || !key || !model) {
    return Response.json({ error: "AI chat is not configured on the server." }, { status: 503, headers: cors });
  }
  try {
    const { messages, catalog } = await req.json();
    if (!Array.isArray(messages) || messages.length > 40) {
      return Response.json({ error: "Invalid request." }, { status: 400, headers: cors });
    }
    const clean = messages
      .filter((m: { role: string; content: unknown }) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m: { role: string; content: string }) => ({ role: m.role, content: m.content.slice(0, 4000) }));
    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: `${SYSTEM}\n\nCATALOG:\n${String(catalog ?? "").slice(0, 20000)}` }, ...clean],
      }),
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return Response.json({ error: data?.error?.message ?? "AI service error." }, { status: upstream.status, headers: cors });
    }
    return Response.json({ reply: data?.choices?.[0]?.message?.content ?? "" }, { headers: cors });
  } catch (_e) {
    return Response.json({ error: "Unexpected server error." }, { status: 500, headers: cors });
  }
});
