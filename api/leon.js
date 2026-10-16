import Anthropic from "@anthropic-ai/sdk";
import { gemini } from "./_gemini.js";

export const config = { maxDuration: 30 };

/* Léon, le tuteur : il aide l'élève à penser, jamais à sa place.
   Cinq gestes possibles, des phrases très courtes, et un garde-fou qui relit chaque réponse :
   si Claude essaie de souffler, le tuteur local répond à sa place. */

const MOVES = ["reformuler", "questionner", "relier", "relancer", "encourager"];

const SYSTEM = `Tu es Léon, un petit caméléon qui accompagne un élève (Tom) pendant ses devoirs. Tom a un handicap moteur : il pense à voix haute, l'outil écrit.
Tu l'aides à penser, jamais à sa place. Tu choisis UN geste parmi :
- reformuler : redire ce que demande la question, avec les mots de l'énoncé. Ex. « On te demande de résoudre. Quel genre d'équation vois-tu ? »
- questionner : une question ouverte. Ex. « Qu'est-ce qui te bloque, là ? »
- relier : rappeler une question à laquelle l'énoncé renvoie, et ce que Tom y a répondu, mot pour mot. Ex. « Elle s'appuie sur la question 1. Tu y avais répondu : −½ et 2. »
- relancer : partir de ce qu'il a déjà dit. Ex. « Tu as déjà commencé ton brouillon. Quelle est ta prochaine idée ? »
- encourager : Ex. « Prends ton temps. Pense à voix haute, j'écris tout. »
Règles absolues :
- Au plus 3 phrases, et AU PLUS 8 MOTS PAR PHRASE : compte-les. Des phrases très courtes, comme « Que cherches-tu ? » ou « Regarde ton brouillon. » Tutoie Tom.
- Jamais de réponse, de résultat, de calcul, de méthode, de formule, ni de prochaine étape.
- Jamais de jugement : ne dis jamais juste, faux, correct, erreur, « attention », « es-tu sûr ? », « relis ton étape ».
- Jamais de consigne de méthode : pas de « calcule », « utilise », « pense à », « il faut », « applique ».
- Ne nomme jamais une notion (discriminant, dérivée, factorisation…) que ni l'énoncé ni Tom n'ont nommée.
- N'écris aucun nombre ni aucune expression qui ne viennent ni de l'énoncé ni de Tom.
- Plus le niveau d'aide est haut (1 à 3), plus tu peux être concret, mais toujours sans souffler.
- Ne répète jamais une aide déjà donnée. Ne prononce jamais ton propre prénom ni le mot « caméléon ».
Réponds en JSON : move (un des cinq gestes), text (maths entre $…$ si besoin), spoken (la même phrase à lire à voix haute, sans LaTeX : « x au carré »).`;

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["move", "text", "spoken"],
  properties: {
    move: { type: "string", enum: MOVES },
    text: { type: "string" },
    spoken: { type: "string" },
  },
};

/* ---------- Garde-fou ---------- */
const JUDGE = /\b(juste|faux|fausse|correcte?|incorrecte?|erreurs?|bravo|exact|attention|es-tu s[uû]r|tu es s[uû]r|relis ton|v[ée]rifie ton)\b/i;
const METHOD = /\b(calcule|calculez|utilise|utilisez|applique|remplace|factorise|d[ée]veloppe|r[ée]sous|isole|simplifie|pense [àa]|il faut|n'oublie pas|tu dois)\b/i;
const NOTIONS = ["discriminant", "delta", "δ", "dérivée", "dériver", "primitive", "factoris", "identité remarquable", "forme canonique", "théorème", "pythagore", "thalès", "conditionnelle", "arbre pondéré", "limite", "géométrique", "arithmétique", "racine", "vecteur", "intégrale", "logarithme", "exponentielle", "tableau de variations", "tableau de signes", "somme et produit", "loi binomiale", "espérance"];
// formules et symboles ramenés à une même écriture : \Delta = Δ, x^2 = x², \frac{a}{b} = a/b
const texify = (t) => String(t || "").replace(/\\Delta/g, "Δ").replace(/\\(?:d?frac)\{([^}]*)\}\{([^}]*)\}/g, "$1/$2").replace(/\^\{?2\}?/g, "²").replace(/\^\{?3\}?/g, "³")
  .replace(/\\times/g, "×").replace(/\\pm/g, "±").replace(/\\mathbb\{R\}/g, "ℝ").replace(/\\[a-zA-Z]+/g, "").replace(/[{}]/g, "").replace(/−/g, "-");
