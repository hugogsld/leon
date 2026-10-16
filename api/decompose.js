import Anthropic from "@anthropic-ai/sdk";
import { getDevoir, saveDevoir, validId } from "./_drive.js";

export const config = { maxDuration: 300 };

const SUBJECTS = ["maths", "francais", "histoire", "autre"];

const QUESTION = {
  type: "object",
  additionalProperties: false,
  required: ["label", "enonce", "papier", "choix"],
  properties: {
    label: { type: "string", description: "Numéro tel qu'écrit : « 1 », « 2.a », « b »…" },
    enonce: { type: "string", description: "La question recopiée mot pour mot, renvois compris (« d'après la question 1 »)" },
    choix: { type: "array", items: { type: "string" }, description: "Pour un QCM ou un vrai/faux : les propositions recopiées dans l'ordre (sans indiquer la bonne). Sinon tableau vide." },
    papier: { type: "boolean", description: "true si la question se fait sur la feuille : tracer une figure ou un graphique, compléter un tableau, colorier, construire, annoter un document" },
  },
};

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["titre", "matiere", "exercices"],
  properties: {
    titre: { type: "string", description: "Titre court du devoir, sans tiret (ex. « DM 3 Suites numériques »)" },
    matiere: { type: "string", enum: SUBJECTS },
    exercices: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["titre", "contexte", "parties"],
        properties: {
          titre: { type: "string", description: "Ex. « Exercice 1 », sans tiret" },
          contexte: { type: "string", description: "Texte commun à tout l'exercice, recopié fidèlement (ex. « On considère la suite (u_n) définie par… »). Vide s'il n'y en a pas." },
          parties: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["titre", "contexte", "questions"],
              properties: {
                titre: { type: "string", description: "Ex. « Partie A ». Chaîne vide si l'exercice n'a pas de parties." },
                contexte: { type: "string", description: "Texte commun à la partie, recopié fidèlement. Vide s'il n'y en a pas." },
                questions: { type: "array", items: QUESTION },
              },
            },
          },
        },
      },
    },
  },
};

const PROMPT = `Voici un devoir scolaire (scan ou photos des pages, dans l'ordre).
Range-le en exercices, puis en parties, puis en questions, dans l'ordre exact de la feuille.
- Recopie les énoncés mot pour mot. Ne résous rien, n'ajoute aucune aide, aucune indication, aucun commentaire.
- Conserve la mise en forme : un saut de ligne (\n) entre les paragraphes, et une ligne par puce commençant par « • ».
- Garde le texte commun (« On considère la suite… ») dans le contexte de l'exercice ou de la partie, pas dans les questions.
- Garde les renvois tels quels (« d'après la question 1 », « en utilisant la partie A »).
- Pour un QCM ou un vrai/faux, mets les propositions dans choix (« Vrai », « Faux »…), sans jamais indiquer la bonne réponse.
- Marque papier: true pour les questions qui se font sur la feuille (figure, graphique, tableau à compléter, construction).
- Si un exercice n'a pas de parties, mets une seule partie avec un titre vide.
- Écris toutes les expressions mathématiques en LaTeX entre $...$ (ex. $u_{n+1} = 2u_n + 1$, $\\mathbb{R}$).
- N'utilise jamais de tiret long dans les titres.`;

const undash = (t) => String(t || "").replace(/\s+[—–-]\s+/g, " ").replace(/[—–]/g, " ").trim();

// Format interne de l'application : questions à plat, avec leur partie
function toDevoir(base, data) {
  return {
    ...base,
    subject: base.subject || data.matiere,
    title: base.title || undash(data.titre),
    exercices: data.exercices.map((ex, i) => {
      const questions = [];
      ex.parties.forEach((p) => p.questions.forEach((q) => questions.push({
        id: `e${i + 1}q${questions.length + 1}`,
        label: q.label,
        enonce: q.enonce,
        papier: !!q.papier,
        choix: Array.isArray(q.choix) ? q.choix.filter(Boolean).slice(0, 6) : [],
        partie: undash(p.titre),
        partieCtx: p.contexte || "",
      })));
      return { id: `e${i + 1}`, titre: undash(ex.titre), enonce: ex.contexte || "", questions };
    }).filter((e) => e.questions.length),
  };
}

// Lit le devoir en direct : le texte de Claude est renvoyé au fil de l'eau, puis le devoir est rangé dans le Drive.
export async function POST(request) {
  const { id } = await request.json().catch(() => ({}));
  if (!validId(id)) return Response.json({ error: "id" }, { status: 400 });
  const devoir = await getDevoir(id);
  if (!devoir) return Response.json({ error: "introuvable" }, { status: 404 });
  if (devoir.status === "ready") return Response.json({ error: "deja" }, { status: 409 });
  if (!process.env.ANTHROPIC_API_KEY) return Response.json({ error: "no_key" }, { status: 503 });

  const enc = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      let full = "";
      try {
        const client = new Anthropic();
        const content = devoir.files.map((f) =>
          f.pdf ? { type: "document", source: { type: "url", url: f.url } } : { type: "image", source: { type: "url", url: f.url } },
        );
        content.push({ type: "text", text: PROMPT });
        const stream = client.beta.messages.stream({
          model: "claude-opus-5-5",
          max_tokens: 32000,
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA } },
          messages: [{ role: "user", content }],
        });
        stream.on("text", (delta) => {
          full += delta;
          controller.enqueue(enc.encode(delta));
        });
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") throw new Error("refus");
        const data = JSON.parse(full);
        const ready = toDevoir(devoir, data);
        if (!ready.exercices.length) throw new Error("aucun exercice");
        await saveDevoir(ready, "ready");
        controller.enqueue(enc.encode(`\n\u0000${JSON.stringify({ ok: true, devoir: { ...ready, status: "ready" } })}`));
      } catch (err) {
        await saveDevoir({ ...devoir, title: devoir.title || "Devoir", error: String(err?.message || err) }, "error").catch(() => {});
        controller.enqueue(enc.encode(`\n\u0000${JSON.stringify({ ok: false })}`));
      }
      controller.close();
    },
  });
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", "x-accel-buffering": "no" } });
}
