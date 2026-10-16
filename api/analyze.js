import Anthropic from "@anthropic-ai/sdk";

export const config = { maxDuration: 60 };

const BLOB_HOST = /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\//;

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["titre", "matiere", "niveau"],
  properties: {
    titre: { type: "string", description: "Titre court de l'exercice, 2 à 5 mots, ex. « Équation du second degré »" },
    matiere: { type: "string", enum: ["maths", "francais", "histoire", "autre"], description: "maths (aussi physique-chimie), francais (aussi philo), histoire (histoire-géo, EMC), sinon autre" },
    niveau: { type: "string", description: "Classe si visible, ex. TERMINALE, 1RE, 3E, CM2 ; sinon chaîne vide" },
  },
};

const PROMPT = "Voici la photo (ou le PDF) d'un énoncé d'exercice scolaire. Donne seulement son titre court, sa matière et son niveau. Ne recopie pas le contenu.";

export async function POST(request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "no_key" }, { status: 503 });
  }
  const { url, pdf } = await request.json().catch(() => ({}));
  if (typeof url !== "string" || !BLOB_HOST.test(url)) {
    return Response.json({ error: "url" }, { status: 400 });
  }

  const client = new Anthropic();
  const source = pdf
    ? { type: "document", source: { type: "url", url } }
    : { type: "image", source: { type: "url", url } };

  try {
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 2000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA } },
      messages: [{ role: "user", content: [source, { type: "text", text: PROMPT }] }],
    });
    if (response.stop_reason === "refusal") {
      return Response.json({ error: "refus" }, { status: 422 });
    }
    const text = response.content.find((b) => b.type === "text")?.text || "{}";
    return Response.json(JSON.parse(text));
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return Response.json({ error: "occupe" }, { status: 429 });
    }
    if (err instanceof Anthropic.APIError) {
      return Response.json({ error: "api", detail: err.message }, { status: 502 });
    }
    return Response.json({ error: "lecture" }, { status: 500 });
  }
}
