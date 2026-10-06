import { runAgent } from "@/lib/agent";
import type { HistoryMessage } from "@/lib/chat-types";

export const runtime = "nodejs";
export const maxDuration = 180;

export async function POST(request: Request) {
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 16000) return Response.json({ error: "Permintaan terlalu panjang." }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Kirim JSON yang valid." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return Response.json({ error: "Permintaan tidak valid." }, { status: 400 });
  const { message, history = [] } = body as { message: unknown; history?: unknown };
  if (typeof message !== "string" || !message.trim() || message.length > 1000 || !Array.isArray(history) || history.length > 6 || history.some((entry) => !entry || typeof entry !== "object" || !["user", "assistant"].includes(entry.role) || typeof entry.content !== "string" || !entry.content.trim() || entry.content.length > 1500)) {
    return Response.json({ error: "Pesan wajib diisi (maksimal 1.000 karakter). Riwayat maksimal 6 pesan pendek." }, { status: 400 });
  }
  try {
    return Response.json(await runAgent(message.trim(), history as HistoryMessage[]), { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "";
    const missing = detail === "CONFIG_MISSING";
    const status = error && typeof error === "object" && "status" in error ? error.status : undefined;
    console.error("CampusBite search failed", {
      code: ["CONFIG_MISSING", "TOOL_LIMIT", "INVALID_AGENT_RESPONSE", "AGENT_INCOMPLETE"].includes(detail) ? detail : "PROVIDER_OR_FORMAT_ERROR",
      status,
    });
    // Do not send or log provider errors that may contain credentials or request URLs.
    return Response.json({ error: missing ? "Konfigurasi Gemini belum lengkap. Isi GEMINI_API_KEY dan GEMINI_MODEL di server." : status === 429 ? "Batas permintaan Gemini tercapai. Tunggu sebentar lalu coba lagi, atau periksa kuota API." : "Pencarian belum berhasil diselesaikan. Coba lagi sebentar; periksa konfigurasi dan kuota Gemini jika masalah berlanjut." }, { status: missing ? 503 : status === 429 ? 429 : 502 });
  }
}
