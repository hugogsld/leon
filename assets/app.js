"use strict";

/* ================= Icônes ================= */
const P = (d, extra = "") => `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
const I = {
  arrow: P('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  back: P('<path d="M19 12H5M11 18l-6-6 6-6"/>'),
  camera: P('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'),
  pen: P('<path d="M15.5 4.5l4 4L9 19l-5 1 1-5z"/><path d="M13.5 6.5l4 4"/><circle cx="11" cy="13" r="1.2"/>'),
  list: P('<path d="M10 6h10M10 12h10M10 18h10"/><path d="M4 5l1.5-1V9M3.6 14.5c.4-.9 2.4-.9 2.4.4 0 1-2.4 1.6-2.4 3.1H6"/>'),
  wave: P('<path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2"/>'),
  marker: P('<path d="M9 15l-4 4h5l2-2"/><path d="M8.5 14.5l6-9 4 4-9 6z"/><path d="M14 18h6"/>'),
  lock: P('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>'),
  print: P('<path d="M7 9V3h10v6"/><rect x="4" y="9" width="16" height="8" rx="2"/><path d="M7 14h10v7H7z"/>'),
  undo: P('<path d="M4 4v6h6"/><path d="M4.5 15a8 8 0 102-8.5L4 10"/>'),
  speaker: P('<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 9a4 4 0 010 6M19 6.5a8 8 0 010 11"/>'),
  mic: P('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>', 'fill="currentColor"'),
  share: P('<path d="M12 15V3M7 8l5-5 5 5"/><path d="M5 12v8h14v-8"/>'),
  refresh: P('<path d="M20 4v6h-6"/><path d="M19.5 15a8 8 0 11-2-8.5L20 10"/>'),
  x: P('<path d="M6 6l12 12M18 6L6 18"/>'),
  upload: P('<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v4h16v-4"/>'),
  image: P('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>'),
  eraser: P('<path d="M7 21h10"/><path d="M5.5 14.5l8-8 5 5-8 8H8z"/>'),
  fx: P('<path d="M9 20c2 0 2.5-2 3-5l1.5-8c.4-2 1.3-3 3-3"/><path d="M8 10h7"/><path d="M15 14l5 5M20 14l-5 5"/>'),
  quill: P('<path d="M20 4C12 4 7 9 5.5 18.5"/><path d="M20 4c0 7-4 12-11 12"/><path d="M4 20l2-2"/>'),
  globe: P('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>'),
  trash: P('<path d="M4 7h16M10 11v6M14 11v6"/><path d="M6 7l1 13h10l1-13M9 7V4h6v3"/>'),
  nib: P('<path d="M15.7 3.3a1 1 0 0 1 1.4 0l3.6 3.6a1 1 0 0 1 0 1.4l-2.1 2.1-5-5z" fill="currentColor" fill-opacity=".14"/><path d="M13.6 5.4l-8.1 2.7a1 1 0 0 0-.7.8L3 20l11.1-1.8a1 1 0 0 0 .8-.7l2.7-8.1" fill="currentColor" fill-opacity=".14"/><path d="M3 20l6.3-6.3"/><circle cx="11" cy="13" r="2"/>'),
  olist: P('<rect x="9" y="4" width="12" height="4" rx="1" fill="currentColor" fill-opacity=".14" stroke="none"/><rect x="9" y="10" width="12" height="4" rx="1" fill="currentColor" fill-opacity=".14" stroke="none"/><rect x="9" y="16" width="12" height="4" rx="1" fill="currentColor" fill-opacity=".14" stroke="none"/><path d="M10 6h11M10 12h11M10 18h11"/><path d="M4 5l1.5-1v6M3.6 14.6c.4-.9 2.4-.9 2.4.4 0 1-2.4 1.6-2.4 3h2.6"/>'),
  check: P('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  eye: P('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  keyboard: P('<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>'),
};
const chameleon = ({ cls = "", branch = false } = {}) => `<svg class="cham ${cls}" viewBox="${branch ? "4 22 194 78" : "24 26 172 72"}" aria-hidden="true">
  ${branch ? `<path d="M166 92 Q176 83 188 79" stroke="#3b2f2f" stroke-width="4" stroke-linecap="round" fill="none"/><rect x="8" y="90" width="186" height="6" rx="3" fill="#3b2f2f"/>` : ""}
  <path d="M80 72 C54 75 30 69 30 50 C30 36 42 31 52 35 C62 40 60 54 50 53" fill="none" class="ch-s-body" stroke-width="13" stroke-linecap="round"/>
  <g class="ch-legs"><path d="M93 76 L86 92 M143 76 L149 92" class="ch-s-dark" stroke-width="7" stroke-linecap="round"/>
  <g class="ch-f-dark"><circle cx="83" cy="93" r="4"/><circle cx="90" cy="93" r="4"/><circle cx="146" cy="93" r="4"/><circle cx="153" cy="93" r="4"/></g></g>
  <path d="M72 76 C66 46 88 31 120 31 C150 31 170 46 177 60 C182 70 174 75 160 76 C130 80 100 82 80 81 C75 80 72 78 72 76 Z" class="ch-f-body"/>
  <path d="M80 62 C83 44 99 36 118 34 C101 41 91 51 87 67 Z" fill="#fff" opacity=".13"/>
  <path d="M93 40 q6-7 12-1 q6-7 13-1 q6-7 14-1" fill="none" class="ch-s-dark" stroke-width="3" stroke-linecap="round"/>
  <g fill="#fff" opacity=".3"><circle cx="104" cy="54" r="4"/><circle cx="121" cy="45" r="2.8"/><circle cx="96" cy="66" r="2.2"/></g>
  <path d="M80 78 C110 77 138 75 154 73" fill="none" class="ch-s-light" stroke-width="3" stroke-linecap="round"/>
  <g class="ch-tongue"><path d="M164 67 L190 65" stroke="#e8708a" stroke-width="3" stroke-linecap="round"/><circle cx="191" cy="65" r="3.6" fill="#e8708a"/></g>
  <path d="M146 69 C153 70 159 69 165 67" fill="none" stroke="#1b2033" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="148" cy="49" r="12.5" class="ch-f-dark"/><circle class="ch-eye" cx="149" cy="48" r="8" fill="#fff"/>
  <g class="ch-pupil"><circle cx="150" cy="47.5" r="4.2" fill="#1b2033"/><circle cx="151.4" cy="46" r="1.4" fill="#fff"/></g>
</svg>`;

/* ================= Données ================= */
const SUBJECTS = {
  maths: { label: "Mathématiques", glyph: "x²" },
  francais: { label: "Français", glyph: "Aa" },
  histoire: { label: "Histoire-Géo", glyph: "" },
  autre: { label: "Autres", glyph: "" },
};
const SUBJECT_ICON = { maths: "fx", francais: "quill", histoire: "globe", autre: "pen" };
const ORDER = ["maths", "francais", "histoire", "autre"];

// Devoirs de démonstration (les vrais arrivent du Drive)
const SEED = [
  {
    id: "dm3", seed: true, status: "ready", subject: "maths", title: "DM 3 Second degré", createdAt: Date.parse("2026-10-14T08:00:00"),
    exercices: [
      { id: "e1", titre: "Exercice 1", enonce: "On considère l'équation $(E) : 2x^2 - 3x - 2 = 0$.", questions: [
        { id: "e1q1", label: "1.a", enonce: "Identifier les coefficients $a$, $b$ et $c$." },
        { id: "e1q2", label: "1.b", enonce: "Calculer le discriminant $\\Delta$." },
        { id: "e1q3", label: "1.c", enonce: "En déduire les solutions de $(E)$ dans $\\mathbb{R}$." },
      ] },
      { id: "e2", titre: "Exercice 2", enonce: "Soit $f$ la fonction définie sur $\\mathbb{R}$ par $f(x) = x^2 - 4x + 3$.", questions: [
        { id: "e2q1", label: "2.a", enonce: "Calculer $f(0)$ et $f(1)$." },
        { id: "e2q2", label: "2.b", enonce: "Montrer que $f(x) = (x-2)^2 - 1$." },
        { id: "e2q3", label: "2.c", enonce: "Dresser le tableau de variations de $f$.", papier: true },
      ] },
      { id: "e3", titre: "Exercice 3", enonce: "Pour chaque question, choisis la bonne réponse.", questions: [
        { id: "e3q1", label: "3.a", enonce: "L'équation $x^2 + 1 = 0$ admet des solutions réelles.", choix: ["Vrai", "Faux"] },
        { id: "e3q2", label: "3.b", enonce: "Le discriminant de $x^2 - 2x + 1$ vaut :", choix: ["$-4$", "$0$", "$4$"] },
        { id: "e3q3", label: "3.c", enonce: "La parabole d'équation $y = -x^2 + 3$ est tournée vers :", choix: ["le haut", "le bas"] },
      ] },
    ],
  },
  {
    id: "dissert1", seed: true, status: "ready", subject: "francais", title: "Dissertation sur le roman", createdAt: Date.parse("2026-10-12T08:00:00"),
    exercices: [
      { id: "e1", titre: "Sujet", enonce: "« Le roman a-t-il pour seul but de divertir ? »", questions: [
        { id: "e1q1", label: "a", enonce: "Analyse les mots-clés du sujet." },
        { id: "e1q2", label: "b", enonce: "Formule une problématique." },
        { id: "e1q3", label: "c", enonce: "Propose un plan en trois parties." },
      ] },
    ],
  },
  {
    id: "compo1", seed: true, status: "ready", subject: "histoire", title: "La guerre froide", createdAt: Date.parse("2026-10-10T08:00:00"),
    exercices: [
      { id: "e1", titre: "Sujet", enonce: "La guerre froide (1947-1991) : un affrontement idéologique et mondial.", questions: [
        { id: "e1q1", label: "a", enonce: "Rédige l'introduction : contexte et problématique." },
        { id: "e1q2", label: "b", enonce: "Partie 1 : un affrontement idéologique." },
        { id: "e1q3", label: "c", enonce: "Partie 2 : un affrontement mondial." },
      ] },
    ],
  },
];

const KEY = "leon-v1";
const db = Object.assign({ name: "Tom", level: "Terminale", work: {}, seen: [] }, (() => {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
})());
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch { /* stockage indisponible */ } };

let remote = [];
const undash = (t) => String(t || "").replace(/\s+[—–-]\s+/g, " ").replace(/[—–]/g, " ").replace(/\s{2,}/g, " ").trim();
const devoirs = () => [...remote, ...SEED].filter((d) => !(db.hidden || []).includes(d.id)).sort((a, b) => b.createdAt - a.createdAt);
const findDevoir = (id) => devoirs().find((d) => d.id === id);
const subjectOf = (d) => (d && SUBJECTS[d.subject] ? d.subject : "autre");
const workOf = (did, qid) => {
  const w = (db.work[did] ||= { seq: 0, q: {} });
  return qid ? (w.q[qid] ||= { notes: [], answer: null }) : w;
};
const allQuestions = (d) => d.exercices.flatMap((e) => e.questions.map((q) => ({ ...q, ex: e })));
const isDone = (d, q) => { const a = db.work[d.id]?.q[q.id]?.answer; return !!a && a.validated !== false; };
const answered = (d, qs = allQuestions(d)) => qs.filter((q) => isDone(d, q)).length;

/* ================= Utilitaires ================= */
const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const math = (el) => {
  if (window.renderMathInElement && el) {
    renderMathInElement(el, { delimiters: [{ left: "$", right: "$", display: false }], throwOnError: false });
  }
};
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}
const dateFr = (t = Date.now()) => new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
const dateShort = (t) => new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
const uid = (n = 12) => Array.from(crypto.getRandomValues(new Uint8Array(n)), (b) => "abcdefghijklmnopqrstuvwxyz0123456789"[b % 36]).join("");
const plural = (n, w) => `${n} ${w}${n > 1 ? "s" : ""}`;
function loadScript(src) {
  return new Promise((res, rej) => { const el = document.createElement("script"); el.src = src; el.onload = res; el.onerror = rej; document.head.appendChild(el); });
}

/* ================= Mise au propre ================= */
const FILLERS = /\b(euh+|heu+|hum+|hmm+|bah|ben|bon ben|enfin bref)\b[,]?\s*/gi;
function cleanText(raw, isMath) {
  let t = " " + raw.trim() + " ";
  t = t.replace(FILLERS, "");
  t = t.replace(/(?<!\p{L})(\p{L}{2,})(\s+\1)+(?!\p{L})/giu, "$1"); // « le le » → « le »
  if (isMath) t = speakToMath(t);
  t = t.replace(/\s+([,.])/g, "$1").replace(/\s{2,}/g, " ").trim();
  if (!t) return "";
  if (!(isMath && isMathToken(t.split(" ")[0]))) t = t[0].toUpperCase() + t.slice(1);
  if (!/[.!?…:;]$/.test(t)) t += ".";
  return t;
}

/* Maths dictées → écriture mathématique (le sens n'est jamais modifié) */
const NUM = { "vingt-cinq": 25, "zéro": 0, un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10 };
const MATH_RULES = [
  [/\s-\s/g, " moins "], [/(^|\s)-(?=[\d\p{L}])/gu, "$1moins "], [/\s\+\s/g, " plus "],
  [/\bplus ou moins\b/gi, " ± "],
  [/(^|[\s=(]|fois)\s*moins\s+(\d+)\s+au carré/gi, "$1 (−$2)²"], [/\bfois moins\s+(\d+)/gi, "fois (−$1)"],
  [/\bf prime de x\b/gi, "f′(x)"], [/\bf de x\b/gi, "f(x)"], [/\bg de x\b/gi, "g(x)"],
  [/\b(?:dans|sur)\s+(?:l'ensemble des (?:nombres )?réels|grand r|r)\b/gi, (m) => m.split(/\s/)[0] + " ℝ"],
  [/\bappartient à\b/gi, "∈"], [/\bdifférente? de\b/gi, "≠"],
  [/\bdiscriminant\b/gi, "discriminant Δ"], [/\bdelta\b/gi, "Δ"],
  [/\bx\s*(?:indice\s*)?(?:1|un)\b/gi, "x₁"], [/\bx\s*(?:indice\s*)?(?:2|deux)\b/gi, "x₂"],
  [/\b(un|1) demi\b/gi, "1/2"], [/\b(\d+) demis?\b/gi, "$1/2"], [/\b(\d+) tiers\b/gi, "$1/3"], [/\b(\d+) quarts?\b/gi, "$1/4"],
  [new RegExp(`\\b(${Object.keys(NUM).join("|")})\\b(?=\\s*(?:[a-cxΔ²+=/<>]\\b|[a-cx]\\s|au carré|carré|fois|plus|moins|sur|demi|tiers|quart))`, "gi"), (m) => NUM[m.toLowerCase()]],
  [new RegExp(`((?:=|égale?|plus|moins|fois|sur)\\s+)(${Object.keys(NUM).join("|")})\\b`, "gi"), (m, a, n) => a + NUM[n.toLowerCase()]],
  [/\bracine (?:carrée )?de\s*/gi, "√"],
  [/([\p{L}\d)])\s*(?:au )?carrés?\b/giu, "$1²"], [/([\p{L}\d)])\s*au cube\b/giu, "$1³"],
  [/\baccolade fermante\b|\bferme(?:r)? l'accolade\b/gi, "}"], [/\baccolade(?: ouvrante)?\b|\bouvre l'accolade\b/gi, "{"],
  [/\bparenthèse fermante\b|\bferme(?:r)? la parenthèse\b/gi, ")"], [/\bparenthèse(?: ouvrante)?\b|\bouvre la parenthèse\b/gi, "("],
  [/\bpoint[- ]virgule\b/gi, ";"],
  [/\bsupérieure? ou égale? à\b/gi, "≥"], [/\binférieure? ou égale? à\b/gi, "≤"],
  [/\b(?:est )?strictement supérieure? à\b/gi, ">"], [/\b(?:est )?strictement inférieure? à\b/gi, "<"],
  [/\bsupérieure? à\b/gi, ">"], [/\binférieure? à\b/gi, "<"],
  [/\b(?:est )?strictement positif\b/gi, "> 0"], [/\b(?:est )?strictement négatif\b/gi, "< 0"],
  [/\b(?:est )?positif ou nul\b/gi, "≥ 0"], [/(Δ)\s+(?:est\s+)?nul\b/g, "$1 = 0"],
  [/\b(?:est )?égale?s? à\b/gi, "="], [/\bégale?s?\b/gi, "="], [/\bvaut\b/gi, "="],
  [/(\S)\s+fois\s+(?=\S)/gi, "$1 × "], [/(\S)\s+divisé par\s+(?=\S)/gi, "$1 / "],
  [/([\d²³)Δ₁₂]|(?<!\p{L})[a-cxyz])\s+sur\s+(?=[\d(√−a-cx])/giu, "$1 / "],
  [/([\d²³)Δ₁₂]|(?<!\p{L})[a-cxyz])\s+plus\s+/giu, "$1 + "], [/([\d²³)Δ₁₂]|(?<!\p{L})[a-cxyz])\s+moins\s+/giu, "$1 − "],
  [/(^|[\s=(±{;])moins\s+(?=[\d(√a-cxΔ])/giu, "$1−"],
  [/(\d)\s*a\s*c\b/gi, "$1ac"],
  [/(\d)\s+([a-cxyz])(?![\p{L}\d])(?!\s*(?:=|égal))/giu, "$1$2"],
  [/(Δ|\b[a-cxS₁₂])\s+est\s+(?=[<>=≤≥≠])/gu, "$1 "],
  [/\s*([=<>≤≥≠±∈])\s*/g, " $1 "],
  [new RegExp(`([=<>]\\s*−?)(${Object.keys(NUM).join("|")})\\b`, "gi"), (m, a, n) => a + NUM[n.toLowerCase()]],
];
// \b ignore les accents (« égal », « carré ») : on le remplace par une vraie frontière Unicode
const WB = "(?:(?<![\\p{L}\\d])(?=[\\p{L}\\d])|(?<=[\\p{L}\\d])(?![\\p{L}\\d]))";
MATH_RULES.forEach((r) => { r[0] = new RegExp(r[0].source.replaceAll("\\b", WB), r[0].flags.includes("u") ? r[0].flags : r[0].flags + "u"); });
function speakToMath(t) {
  for (const [re, to] of MATH_RULES) t = t.replace(re, to);
  return t.replace(/\s{2,}/g, " ");
}
const isMathToken = (w) => /[=+−×÷²³√Δ∈ℝ<>≤≥≠±₁₂/{}]|\d/.test(w) || /^[a-cxyzS][.,;)]?$/.test(w) || /^[(]?[a-cx][)]?$/.test(w);
const SAID_MATH = /\b(delta|discriminant|au carré|carrés?|au cube|égale?s?|plus ou moins|plus|moins|fois|divisé par|sur|racine(?: carrée)?(?: de)?|strictement|positif|négatif|nul|solutions?|accolades?|demis?|x ?(?:1|2|un|deux)?|[abc]|\d+(?:[,.]\d+)?)(?![\p{L}\d])/giu;
const markSaid = (raw, isMath) => isMath ? esc(raw).replace(SAID_MATH, '<mark class="sm">$1</mark>') : esc(raw);



/* Le brouillon se structure tout seul, sans jamais réfléchir à la place de l'élève */
const KINDS = {
  hypothese: "Hypothèse", calcul: "Calcul", donnee: "Donnée", etape: "Étape", question: "Question", leon: "Léon",
};
function kindOf(clean) {
  const t = clean.toLowerCase();
  if (/^(je pense|je crois|peut-être|on pourrait|je suppose|supposons|si |il faudrait|ça doit|ça pourrait)/.test(t)) return "hypothese";
  if (/^(est-ce que|comment|pourquoi|quel|quelle|qu'est-ce)/.test(t) || /\?$/.test(t)) return "question";
  if (/^(on sait|on a |je sais|d'après|dans l'énoncé|l'énoncé|on me donne|on nous donne)/.test(t)) return "donnee";
  if ((t.match(/[=+−×÷²√Δ<>≤≥]/g) || []).length >= 1 && /\d|[a-cxΔ]/.test(t)) return "calcul";
  return "etape";
}

/* ================= Routage ================= */
let view = { name: "landing" };
function go(name, params = {}) {
  speechSynthesis?.cancel();
  chat.hide();
  view = { name, ...params };
  focusEl = null;
  render();
  window.scrollTo(0, 0);
  const hash = { drive: "#drive", folder: `#f=${params.subject}`, devoir: `#d=${params.id}`, exo: `#x=${params.id}/${params.ex}` }[name] || "";
  history.replaceState(null, "", hash || location.pathname);
}
function openDevoir(id) {
  const d = findDevoir(id);
  if (!d) return;
  if (!d.seed && !db.seen.includes(d.id)) { db.seen.push(d.id); save(); }
  const l = db.last?.id === id ? db.last : null;
  go("exo", { id, ex: l?.ex || d.exercices[0].id, q: l?.q || 0 });
}
function back() {
  if (view.name === "exo") go("folder", { subject: subjectOf(findDevoir(view.id)) });
  else if (view.name === "devoir") go("folder", { subject: subjectOf(findDevoir(view.id)) });
  else if (view.name === "folder") go("drive");
}
function render() {
  const app = $("#app");
  const html = { landing: landingHTML, intro: introHTML, reading: readingHTML, drive: driveHTML, folder: folderHTML, devoir: devoirHTML, exo: exoHTML }[view.name]?.();
  if (html == null) { view = { name: "drive" }; return render(); }
  app.innerHTML = html;
  math(app);
  $("#dock").hidden = true;
  syncListeningUI();
  if (view.name === "exo") {
    renderBrouillon();
    renderReponse();
    placeWalker();
    const sub = subjectOf(findDevoir(view.id));
    setTimeout(() => $("#trail")?.classList.add("cham-" + sub), 450);
  }
}

