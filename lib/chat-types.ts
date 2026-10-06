import type { Menu } from "./menu";

export type HistoryMessage = { role: "user" | "assistant"; content: string };
export type AgentTrace = { tool: string; arguments: Record<string, unknown>; resultCount: number; error?: string };
export type ChatResult = { answer: string; results: (Menu & { reason: string })[]; trace: AgentTrace[] };
