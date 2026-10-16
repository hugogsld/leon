// Voix de Léon : Gemini (Google) en priorité, ElevenLabs en secours, sinon la voix du navigateur.
export const config = { maxDuration: 30 };

const STYLE = "Dis-le en français, avec une voix chaleureuse, enjouée et un peu malicieuse de petit personnage bienveillant, à un rythme posé : ";

// Gemini peut renvoyer du PCM brut : on l'emballe en WAV pour le navigateur
function wav(pcm, rate = 24000) {
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8);
  h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(rate, 24); h.writeUInt32LE(rate * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

async function gemini(text) {
  const ctrl = new AbortController();
  setTimeout(() => ctrl.abort(), 6000);
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_TTS_MODEL || "gemini-3.8-flash-tts"}:generateContent`, {
    method: "POST",
    signal: ctrl.signal,
    headers: { "x-goog-api-key": process.env.GEMINI_API_KEY, "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text }] }],
      generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: process.env.GEMINI_VOICE || "Puck" } } } },
    }),
  });
  if (!r.ok) return null;
  const part = (await r.json()).candidates?.[0]?.content?.parts?.find((p) => p.inlineData)?.inlineData;
  if (!part) return null;
  const raw = Buffer.from(part.data, "base64");
  const isPcm = /L16|pcm/i.test(part.mimeType);
  const rate = +(part.mimeType.match(/rate=(\d+)/)?.[1] || 24000);
  return new Response(isPcm ? wav(raw, rate) : raw, { headers: { "content-type": isPcm ? "audio/wav" : part.mimeType, "cache-control": "no-store" } });
}

async function eleven(text) {
  const voice = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY, "content-type": "application/json", accept: "audio/mpeg" },
    body: JSON.stringify({ text, model_id: "eleven_multilingual_v2", voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.35 } }),
  });
  return r.ok ? new Response(r.body, { headers: { "content-type": "audio/mpeg", "cache-control": "no-store" } }) : null;
}

export async function POST(request) {
  const { text = "" } = await request.json().catch(() => ({}));
  const clean = String(text).slice(0, 600).trim();
  if (!clean) return Response.json({ error: "vide" }, { status: 400 });
  if (!process.env.GEMINI_API_KEY && !process.env.ELEVENLABS_API_KEY) return Response.json({ error: "no_key" }, { status: 503 });
  try {
    const res = (process.env.GEMINI_API_KEY && (await gemini(clean))) || (process.env.ELEVENLABS_API_KEY && (await eleven(clean)));
    if (res) return res;
  } catch { /* on passe à la voix du navigateur */ }
  return Response.json({ error: "voix" }, { status: 502 });
}
