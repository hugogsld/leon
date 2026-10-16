import { listDevoirs, saveDevoir, validId } from "./_drive.js";

export async function GET() {
  const devoirs = await listDevoirs();
  return Response.json({ devoirs }, { headers: { "cache-control": "no-store" } });
}

// Retirer un devoir du Drive
export async function DELETE(request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!validId(id)) return Response.json({ error: "id" }, { status: 400 });
  await saveDevoir({ id }, "deleted");
  return Response.json({ ok: true });
}
