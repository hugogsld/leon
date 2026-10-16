import Anthropic from "@anthropic-ai/sdk";
import { gemini } from "./_gemini.js";
// Met au propre la réponse dictée par l'élève, sans rien ajouter ni corriger.
export const config = { maxDuration: 20 };

const RULES = `Tu mets au propre la réponse qu'un élève a dictée à voix haute, pour l'écrire sur sa copie.
- Si le texte est un brouillon de réflexion sans conclusion claire, rédige la réponse finale à partir de SON raisonnement (ses résultats, ses étapes), sans rien ajouter qu'il n'a pas dit.
- Le texte peut contenir tout un raisonnement : extrais seulement la réponse finale qu'il veut écrire (la dernière version qu'il retient, après ses corrections), en une phrase de réponse.
- La dictée peut mal transcrire les fractions (« 3 / 53 / 5 » = il a dit « 3 sur 5 », répété) : écris la fraction qu'il a voulu dire.
- Garde exactement son idée et ses résultats, même s'ils te semblent faux. N'ajoute rien, ne corrige rien, ne complète rien.
- Retire les hésitations, répétitions, « euh », « non pardon » (garde la version qu'il a retenue).
- Écris les maths proprement en LaTeX entre $…$ (« trois sur cinq » → $\\frac{3}{5}$, « x au carré » → $x^2$).
- UNE seule ligne de conclusion, courte et nette (ex. « La probabilité de tirer une boule rouge est $\\frac{3}{5}$. »). Réponds uniquement par le texte.`;

export async function POST(request) {
  const { dictee = "", question = "", brouillon = [] } = await request.json().catch(() => ({}));
  const said = String(dictee).slice(0, 2000).trim();
  if (!said) return Response.json({ error: "vide" }, { status: 400 });
  const msg = `Question : ${String(question).slice(0, 800)}\nBrouillon récent : ${brouillon.slice(-6).join(" ").slice(0, 1500)}\nRéponse dictée à mettre au propre : ${said}`;
  const g = await gemini({ system: RULES, contents: [{ role: "user", parts: [{ text: msg }] }], maxTokens: 300, temperature: 0.1, timeoutMs: 2500, fast: true });
  if (g) return Response.json({ text: g, origin: "gemini" });
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const client = new Anthropic({ timeout: 8000, maxRetries: 0 });
      const r = await client.messages.create({ model: "claude-haiku-5-5", max_tokens: 300, thinking: { type: "disabled" }, output_config: { effort: "low" }, system: RULES, messages: [{ role: "user", content: msg }] });
      const t = r.content.find((b) => b.type === "text")?.text?.trim();
      if (t) return Response.json({ text: t, origin: "claude" });
    } catch { /* on garde la dictée */ }
  }
  return Response.json({ text: said, origin: "brut" });
}