/* ================= Accueil ================= */
function landingHTML() {
  return `<section class="landing"><div>
    <div class="bubble">Coucou ${esc(db.name)} !</div>
    ${chameleon({ cls: "hero", branch: true })}
    <h1>Léon</h1>
    <p class="tagline">Pense à voix haute. Ta copie s'écrit.</p>
    <button class="btn-primary" data-act="start">Commencer ${I.arrow}</button>
  </div></section>`;
}

/* ================= Démo du regard (onboarding) ================= */
function introHTML() {
  return `<section class="intro">
    ${chameleon({ cls: "hero", branch: true })}
    <h1>Pilote avec tes yeux</h1>
    <div class="intro-actions">
      <button class="btn-primary" data-act="try-gaze">${I.eye} Essayer</button>
    </div>
  </section>`;
}
function popDemoHTML() {
  return `<section class="intro pop">
    <p class="pop-msg" id="pop-msg">Regarde une bulle, ${VALIDATE[vmode()].hint}</p>
    <div class="vmodes">${Object.entries(VALIDATE).map(([k, v]) => `<button class="vmode ${k === vmode() ? "on" : ""}" data-vmode="${k}">${v.label}</button>`).join("")}</div>
    <div class="pops">${["maths", "francais", "histoire"].map((k) => `<button class="pop-target sub-${k}" data-act="pop">${tile(k)}</button>`).join("")}</div>
  </section>`;
}
async function tryGaze() {
  const ok = await gaze.start(true);
  // calibrage fait : on arrive directement dans le Drive, le regard actif
  if (ok && view.name === "intro") go("drive");
}
function pop(btn) {
  btn.classList.add("popped");
  btn.disabled = true;
  setTimeout(() => btn.remove(), 450);
  setTimeout(() => {
    if (!document.querySelector(".pop-target:not(.popped)")) {
      $(".pop-msg").textContent = "Bravo !";
      setTimeout(() => go("drive"), 900);
    }
  }, 460);
}

function setVmode(k) {
  db.validate = k;
  save();
  document.querySelectorAll(".vmode").forEach((b) => b.classList.toggle("on", b.dataset.vmode === k));
  const m = $("#pop-msg");
  if (m) m.textContent = `Regarde une bulle, ${VALIDATE[k].hint}`;
  const d = $("#dock-vmode");
  if (d) d.textContent = VALIDATE[k].label;
  if (k === "voix" && !listening) startListening();
  toast(`Validation : ${VALIDATE[k].label}`);
}

/* ================= Drive ================= */
const quickHTML = () => `<div class="quick">
  <button class="qbtn mic ${listening ? "on" : ""}" id="dock-mic" data-act="talk" title="Parler à Léon">${I.mic}<span>Parler</span></button>
  <button class="qbtn eye ${gaze.on ? "on" : ""}" data-act="gaze" title="Piloter avec les yeux">${I.eye}<span>Regard</span></button>
  <div class="caption" id="caption" hidden></div>
</div>`;
const topbar = (left) => `<header class="top">${left}<div class="top-r">${quickHTML()}
  <button class="btn-photo slim" data-act="deposit">${I.camera} Déposer un devoir</button></div></header>`;
const brand = `<div class="brand">${chameleon({ cls: "brand-cham" })}<span>Léon</span></div>`;
const tile = (sub) => `<div class="tile" aria-hidden="true">${SUBJECTS[sub].glyph ? `<span>${SUBJECTS[sub].glyph}</span>` : I[SUBJECT_ICON[sub]]}</div>`;

function processingHTML() {
  const pending = remote.filter((d) => d.status === "processing" || d.status === "error");
  if (!pending.length) return "";
  return `<div class="incoming">${pending.map((d) => d.status === "processing"
    ? `<div class="inc" data-read="${d.id}" role="button" tabindex="0"><span class="inc-cham">${chameleon({ branch: true })}</span><b>Léon lit ton nouveau devoir</b><span class="dots"><i></i><i></i><i></i></span></div>`
    : `<div class="inc err"><b>Je n'ai pas réussi à lire ce devoir.</b><button class="btn ghost" data-ask-del="${d.id}">${I.x} Retirer</button></div>`).join("")}</div>`;
}

function resumeHTML() {
  const l = db.last && findDevoir(db.last.id);
  if (!l) return "";
  const e = l.exercices.find((x) => x.id === db.last.ex) || l.exercices[0];
  const qs = allQuestions(l), n = answered(l, qs);
  const k = subjectOf(l);
  return `<button class="resume sub-${k}" data-focus="resume" data-resume="1">
    <div class="resume-trail" style="--progress:${qs.length ? n / qs.length : 0}"><div class="branch"></div><span class="status">${chameleon({ cls: "walker cham-" + k })}</span></div>
    <div class="resume-txt"><span class="eyebrow">Reprendre</span><b>${esc(l.title)}</b><span>${esc(e.titre)} · ${n}/${qs.length} réponses</span></div>
    ${I.arrow}
  </button>`;
}
function driveHTML() {
  const all = devoirs().filter((d) => d.status === "ready");
  const folders = ORDER.filter((k) => k !== "autre" || all.some((d) => subjectOf(d) === "autre"));
  return `<section class="page">
    <header class="home-head">
      <div>
        <div class="brand-row">${chameleon({ cls: "brand-cham" })}<span class="eyebrow">Léon</span></div>
        <h1 class="hello">Bonjour ${esc(db.name)}</h1>
      </div>
      <div class="head-r">${quickHTML()}<button class="btn-photo" data-act="deposit">${I.camera} Déposer un devoir</button></div>
    </header>
    ${processingHTML()}
    <div class="eyebrow section-label">Mes devoirs</div>
    <div class="folders">${folders.map((k) => {
      const list = all.filter((d) => subjectOf(d) === k);
      const fresh = list.some((d) => !d.seed && !db.seen.includes(d.id));
      const qs = list.flatMap((d) => allQuestions(d).map((q) => [d, q]));
      const done = qs.filter(([d, q]) => db.work[d.id]?.q[q.id]?.answer).length;
      return `<div class="folder sub-${k}" role="button" tabindex="0" data-focus="folder" data-folder="${k}">
        <span class="f-top"><span class="tag">${k === "histoire" ? "Histoire-Géo" : k === "francais" ? "Français" : k === "maths" ? "Maths" : "Autre"}</span>${fresh ? `<span class="new-pill">Nouveau</span>` : ""}<span class="f-ico">${I[k === "maths" ? "nib" : "olist"]}</span></span>
        <b>${SUBJECTS[k].label}</b>
        <span class="last">${list[0] ? esc(list[0].title) : "Aucun devoir pour l'instant"}</span>
        <span class="f-foot"><span class="state ${done ? "done" : ""}">${qs.length ? `${done}/${qs.length} réponses` : "Vide"}</span><span class="go">Ouvrir ${I.arrow}</span></span>
      </div>`;
    }).join("")}</div>
  </section>`;
}

function folderHTML() {
  const k = view.subject;
  const list = devoirs().filter((d) => d.status === "ready" && subjectOf(d) === k);
  return `<section class="page sub-${k}">
    ${topbar(`<button class="back" data-act="back" aria-label="Retour">${I.back}</button><div class="crumb2"><span class="eyebrow">Mes devoirs · ${list.length}</span><h1>${SUBJECTS[k].label}</h1></div>`)}
    ${processingHTML()}
    <div class="rows">${list.map((d) => {
      const qs = allQuestions(d), n = answered(d, qs);
      const fresh = !d.seed && !db.seen.includes(d.id);
      return `<div class="row-wrap"><div class="row row2" role="button" tabindex="0" data-focus="devoir" data-devoir="${d.id}">
        <span class="row-ico">${I[k === "maths" ? "nib" : "olist"]}</span>
        <span class="row-main"><b>${esc(d.title)}${fresh ? ` <span class="new-pill">Nouveau</span>` : ""}</b><span>${dateShort(d.createdAt)} · ${plural(d.exercices.length, "exercice")} · ${plural(qs.length, "question")}</span></span>
        <span class="row-prog"><span class="bar"><i style="width:${qs.length ? (n / qs.length) * 100 : 0}%"></i></span><span class="num">${n}/${qs.length}</span></span>
        <span class="go">Ouvrir ${I.arrow}</span>
      </div><button class="row-del" data-ask-del="${d.id}" aria-label="Supprimer ${esc(d.title)}">${I.trash}</button></div>`;
    }).join("") || `<p class="empty-folder">${chameleon({ cls: "mini" })}</p>`}</div>
  </section>`;
}

/* ================= Devoir : un bloc par exercice ================= */
function devoirHTML() {
  const d = findDevoir(view.id);
  if (!d) return null;
  if (!d.seed && !db.seen.includes(d.id)) { db.seen.push(d.id); save(); }
  const k = subjectOf(d);
  return `<section class="page sub-${k}">
    ${topbar(`<button class="back" data-act="back">${I.back}</button><div class="crumb">${tile(k)}<span>${esc(d.title)}</span></div>`)
      .replace(`<div class="top-r">`, `<div class="top-r"><button class="btn-soft export" data-act="export">${I.share} Exporter</button>`)}
    ${d.files?.length ? `<div class="scans">${d.files.map((f, i) => f.pdf
      ? `<a class="scan-pdf" href="${esc(f.url)}" target="_blank" rel="noopener">PDF</a>`
      : `<button class="scan-th" data-zoom="${esc(f.url)}" aria-label="Page ${i + 1}"><img src="${esc(f.url)}" alt=""></button>`).join("")}</div>` : ""}
    <div class="blocks">${d.exercices.map((e) => {
      const n = answered(d, e.questions);
      return `<article class="block" data-focus="exo" data-exo="${e.id}" tabindex="0">
        <header><h2>${esc(e.titre)}</h2><span class="ring sm" style="--v:${n / e.questions.length}"><span>${n}/${e.questions.length}</span></span></header>
        ${e.enonce ? `<p class="b-enonce">${esc(e.enonce)}</p>` : ""}
        <ol class="b-qs">${e.questions.map((q) => `<li class="${db.work[d.id]?.q[q.id]?.answer ? "ok" : ""}"><span class="lbl">${esc(q.label)}</span><span>${esc(q.enonce)}</span></li>`).join("")}</ol>
      </article>`;
    }).join("")}</div>
  </section>`;
}

/* ================= Exercice : brouillon + réponse ================= */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let dictating = false;
let wakeFired = false;
const WAKE = /^\W*(?:(?:hé|hey|eh|ok|dis|merci)\s+)?(?:cam[ée]l[ée]on|cam[ée]l[ée]ons|l[ée]on)\b[\s,.!?]*/i;
const WAKE_END = /(?:^|\s)cam[ée]l[ée]ons?\W*$/i; // « caméléon » en fin de phrase compte aussi
const HUSH = /\b(chut|chute|chuut+|chhh+|shh+|stop|silence|tais[- ]toi|arr[eê]te)\b/i;
const HUSH_ALONE = /^\W*(?:(?:hé|hey|ok|dis)\s+)?(?:l[ée]on\s+)?(chut|chute|chuut+|chhh+|shh+|stop|silence|tais[- ]toi|arr[eê]te(?:\s+de\s+parler)?)\W*$/i;
let wakeTimer = 0, lastHeard = "";
// « Léon » : ouvre tout de suite. Fenêtre ouverte : « Léon chut » coupe la voix, « Léon » seul ferme.
function onWake() {
  toggleLeon(); // instantané, dans les deux sens (« chut » seul coupe juste la voix)
}
function resolveWake() {
  if (!wakeTimer) return;
  clearTimeout(wakeTimer);
  wakeTimer = 0;
  if (!chat.open) return;
  if (HUSH.test(lastHeard)) { chat.hush(); return; }
  chat.hide();
}
// ouvre Léon s'il est fermé, le ferme s'il est ouvert — même s'il est en train de parler
const SPEAK_WORD = /^\W*(?:speak|speake|speek|spik|spike|spiks|spique|spic|spiq|speech|spitch|spi?k)\W*$/i;
let speakFired = false;
// « speak » : la dictée démarre ou s'arrête aussitôt
function toggleSpeak() {
  if (view.name !== "exo") return;
  const wasDictating = dictating;
  toggleDictation();
  // fin de la dictée : le brouillon est résumé et devient la réponse
  if (wasDictating && !dictating) {
    const { w } = cur();
    const fresh = w.notes.filter((x) => x.kind !== "leon" && x.id > (w.answeredUpTo || 0));
    if (fresh.length) { sfx.beep(false); finalAnswer(fresh.map((x) => x.raw).join(" "), true); return; }
  }
  sfx.beep(dictating);
  interim = "";
  toast(dictating ? "Dictée : je t'écris" : "Dictée en pause");
  if ($("#brouillon")) renderBrouillon();
}
const GAZE_WORD = /^\W*(?:(?:switch|swich|switche|souitch|souitche)(?:\s+(?:le\s+)?regard)?|(?:mode\s+|le\s+)?regard)\W*$/i;
let gazeFired = false;
// « regard » : allume (avec le calibrage s'il n'a jamais été fait) ou éteint
function toggleGaze() {
  gaze.byDictation = false;
  if (gaze.on && gaze.tracking) { gaze.pause(); sfx.beep(false); toast("Regard coupé"); return; }
  if (gaze.on && gaze.paused) { gaze.resume(); sfx.beep(true); toast("Regard activé"); return; }
  sfx.beep(true);
  const first = !gaze.model && !db.gazeModel;
  if (first) toast("Calibrage du regard : suis le caméléon avec ta tête");
  gaze.start().then((ok) => ok && toast("Regard activé"));
}
function toggleLeon() {
  if (chat.open) { chat.hide(); return; }
  if (view.name === "exo") chat.show();
  else if (db.last && findDevoir(db.last.id)) { openDevoir(db.last.id); setTimeout(() => chat.show(), 350); }
  else toast("Ouvre un devoir pour travailler avec Léon.");
} // « speak » : ce que tu dis s'écrit (sinon le micro n'écoute que les commandes)
let rec = null, listening = false, continuous = false, tapTimer = 0, paused = false, interim = "", pendingAnswer = false, thinking = false;
let qIndex = 0, justAnswered = false;