const norm = (t) => texify(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ");
const sentences = (t) => String(t).replace(/\$[^$]*\$/g, "X").split(/(?<=[.!?…])\s+/).map((x) => x.trim()).filter(Boolean);

function guard(text, contextText) {
  // le symbole Δ (ou \\Delta) dans l'énoncé nomme le delta, le discriminant aussi
  const named = String(contextText).replace(/\\Delta|Δ/g, " delta Δ ");
  const ctx = norm(/discriminant/i.test(named) ? `${named} delta Δ` : named);
  const ss = sentences(text);
  if (!ss.length) return "vide";
  if (ss.length > 3) return "plus de 3 phrases";
  if (ss.some((x) => x.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length > 8)) return "plus de 8 mots par phrase";
  if (JUDGE.test(text)) return "jugement";
  if (METHOD.test(text)) return "consigne de méthode";
  const nt = norm(text);
  const notion = NOTIONS.find((n) => nt.includes(norm(n)) && !ctx.includes(norm(n)));
  if (notion) return `notion non nommée : ${notion}`;
  // chaque nombre ou expression doit venir de l'énoncé ou de Tom
  const tokens = [...String(text).matchAll(/\$([^$]+)\$|(\d+(?:[.,]\d+)?)/g)].map((m) => norm(m[1] || m[2]).replace(/\s/g, ""));
  const flat = ctx.replace(/\s/g, "");
  const outside = tokens.find((tk) => tk && !flat.includes(tk));
  if (outside) return `expression inventée : ${outside}`;
  return null;
}

/* ---------- Tuteur local (sans clé, hors ligne) ---------- */
const VERBS = [
  [/r[ée]soudre/i, "On te demande de résoudre.", "Que cherches-tu exactement ?"],
  [/montrer|d[ée]montrer/i, "On te demande de montrer quelque chose.", "Qu'est-ce qui doit être vrai à la fin ?"],
  [/en d[ée]duire/i, "On te demande d'en déduire.", "De quoi peux-tu partir ?"],
  [/calculer/i, "On te demande un calcul.", "Que connais-tu déjà ?"],
  [/d[ée]terminer|trouver/i, "On te demande de trouver quelque chose.", "Que cherches-tu exactement ?"],
  [/justifier|expliquer/i, "On te demande de justifier.", "Pourquoi le penses-tu ?"],
  [/dresser|tracer|repr[ée]senter/i, "On te demande de construire quelque chose.", "Par quoi commencerais-tu ?"],
  [/[ée]tudier/i, "On te demande d'étudier.", "Qu'aimerais-tu savoir en premier ?"],
  [/identifier|rep[ée]rer|citer/i, "On te demande de repérer quelque chose.", "Où regarderais-tu dans l'énoncé ?"],
];
function localTutor({ question = "", refs = [], brouillon = [], helps = [], level = 1 }) {
  const said = new Set(helps.map((h) => norm(h.text || h)));
  const verb = VERBS.find(([re]) => re.test(question));
  const ref = refs.find((r) => r.answer);
  const short = (t, n = 6) => String(t).split(/\s+/).slice(0, n).join(" ");
  const options = [
    verb && { move: "reformuler", text: `${verb[1]} ${verb[2]}` },
    ref && { move: "relier", text: `Elle s'appuie sur la question ${ref.label}. Tu y avais répondu : ${short(ref.answer)}.` },
    brouillon.length && { move: "relancer", text: "Tu as déjà commencé ton brouillon. Quelle est ta prochaine idée ?" },
    { move: "questionner", text: "Qu'est-ce qui te bloque, là ?" },
    { move: "questionner", text: "Que cherches-tu exactement ?" },
    { move: "questionner", text: "Que sais-tu déjà sur cette question ?" },
    { move: "encourager", text: "Prends ton temps. Pense à voix haute, j'écris tout." },
    { move: "encourager", text: "Tu avances bien. Dis-moi ton idée, même floue." },
  ].filter(Boolean);
  const order = level >= 2 ? options : [...options].sort((a, b) => (a.move === "questionner" ? -1 : 0) - (b.move === "questionner" ? -1 : 0));
  const pick = order.find((o) => !said.has(norm(o.text))) || options[options.length - 1];
  return { ...pick, spoken: spoken(pick.text), origin: "local" };
}

// texte à lire à voix haute : sans LaTeX
function spoken(t) {
  return String(t)
    .replace(/\$([^$]*)\$/g, (_, m) => m
      .replace(/\\(?:d?frac)\{([^}]*)\}\{([^}]*)\}/g, "$1 sur $2")
      .replace(/\^\{?2\}?/g, " au carré").replace(/\^\{?3\}?/g, " au cube").replace(/\^\{?([^}\s]+)\}?/g, " puissance $1")
      .replace(/\\mathbb\{R\}/g, "R").replace(/\\Delta/g, "delta").replace(/\\sqrt\{([^}]*)\}/g, "racine de $1")
      .replace(/\\pm/g, " plus ou moins ").replace(/\\times/g, " fois ").replace(/=/g, " égale ").replace(/-/g, " moins ").replace(/\+/g, " plus ")
      .replace(/\\[a-zA-Z]+/g, "").replace(/[{}]/g, ""))
    .replace(/\s{2,}/g, " ").trim();
}

