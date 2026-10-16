import Anthropic from "@anthropic-ai/sdk";
import { gemini } from "./_gemini.js";

// Vérifie la réponse de l'élève : juste (vert) ou pas encore (rouge), sans donner la correction.
export const config = { maxDuration: 20 };

const RULES = `Tu es un correcteur de mathématiques de Terminale. On te donne l'énoncé, la question et la réponse écrite par l'élève.
Dis si sa réponse est mathématiquement juste (résultat correct, une écriture équivalente compte comme juste : 3/5 = 0,6 = 60 %).
Si elle est fausse ou incomplète, écris un indice très court (8 mots maximum) sans jamais donner la bonne réponse ni le calcul.
Réponds en JSON : { "correct": true|false, "indice": "…" }.`;

const SCHEMA = { type: "OBJECT", properties: { correct: { type: "BOOLEAN" }, indice: { type: "STRING" } }, required: ["correct", "indice"] };

export async function POST(request) {
  const { enonce = "", question = "", reponse = "" } = await request.json().catch(() => ({}));
  if (!String(reponse).trim()) return Response.json({ error: "vide" }, { status: 400 });
  const msg = `Énoncé : ${String(enonce).slice(0, 3000)}\nQuestion : ${String(question).slice(0, 800)}\nRéponse de l'élève : ${String(reponse).slice(0, 800)}`;
  const g = await gemini({ system: RULES, json: SCHEMA, contents: [{ role: "user", parts: [{ text: msg }] }], maxTokens: 300, temperature: 0, timeoutMs: 9000 });
  try { const o = JSON.parse(g || ""); if (typeof o.correct === "boolean") return Response.json({ ...o, origin: "gemini" }); } catch { /* secours */ }
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const client = new Anthropic({ timeout: 9000, maxRetries: 0 });
      const r = await client.messages.create({
        model: "claude-sonnet-5-5", max_tokens: 300, thinking: { type: "between_tools" },
        output_config: { effort: "low", format: { type: "json_schema", schema: { type: "object", additionalProperties: false, required: ["correct", "indice"], properties: { correct: { type: "boolean" }, indice: { type: "string" } } } } },
        system: RULES, messages: [{ role: "user", content: msg }],
      });
      const o = JSON.parse(r.content.find((b) => b.type === "text")?.text || "{}");
      if (typeof o.correct === "boolean") return Response.json({ ...o, origin: "claude" });
    } catch { /* indisponible */ }
  }
  return Response.json({ error: "indisponible" }, { status: 503 });
}
