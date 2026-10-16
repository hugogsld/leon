import { put, list } from "@vercel/blob";

// Le Drive de l'élève : un fichier JSON par état de devoir, jamais réécrit
// (les URLs publiques de Blob sont mises en cache, on évite donc d'écraser).
export const STUDENT = "tom";
const ID_RE = /^[a-z0-9]{6,32}$/;
export const validId = (id) => ID_RE.test(id || "");

export async function saveDevoir(devoir, state) {
  await put(`drive/${STUDENT}/${devoir.id}.${state}.json`, JSON.stringify({ ...devoir, status: state }), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function listDevoirs() {
  const { blobs } = await list({ prefix: `drive/${STUDENT}/` });
  const rank = { processing: 0, error: 1, ready: 2, deleted: 3 };
  const best = new Map();
  for (const b of blobs) {
    const m = b.pathname.match(/\/([a-z0-9]+)\.(processing|ready|error|deleted)\.json$/);
    if (!m) continue;
    const [, id, state] = m;
    if (!best.has(id) || rank[state] > rank[best.get(id).state]) best.set(id, { state, url: b.url });
  }
  const items = await Promise.all(
    [...best.values()].filter((x) => x.state !== "deleted").map((x) => fetch(x.url).then((r) => r.json()).catch(() => null)),
  );
  return items.filter(Boolean).sort((a, b) => b.createdAt - a.createdAt);
}

export async function getDevoir(id) {
  const { blobs } = await list({ prefix: `drive/${STUDENT}/${id}.` });
  const rank = { processing: 0, error: 1, ready: 2, deleted: 3 };
  const best = blobs
    .map((b) => ({ b, state: b.pathname.match(/\.(processing|ready|error|deleted)\.json$/)?.[1] }))
    .filter((x) => x.state)
    .sort((x, y) => rank[y.state] - rank[x.state])[0];
  return best ? fetch(best.b.url).then((r) => r.json()) : null;
}
