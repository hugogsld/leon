// Appel Gemini avec modèles de secours (un modèle surchargé renvoie 503 : on passe au suivant)
const MODELS = [process.env.GEMINI_TEXT_MODEL || "gemini-3.8-flash", "gemini-3.5-flash", "gemini-2.5-flash"];

export async function gemini({ system, contents, json, maxTokens = 1500, temperature = 0.4, timeoutMs = 9000, fast = false }) {
  if (!process.env.GEMINI_API_KEY) return null;
  const deadline = Date.now() + timeoutMs;
  for (const model of [...new Set(fast ? ["gemini-3.5-flash-lite", ...MODELS] : MODELS)]) {
    const left = deadline - Date.now();
    if (left < 800) break;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), left);
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST", signal: ctrl.signal,
        headers: { "x-goog-api-key": process.env.GEMINI_API_KEY, "content-type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents,
          generationConfig: { temperature, maxOutputTokens: maxTokens, thinkingConfig: { thinkingBudget: 0 }, ...(json ? { responseMimeType: "application/json", responseSchema: json } : {}) },
        }),
      });
      if (!r.ok) continue;
      const text = (await r.json()).candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("").trim();
      if (text) return text;
    } catch { /* délai ou réseau : modèle suivant */ } finally { clearTimeout(timer); }
  }
  return null;
}