const cur = () => {
  const d = findDevoir(view.id);
  const e = d.exercices.find((x) => x.id === view.ex) || d.exercices[0];
  qIndex = Math.min(Math.max(0, view.q || 0), e.questions.length - 1);
  return { d, e, q: e.questions[qIndex], w: workOf(d.id, e.questions[qIndex].id) };
};

const FLY = `<svg class="fly" viewBox="0 0 20 16" aria-hidden="true"><ellipse cx="6" cy="5" rx="5" ry="3.2" fill="#c9d4e6" opacity=".85" transform="rotate(-25 6 5)"/><ellipse cx="14" cy="5" rx="5" ry="3.2" fill="#c9d4e6" opacity=".85" transform="rotate(25 14 5)"/><ellipse cx="10" cy="10" rx="4" ry="4.6" fill="#2b2f3f"/><circle cx="8.4" cy="8.6" r="1.1" fill="#d94b4b"/><circle cx="11.6" cy="8.6" r="1.1" fill="#d94b4b"/></svg>`;
function exoHTML() {
  const d = findDevoir(view.id);
  if (!d) return null;
  const { e, q } = cur();
  const k = subjectOf(d);
  db.last = { id: d.id, ex: e.id, q: qIndex, t: Date.now() };
  save();
  return `<section class="ex sub-${k}">
    <header class="ex-head compact">
      <button class="btn-soft btn-back" data-act="back" aria-label="Retour">${I.back}</button>
      <span class="tag">${esc(SUBJECTS[k].label)}</span>
      ${d.exercices.length > 1 ? `<div class="etabs">${d.exercices.map((x, i) => `<button class="etab ${x.id === e.id ? "on" : ""} ${answered(d, x.questions) === x.questions.length ? "done" : ""}" data-ex="${x.id}">Ex ${i + 1}</button>`).join("")}</div>` : ""}
      <div class="qtabs">${e.questions.map((x, i) => `<button class="qtab ${i === qIndex ? "on" : ""} ${db.work[d.id]?.q[x.id]?.answer ? "done" : ""} ${x.papier ? "paper" : ""}" data-q="${i}">${esc(x.label)}</button>`).join("")}</div>
      <h2 class="ex-name">${esc(e.titre)}</h2>
      <button class="btn-soft btn-restart" data-act="export">${I.share} Exporter</button>
      <button class="btn-soft btn-restart ${gaze.on ? "on" : ""}" data-act="gaze" id="gaze-btn">${I.eye} Regard</button>
    </header>
    <div class="trail" id="trail" style="--progress:${answered(d, e.questions) / Math.max(1, e.questions.length)}">
      <div class="branch"></div><div class="ticks">${e.questions.map((x, i) => `<span class="${db.work[d.id]?.q[x.id]?.answer ? "on" : ""}" style="left:calc(${(i + 1) / e.questions.length} * (100% - ${TRAIL_END}px))">${FLY}</span>`).join("")}</div>
      <div class="ttongue" id="ttongue"></div>
      <div class="status" id="status" role="button" tabindex="0" title="Parler à Léon">${chameleon({ cls: "walker" })}<span class="label">Prêt</span></div>
    </div>
    <div class="ex-body two">
      <div class="panel">
        <div class="panel-head"><span class="eyebrow">Brouillon</span></div>
        <div class="said brouillon" id="brouillon"></div>
        ${SR ? "" : `<form class="type-in" id="type-in"><input placeholder="Écris ta pensée…" aria-label="Écrire"><button>OK</button></form>`}
      </div>
      <div class="panel sheet">
        <div class="scroll" id="sheet-scroll">
          <div class="sheet-head"><span class="eyebrow">Réponse</span><span class="who">${esc(db.name)} · ${esc(db.level)} · ${dateFr()}</span></div>
          <div class="lines" id="lines"></div>
        </div>
      </div>
    </div>
    <nav class="bar">
      ${(() => {
        const first = qIndex === 0, firstEx = d.exercices[0] === e;
        return `<button class="b-prev" data-act="prev" ${first && firstEx ? "disabled" : ""}>${I.back}<span class="lbl">${first && !firstEx ? "Exercice précédent" : "Question précédente"}</span></button>`;
      })()}
      <button class="b-talk" data-act="talk" id="talk"><span class="mic">${I.mic}</span><span class="lbl" id="talk-lbl">Touche pour parler</span><span class="dots"><span>•</span><span>•</span><span>•</span><span>•</span><span>•</span></span></button>
      ${(() => {
        const lastQ = qIndex === e.questions.length - 1, lastEx = d.exercices[d.exercices.length - 1] === e;
        return lastQ && lastEx
          ? `<button class="b-next finish" data-act="finish"><span class="lbl">Terminer</span>${I.check}</button>`
          : `<button class="b-next" data-act="next"><span class="lbl">${lastQ ? "Exercice suivant" : "Question suivante"}</span>${I.arrow}</button>`;
      })()}
    </nav>
  </section>`;
}

function renderBrouillon() {
  const { w } = cur();
  const isMath = subjectOf(findDevoir(view.id)) === "maths";
  const box = $("#brouillon");
  const fmt = (t) => isMath ? t.split(" ").map((x) => isMathToken(x) ? `<span class="m">${esc(x)}</span>` : esc(x)).join(" ") : esc(t);
  let html = "", para = [];
  const flush = () => { if (para.length) html += `<p class="flow">${para.join(" ")}</p>`; para = []; };
  w.notes.forEach((x, i) => {
    if (x.kind === "leon") { flush(); html += `<div class="note leon">${chameleon({ cls: "mini" })}<p>${esc(x.clean)}</p></div>`; }
    else para.push(`<span class="${i === w.notes.length - 1 ? "ink-in" : ""}">${fmt(x.clean)}</span>`);
  });
  if (interim && !pendingAnswer) para.push(`<span class="interim">${markSaid(interim, isMath)}</span>`);
  flush();
  if (thinking) html += `<div class="note leon thinking">${chameleon({ cls: "mini" })}<p><span class="dots"><i></i><i></i><i></i></span></p></div>`;
  if (!html) html = `<div class="empty">${chameleon({ cls: "mini" })}</div>`;
  box.innerHTML = html;
  box.scrollTop = box.scrollHeight;
}

// Un énoncé lisible : paragraphes et vraies puces, au lieu d'un bloc de texte
function structText(t) {
  const out = [];
  const START = /^(.*?[.»;])\s+((?:On|Pour|Soit|Dans|Il|Les|La|Le|En|Un|Une|Sachant|Calculer|Montrer|Déterminer|Au|Chaque|Lorsqu)\b.*)$/;
  String(t || "").split(/\n+/).forEach((para) => {
    const parts = para.split(/\s*[•▪◦]\s+|\s+[-–]\s+(?=[A-ZÀ-Ý$])/);
    const head = parts.shift().trim();
    if (head) out.push(`<p>${esc(head)}</p>`);
    let list = [];
    const flush = () => { if (list.length) out.push(`<ul>${list.map((x) => `<li>${esc(x.trim().replace(/\s*;$/, ""))}</li>`).join("")}</ul>`); list = []; };
    parts.forEach((x) => {
      // une puce peut porter la suite du texte (« … AB. On choisit au hasard… ») : on la sépare
      const m = x.match(START);
      if (m) { list.push(m[1]); flush(); out.push(`<p>${esc(m[2])}</p>`); }
      else list.push(x);
    });
    flush();
  });
  return out.join("");
}

function renderReponse() {
  const { d, e } = cur();
  const isMath = subjectOf(d) === "maths";
  const words = (t) => t.split(/\s+/).map((x) => `<span class="w ${isMath && isMathToken(x) ? "m" : ""}">${esc(x)}</span>`).join(" ");
  const box = e.enonce ? `<div class="enonce-box">${structText(e.enonce)}</div>` : "";
  $("#lines").innerHTML = box + e.questions.map((q, i) => {
    const w = db.work[d.id]?.q[q.id];
    const on = i === qIndex;
    if (!on && !w?.answer) return "";
    let body;
    if (w?.answer) body = `<span class="txt ${on && justAnswered ? "ink-in" : ""}">${/\$/.test(w.answer.clean) ? esc(w.answer.clean) : words(w.answer.clean)}</span>${w.answer.check === "ok" ? `<span class="verdict ok">${I.check} Juste</span>`
  : w.answer.check === "ko" ? `<button class="to-check ko" data-act="verify">${I.x} Pas encore${w.answer.indice ? ` · ${esc(w.answer.indice)}` : ""}</button>`
  : w.answer.check === "busy" ? `<span class="to-check busy"><span class="dots"><i></i><i></i><i></i></span> Je vérifie…</span>`
  : on ? `<button class="to-check" data-act="verify">${I.eye} Vérifier</button>` : `<span class="valid">${I.check}</span>`}`;
    else if (q.choix?.length) body = `<span class="qcm">${q.choix.map((c, j) => `<button class="pick-opt" data-choice="${j}"><span class="letter">${"ABCDEF"[j]}</span>${esc(c)}</button>`).join("")}</span>`;
    else if (pendingAnswer && interim) body = `<span class="txt live">${words(isMath ? speakToMath(interim) : interim)}</span>`;
    else if (q.papier) body = `<span class="placeholder paper">${I.pen} À faire sur ta feuille</span>`;
    else body = `<span class="placeholder">« Ma réponse est… »</span>`;
    const printed = on || w?.answer ? `<div class="q-print">${q.partie ? `<span class="q-part">${esc(q.partie)}</span>` : ""}${q.partieCtx ? `<div class="q-pctx">${structText(q.partieCtx)}</div>` : ""}<span class="q-num">${esc(q.label)}</span> ${esc(q.enonce)}</div>` : "";
    // chaque réponse s'écrit juste sous son énoncé, comme sur une vraie copie
    return `<div class="step ans ${on ? "current" : "done"}" data-q="${i}">${printed}<div class="ans-line">${body}</div></div>`;
  }).join("");
  justAnswered = false;
  math($("#lines"));
}

function setStatus(mode) {
  const st = $("#status");
  if (st) {
    st.className = "status " + (mode || "");
    $(".label", st).textContent = { listening: "J'écoute", reading: "Je relis", thinking: "Je réfléchis" }[mode] || "Prêt";
  }
}
function celebrate() {
  const t = $("#trail");
  t?.classList.add("party");
  setTimeout(() => t?.classList.remove("party"), 3200);
  toast("Devoir terminé ! Dis « Exporte mon devoir ».");
}
function lick() {
  const w = $("#status .cham");
  if (!w) return;
  w.classList.remove("lick");
  void w.getBoundingClientRect();
  w.classList.add("lick");
}

