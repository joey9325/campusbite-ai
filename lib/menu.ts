import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";

export type Menu = {
  id: string; name: string; stall: string; price: number | null;
  displayPrice: string; description: string; image: string | null;
};

export function parsePrice(value: string): number | null {
  const cleaned = value.trim().replace(/^Rp\s*/i, "");
  if (!/^\d+(?:[.,]\d{3})*$/.test(cleaned)) return null;
  const price = Number(cleaned.replace(/[.,]/g, ""));
  return Number.isSafeInteger(price) && price >= 0 ? price : null;
}

export function normalizeImage(value: string): string | null {
  const filename = value.trim().replace(/\\/g, "/").split("/").pop();
  if (!filename || filename === "." || filename === "..") return null;
  return existsSync(path.join(process.cwd(), "public/menu-images", filename))
    ? `/menu-images/${encodeURIComponent(filename)}` : null;
}

let cached: Menu[] | undefined;
export function getMenu(): Menu[] {
  if (!cached) {
    const rows: Record<string, string>[] = parse(
      readFileSync(path.join(process.cwd(), "data/menu-kantin.csv"), "utf8"),
      { columns: true, skip_empty_lines: true, bom: true, trim: true },
    );
    cached = rows.map((row, index) => ({
      id: `menu-${index + 1}`, name: row["Nama Produk"], stall: row["Nama Stall"],
      price: parsePrice(row.Harga), displayPrice: row.Harga,
      description: row["Keterangan Tambahan"] || "", image: normalizeImage(row.Gambar),
    }));
  }
  return cached;
}

export const toolNames = ["search_menu", "filter_budget", "filter_stall", "price_extreme", "compare_menu", "list_stalls"] as const;
export type ToolName = typeof toolNames[number];
export type ToolResult = { menus: Menu[]; stalls?: string[]; total: number };

export function executeTool(name: string, input: Record<string, unknown>): ToolResult {
  if (!toolNames.includes(name as ToolName)) throw new Error("Unknown menu tool");
  const allowed = ["keyword", "stall", "maxBudget", "inclusive", "order", "ids"];
  if (Object.keys(input).some((key) => !allowed.includes(key))) throw new Error("Unknown tool argument");
  for (const key of ["keyword", "stall"]) {
    if (input[key] !== undefined && (typeof input[key] !== "string" || input[key].length > 150)) throw new Error("Invalid text filter");
  }
  if (input.maxBudget !== undefined && (typeof input.maxBudget !== "number" || !Number.isFinite(input.maxBudget) || input.maxBudget < 0)) throw new Error("Invalid budget");
  if (input.inclusive !== undefined && typeof input.inclusive !== "boolean") throw new Error("Invalid budget boundary");
  if (name === "filter_budget" && input.maxBudget === undefined) throw new Error("Budget required");
  if (name === "filter_stall" && !input.stall) throw new Error("Stall required");
  if (name === "price_extreme" && !["cheapest", "most_expensive"].includes(String(input.order))) throw new Error("Price order required");
  if (name === "compare_menu" && (!Array.isArray(input.ids) || input.ids.length < 2 || input.ids.length > 6 || input.ids.some((id) => typeof id !== "string"))) throw new Error("Provide 2–6 menu IDs from search results");
  const all = getMenu();
  if (name === "list_stalls") {
    const stalls = [...new Set(all.map((menu) => menu.stall))];
    return { menus: [], stalls, total: stalls.length };
  }
  const keyword = String(input.keyword || "").toLocaleLowerCase("id").trim();
  const stall = String(input.stall || "").toLocaleLowerCase("id").trim();
  let menus = all.filter((menu) =>
    (!keyword || keyword.split(/\s+/).every((word) => menu.name.toLocaleLowerCase("id").includes(word))) &&
    (!stall || menu.stall.toLocaleLowerCase("id") === stall) &&
    (input.maxBudget === undefined || (menu.price !== null && (input.inclusive === false ? menu.price < (input.maxBudget as number) : menu.price <= (input.maxBudget as number)))),
  );
  if (name === "compare_menu") {
    const ids = input.ids as string[];
    if (ids.some((id) => !all.some((menu) => menu.id === id))) throw new Error("Unknown menu ID");
    menus = menus.filter((menu) => ids.includes(menu.id));
  }
  if (name === "price_extreme") {
    const prices = menus.flatMap((menu) => menu.price === null ? [] : [menu.price]);
    const target = input.order === "cheapest" ? Math.min(...prices) : Math.max(...prices);
    menus = menus.filter((menu) => menu.price === target);
  }
  return { menus, total: menus.length };
}