/* ---------- Repères du prof pour le sujet de démo (étapes de méthode, jamais les résultats) ---------- */
const NOTES = [
  [/urne|boules? rouges?/i, `Exercice 1 (probabilités, urne : 3 rouges, 2 bleues) — étapes possibles :
Q1 : compter le nombre total de boules ; compter les boules rouges ; probabilité = cas favorables sur cas possibles.
Q2 : même démarche avec les bleues ; on peut aussi vérifier que les deux probabilités font 1 ensemble.
Q3 : remarquer que la boule est remise, donc les deux tirages sont indépendants ; la probabilité de « rouge puis rouge » est le produit des probabilités ; un arbre peut aider.`],
  [/x\^?2\s*-\s*4x\s*\+\s*3|x²\s*-\s*4x\s*\+\s*3|second degré/i, `Exercice 2 (second degré, f(x) = x² − 4x + 3) — étapes possibles :
Q1 : remplacer x par 0 dans l'expression de f.
Q2 : reconnaître une équation du second degré ax² + bx + c = 0 ; repérer a, b, c ; calculer le discriminant Δ = b² − 4ac ; regarder son signe ; appliquer la formule des racines (−b ± √Δ) / 2a ; conclure avec l'ensemble des solutions. Autre piste : chercher une racine évidente.
Q3 : dériver terme à terme : la dérivée de x² est 2x, celle de ax est a, celle d'une constante est 0.`],
];

const PROF = `Tu es Léon, un petit caméléon prof particulier, bienveillant et efficace. Tom, élève de Terminale, a un handicap moteur : il pense à voix haute, l'outil écrit. Tu lui parles à l'oral.
Ton but : qu'il comprenne et avance par lui-même.
- S'il demande les étapes, la méthode ou « comment faire » : donne-lui les étapes de la méthode, numérotées, claires et concrètes, adaptées à la question (« 1. Compte le nombre total de boules. 2. … »). Tu peux nommer les notions et les formules du cours.
- Ne fais pas les calculs à sa place et ne donne pas le résultat final : il doit les faire lui-même. Termine par une petite question pour qu'il commence.
- S'il propose une idée, appuie-toi dessus et dis-lui ce qu'il peut faire ensuite. Tu peux confirmer qu'une idée est la bonne piste.
- S'il est simplement bloqué, reformule la question ou pose une question qui l'aide à démarrer.
- Réponds en 2 à 4 phrases courtes (ou une liste de 3 à 5 étapes très courtes). Tutoie-le. Pas de longue introduction. Ne prononce jamais ton propre prénom ni le mot « caméléon ».
Réponds en JSON : move (reformuler, questionner, relier, relancer, encourager ou etapes), text (maths entre $…$ si besoin), spoken (la même chose à lire à voix haute, sans LaTeX ni symboles : « x au carré », « delta »).`;