/* ---- Actions ---- */
const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[^\p{L}\d ]/gu, "").replace(/\s+/g, " ").trim();
function addNote(raw) {
  if (!dictating) return;
  raw = raw.replace(/^\W*(?:speak|speake|speek|spik|spike|spique|speech)\b[\s,.]*/i, "").replace(/[\s,]*\b(?:speak|spike|spique)\W*$/i, "");
  if (!raw.trim()) return;
  const { d, w } = cur();
  const clean = cleanText(raw, subjectOf(d) === "maths");
  if (!clean) return;
  // la reconnaissance renvoie parfois la même phrase deux fois : on garde la plus complète
  const last = w.notes.at(-1);
  if (last && last.kind !== "leon") {
    const a = norm(last.clean), b = norm(clean);
    const short = a.length < b.length ? a : b, long = a.length < b.length ? b : a;
    if (short.length > 12 && (long.includes(short.slice(0, Math.floor(short.length * 0.8))) || a === b)) {
      if (b.length > a.length) { last.clean = clean; last.raw = raw.trim(); save(); renderBrouillon(); }
      return;
    }
  }
  w.notes.push({ id: ++workOf(d.id).seq, raw: raw.trim(), clean, kind: kindOf(clean) });
  save();
  renderBrouillon();
  lick();
}
// la réponse dictée est mise au propre (sans rien changer au fond), écrite sur la copie et validée
async function finalAnswer(raw, force = false) {
  if (!dictating && !force) return;
  const { d, q, w } = cur();
  pendingAnswer = false;
  interim = "";
  const qid = q.id;
  // tout de suite : la dernière phrase avec un résultat, fractions écrites proprement
  const sents = raw.split(/(?<=[.!?])\s+|\s+(?=donc\b)/i).map((x) => x.trim()).filter(Boolean);
  const pickS = [...sents].reverse().find((x) => /\d|sur\s+\w+/.test(x)) || sents[sents.length - 1] || raw;
  const quick = cleanText(pickS.replace(/^(?:donc|alors|voilà|bon)\s+/i, ""), subjectOf(d) === "maths").replace(/(\d+)\s*\/\s*(\d+)/g, "$\\frac{$1}{$2}$");
  w.answer = { raw: raw.trim(), clean: quick, validated: false, check: null, pending: true };
  justAnswered = true;
  renderReponse();
  let text = raw.trim();
  try {
    const r = await fetch("/api/synthese", { method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ dictee: raw, question: `${q.label} ${q.enonce}`, brouillon: w.notes.filter((x) => x.kind !== "leon").map((x) => x.clean) }) });
    text = (await r.json()).text || text;
  } catch { /* on garde la dictée telle quelle */ }
  if (cur().q.id !== qid) return; // l'élève a changé de question entre-temps
  w.answer = { raw: raw.trim(), clean: text, validated: false, check: null };
  w.answeredUpTo = Math.max(0, ...w.notes.map((x) => x.id || 0));
  justAnswered = false;
  db.last = { id: d.id, ex: cur().e.id, q: qIndex, t: Date.now() };
  save();
  justAnswered = true;
  refreshProgress();
  renderReponse();
  sfx.beep(true);
  toast("Vérifie ta réponse, puis passe à la question suivante pour la valider");
}
async function verifyAnswer() {
  const { d, e, q, w } = cur();
  if (!w.answer || w.answer.check === "busy") return;
  w.answer.check = "busy";
  renderReponse();
  let res = null;
  try {
    const r = await fetch("/api/verifier", { method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ enonce: `${e.titre}. ${e.enonce} ${q.partieCtx || ""}`, question: `${q.label} ${q.enonce}`, reponse: w.answer.clean }) });
    if (r.ok) res = await r.json();
  } catch { /* hors ligne */ }
  if (!res) { w.answer.check = null; renderReponse(); toast("Vérification indisponible, réessaie"); return; }
  w.answer.check = res.correct ? "ok" : "ko";
  w.answer.indice = res.correct ? "" : res.indice;
  if (res.correct) w.answer.validated = true;
  save();
  if (cur().q.id === q.id) renderReponse();
  res.correct ? sfx.beep(true) : sfx.beep(false);
  if (res.correct) refreshProgress();
}
function setAnswer(raw) {
  if (!dictating) return;
  const { d, w } = cur();
  const clean = cleanText(raw, subjectOf(d) === "maths");
  if (!clean) { pendingAnswer = true; renderReponse(); return; }
  pendingAnswer = false;
  w.answer = { raw: raw.trim(), clean };
  db.last = { id: d.id, ex: cur().e.id, q: qIndex, t: Date.now() };
  save();
  justAnswered = true;
  refreshProgress();
  renderReponse();
  homo.start();
  const all = allQuestions(d);
  if (answered(d, all) === all.length) celebrate();
}
// QCM : la réponse choisie (au regard, au clic ou à la voix) s'inscrit sur la copie
function choose(j) {
  const { d, e, q, w } = cur();
  if (!q.choix?.[j]) return;
  w.answer = { raw: q.choix[j], clean: `${"ABCDEF"[j]}) ${q.choix[j]}` };
  db.last = { id: d.id, ex: e.id, q: qIndex, t: Date.now() };
  save();
  justAnswered = true;
  refreshProgress();
  renderReponse();
  const all = allQuestions(d);
  if (answered(d, all) === all.length) celebrate();
}
// fin du devoir : Léon fête ça, puis on exporte ou on revient aux devoirs
function finishDevoir() {
  const { d } = cur();
  const qs = allQuestions(d), n = answered(d, qs);
  celebrate();
  openModal(`<div class="confirm finish-modal">${chameleon({ cls: "mini cham-" + subjectOf(d) })}
    <h2>${n === qs.length ? "Devoir terminé !" : "On s'arrête là ?"}</h2>
    <p class="lead">${n}/${qs.length} réponses sur ta copie.</p>
    <div class="modal-actions"><button class="btn ghost" data-act="back-folder">${I.back} Retour aux devoirs</button><button class="btn blue" data-act="export-close">${I.share} Exporter mon devoir</button></div></div>`, "finish");
}
function clearAnswer() {
  const { w } = cur();
  w.answer = null;
  pendingAnswer = false;
  save();
  refreshProgress();
  renderReponse();
}
function eraseLast() {
  const { w } = cur();
  const i = w.notes.map((x) => x.kind).lastIndexOf(w.notes.at(-1)?.kind === "leon" ? "leon" : w.notes.at(-1)?.kind);
  if (i < 0) { toast("Ton brouillon est vide."); return; }
  w.notes.splice(i, 1);
  save();
  renderBrouillon();
}
/* Léon sur sa branche : sa langue attrape la mouche suivante et le tire jusqu'à elle */
const MOUTH = 70, TRAIL_END = 70;
function walkerLeft(done, total) {
  const W = $("#trail")?.clientWidth || 0;
  return done ? Math.max(0, (done / total) * (W - TRAIL_END) - MOUTH) : 0;
}
function placeWalker() {
  const { d, e } = cur();
  const st = $("#status");
  if (!st) return;
  const done = answered(d, e.questions);
  st.style.left = walkerLeft(done, e.questions.length) + "px";
  st.dataset.done = done;
}
function pullWalker(done, total, ticks) {
  const st = $("#status"), t = $("#ttongue");
  const from = parseFloat(st.style.left) || 0, to = walkerLeft(done, total);
  st.dataset.done = done;
  if (to <= from + 4) { st.style.left = to + "px"; ticks(); return; }
  const mouth = from + MOUTH, fly = to + MOUTH;
  const ease = "cubic-bezier(.65, 0, .35, 1)";
  // 1. la langue part jusqu'à la mouche
  t.style.transition = "none";
  t.style.left = mouth + "px";
  t.style.width = "0px";
  t.style.opacity = 1;
  void t.offsetWidth;
  st.querySelector(".cham")?.classList.add("aim");
  t.style.transition = "width .42s cubic-bezier(.2, .9, .3, 1)";
  t.style.width = fly - mouth + "px";
  sfx.ready() && sfx.slurp(sfx.ctx.currentTime + 0.02, 0.35, true);
  // 2. bam : elle colle, et tire Léon jusqu'au point
  setTimeout(() => {
    t.classList.add("stuck");
    ticks();
  }, 480);
  setTimeout(() => {
    st.style.transition = `left .85s ${ease}`;
    st.style.left = to + "px";
    t.style.transition = `left .85s ${ease}, width .85s ${ease}`;
    t.style.left = fly + "px";
    t.style.width = "0px";
  }, 720);
  setTimeout(() => { t.style.opacity = 0; t.classList.remove("stuck"); st.style.transition = ""; st.querySelector(".cham")?.classList.remove("aim"); lick(); sfx.ready() && sfx.chirp(700, 1200, sfx.ctx.currentTime + 0.01, 0.12, "sine", 0.14); }, 1600);
}
function refreshProgress() {
  const { d, e } = cur();
  const n = answered(d, e.questions);
  const prev = +($("#status")?.dataset.done || 0);
  const ticks = () => document.querySelectorAll(".trail .ticks > span").forEach((s, i) => s.classList.toggle("on", isDone(d, e.questions[i])));
  if ($("#status")) n > prev ? pullWalker(n, e.questions.length, ticks) : (placeWalker(), ticks());
  document.querySelectorAll(".qtab").forEach((b, i) => b.classList.toggle("done", isDone(d, e.questions[i])));
}
function moveQ(delta) {
  const { d, e, w: cw } = cur();
  if (delta > 0 && cw.answer && cw.answer.validated === false) {
    cw.answer.validated = true;
    save();
    toast("Réponse validée ✓");
    refreshProgress();
    renderReponse();
    setTimeout(() => moveQ(delta), 1750); // Léon gobe la mouche, puis on change de question
    return;
  }
  const i = qIndex + delta;
  if (i >= e.questions.length) {
    const ei = d.exercices.indexOf(e);
    if (d.exercices[ei + 1]) { go("exo", { id: d.id, ex: d.exercices[ei + 1].id, q: 0 }); toast(d.exercices[ei + 1].titre); }
    else finishDevoir();
    return;
  }
  if (i < 0) {
    const ei = d.exercices.indexOf(e);
    const pe = d.exercices[ei - 1];
    if (pe) go("exo", { id: d.id, ex: pe.id, q: pe.questions.length - 1 });
    return;
  }
  pendingAnswer = false;
  homo.close();
  view.q = i;
  render();
}
async function relance() {
  if (thinking) return;
  const { d, e, q, w } = cur();
  thinking = true;
  setStatus("thinking");
  renderBrouillon();
  let text = "Qu'est-ce que tu sais déjà ?";
  try {
    const r = await fetch("/api/relance", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ exercice: `${e.titre}. ${e.enonce}`, question: `${q.label} ${q.enonce}`, brouillon: w.notes.filter((x) => x.kind !== "leon").map((x) => x.clean) }),
    });
    text = (await r.json()).question || text;
  } catch { /* question par défaut */ }
  thinking = false;
  if (view.name !== "exo") return;
  w.notes.push({ id: ++workOf(d.id).seq, raw: text, clean: text, kind: "leon" });
  save();
  setStatus(listening ? "listening" : "");
  renderBrouillon();
  say([text]);
}

