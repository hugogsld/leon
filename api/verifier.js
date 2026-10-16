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
  // Gemini et Claude en parallèle : le premier verdict valable gagne
  const viaGemini = async () => {
    const g = await gemini({ system: RULES, json: SCHEMA, contents: [{ role: "user", parts: [{ text: msg }] }], maxTokens: 300, temperature: 0, timeoutMs: 6000 });
    const o = JSON.parse(g || "");
    if (typeof o.correct !== "boolean") throw 0;
    return { ...o, origin: "gemini" };
  };
  const viaClaude = async () => {
    if (!process.env.ANTHROPIC_API_KEY) throw 0;
    const client = new Anthropic({ timeout: 7000, maxRetries: 0 });
    const r = await client.messages.create({
      model: "claude-haiku-5-5", max_tokens: 300, thinking: { type: "disabled" },
      output_config: { effort: "low", format: { type: "json_schema", schema: { type: "object", additionalProperties: false, required: ["correct", "indice"], properties: { correct: { type: "boolean" }, indice: { type: "string" } } } } },
      system: RULES, messages: [{ role: "user", content: msg }],
    });
    const o = JSON.parse(r.content.find((x) => x.type === "text")?.text || "{}");
    if (typeof o.correct !== "boolean") throw 0;
    return { ...o, origin: "claude" };
  };
  try { return Response.json(await Promise.any([viaGemini(), viaClaude()])); } catch { /* indisponible */ }
  return Response.json({ error: "indisponible" }, { status: 503 });
}
