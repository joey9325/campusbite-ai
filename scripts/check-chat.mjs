import assert from "node:assert/strict";

const base = process.env.TEST_BASE_URL || "http://localhost:3000";
async function chat(message, history) {
  const response = await fetch(`${base}/api/chat`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });
  const body = await response.json();
  assert.equal(response.status, 200, body.error);
  assert(body.trace.length > 0 && typeof body.answer === "string");
  return body;
}
for (const body of ["not-json", "null", JSON.stringify({ message: " " }), JSON.stringify({ message: "x", history: [{ role: "system", content: "x" }] })]) {
  const response = await fetch(`${base}/api/chat`, { method: "POST", body });
  assert.equal(response.status, 400);
}
const chicken = await chat("Aku punya budget Rp20.000 dan mau ayam.");
const japanese = await chat("Ada makanan dari Japanese Food di bawah Rp30.000?");
const cheapest = await chat("Menu paling murah apa?");
const wagyu = await chat("Ada steak wagyu Rp10.000? Jangan mengarang jika tidak ada.");
assert(chicken.results.length > 0 && chicken.results.every((menu) => menu.name.toLowerCase().includes("ayam") && menu.price !== null && menu.price <= 20000));
assert(japanese.results.length > 0 && japanese.results.every((menu) => menu.stall === "Japanese Food" && menu.price !== null && menu.price < 30000));
assert(cheapest.results.length > 0 && cheapest.results.every((menu) => menu.price === 5000));
assert(cheapest.trace.some((entry) => entry.tool === "price_extreme"));
assert.equal(wagyu.results.length, 0);
assert.match(wagyu.answer, /Tidak ada menu/);
const stalls = await chat("Stall apa saja yang ada?");
assert(stalls.trace.some((entry) => entry.tool === "list_stalls") && stalls.answer.includes("Japanese Food"));
const compared = await chat("Bandingkan Soto ayam biasa dan Soto ayam Special dari Soto Ayam Jago.");
assert(compared.trace.some((entry) => entry.tool === "compare_menu"));
assert.equal(compared.results.length, 2);
console.log("Live API checks passed: four requested scenarios, stall listing, comparison, and invalid requests.");