/* ---- Voix de Léon (le micro se met en pause pour ne pas s'écouter) ---- */
function say(lines, onEach) {
  if (!("speechSynthesis" in window) || !lines.length) return;
  speechSynthesis.cancel();
  const wasListening = listening && !chat.open;
  if (wasListening) pauseRec(true);
  const voice = speechSynthesis.getVoices().find((v) => v.lang?.startsWith("fr"));
  lines.forEach((txt, i) => {
    const u = new SpeechSynthesisUtterance(txt.replace(/²/g, " au carré").replace(/³/g, " au cube").replace(/=/g, " égale ").replace(/−/g, " moins ").replace(/×/g, " fois ").replace(/Δ/g, "delta").replace(/√/g, "racine de ").replace(/x₁/g, "x 1").replace(/x₂/g, "x 2").replace(/±/g, " plus ou moins ").replace(/\//g, " sur ").replace(/ℝ/g, "R").replace(/[{}]/g, " accolade ").replace(/\$/g, ""));
    u.lang = "fr-FR";
    if (voice) u.voice = voice;
    u.rate = chat.open ? 1.3 : 1.05;
    u.onstart = () => onEach?.(i);
    if (i === lines.length - 1) u.onend = u.onerror = () => { onEach?.(-1); if (wasListening) pauseRec(false); };
    speechSynthesis.speak(u);
  });
}
function readBack() {
  const { q, w } = cur();
  const lines = w.notes.filter((x) => x.kind !== "leon").map((x) => x.clean);
  if (w.answer) lines.push("Ma réponse : " + w.answer.clean);
  if (!lines.length) { toast("Rien à relire pour l'instant."); return; }
  setStatus("reading");
  say([`Question ${q.label}.`, ...lines], (i) => { if (i < 0) setStatus(listening ? "listening" : ""); });
}

/* ---- Export PDF : énoncé, brouillon, réponse ---- */
// La copie exportée : énoncé, brouillon, aides de Léon, réponse — une vraie copie à rendre
function copieHTML(d) {
  const k = subjectOf(d);
  const qs = allQuestions(d);
  const ok = qs.filter((q) => db.work[d.id]?.q[q.id]?.answer?.check === "ok").length;
  const done = answered(d, qs);
  const helps = qs.reduce((n, q) => n + (db.work[d.id]?.q[q.id]?.helps?.length || 0), 0);
  const words = qs.reduce((n, q) => n + (db.work[d.id]?.q[q.id]?.notes || []).filter((x) => x.kind !== "leon").reduce((m, x) => m + x.clean.split(/\s+/).length, 0), 0);
  return `<article class="cp">
    <header class="cp-head">
      <div class="cp-brand">${chameleon({ cls: "cham-" + k })}<div><b>Léon</b><span>Copie dictée à voix haute</span></div></div>
      <div class="cp-who"><b>${esc(db.name)}</b><span>${esc(db.level)} · ${dateFr()}</span></div>
    </header>
    <div class="cp-title"><span class="cp-tag">${esc(SUBJECTS[k].label)}</span><h1>${esc(d.title)}</h1></div>
    <div class="cp-stats">
      <div><b>${done}/${qs.length}</b><span>réponses</span></div>
      <div><b>${ok}</b><span>vérifiées justes</span></div>
      <div><b>${words}</b><span>mots de raisonnement</span></div>
      <div><b>${helps}</b><span>aide${helps > 1 ? "s" : ""} de Léon</span></div>
    </div>
    ${d.exercices.map((e) => `<section class="cp-ex">
      <h2>${esc(e.titre)}</h2>
      ${e.enonce ? `<div class="cp-enonce">${structText(e.enonce)}</div>` : ""}
      ${e.questions.map((q) => {
        const w = db.work[d.id]?.q[q.id] || { notes: [], answer: null };
        const notes = w.notes.filter((x) => x.kind !== "leon");
        const a = w.answer;
        const badge = a?.check === "ok" ? `<span class="cp-badge ok">✓ Vérifiée</span>` : a ? `<span class="cp-badge">Rendue</span>` : `<span class="cp-badge none">Sans réponse</span>`;
        return `<div class="cp-q">
          <div class="cp-qh"><span class="cp-num">${esc(q.label)}</span><p>${q.partie ? `<em>${esc(q.partie)} · </em>` : ""}${esc(q.enonce)}</p>${badge}</div>
          <div class="cp-grid">
            <div class="cp-draft"><span class="cp-lbl">Brouillon · ses mots</span>${notes.length ? `<p>${notes.map((x) => esc(x.clean)).join(" ")}</p>` : `<p class="cp-empty">—</p>`}</div>
            ${w.helps?.length ? `<div class="cp-helps"><span class="cp-lbl">Léon l'a relancé</span>${w.helps.map((h) => `<p>« ${esc(h.text)} »</p>`).join("")}</div>` : ""}
          </div>
          <div class="cp-answer ${a ? "" : "empty"}"><span class="cp-lbl">Réponse</span><p>${a ? esc(a.clean) : "&nbsp;"}</p></div>
        </div>`;
      }).join("")}
    </section>`).join("")}
    <footer class="cp-foot">
      ${chameleon({ cls: "mini" })}
      <p><b>Ce travail vient de ${esc(db.name)}.</b> Le brouillon reprend ses mots, dictés à voix haute, sans ajout ni correction. Les aides de Léon sont des questions : il ne donne jamais la réponse.</p>
      <div class="cp-sign"><span>Visa du professeur</span></div>
    </footer>
  </article>`;
}
function exportDevoir() {
  const d = findDevoir(view.id);
  if (!d) return;
  // aperçu dans l'appli, puis impression / enregistrement en PDF
  const m = openModal(`<div class="cp-preview">${copieHTML(d)}</div>
    <div class="cp-actions"><button class="btn ghost" data-act="close">Fermer</button><button class="btn blue" data-act="print-copie">${I.share} Enregistrer en PDF</button></div>`, "cp-modal");
  math(m);
}
function printCopie() {
  const d = findDevoir(view.id);
  const root = $("#print-root");
  root.innerHTML = copieHTML(d);
  math(root);
  const old = document.title;
  document.title = `${d.title} · ${db.name}`; // nom du fichier PDF proposé
  setTimeout(() => { window.print(); document.title = old; }, 80);
}

/* ================= Homophones : la dictée entend, l'élève choisit du regard ================= */
const HOMO = [["a", "à"], ["et", "est"], ["ou", "où"], ["son", "sont"], ["on", "ont"], ["ces", "ses", "c'est", "s'est"], ["la", "là"], ["ce", "se"], ["peu", "peut", "peux"], ["leur", "leurs"], ["mes", "mais"], ["quand", "quant", "qu'en"]];
const homoOf = (w) => HOMO.find((g) => g.includes(w.toLowerCase()));
const homo = {
  qid: null, idx: -1, left: 0,
  // cherche le prochain mot ambigu dans la réponse, à partir d'une position
  next(from = 0) {
    const { d, q, w } = cur();
    if (!w.answer || subjectOf(d) === "maths" || this.left <= 0) return this.close();
    const toks = w.answer.clean.split(" ");
    for (let i = from; i < toks.length; i++) {
      const core = toks[i].replace(/^[«(]+|[.,;:!?»)]+$/g, "");
      if (homoOf(core)) { this.qid = q.id; this.idx = i; this.left--; return this.show(toks, i, core); }
    }
    this.close();
  },
  start() { this.left = 3; this.next(0); },
  show(toks, i, core) {
    const sheet = $(".sheet");
    if (!sheet) return;
    let box = $("#homo");
    if (!box) { box = document.createElement("div"); box.id = "homo"; box.className = "homo"; sheet.appendChild(box); }
    const sentence = toks.map((t, k) => (k === i ? `<mark>${esc(t)}</mark>` : esc(t))).join(" ");
    box.innerHTML = `<div class="homo-head">${chameleon({ cls: "mini" })}<div><b>Quel mot as-tu voulu dire ?</b><p>${sentence}</p></div></div>
      <div class="homo-opts">${homoOf(core).map((o) => `<button class="pick-opt ${o === core.toLowerCase() ? "cur" : ""}" data-homo="${esc(o)}">${esc(o)}</button>`).join("")}</div>`;
    requestAnimationFrame(() => box.classList.add("in"));
  },
  pick(word) {
    const { w } = cur();
    if (!w.answer) return this.close();
    const toks = w.answer.clean.split(" ");
    const t = toks[this.idx] || "";
    const core = t.replace(/^[«(]+|[.,;:!?»)]+$/g, "");
    const cased = core[0] && core[0] === core[0].toUpperCase() ? word[0].toUpperCase() + word.slice(1) : word;
    toks[this.idx] = t.replace(core, cased);
    w.answer.clean = toks.join(" ");
    save();
    renderReponse();
    this.next(this.idx + 1);
  },
  close() {
    const box = $("#homo");
    if (box) { box.classList.remove("in"); setTimeout(() => box.remove(), 250); }
    this.idx = -1;
  },
};

/* ================= Petits sons de Léon (synthétisés, pas de fichier) ================= */
const sfx = {
  ctx: null,
  ready() {
    try {
      this.ctx ||= new (window.AudioContext || window.webkitAudioContext)();
      if (this.ctx.state === "suspended") this.ctx.resume();
    } catch { this.ctx = null; }
    return this.ctx;
  },
  // un « chirp » : une note qui glisse d'une hauteur à l'autre
  chirp(f0, f1, at, dur, type = "sine", vol = 0.22) {
    const c = this.ctx, o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, at);
    o.frequency.exponentialRampToValueAtTime(f1, at + dur);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(vol, at + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g).connect(c.destination);
    o.start(at);
    o.stop(at + dur + 0.02);
  },
  // petit « slurp » de langue : un bruit filtré qui monte
  slurp(at, dur = 0.16, up = true) {
    const c = this.ctx, n = c.createBufferSource(), b = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
    const data = b.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    n.buffer = b;
    const f = c.createBiquadFilter(), g = c.createGain();
    f.type = "bandpass";
    f.Q.value = 6;
    f.frequency.setValueAtTime(up ? 600 : 2400, at);
    f.frequency.exponentialRampToValueAtTime(up ? 2400 : 500, at + dur);
    g.gain.setValueAtTime(0.18, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    n.connect(f).connect(g).connect(c.destination);
    n.start(at);
  },
  beep(up) {
    if (!this.ready()) return;
    const t = this.ctx.currentTime + 0.01;
    up ? (this.chirp(520, 900, t, 0.09, "sine", 0.16), this.chirp(900, 1300, t + 0.1, 0.08, "sine", 0.14))
       : (this.chirp(900, 520, t, 0.09, "sine", 0.16), this.chirp(520, 330, t + 0.1, 0.1, "sine", 0.14));
  },
  open() {
    if (!this.ready()) return;
    const t = this.ctx.currentTime + 0.01;
    this.chirp(380, 820, t, 0.11);
    this.chirp(520, 1180, t + 0.12, 0.13);
    this.slurp(t + 0.22, 0.14, true);
    this.chirp(1400, 1900, t + 0.34, 0.06, "triangle", 0.12);
  },
  close() {
    if (!this.ready()) return;
    const t = this.ctx.currentTime + 0.01;
    this.slurp(t, 0.12, false);
    this.chirp(980, 300, t + 0.08, 0.28, "sine", 0.2);
    this.chirp(260, 180, t + 0.34, 0.08, "triangle", 0.14);
  },
};
// le navigateur n'autorise le son qu'après un geste : on prépare l'audio au premier clic
document.addEventListener("pointerdown", () => sfx.ready(), { once: true, capture: true });

/* ================= Discuter avec Léon (clic sur le caméléon) ================= */
const SEND_END = /^(.*?)[\s,]*(?:\bpoint\b|\benvoie\b|\benvoyer\b|\.)[\s.!]*$/i;
const chat = {
  open: false, busy: false, history: [], audio: null, key: "", draft: "", level: 1,
  show() {
    if (this.open || view.name !== "exo") return;
    const { d, e, q } = cur();
    const key = `${d.id}/${q.id}`;
    if (key !== this.key) { this.key = key; this.history = []; }
    this.open = true;
    sfx.open();
    const walker = $("#status .cham");
    walker?.classList.remove("leap", "land");
    void walker?.getBoundingClientRect();
    walker?.classList.add("leap");
    const from = walker?.getBoundingClientRect();
    const el = document.createElement("div");
    el.className = `leon-chat cham-${subjectOf(d)} sub-${subjectOf(d)}`;
    el.id = "leon-chat";
    el.innerHTML = `<div class="lc-head">
        <span class="lc-cham">${chameleon()}</span>
        <div class="lc-who"><b>Léon</b><span id="lc-state">Je t'écoute</span></div>
        <button class="lc-x" data-act="chat-close" aria-label="Fermer">${I.x}</button>
      </div>
      <div class="lc-msgs" id="lc-msgs"></div>
      <div class="lc-dictee">
        <span class="lc-mic ${listening ? "on" : ""}">${I.mic}</span>
        <div class="lc-draft" id="lc-draft"></div>
      </div>
      <div class="lc-hint">Dis <b>« point »</b> pour envoyer · <b>« Léon »</b> pour fermer</div>
      ${SR ? "" : `<form class="lc-input" id="lc-form"><input id="lc-in" placeholder="Écris à Léon…" autocomplete="off"><button class="lc-send" aria-label="Envoyer">${I.arrow}</button></form>`}`;
    document.body.appendChild(el);
    // l'animation part du caméléon
    const box = el.getBoundingClientRect();
    if (from) el.style.transformOrigin = `${from.left + from.width / 2 - box.left}px ${from.top + from.height / 2 - box.top}px`;
    requestAnimationFrame(() => el.classList.add("in"));
    $("#status")?.classList.add("away");
    this.render();
    this.renderDraft("");
    if (SR && !listening) startListening(true);
  },
  hide() {
    if (!this.open) return;
    this.open = false;
    this.draft = "";
    sfx.close();
    const walker = $("#status .cham");
    walker?.classList.remove("leap");
    void walker?.getBoundingClientRect();
    walker?.classList.add("land");
    this.stopVoice();
    const el = $("#leon-chat");
    el?.classList.remove("in");
    setTimeout(() => el?.remove(), 280);
    $("#status")?.classList.remove("away");
  },
  render() {
    const box = $("#lc-msgs");
    if (!box) return;
    const MOVE = { etapes: "Étapes", reformuler: "Reformuler", questionner: "Question", relier: "Relier", relancer: "Relancer", encourager: "Encourager" };
    box.innerHTML = this.history.map((m) => `<div class="lc-msg ${m.role === "user" ? "me" : "leon"}">${m.move ? `<span class="lc-move">${MOVE[m.move] || ""}</span>` : ""}${esc(m.content)}</div>`).join("")
      + (this.busy ? `<div class="lc-msg leon typing"><span class="dots"><i></i><i></i><i></i></span></div>` : "");
    math(box);
    box.scrollTop = box.scrollHeight;
  },
  state(t) { const s = $("#lc-state"); if (s) s.textContent = t; },
  // la dictée s'accumule ; « point » à la fin envoie le message
  hear(text) {
    // « point » (dit ou écrit « . ») ou « envoie » à la fin : le message part
    const m = text.match(SEND_END);
    this.draft = `${this.draft} ${m ? m[1] : text}`.replace(/\s+/g, " ").trim();
    if (m) {
      const msg = this.draft;
      this.draft = "";
      this.renderDraft("");
      if (msg) this.send(msg);
      return;
    }
    this.renderDraft("");
  },
  renderDraft(live) {
    const box = $("#lc-draft");
    if (!box) return;
    box.innerHTML = this.draft || live
      ? `<span>${esc(this.draft)}</span> <span class="live">${esc(live || "")}</span>`
      : `<span class="ph">${this.busy ? "Léon réfléchit…" : "Je t'écoute…"}</span>`;
    box.scrollTop = box.scrollHeight;
  },
  // ce que le tuteur a le droit de voir : énoncé, renvois et réponses de Tom, brouillon, aides déjà données, niveau
  request() {
    const { d, e, q, w } = cur();
    const all = allQuestions(d);
    const src = `${q.enonce} ${q.partieCtx || ""}`;
    const labels = [...src.matchAll(/questions?\s+((?:\d+[.)]?\s*[a-z]?\)?|[a-z]\))(?:\s*(?:et|,)\s*(?:\d+[.)]?\s*[a-z]?\)?|[a-z]\)))*)/gi)]
      .flatMap((m) => m[1].split(/\s*(?:et|,)\s*/)).map((l) => l.replace(/[\s)]/g, "").replace(/\.$/, "").toLowerCase()).filter(Boolean);
    const refs = [...new Set(labels)].map((l) => all.find((x) => x.id !== q.id && (x.label.replace(/[\s)]/g, "").toLowerCase() === l || x.label.replace(/[\s.)]/g, "").toLowerCase() === l.replace(/\./g, ""))))
      .filter(Boolean).map((x) => ({ label: x.label, enonce: x.enonce, answer: db.work[d.id]?.q[x.id]?.answer?.clean || "" }));
    const notes = w.notes.filter((x) => x.kind !== "leon").map((x) => x.clean);
    return {
      devoir: `${d.title}\n${d.exercices.map((x) => `${x.titre}. ${x.enonce}\n${x.questions.map((y) => `${y.label}. ${y.enonce}`).join("\n")}`).join("\n\n")}`,
      exercice: e.enonce, partie: [q.partie, q.partieCtx].filter(Boolean).join(" "), question: `${q.label} ${q.enonce}`,
      refs, brouillon: notes, phrases: notes.slice(-12), helps: w.helps || [], level: this.level,
      history: this.history.map((m) => ({ role: m.role, content: m.content })),
    };
  },
  async send(text) {
    text = text.trim();
    if (!text || this.busy) return;
    const { w } = cur();
    // le niveau d'aide monte à chaque nouvel « aide-moi », et revient à 1 dès que Tom reparle
    this.level = /aide|bloqu|sais pas|comprends pas|je vois pas|aucune id/i.test(text) && text.split(/\s+/).length < 9 ? Math.min(3, this.level + 1) : 1;
    this.history.push({ role: "user", content: text });
    this.busy = true;
    this.state("Léon réfléchit…");
    this.render();
    let help = { move: "questionner", text: "Qu'est-ce qui te bloque, là ?", spoken: "Qu'est-ce qui te bloque, là ?", origin: "local" };
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 12000);
      const r = await fetch("/api/leon", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(this.request()), signal: ctrl.signal });
      clearTimeout(timer);
      const j = await r.json();
      if (j?.text && j?.move) help = j;
    } catch { /* hors ligne ou trop lent : le tuteur local a répondu */ }
    this.busy = false;
    this.history.push({ role: "assistant", content: help.text, move: help.move });
    // chaque aide est tracée : le prof la verra dans la copie
    (w.helps ||= []).push({ move: help.move, text: help.text, origin: help.origin, t: Date.now() });
    save();
    if (!this.open) return;
    this.render();
    this.speak(help.spoken || help.text);
  },
  // voix ElevenLabs si disponible, sinon celle du navigateur ; le micro se coupe pendant que Léon parle
  // Léon répond par écrit uniquement : pas de voix, rien à attendre
  async speak() {
    this.speaking = false;
    this.state(listening ? "Je t'écoute" : "Touche le micro pour parler");
  },
  async speakVoice(text) {
    const cham = $(".lc-cham");
    cham?.classList.add("talking");
    this.state("Léon parle");
    this.speaking = true;
    const done = () => { this.speaking = false; this.quietUntil = Date.now() + 700; cham?.classList.remove("talking"); this.state(listening ? "Je t'écoute" : "Touche le micro pour parler"); };
    try {
      if (this.noVoiceApi) throw new Error();
      // la voix Gemini a 6,5 s pour arriver ; sinon Léon parle tout de suite avec la voix du navigateur
      const ctrl = new AbortController();
      const vt = setTimeout(() => ctrl.abort(), 6500);
      const r = await fetch("/api/voice", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text }), signal: ctrl.signal });
      clearTimeout(vt);
      if (!r.ok) { if (r.status === 503) this.noVoiceApi = true; throw new Error(); }
      const url = URL.createObjectURL(await r.blob());
      this.stopVoice();
      const a = (this.audio = new Audio(url));
      a.playbackRate = 1.3;
      a.preservesPitch = true;
      a.onended = a.onerror = () => { URL.revokeObjectURL(url); done(); };
      await a.play();
    } catch {
      say([text], (i) => { if (i < 0) done(); });
    }
  },
  stopVoice() {
    if (this.audio) { this.audio.pause(); this.audio = null; }
    speechSynthesis?.cancel();
    this.speaking = false;
  },
  hush() {
    this.stopVoice();
    this.quietUntil = Date.now() + 500;
    $(".lc-cham")?.classList.remove("talking");
    this.state("Je t'écoute");
  },
  // pendant que Léon parle, le micro entend aussi sa voix : on n'écoute alors que « Léon »
  echo() { return this.speaking || Date.now() < (this.quietUntil || 0); },
};
document.addEventListener("submit", (e) => {
  if (e.target.id !== "lc-form") return;
  e.preventDefault();
  const i = $("#lc-in");
  chat.send(i.value);
  i.value = "";
});

/* ================= Voix : commandes et dictée ================= */
const NUMW = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, premier: 1, première: 1, second: 2, seconde: 2, deuxième: 2, troisième: 3 };
const num = (s) => +s || NUMW[s?.toLowerCase()] || 0;
const SUBJECT_WORDS = [[/math/i, "maths"], [/fran[çc]ais|philo|litt/i, "francais"], [/histoire|g[ée]o/i, "histoire"]];

function handleFinal(text) {
  text = text.trim();
  if (!text) return;
  // « switch » : allume ou coupe le regard
  if (SPEAK_WORD.test(text)) {
    if (speakFired) { speakFired = false; return; } // déjà fait dès que le mot a été entendu
    toggleSpeak();
    return;
  }
  if (GAZE_WORD.test(text)) {
    if (gazeFired) { gazeFired = false; return; } // déjà fait dès que le mot a été entendu
    toggleGaze();
    return;
  }
  // navigation entre questions : prioritaire, même pendant la discussion avec Léon
  if (view.name === "exo") {
    const t = text.toLowerCase().replace(/[.!?,]/g, "").trim();
    if (/^(?:je\s+)?(?:valide|valider|termine|terminer|j'ai fini|c'est fini|fini)$/.test(t)) {
      chat.hide();
      const { d, e } = cur();
      const lastQ = qIndex === e.questions.length - 1, lastEx = d.exercices[d.exercices.length - 1] === e;
      return lastQ && lastEx ? finishDevoir() : moveQ(1);
    }
    if (/^(?:(?:passe|passons|on passe|va|allez)\s+(?:à\s+)?(?:la\s+)?)?(?:question\s+suivante|suivante?|next|exercice suivant|à la suite|la suite)$/.test(t) || /\bquestion suivante\b/.test(t)) {
      chat.hide();
      return moveQ(1);
    }
    if (/^(?:(?:reviens|revenir|retourne)\s+(?:à\s+)?(?:la\s+)?)?(?:question\s+précédente|précédente?)$/.test(t) || /\bquestion précédente\b/.test(t)) {
      chat.hide();
      return moveQ(-1);
    }
  }
  // « Léon » : ouvre l'assistant, et lui transmet la suite de la phrase s'il y en a une
  const wake = text.match(/^\W*(?:(?:hé|hey|eh|ok|dis)\s+)?l[ée]on\b[\s,.!?]*(.*)$/i);
  if (wake && !chat.open) {
    const rest = wake[1].trim();
    const openChat = () => { chat.show(); if (rest) chat.send(rest); };
    if (view.name === "exo") openChat();
    else if (db.last && findDevoir(db.last.id)) { openDevoir(db.last.id); setTimeout(openChat, 350); }
    else toast("Ouvre un devoir pour travailler avec Léon.");
    return;
  }
  if (chat.open) {
    if (/^\W*(?:(?:hé|hey|eh|ok|dis|merci)\s+)?l[ée]on\W*$/i.test(text) || /^(ferme|fermer|au revoir)\b/i.test(text)) { chat.hide(); return; }
    if (chat.skipFinal) { chat.skipFinal = false; return; } // déjà envoyé depuis le texte en cours
    chat.hear(text);
    return;
  }
  if (gaze.tracking && vmode() === "voix" && /^(valide|valider|ok|okay|clique|sélectionne|ouvre ça)[ .!]*$/i.test(text)) {
    if (gaze.target) gaze.fire(gaze.target, performance.now());
    return;
  }
  if (view.name === "exo") return handleExo(text);
  handleNav(text);
}

const END_ANSWER = /[\s,.]*(?:\b(?:voilà|ok|donc|et|bon)\s+)?(?:(?:ça|c'est|c'est ça|ça c'est)\s+)?(?:\bpour\s+)?(?:\b(?:la|ma)\s+)?\bréponses?(?:\s+finale)?[\s.!]*$/i;
const TO_ANSWER = /(?:tu peux |peux-tu |vas-y |on peut |)?(?:conclu(?:re|s|t|ons)|écri(?:re|s|t|vez)|marque[rz]?|mets?|mettre|note[rz]?|inscri(?:re|s)|bascule[rz]?|passe[rz]?|recopie[rz]?|transf[eè]re[rz]?)\s+(?:moi\s+)?(?:ça|cela|le|la|tout ça)?\s*(?:sur|dans|en|vers)\s+(?:la|ma)\s+(?:(?:page|feuille)\s+(?:de\s+)?(?:la\s+)?)?(?:réponses?|copie)(?:\s+finale)?[\s.!]*$/i;
function handleExo(text) {
  const t = text.toLowerCase();
  let m;
  const cq = cur().q;
  if (cq.choix?.length && !cur().w.answer) {
    const k = t.replace(/[.!?,]/g, "").trim();
    const byLetter = k.match(/^(?:(?:ma\s+)?réponse|je choisis|choix|c'est)?\s*([a-f])$/);
    const byText = cq.choix.findIndex((c) => norm(c.replace(/\$/g, "")) === norm(k));
    if (byLetter) return choose("abcdef".indexOf(byLetter[1]));
    if (byText >= 0) return choose(byText);
  }
  if (pendingAnswer && !/efface|annule/.test(t)) return finalAnswer(text);
  if ((m = text.match(/(?:^|\s)(?:en fait |donc |alors )?(?:ma|la) réponse(?: finale)? (?:est|c'est|serait|sera)\s*(?:(?:deux|de|2|des) points?|:)?[\s,.:]*(.*)$/i))) {
    const before = text.slice(0, m.index).trim();
    if (before) addNote(before);
    return m[1].replace(/[.\s]+$/, "") ? finalAnswer(m[1]) : (pendingAnswer = true, renderReponse(), toast("Dicte ta réponse, je l'écris au propre"));
  }
  // « écris ça sur la page réponse » ou simplement « … réponse » à la fin : le brouillon récent passe sur la copie
  if ((m = text.match(TO_ANSWER)) || (m = text.match(END_ANSWER))) {
    const before = text.slice(0, m.index).replace(/\b(voilà|ok|bon|donc)\W*$/i, "").trim();
    if (before) addNote(before);
    const { w } = cur();
    const last = w.notes.filter((x) => x.kind !== "leon").slice(-4).map((x) => x.raw).join(" ");
    return last ? finalAnswer(last) : toast("Dis d'abord ta réponse dans le brouillon");
  }
  if ((m = text.match(/corrige(?:r)? (?:ma|la) réponse\s*:?\s*(.*)$/i))) return m[1] ? setAnswer(m[1]) : (pendingAnswer = true, renderReponse());
  if (/efface (?:ma|la) réponse/.test(t)) return clearAnswer();
  if (/exporte(?:r)? (?:mon|le) devoir/.test(t)) return exportDevoir();
  if (/question suivante|exercice suivant/.test(t)) return moveQ(1);
  if (/question précédente/.test(t)) return moveQ(-1);
  if ((m = t.match(/exercice (\d+|un|deux|trois|quatre|cinq|six|premier|second|deuxième|troisième)\b/))) {
    const { d } = cur();
    const x = d.exercices[num(m[1]) - 1];
    if (x) return go("exo", { id: d.id, ex: x.id, q: 0 });
  }
  if ((m = t.match(/question (\d+|un|deux|trois|quatre|cinq|six)\b/))) { const i = num(m[1]) - 1; if (i >= 0) { view.q = i; return render(); } }
  if (/^(relis|relis-moi|relis mon brouillon|relis ma copie)/.test(t)) return readBack();
  if (/^efface\b|efface (ça|la dernière)/.test(t)) return eraseLast();
  if (/^(retour|reviens)\b/.test(t)) return back();
  if (/je suis bloqué|aide-moi|aide moi|je (ne )?sais pas|je comprends pas|je ne comprends pas/.test(t)) {
    chat.show();
    return chat.send(text);
  }
  addNote(text);
}

function handleNav(text) {
  const t = text.toLowerCase();
  let m;
  showCaption(text, true);
  if (/exporte/.test(t) && view.name === "devoir") return exportDevoir();
  if (/^(retour|reviens)/.test(t)) return back();
  if (/r[ée]fl[ée]chi(ssons|r)|cet exercice|ce devoir|ce dossier|ouvre (ça|celui)/.test(t)) {
    if (focusEl) return focusEl.click();
    if (view.name === "devoir") return toast("Regarde un exercice, puis redis-le.");
  }
  if ((m = t.match(/exercice (\d+|un|deux|trois|quatre|cinq|six|premier|second|deuxième|troisième)/))) {
    const d = findDevoir(view.id);
    const e = d?.exercices[num(m[1]) - 1];
    if (view.name === "devoir" && e) return go("exo", { id: d.id, ex: e.id, q: 0 });
  }
  for (const [re, k] of SUBJECT_WORDS) {
    if (re.test(t) && /ouvre|va|montre|mon|dm|devoir|dossier/.test(t)) {
      const list = devoirs().filter((d) => d.status === "ready" && subjectOf(d) === k);
      if ((m = t.match(/(?:dm|devoir) (?:n°|numéro )?(\d+)/))) {
        const hit = list.find((d) => new RegExp(`\\b${m[1]}\\b`).test(d.title));
        if (hit) return openDevoir(hit.id);
      }
      return go("folder", { subject: k });
    }
  }
  if ((m = t.match(/(?:dm|devoir) (?:n°|numéro )?(\d+)/))) {
    const hit = devoirs().find((d) => d.status === "ready" && new RegExp(`\\b${m[1]}\\b`).test(d.title));
    if (hit) return openDevoir(hit.id);
  }
  if (/drive|accueil|mes devoirs/.test(t)) return go("drive");
  showCaption(text, false);
}

/* bulle des commandes (Drive) */
let capTimer;
function showCaption(text, ok) {
  return; // l'écoute reste continue, mais sans bulle de transcription
  const c = $("#caption");
  if (!c) return;
  if (!text) { c.hidden = true; return; }
  c.innerHTML = `<span class="${ok === false ? "miss" : ""}">« ${esc(text)} »</span>`;
  c.hidden = false;
  clearTimeout(capTimer);
  capTimer = setTimeout(() => (c.hidden = true), 2200);
}

function startListening(keepOn = true) {
  if (!SR) { toast("La dictée n'est pas disponible ici. Essaie Chrome ou Safari."); return; }
  speechSynthesis?.cancel();
  rec = new SR();
  rec.lang = "fr-FR";
  rec.continuous = true;
  rec.interimResults = true;
  rec.onresult = (e) => {
    let inter = "";
    // « Léon » : on réagit dès que le mot est entendu, sans attendre la fin de la phrase
    const latest = e.results[e.results.length - 1]?.[0]?.transcript || "";
    lastHeard = latest;
    if (!speakFired && SPEAK_WORD.test(latest.trim()) && !e.results[e.results.length - 1].isFinal) {
      speakFired = true;
      toggleSpeak();
      setTimeout(() => (speakFired = false), 3000);
      return;
    }
    if (speakFired && SPEAK_WORD.test(latest.trim())) { if (e.results[e.results.length - 1].isFinal) speakFired = false; return; }
    if (chat.open && HUSH_ALONE.test(latest.trim())) {
      if (chat.speaking || chat.audio) chat.hush();
      if (e.results[e.results.length - 1].isFinal) return;
    }
    if (!gazeFired && GAZE_WORD.test(latest.trim()) && !e.results[e.results.length - 1].isFinal) { gazeFired = true; toggleGaze(); setTimeout(() => (gazeFired = false), 3000); }
    if (!wakeFired && (WAKE.test(latest) || WAKE_END.test(latest))) { wakeFired = true; onWake(); setTimeout(() => (wakeFired = false), 2500); }
    else if (wakeFired && wakeTimer && HUSH.test(latest)) resolveWake();
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const r = e.results[i];
      if (r.isFinal) {
        interim = "";
        if (wakeFired) {
          // la phrase qui contenait « Léon » est terminée : on garde seulement la suite
          wakeFired = false;
          lastHeard = r[0].transcript;
          if (wakeTimer) resolveWake();
          if (HUSH.test(r[0].transcript)) continue;
          const rest = r[0].transcript.replace(WAKE, "").trim();
          if (rest && chat.open && !chat.echo()) chat.hear(rest);
          continue;
        }
        if (chat.open && HUSH_ALONE.test(r[0].transcript.trim())) continue; // « chut » ne s'écrit pas
        if (chat.open && chat.echo()) continue; // c'est la voix de Léon qu'on entend
        handleFinal(r[0].transcript);
        if (!continuous && !pendingAnswer) { stopListening(); return; }
      }
      else inter += r[0].transcript;
    }
    interim = inter;
    if (chat.open) {
      if (wakeFired || chat.echo()) return;
      if (inter && SEND_END.test(inter.trim())) { chat.skipFinal = true; chat.hear(inter.trim()); return; }
      chat.renderDraft(inter);
      return;
    }
    if (view.name === "exo" && dictating) { renderBrouillon(); if (pendingAnswer) renderReponse(); }
    else if (inter) showCaption(inter);
  };
  rec.onerror = (e) => {
    if (e.error === "not-allowed" || e.error === "service-not-allowed") { toast("Autorise le micro pour parler à Léon."); stopListening(); }
  };
  rec.onend = () => { if (listening && !paused) { setTimeout(() => { try { rec.start(); } catch { /* déjà relancé */ } }, 120); } };
  rec.onerror = ((prev) => (e) => { if (e.error === "no-speech" || e.error === "aborted") return; prev(e); })(rec.onerror);
  try { rec.start(); } catch { return; }
  listening = true;
  micWanted = true;
  continuous = keepOn;
  syncListeningUI();
}
function pauseRec(on) {
  if (!listening || !rec) return;
  paused = on;
  try { on ? rec.stop() : rec.start(); } catch { /* déjà dans cet état */ }
}
function stopListening() {
  listening = false;
  micWanted = false;
  dictating = false;
  paused = false;
  if (rec) { rec.onend = null; try { rec.stop(); } catch { /* déjà arrêté */ } rec = null; }
  if (interim) { const t = interim; interim = ""; handleFinal(t); }
  syncListeningUI();
}
function toggleDictation(force) {
  dictating = force ?? !dictating;
  if (dictating && !listening) startListening(true);
  // pendant la dictée, le regard se met en pause ; il revient dès que la dictée s'arrête
  if (dictating && gaze.tracking) { gaze.pause(); gaze.byDictation = true; }
  else if (!dictating && gaze.byDictation) { gaze.byDictation = false; if (gaze.on && gaze.paused) gaze.resume(); }
  if (!dictating && interim) interim = "";
  syncListeningUI();
}
function syncListeningUI() {
  const t = $("#talk");
  if (t) {
    t.classList.toggle("on", dictating && listening);
    t.classList.toggle("locked", false);
    $("#talk-lbl").textContent = dictating && listening ? "J'écris ce que tu dis" : listening ? "Dis « speak » pour écrire" : "Touche pour parler";
  }
  setStatus(dictating && listening ? "listening" : "");
  const lbl = $("#status .label");
  if (lbl && listening && !dictating) lbl.textContent = "En veille";
  $("#dock-mic")?.classList.toggle("on", listening);
  $("#dock-mic")?.classList.toggle("locked", listening && continuous);
  const c = $("#caption");
  if (c && view.name !== "exo") { if (listening) showCaption(""); else c.hidden = true; }
  if (view.name === "exo" && $("#brouillon")) renderBrouillon();
}

/* ================= Regard : cible courante ================= */
let focusEl = null;
function setFocus(el) {
  if (el === focusEl) return;
  focusEl?.classList.remove("focused");
  focusEl = el;
  el?.classList.add("focused");
}
document.addEventListener("pointerover", (e) => {
  if (gaze.tracking) return;
  const el = e.target.closest?.("[data-focus]");
  if (el) setFocus(el);
});

/* ================= Lecture du devoir en direct ================= */
// Le JSON arrive morceau par morceau : on le referme proprement pour l'afficher au fur et à mesure.
function partialJSON(src) {
  const close = (t) => {
    let inStr = false, esc2 = false;
    const st = [];
    for (const c of t) {
      if (inStr) { if (esc2) esc2 = false; else if (c === "\\") esc2 = true; else if (c === '"') inStr = false; continue; }
      if (c === '"') inStr = true;
      else if (c === "{" || c === "[") st.push(c);
      else if (c === "}" || c === "]") st.pop();
    }
    return (inStr ? t + '"' : t) + st.reverse().map((c) => (c === "{" ? "}" : "]")).join("");
  };
  let t = src;
  for (let i = 0; i < 40 && t.length; i++) {
    try { return JSON.parse(close(t)); } catch { /* on recule d'un cran */ }
    const cut = Math.max(t.lastIndexOf(","), t.lastIndexOf("{"), t.lastIndexOf("["));
    if (cut <= 0) return null;
    t = t.slice(0, t[cut] === "," ? cut : cut + 1);
  }
  return null;
}

const reading = new Set();
const PILL = ["#f08a6b", "#f5a54a", "#4cb8a8", "#7088ea", "#c47ad6", "#5dbd89"];
const READ_MSGS = ["Léon lit ta feuille…", "On repère les exercices…", "On sépare les questions…", "On garde les formules telles quelles…", "On met tout en ordre…"];
let readMsgTimer = 0;

function readingHTML() {
  // trois cartes fantômes en attendant les vrais exercices
  const ghost = (i) => `<div class="sc-card ghost" style="--c:${PILL[i]}"><div class="sc-left"><span class="sc-pill">Exercice ${i + 1}</span><span class="sc-line"></span></div><div class="sc-slots">${"<span></span>".repeat(4)}</div></div>`;
  // à gauche : la copie photographiée, en train d'être scannée
  const d = view.id === "demo" ? null : remote.find((x) => x.id === view.id);
  const img = d?.files?.find((f) => !f.pdf)?.url;
  const tx = (t) => esc(String(t).replace(/==/g, "").replace(/\\mathbb\{R\}/g, "ℝ").replace(/\\Delta/g, "Δ").replace(/\^2/g, "²").replace(/\\[a-zA-Z]+/g, "").replace(/[${}]/g, ""));
  const mock = SEED[0].exercices.map((e) => `<b>${esc(e.titre)}</b><p>${tx(e.enonce)}</p>${e.questions.map((q) => `<p>${esc(q.label)}. ${tx(q.enonce)}</p>`).join("")}`).join("");
  const page = img ? `<img src="${esc(img)}" alt="Ta copie">` : d?.files?.some((f) => f.pdf) ? `<div class="sc-mock pdf">${I.olist}<span>PDF</span></div>` : `<div class="sc-mock"><h4>${esc(SEED[0].title)}</h4>${mock}</div>`;
  return `<section class="scan-screen" id="reading">
    <i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i>
    <div class="sc-photo"><div class="sc-sheet">${page}<i class="sc-beam"></i></div><i class="cn tl"></i><i class="cn tr"></i><i class="cn bl"></i><i class="cn br"></i><span class="sc-ok">${I.check}</span></div>
    <div class="sc-right">
    <div class="sc-stage" id="sc-stage">
      <div class="sc-cards" id="rd-tree">${[0, 1, 2].map(ghost).join("")}</div>
      <div class="sc-text">
        <span class="sc-eyebrow" id="rd-state">Léon lit ton devoir</span>
        <h1 id="rd-title">Un instant…</h1>
        <p id="rd-sub">${READ_MSGS[0]}</p>
      </div>
    </div>
    <div class="sc-done" id="sc-done">
      <div class="sc-check">${I.check}<i></i><i></i></div>
      <span class="sc-eyebrow">C'est prêt</span>
      <h1 id="sc-done-title">Ton devoir est prêt !</h1>
      <p>On l'ouvre tout de suite…</p>
    </div>
    </div>
  </section>`;
}

function renderTree(data, seen) {
  const tree = $("#rd-tree");
  if (!tree || !data) return;
  if (data.titre) $("#rd-title").textContent = undash(data.titre);
  if (data.matiere && SUBJECTS[data.matiere]) $("#reading").dataset.sub = data.matiere;
  const exs = data.exercices || [];
  if (!exs.length) return;
  let nq = 0, fresh = false;
  const mark = (key) => { if (seen.has(key)) return ""; seen.add(key); fresh = true; return "pop"; };
  const cards = exs.map((ex, i) => {
    const qs = (ex.parties || []).flatMap((p) => p.questions || []);
    nq += qs.length;
    const name = (ex.contexte || qs[0]?.enonce || "").replace(/\\mathbb\{R\}/g, "ℝ").replace(/\\mathbb\{N\}/g, "ℕ").replace(/\\[a-zA-Z]+/g, "").replace(/[${}]/g, "").replace(/\^2/g, "²").split(/[.:;]/)[0].trim().slice(0, 42);
    const slots = qs.slice(0, 6).map((q, k) => `<span class="slot ${q.papier ? "paper" : ""} ${(q.choix || []).length ? "qcm" : ""} ${mark(`e${i}q${k}`)}" style="--d:${k * 35}ms">${q.papier ? I.pen : esc(q.label || k + 1)}</span>`).join("")
      + (qs.length > 6 ? `<span class="slot more">+${qs.length - 6}</span>` : "")
      + "<span class=\"empty\"></span>".repeat(Math.max(0, 4 - qs.length));
    return `<div class="sc-card ${mark("e" + i)}" style="--c:${PILL[i % PILL.length]}">
      <div class="sc-left"><span class="sc-pill">${esc(undash(ex.titre || `Exercice ${i + 1}`))}</span><span class="sc-name">${esc(name || "…")}</span></div>
      <div class="sc-slots">${slots}</div>
    </div>`;
  });
  // on garde des cartes fantômes tant qu'il en reste moins de trois
  for (let i = exs.length; i < 3; i++) cards.push(`<div class="sc-card ghost" style="--c:${PILL[i]}"><div class="sc-left"><span class="sc-pill">Exercice ${i + 1}</span><span class="sc-line"></span></div><div class="sc-slots">${"<span></span>".repeat(4)}</div></div>`);
  tree.innerHTML = cards.slice(0, 5).join("");
  if (exs.length > 5) tree.insertAdjacentHTML("beforeend", `<div class="sc-more">+ ${plural(exs.length - 5, "exercice")}</div>`);
  $("#rd-sub").textContent = `${plural(exs.length, "exercice")} · ${plural(nq, "question")} repérées…`;
  clearInterval(readMsgTimer);
  if (fresh) { tree.classList.remove("tick"); void tree.offsetWidth; tree.classList.add("tick"); }
}

// démo : rejoue la lecture du DM 3, sans réseau (pour répéter le pitch)
async function demoScan() {
  const d = SEED[0];
  view = { name: "reading", id: "demo" };
  render();
  const seen = new Set();
  const data = { titre: d.title, matiere: d.subject, exercices: [] };
  let mi = 0;
  clearInterval(readMsgTimer);
  readMsgTimer = setInterval(() => { const p = $("#rd-sub"); if (p) p.textContent = READ_MSGS[++mi % READ_MSGS.length]; }, 1700);
  await wait(450);
  for (const e of d.exercices) {
    const ex = { titre: e.titre, contexte: e.enonce, parties: [{ titre: "", contexte: "", questions: [] }] };
    data.exercices.push(ex);
    renderTree(data, seen);
    for (const q of e.questions) {
      await wait(130);
      ex.parties[0].questions.push({ label: q.label, enonce: q.enonce, papier: !!q.papier, choix: q.choix || [] });
      renderTree(data, seen);
    }
    await wait(160);
  }
  await wait(250);
  showReady(d.title);
  await wait(1500);
  if (view.name === "reading") openDevoir(d.id);
}

function showReady(title) {
  clearInterval(readMsgTimer);
  const r = $("#reading");
  if (!r) return;
  $("#sc-done-title").textContent = title ? `${title} est prêt !` : "Ton devoir est prêt !";
  r.classList.add("done");
}

async function startReading(id) {
  if (reading.has(id)) return;
  reading.add(id);
  if (view.name !== "reading" || view.id !== id) go("reading", { id });
  const seen = new Set();
  let mi = 0;
  clearInterval(readMsgTimer);
  readMsgTimer = setInterval(() => { const p = $("#rd-sub"); if (p) p.textContent = READ_MSGS[++mi % READ_MSGS.length]; else clearInterval(readMsgTimer); }, 1700);
  let buf = "", last = 0, result = null;
  try {
    const r = await fetch("/api/decompose", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) });
    if (!r.ok || !r.body) throw new Error(String(r.status));
    const reader = r.body.getReader(), dec = new TextDecoder();
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const z = buf.indexOf("\u0000");
      if (z >= 0) { result = JSON.parse(buf.slice(z + 1)); buf = buf.slice(0, z); }
      if (performance.now() - last > 140 && view.name === "reading" && view.id === id) {
        last = performance.now();
        renderTree(partialJSON(buf.trim()), seen);
      }
    }
  } catch { result = { ok: false }; }
  reading.delete(id);
  if (!result?.ok) {
    remote = remote.map((d) => (d.id === id ? { ...d, status: "error" } : d));
    toast("Je n'ai pas réussi à lire ce devoir.");
    if (view.name === "reading") go("drive");
    return;
  }
  const d = result.devoir;
  d.title = undash(d.title);
  remote = [d, ...remote.filter((x) => x.id !== id)];
  if (view.name !== "reading" || view.id !== id) return;
  renderTree(partialJSON(buf.trim()), seen);
  setTimeout(() => showReady(d.title), 250);
  setTimeout(() => { if (view.name === "reading" && view.id === id) openDevoir(id); }, 1750);
}

/* ================= Drive distant ================= */
let pollTimer = 0, lastIds = null;
async function refreshDrive() {
  try {
    const r = await fetch("/api/drive", { cache: "no-store" });
    const { devoirs: list = [] } = await r.json();
    const sig = (arr) => arr.map((d) => d.id + d.status).join();
    const changed = sig(list) !== sig(remote);
    const ids = new Set(list.map((d) => d.id));
    const lastIdsPrev = lastIds || new Set();
    const arrived = lastIds && list.some((d) => !lastIds.has(d.id));
    const ready = list.filter((d) => d.status === "ready" && !reading.has(d.id) && remote.find((x) => x.id === d.id)?.status === "processing");
    // un « devoir » sans exercice (photo qui n'en est pas un) est traité comme illisible
    list.forEach((d) => { if (d.status === "ready" && !d.exercices?.length) d.status = "error"; });
    list.forEach((d) => { d.title = undash(d.title); d.exercices?.forEach((e) => (e.titre = undash(e.titre))); });
    remote = list.map((d) => (reading.has(d.id) ? remote.find((x) => x.id === d.id) || d : d));
    lastIds = ids;
    if (arrived) {
      const fresh = list.find((d) => !lastIdsPrev.has(d.id) && d.status === "processing");
      if ($("#modal-root").innerHTML) closeModal();
      if (fresh && view.name !== "exo") startReading(fresh.id);
    }
    if (ready.length && ["drive", "folder", "landing", "intro"].includes(view.name)) {
      // le devoir qu'on attendait est prêt : on l'ouvre directement
      toast(`${ready[0].title} est prêt.`);
      openDevoir(ready[0].id);
    } else {
      ready.forEach((d) => toast(`${d.title} est prêt.`));
      if (changed && ["drive", "folder"].includes(view.name)) render();
    }
  } catch { /* hors ligne : on garde ce qu'on a */ }
}
function startPolling() {
  clearInterval(pollTimer);
  refreshDrive();
  pollTimer = setInterval(() => { if (!document.hidden) refreshDrive(); }, 2500);
  // une nouvelle version est publiée : l'onglet se met à jour tout seul (hors exercice en cours)
  const mine = document.querySelector('script[src*="app.js"]')?.src.match(/v=(\d+)/)?.[1];
  setInterval(async () => {
    if (document.hidden || view.name === "exo" || view.name === "reading" || listening || gaze.on) return;
    try {
      const html = await (await fetch("/", { cache: "no-store" })).text();
      const live = html.match(/app\.js\?v=(\d+)/)?.[1];
      if (mine && live && live !== mine) location.reload();
    } catch { /* hors ligne */ }
  }, 20000);
}

/* ================= Modales ================= */
function openModal(html, cls = "") {
  const root = $("#modal-root");
  root.innerHTML = `<div class="overlay" data-overlay><div class="modal ${cls}" role="dialog" aria-modal="true">
    <button class="modal-x" data-act="close" aria-label="Fermer">${I.x}</button>${html}</div></div>`;
  math(root);
  return $(".modal", root);
}
function closeModal() { $("#modal-root").innerHTML = ""; }

/* Déposer un devoir : QR pour le téléphone de l'AVS, ou fichier depuis cet appareil */
function openDeposit() {
  const url = `${location.origin}/m.html${view.name === "folder" ? `?m=${view.subject}` : ""}`;
  let qrSvg = "";
  try {
    const qr = qrcode(0, "M");
    qr.addData(url);
    qr.make();
    qrSvg = qr.createSvgTag({ cellSize: 6, margin: 0, scalable: true });
  } catch { qrSvg = `<p style="font-size:12px;word-break:break-all">${esc(url)}</p>`; }
  openModal(`<div class="qr-solo">
      <div class="qr">${qrSvg}<span class="qr-badge">${chameleon()}</span></div>
      <div class="waiting"><span class="dot"></span>En attente du devoir</div>
      <label class="link-file">${I.upload} Importer un PDF<input type="file" accept="application/pdf,image/*" multiple hidden id="file-in"></label>
    </div>`, "qr-modal");
  $("#file-in").addEventListener("change", (e) => e.target.files.length && depositFiles([...e.target.files]));
  const m = $("#modal-root .modal");
  const over = (on) => (e) => { e.preventDefault(); m.classList.toggle("over", on); };
  m.addEventListener("dragover", over(true));
  m.addEventListener("dragleave", over(false));
  m.addEventListener("drop", (e) => { over(false)(e); e.dataTransfer.files.length && depositFiles([...e.dataTransfer.files]); });
}
async function depositFiles(list) {
  const m = $("#modal-root .modal");
  if (m) m.innerHTML = `<div class="reading-state">${chameleon({ cls: "reader", branch: true })}</div>`;
  try {
    const session = uid(14);
    const files = [];
    for (const f of list.slice(0, 12)) {
      const pdf = f.type === "application/pdf";
      const body = pdf ? f : await compressImage(f);
      const r = await fetch(`/api/upload?s=${session}`, { method: "POST", headers: { "content-type": body.type || "image/jpeg" }, body });
      if (!r.ok) throw new Error();
      files.push({ url: (await r.json()).url, pdf });
    }
    const r = await fetch("/api/devoir", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ files, subject: view.name === "folder" ? view.subject : "" }) });
    if (!r.ok) throw new Error();
    const { devoir } = await r.json();
    remote = [devoir, ...remote];
    lastIds?.add(devoir.id);
    closeModal();
    startReading(devoir.id);
  } catch {
    toast("L'envoi n'a pas marché. Réessaie.");
    openDeposit();
  }
}
async function compressImage(file, max = 2000) {
  try {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * k);
    c.height = Math.round(bmp.height * k);
    c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise((res) => c.toBlob(res, "image/jpeg", 0.86));
  } catch {
    return file;
  }
}

/* ================= Événements ================= */
document.addEventListener("pointerdown", () => { if (SR && !listening && view.name !== "landing" && micWanted) startListening(true); }, { capture: true });
let micWanted = false;
document.addEventListener("click", async (e) => {
  const t = e.target;
  if (t.matches("[data-overlay]")) { closeModal(); return; }
  if (t.closest("#status")) { chat.show(); return; }
  const rd = t.closest("[data-read]");
  if (rd) { startReading(rd.dataset.read); return; }
  const ask = t.closest("[data-ask-del]");
  if (ask) {
    const d = findDevoir(ask.dataset.askDel);
    openModal(`<div class="confirm">${chameleon({ cls: "mini" })}
      <h2>Supprimer « ${esc(d?.title || "ce devoir")} » ?</h2>
      <p class="lead">Le brouillon et les réponses seront effacés.</p>
      <div class="modal-actions"><button class="btn ghost" data-act="close">Annuler</button><button class="btn red" data-del="${ask.dataset.askDel}">${I.trash} Supprimer</button></div></div>`, "sm");
    return;
  }
  const del = t.closest("[data-del]");
  if (del) {
    const id = del.dataset.del;
    closeModal();
    if (SEED.some((d) => d.id === id)) (db.hidden ||= []).push(id);
    else await fetch(`/api/drive?id=${id}`, { method: "DELETE" }).catch(() => {});
    remote = remote.filter((d) => d.id !== id);
    delete db.work[id];
    if (db.last?.id === id) db.last = null;
    save();
    render();
    toast("Devoir supprimé.");
    return;
  }
  const zoom = t.closest("[data-zoom]");
  if (zoom) { openModal(`<img src="${esc(zoom.dataset.zoom)}" alt="Page du devoir">`, "lightbox"); return; }
  if (t.closest("[data-resume]")) { go("exo", { id: db.last.id, ex: db.last.ex, q: db.last.q || 0 }); return; }
  const folder = t.closest("[data-folder]");
  if (folder) { go("folder", { subject: folder.dataset.folder }); return; }
  const dv = t.closest("[data-devoir]");
  if (dv) { openDevoir(dv.dataset.devoir); return; }
  const exo = t.closest("[data-exo]");
  if (exo) { go("exo", { id: view.id, ex: exo.dataset.exo, q: 0 }); return; }
  const ch = t.closest("[data-choice]");
  if (ch) { choose(+ch.dataset.choice); return; }
  const hm = t.closest("[data-homo]");
  if (hm) { homo.pick(hm.dataset.homo); return; }
  const vm = t.closest("[data-vmode]");
  if (vm) { setVmode(vm.dataset.vmode); return; }
  const et = t.closest("[data-ex]");
  if (et) { pendingAnswer = false; go("exo", { id: view.id, ex: et.dataset.ex, q: 0 }); return; }
  const qt = t.closest("[data-q]");
  if (qt) { pendingAnswer = false; view.q = +qt.dataset.q; render(); return; }

  const btn = t.closest("[data-act]");
  if (!btn) return;
  const actions = {
    start() { if (SR && !listening) startListening(true); go("intro"); },
    "try-gaze"() { tryGaze(); },
    skip() { go("drive"); },
    pop() { pop(btn); },
    back() { back(); },
    deposit() { openDeposit(); },
    close() { closeModal(); },
    export() { exportDevoir(); },
    "print-copie"() { printCopie(); },
    talk() {
      if (view.name === "exo") toggleDictation();
      else listening ? stopListening() : startListening(true);
    },
    gaze() { toggleGaze(); },
    "chat-close"() { chat.hide(); },
    vcycle() { const ks = Object.keys(VALIDATE); setVmode(ks[(ks.indexOf(vmode()) + 1) % ks.length]); },
    erase() { eraseLast(); },
    next() { moveQ(1); },
    verify() { verifyAnswer(); },
    prev() { moveQ(-1); },
    finish() { finishDevoir(); },
    "back-folder"() { closeModal(); back(); },
    "export-close"() { closeModal(); exportDevoir(); },
    read() { readBack(); },
    relance() { relance(); },
  };
  actions[btn.dataset.act]?.();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && $("#modal-root").innerHTML) closeModal();
  else if (e.key === "Escape" && view.name === "intro" && !gaze.on) go("drive");
  if (e.key === "Enter" && e.target.matches?.("[data-exo], [data-folder], [data-devoir]")) e.target.click();
  if (e.code === "Space" && view.name !== "landing" && !e.target.closest("input,textarea,[contenteditable]") && !$("#modal-root").innerHTML) {
    e.preventDefault();
    listening ? stopListening() : startListening(true);
  }
});
document.addEventListener("submit", (e) => {
  if (e.target.id === "type-in") {
    e.preventDefault();
    const inp = $("input", e.target);
    if (inp.value.trim()) { dictating = true; handleFinal(inp.value); }
    inp.value = "";
  }
});

const gazeBtns = (on) => {
  document.body.classList.toggle("gaze-mode", on);
  document.querySelectorAll('[data-act="gaze"]').forEach((b) => b.classList.toggle("on", on));
  const d = $("#dock-vmode");
  if (d) { d.hidden = !on; d.textContent = VALIDATE[vmode()].label; }
};
/* ================= Suivi du regard =================
   Tout tourne dans le navigateur (WebGazer) : aucune image ne quitte l'appareil.
   Fixer un bouton ~1 s le déclenche, le caméléon regarde là où tu regardes. */
const BLINK_MIN = 500, BLINK_MAX = 2500; // yeux fermés plus d'une demi-seconde = je valide
const WINK_MIN = 280;                     // clin d'œil : un seul œil fermé
const HOLD_MS = 1000;                     // une option ciblée reste sélectionnée au moins 1 s
const VALIDATE = {
  yeux: { label: "Fermer les yeux", hint: "ferme les yeux" },
  clin: { label: "Clin d'œil", hint: "fais un clin d'œil" },
  fixer: { label: "Fixer", hint: "fixe-la" },
  voix: { label: "Dire « valide »", hint: "dis « valide »" },
};
if (!db.vmig) { db.validate = "fixer"; db.vmig = 1; }
const vmode = () => (VALIDATE[db.validate] ? db.validate : "fixer");
const DWELL_MS = 1600;                    // fixer une option = la valider
const SNAP_PX = 110;                      // marge d'erreur : regarder à côté d'une case compte pour la case
const TARGETS = ".lines .to-check:not(.busy), .finish-modal .modal-actions .btn, .folder, .row2, .top .back, .ex-head .btn-back, .bar .b-prev, .bar .b-next"; // le regard : choisir une matière, un devoir, sortir, changer de question
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* Clignements (mêmes mesures que le regard) */
const blink = {
  ready: false, closed: false, since: 0, wink: false, wSince: 0, locked: null, wLocked: null,
  // renvoie "yeux" ou "clin" quand un geste volontaire vient de se terminer
  update(L, R) {
    const both = L > 0.45 && R > 0.45;
    const one = !both && Math.max(L, R) > 0.5 && Math.min(L, R) < 0.3;
    const now = performance.now();
    let done = null;
    if (both && !this.closed) { this.closed = true; this.since = now; this.locked = gaze.target; }
    if (!both && this.closed) {
      this.closed = false;
      const d = now - this.since;
      if (d >= BLINK_MIN && d <= BLINK_MAX) done = "yeux";
    }
    if (one && !this.wink) { this.wink = true; this.wSince = now; this.wLocked = gaze.target; }
    if (!one && this.wink) {
      this.wink = false;
      const d = now - this.wSince;
      if (!both && d >= WINK_MIN && d <= BLINK_MAX) { done = "clin"; this.locked = this.wLocked; }
    }
    return done;
  },
};

/* Filtre « One Euro » : très stable quand le regard se pose, réactif quand il se déplace */
class OneEuro {
  constructor(minCutoff = 0.9, beta = 0.012, dCutoff = 1) { Object.assign(this, { minCutoff, beta, dCutoff, x: null, dx: 0, t: 0 }); }
  alpha(cut, dt) { const tau = 1 / (2 * Math.PI * cut); return 1 / (1 + tau / dt); }
  filter(v, t) {
    if (this.x == null) { this.x = v; this.t = t; return v; }
    const dt = Math.max(1e-3, (t - this.t) / 1000);
    this.t = t;
    const dv = (v - this.x) / dt;
    this.dx += this.alpha(this.dCutoff, dt) * (dv - this.dx);
    const cut = this.minCutoff + this.beta * Math.abs(this.dx);
    this.x += this.alpha(cut, dt) * (v - this.x);
    return this.x;
  }
}

/* Résolution d'un petit système linéaire (pivot de Gauss) */
function solve(A, b) {
  const n = b.length, M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    const piv = M[c][c] || 1e-9;
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const k = M[r][c] / piv;
      if (k) for (let j = c; j <= n; j++) M[r][j] -= k * M[c][j];
    }
  }
  return M.map((r, i) => r[n] / (r[i] || 1e-9));
}

const LOOK = ["eyeLookInLeft", "eyeLookOutLeft", "eyeLookUpLeft", "eyeLookDownLeft", "eyeLookInRight", "eyeLookOutRight", "eyeLookUpRight", "eyeLookDownRight"];

/* ================= Suivi du regard (MediaPipe : iris + orientation de la tête) =================
   Tout tourne dans le navigateur : aucune image ne quitte l'appareil. */
const gaze = {
  on: false, tracking: false, x: 0, y: 0, target: null, since: 0, cooldown: 0, raf: 0,
  video: null, stream: null, lm: null, lastT: -1, feat: null, hist: [], samples: [], model: null,
  fx: new OneEuro(), fy: new OneEuro(),

  async start(recalibrate = false) {
    if (this.on) return true;
    if (!this.model && db.gazeModel) this.model = db.gazeModel;
    const quick = this.model && !recalibrate; // déjà calibré : on rallume directement
    if (!navigator.mediaDevices?.getUserMedia) { toast("Caméra indisponible sur cet appareil."); return false; }
    this.on = true;
    gazeBtns(true);
    const ov = document.createElement("div");
    ov.className = quick ? "calib quick" : "calib";
    ov.innerHTML = `<div class="calib-msg">Place ton visage face à l'écran</div>
      <div class="calib-cham"><span class="calib-ring"></span>${chameleon({ cls: "cham-maths" })}</div>
      <div class="cam-preview"></div>`;
    document.body.appendChild(ov);
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
      const v = (this.video = document.createElement("video"));
      v.playsInline = true;
      v.muted = true;
      v.srcObject = this.stream;
      $(".cam-preview", ov).appendChild(v);
      await v.play();
      await this.loadModel();
    } catch {
      this.stop();
      toast("Autorise la caméra pour le suivi du regard.");
      return false;
    }
    this.tick();
    // attendre un visage stable avant de calibrer
    const t0 = performance.now();
    while (this.on && !(this.feat && (quick || performance.now() - this.featSince > 600))) {
      if (performance.now() - t0 > 15000) { this.stop(); toast("Je ne vois pas ton visage. Rapproche-toi de la caméra."); return false; }
      await wait(100);
    }
    if (!this.on) return false;
    if (!quick) {
      await this.calibrate(ov);
      if (!this.on) return false;
      if (!this.fit()) { this.stop(); toast("Calibrage incomplet, recommence en regardant bien le caméléon."); return false; }
    }
    // une vidéo retirée de la page se met en pause : on la garde, invisible
    const hold = (this.hold = document.createElement("div"));
    hold.className = "cam-hidden";
    hold.appendChild(this.video);
    document.body.appendChild(hold);
    this.video.play().catch(() => {});
    ov.remove();
    this.dot = document.createElement("div");
    this.dot.className = "gaze-dot";
    document.body.appendChild(this.dot);
    this.tracking = true;
    return true;
  },

  async loadModel() {
    if (this.lm) return;
    const v = await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs");
    const files = await v.FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm");
    const opts = (delegate) => ({
      baseOptions: { modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task", delegate },
      runningMode: "VIDEO", numFaces: 1, outputFaceBlendshapes: true, outputFacialTransformationMatrixes: true,
    });
    try { this.lm = await v.FaceLandmarker.createFromOptions(files, opts("GPU")); }
    catch { this.lm = await v.FaceLandmarker.createFromOptions(files, opts("CPU")); }
    blink.ready = true;
  },

  // Mesures d'une image : position de l'iris dans chaque œil + orientation/position de la tête
  features(res) {
    const lm = res.faceLandmarks?.[0];
    if (!lm || lm.length < 478) return null;
    const ar = this.video.videoWidth / this.video.videoHeight || 1.6;
    const P = (i) => [lm[i].x * ar, lm[i].y];
    const eye = (inner, outer, up, lo, iris) => {
      const A = P(inner), B = P(outer), I = P(iris), U = P(up), L = P(lo);
      const ax = [B[0] - A[0], B[1] - A[1]], l2 = ax[0] ** 2 + ax[1] ** 2, d = [I[0] - A[0], I[1] - A[1]];
      return [(d[0] * ax[0] + d[1] * ax[1]) / l2, (ax[0] * d[1] - ax[1] * d[0]) / l2, Math.hypot(U[0] - L[0], U[1] - L[1]) / Math.sqrt(l2)];
    };
    const a = eye(133, 33, 159, 145, 468), b = eye(362, 263, 386, 374, 473);
    const m = res.facialTransformationMatrixes?.[0]?.data || [];
    const H = [m[8] || 0, m[9] || 0, m[12] || 0, m[13] || 0, (m[14] || 0) / 10];
    const bs = {};
    res.faceBlendshapes?.[0]?.categories.forEach((c) => (bs[c.categoryName] = c.score));
    const look = LOOK.map((k) => bs[k] || 0);
    const gx = a[0] - b[0], gy = a[1] - b[1];
    // tête : le bout du nez par rapport au milieu des yeux (orientation), et sa place dans l'image
    const N = P(1), E1 = P(33), E2 = P(263);
    const mid = [(E1[0] + E2[0]) / 2, (E1[1] + E2[1]) / 2], span = Math.hypot(E2[0] - E1[0], E2[1] - E1[1]) || 1;
    const hx = (N[0] - mid[0]) / span, hy = (N[1] - mid[1]) / span;
    return {
      f: [a[0], a[1], b[0], b[1], a[2], b[2], ...H, ...look, gx * gx, gy * gy, gx * gy, gx * H[0], gy * H[1], hx, hy, N[0], N[1], hx * hx, hy * hy, hx * hy],
      open: Math.min(a[2], b[2]),
      L: bs.eyeBlinkLeft || 0, R: bs.eyeBlinkRight || 0,
    };
  },

  tick() {
    if (!this.on) return;
    const v = this.video;
    if (v && v.readyState >= 2 && v.currentTime !== this.lastT) {
      this.lastT = v.currentTime;
      const now = performance.now();
      const m = this.features(this.lm.detectForVideo(v, now));
      if (m) {
        if (!this.feat) this.featSince = now;
        this.feat = m;
        this.gesture = blink.update(m.L, m.R) || this.gesture;
        if (m.open > 0.12 && !blink.closed) { this.hist.push(m.f); if (this.hist.length > 12) this.hist.shift(); }
        $(".cam-preview")?.classList.add("ok");
      } else {
        this.feat = null;
        $(".cam-preview")?.classList.remove("ok");
      }
      if (this.tracking) this.update(now);
    }
    this.raf = requestAnimationFrame(() => this.tick());
  },

  // 9 points : on regarde le caméléon, l'anneau se remplit pendant qu'on mesure
  async calibrate(ov) {
    const pts = [[8, 10], [92, 10], [92, 88], [8, 88]]; // un point dans chaque angle
    const box = $(".calib-cham", ov), ring = $(".calib-ring", ov), msg = $(".calib-msg", ov);
    msg.textContent = "Suis le caméléon avec ta tête";
    await wait(350);
    msg.classList.add("fade");
    this.samples = [];
    for (const [px, py] of pts) {
      if (!this.on) return;
      box.style.left = px + "%";
      box.style.top = py + "%";
      ring.style.setProperty("--p", 0);
      await wait(420);
      const r = box.querySelector(".ch-eye").getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const t0 = performance.now(), dur = 800;
      let last = null;
      while (performance.now() - t0 < dur && this.on) {
        if (this.feat && this.feat !== last && this.feat.open > 0.12 && !blink.closed) {
          this.samples.push({ f: this.feat.f, x: cx, y: cy });
          last = this.feat;
        }
        ring.style.setProperty("--p", (performance.now() - t0) / dur);
        await wait(16);
      }
      const svg = box.querySelector("svg");
      svg.classList.remove("lick"); void svg.getBoundingClientRect(); svg.classList.add("lick");
    }
  },

  // Régression ridge : mesures → position à l'écran
  fit() {
    const S = this.samples;
    if (S.length < 16) return false;
    const d = S[0].f.length;
    const mu = Array(d).fill(0), sd = Array(d).fill(0);
    S.forEach((s) => s.f.forEach((v, j) => (mu[j] += v / S.length)));
    S.forEach((s) => s.f.forEach((v, j) => (sd[j] += (v - mu[j]) ** 2 / S.length)));
    for (let j = 0; j < d; j++) sd[j] = Math.sqrt(sd[j]) || 1;
    const Z = S.map((s) => [...s.f.map((v, j) => (v - mu[j]) / sd[j]), 1]);
    const n = d + 1, lambda = 8; // plus de régularisation : 4 points seulement
    const A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j && i < d ? lambda : 0)));
    const bx = Array(n).fill(0), by = Array(n).fill(0);
    Z.forEach((z, k) => {
      for (let i = 0; i < n; i++) {
        bx[i] += z[i] * S[k].x;
        by[i] += z[i] * S[k].y;
        for (let j = i; j < n; j++) A[i][j] += z[i] * z[j];
      }
    });
    for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) A[i][j] = A[j][i];
    this.model = { mu, sd, wx: solve(A, bx), wy: solve(A, by) };
    db.gazeModel = this.model;
    save();
    return true;
  },
  predict(f) {
    const { mu, sd, wx, wy } = this.model;
    let x = wx[f.length], y = wy[f.length];
    f.forEach((v, j) => { const z = (v - mu[j]) / sd[j]; x += z * wx[j]; y += z * wy[j]; });
    return [x, y];
  },

  update(now) {
    const mode = vmode();
    const g = this.gesture;
    this.gesture = null;
    if (mode === "yeux" && blink.closed) {
      this.dot.classList.add("shut");
      this.raf2 = 0;
      return;
    }
    this.dot.classList.remove("shut");
    if (g === mode && blink.locked && now > this.cooldown) this.fire(blink.locked, now);
    if (!this.hist.length) return;
    // moyenne des dernières mesures, puis filtre : le curseur glisse au lieu de trembler
    const k = Math.min(4, this.hist.length), avg = this.hist.slice(-k).reduce((s, f) => s.map((v, j) => v + f[j] / k), Array(this.hist[0].length).fill(0));
    let [px, py] = this.predict(avg);
    // plus réactif : un petit mouvement de tête suffit (les cases sont aux opposés de l'écran)
    const GAIN = 1.6;
    px = innerWidth / 2 + (px - innerWidth / 2) * GAIN;
    py = innerHeight / 2 + (py - innerHeight / 2) * GAIN;
    px = this.fx.filter(px, now);
    py = this.fy.filter(py, now);
    this.x = Math.min(innerWidth - 30, Math.max(30, px));
    this.y = Math.min(innerHeight - 30, Math.max(30, py));
    this.dot.style.transform = `translate(${this.x}px, ${this.y}px)`;
    lookAt(this.x, this.y);
    if (!(mode === "clin" && blink.wink)) {
      const el = this.pick(this.x, this.y);
      if (el !== this.target) {
        this.target?.classList.remove("gaze-focus");
        this.target = el;
        this.since = now;
        el?.classList.add("gaze-focus");
        if (el?.matches("[data-focus]")) setFocus(el);
      }
    }
    const p = mode === "fixer" && this.target && now > this.cooldown ? Math.min(1, (now - this.since) / DWELL_MS) : 0;
    this.ring(this.target, p);
    if (p >= 1) this.fire(this.target, now);
  },

  // cible = le bouton le plus proche du regard (aimant), avec un peu d'inertie
  pick(x, y) {
    let best = null, bestD = Infinity, curD = Infinity;
    // une fenêtre est ouverte : le regard n'agit que sur elle, jamais sur la page derrière
    const modal = $("#modal-root .modal");
    if (chat.open && !modal) return null; // pendant la discussion avec Léon, le regard ne déclenche rien
    for (const el of (modal || document).querySelectorAll(TARGETS)) {
      const r = el.getBoundingClientRect();
      if (!r.width || r.bottom < 0 || r.top > innerHeight || el.closest("[hidden]") || el.disabled) continue;
      const dx = Math.max(r.left - x, 0, x - r.right), dy = Math.max(r.top - y, 0, y - r.bottom);
      const d = Math.hypot(dx, dy);
      if (d < bestD) { bestD = d; best = el; }
      if (el === this.target) curD = d;
    }
    if (this.target && curD < SNAP_PX * 2.2 && (performance.now() - this.since < HOLD_MS || curD - bestD < 60)) return this.target;
    return bestD < SNAP_PX ? best : null;
  },

  // contour qui part de midi et fait le tour de la case dans le sens des aiguilles d'une montre
  ring(el, p) {
    let r = this.ringEl;
    if (!r) {
      r = this.ringEl = document.createElement("div");
      r.className = "gaze-ring";
      r.innerHTML = `<svg><path class="track" pathLength="1"/><path class="fill" pathLength="1"/></svg>`;
      document.body.appendChild(r);
    }
    if (!el?.isConnected) { r.style.opacity = 0; r.dataset.key = ""; return; }
    const b = el.getBoundingClientRect(), pad = 8, sw = 2.5;
    const w = b.width + pad * 2, h = b.height + pad * 2;
    const rad = Math.min((parseFloat(getComputedStyle(el).borderTopLeftRadius) || 12) + pad, h / 2, w / 2);
    r.style.opacity = 1;
    r.style.transform = `translate(${b.left - pad}px, ${b.top - pad}px)`;
    r.style.width = w + "px";
    r.style.height = h + "px";
    const key = `${Math.round(w)}x${Math.round(h)}x${Math.round(rad)}`;
    if (r.dataset.key !== key) {
      r.dataset.key = key;
      const x0 = sw, y0 = sw, x1 = w - sw, y1 = h - sw, R = Math.max(0, rad - sw);
      const d = `M ${w / 2} ${y0} H ${x1 - R} A ${R} ${R} 0 0 1 ${x1} ${y0 + R} V ${y1 - R} A ${R} ${R} 0 0 1 ${x1 - R} ${y1} H ${x0 + R} A ${R} ${R} 0 0 1 ${x0} ${y1 - R} V ${y0 + R} A ${R} ${R} 0 0 1 ${x0 + R} ${y0} Z`;
      r.querySelectorAll("path").forEach((x) => x.setAttribute("d", d));
    }
    r.querySelector(".fill").style.strokeDashoffset = 1 - p;
    r.classList.toggle("full", p >= 1);
  },

  fire(el, now) {
    if (!el?.isConnected) return;
    el.classList.remove("gaze-focus");
    el.classList.add("gaze-fired");
    setTimeout(() => el.classList.remove("gaze-fired"), 500);
    // chaque sélection réussie affine le calibrage : l'élève regardait cette case
    const b = el.getBoundingClientRect();
    this.hist.slice(-6).forEach((f) => this.samples.push({ f, x: b.left + b.width / 2, y: b.top + b.height / 2 }));
    if (this.samples.length > 600) this.samples.splice(0, this.samples.length - 600);
    this.fit();
    el.click();
    this.cooldown = now + 900;
    this.target = null;
  },

  // couper / rallumer en un instant : la caméra reste prête
  pause() {
    this.tracking = false;
    this.paused = true;
    this.target?.classList.remove("gaze-focus");
    this.target = null;
    if (this.dot) this.dot.style.display = "none";
    if (this.ringEl) this.ringEl.style.opacity = 0;
    gazeBtns(false);
  },
  resume() {
    this.paused = false;
    if (this.dot) this.dot.style.display = "";
    this.since = performance.now();
    this.tracking = true;
    gazeBtns(true);
  },
  stop() {
    this.on = false;
    this.paused = false;
    this.tracking = false;
    cancelAnimationFrame(this.raf);
    this.dot?.remove();
    this.dot = null;
    this.ringEl?.remove();
    this.ringEl = null;
    this.target?.classList.remove("gaze-focus");
    this.target = null;
    document.querySelector(".calib")?.remove();
    this.stream?.getTracks().forEach((t) => t.stop());
    this.hold?.remove();
    this.hold = null;
    this.stream = null;
    this.video = null;
    this.feat = null;
    this.hist = [];
    this.fx = new OneEuro();
    this.fy = new OneEuro();
    gazeBtns(false);
  },
};
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && gaze.on) gaze.stop(); });

/* Ses yeux suivent le doigt ou la souris */
let eyeRaf = 0, pointer = null;
function lookAt(x, y) {
  pointer = { x, y };
  if (eyeRaf) return;
  eyeRaf = requestAnimationFrame(() => {
    eyeRaf = 0;
    document.querySelectorAll(".cham").forEach((svg) => {
      const eye = svg.querySelector(".ch-eye");
      const pupil = svg.querySelector(".ch-pupil");
      if (!eye || !pupil) return;
      const r = eye.getBoundingClientRect();
      const dx = pointer.x - (r.left + r.width / 2), dy = pointer.y - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 160) * 3.4;
      pupil.setAttribute("transform", `translate(${(dx / d) * k - 1} ${(dy / d) * k})`);
    });
  });
}
document.addEventListener("pointermove", (e) => { if (!gaze.tracking) lookAt(e.clientX, e.clientY); });
window.addEventListener("resize", () => { if (view.name === "exo") placeWalker(); });

if ("speechSynthesis" in window) speechSynthesis.getVoices();
(async () => {
  const [k, v = ""] = location.hash.slice(1).split("=");
  if (k === "demo-scan") { startPolling(); return demoScan(); }
  if (["d", "x"].includes(k)) await refreshDrive();
  if (k === "drive") view = { name: "drive" };
  else if (k === "f" && SUBJECTS[v]) view = { name: "folder", subject: v };
  else if (k === "d" && findDevoir(v)) view = { name: "devoir", id: v };
  else if (k === "x" && findDevoir(v.split("/")[0])) view = { name: "exo", id: v.split("/")[0], ex: v.split("/")[1], q: 0 };
  render();
  startPolling();
})();