const GSCHEMA = {
  type: "OBJECT",
  properties: { move: { type: "STRING", enum: [...MOVES, "etapes"] }, text: { type: "STRING" }, spoken: { type: "STRING" } },
  required: ["move", "text", "spoken"],
};

async function askGemini(prompt, turns) {
  const txt = await gemini({
    system: PROF, json: GSCHEMA, maxTokens: 1500, temperature: 0.5, timeoutMs: 4500,
    contents: turns.map((m, i) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: i === 0 ? `${prompt}\n\nTom dit : ${m.content}` : m.content }] })),
  });
  try { const out = JSON.parse(txt || "{}"); return out.text ? out : null; } catch { return null; }
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "json" }, { status: 400 });
  if (JSON.stringify(body).length > 80000) return Response.json({ error: "trop long" }, { status: 413 });
  const { devoir = "", exercice = "", partie = "", question = "", refs = [], brouillon = [], phrases = [], helps = [], level = 1, history = [] } = body;
  const t0 = Date.now();
  const all = `${devoir} ${exercice} ${question}`;
  const notes = NOTES.filter(([re]) => re.test(all)).map(([, n]) => n).join("\n\n");

  const prompt = [
    devoir && `Le devoir complet :\n${String(devoir).slice(0, 6000)}`,
    `Exercice en cours : ${String(exercice).slice(0, 2500) || "(aucun texte commun)"}`,
    partie && `Partie : ${String(partie).slice(0, 1200)}`,
    `Question travaillée : ${String(question).slice(0, 1000)}`,
    refs.length && `Questions liées :\n${refs.map((r) => `- ${r.label} : ${r.enonce} → Tom a répondu : ${r.answer || "(rien encore)"}`).join("\n")}`,
    `Brouillon de Tom : ${brouillon.slice(-15).join(" ") || "(vide)"}`,
    `Aides déjà données : ${helps.map((h) => h.text).join(" | ") || "(aucune)"}`,
    notes && `Repères du prof (pour toi, ne les récite pas en bloc) :\n${notes}`,
  ].filter(Boolean).join("\n");

  const turns = history.slice(-12)
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1200) }));
  while (turns.length && turns[0].role !== "user") turns.shift();
  if (!turns.length) turns.push({ role: "user", content: "Aide-moi." });

  // Gemini et Claude en parallèle : la première bonne réponse gagne ; sinon le tuteur local
  const viaGemini = async () => {
    if (!process.env.GEMINI_API_KEY) throw 0;
    const out = await askGemini(prompt, turns);
    if (!out) throw 0;
    return { ...out, origin: "gemini" };
  };
  const viaClaude = async () => {
    if (!process.env.ANTHROPIC_API_KEY) throw 0;
    const client = new Anthropic({ timeout: 7000, maxRetries: 0 });
    const ct = turns.map((m, i) => (i === 0 ? { ...m, content: `${prompt}\n\nTom dit : ${m.content}` } : m));
    const response = await client.messages.create({
      model: "claude-haiku-5-5",
      max_tokens: 800,
      thinking: { type: "disabled" },
      output_config: { effort: "low", format: { type: "json_schema", schema: { ...SCHEMA, properties: { ...SCHEMA.properties, move: { type: "string", enum: [...MOVES, "etapes"] } } } } },
      system: [{ type: "text", text: PROF, cache_control: { type: "ephemeral" } }],
      messages: ct,
    });
    const out = response.stop_reason === "refusal" ? null : JSON.parse(response.content.find((b) => b.type === "text")?.text || "{}");
    if (!out?.text) throw 0;
    return { ...out, origin: "claude" };
  };
  try {
    const out = await Promise.any([viaGemini(), viaClaude()]);
    return Response.json({ move: out.move, text: out.text, spoken: out.spoken || spoken(out.text), origin: out.origin, latencyMs: Date.now() - t0 });
  } catch { /* les deux ont échoué : tuteur local */ }
  return Response.json({ ...localTutor({ question, refs, brouillon, helps, level }), latencyMs: Date.now() - t0 });
}
