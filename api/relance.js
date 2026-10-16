import Anthropic from "@anthropic-ai/sdk";

export const config = { maxDuration: 60 };

const SYSTEM = `Tu accompagnes un élève qui réfléchit à voix haute sur un devoir. Il a un handicap moteur : il pense, l'outil écrit.
Ton seul rôle : le relancer avec UNE question courte (15 mots maximum, en français, tutoiement) qui l'aide à avancer par lui-même.
Règles absolues :
- Ne donne jamais la réponse, un résultat, une formule à appliquer, ni la prochaine étape de calcul.
- Ne dis jamais si ce qu'il a écrit est juste ou faux.
- Appuie-toi sur ce qu'il a déjà dit : fais-le expliciter, vérifier, ou se demander ce qu'il sait déjà.
Réponds uniquement par la question.`;

const FALLBACK = [
  "Qu'est-ce que tu sais déjà ?",
  "Que cherches-tu exactement dans cette question ?",
  "Quelles informations de l'énoncé n'as-tu pas encore utilisées ?",
  "Peux-tu redire ton dernier raisonnement avec tes mots ?",
];

export async function POST(request) {
  const { exercice = "", question = "", brouillon = [] } = await request.json().catch(() => ({}));
  const pick = FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
  if (!process.env.ANTHROPIC_API_KEY) return Response.json({ question: pick });

  const notes = brouillon.slice(-12).map((n) => `- ${String(n).slice(0, 300)}`).join("\n") || "(rien encore)";
  try {
    const client = new Anthropic();
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 2000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" },
      system: SYSTEM,
      messages: [{
        role: "user",
        content: `Exercice : ${String(exercice).slice(0, 2000)}\nQuestion travaillée : ${String(question).slice(0, 800)}\nCe que l'élève a déjà dit :\n${notes}`,
      }],
    });
    const text = response.stop_reason === "refusal" ? "" : response.content.find((b) => b.type === "text")?.text?.trim();
    return Response.json({ question: text || pick });
  } catch {
    return Response.json({ question: pick });
  }
}
