import { put } from "@vercel/blob";

const SESSION_RE = /^[a-z0-9]{8,32}$/;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"];

// Reçoit une photo (téléphone) ou un fichier (ordinateur) pour une session donnée.
export async function POST(request) {
  const url = new URL(request.url);
  const session = url.searchParams.get("s") || "";
  if (!SESSION_RE.test(session)) return Response.json({ error: "session" }, { status: 400 });

  const type = (request.headers.get("content-type") || "").split(";")[0].trim();
  if (!ALLOWED.includes(type)) return Response.json({ error: "type" }, { status: 415 });

  const body = await request.arrayBuffer();
  if (!body.byteLength) return Response.json({ error: "vide" }, { status: 400 });

  const ext = type === "application/pdf" ? "pdf" : type.split("/")[1].replace("jpeg", "jpg");
  const blob = await put(`s/${session}/${Date.now()}.${ext}`, Buffer.from(body), {
    access: "public",
    contentType: type,
    addRandomSuffix: true,
  });
  return Response.json({ ok: true, url: blob.url });
}
