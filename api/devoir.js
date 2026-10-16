import { saveDevoir } from "./_drive.js";

const BLOB_HOST = /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\//;
const SUBJECTS = ["maths", "francais", "histoire", "autre"];

// Dépôt d'un devoir (téléphone de l'AVS ou ordinateur) : il entre dans le Drive « à lire ».
// La lecture elle-même se fait en direct depuis l'écran de l'élève (api/decompose).
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const files = Array.isArray(body.files) ? body.files.filter((f) => typeof f?.url === "string" && BLOB_HOST.test(f.url)).slice(0, 12) : [];
  if (!files.length) return Response.json({ error: "fichiers" }, { status: 400 });

  const id = Array.from(crypto.getRandomValues(new Uint8Array(12)), (b) => "abcdefghijklmnopqrstuvwxyz0123456789"[b % 36]).join("");
  const devoir = {
    id,
    subject: SUBJECTS.includes(body.subject) ? body.subject : null,
    title: typeof body.title === "string" ? body.title.slice(0, 80).trim() : "",
    createdAt: Date.now(),
    files: files.map((f) => ({ url: f.url, pdf: !!f.pdf })),
    exercices: [],
  };
  await saveDevoir(devoir, "processing");
  return Response.json({ devoir: { ...devoir, status: "processing" } });
}
