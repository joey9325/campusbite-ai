"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Menu } from "@/lib/menu";
import type { ChatResult, HistoryMessage } from "@/lib/chat-types";

const suggestions = ["Budget Rp20.000, mau ayam", "Japanese Food di bawah Rp30.000", "Menu paling murah apa?"];

export default function FoodSearch({ featured }: { featured: Menu[] }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ChatResult | null>(null);
  const [history, setHistory] = useState<HistoryMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState("");
  const isQueryEmpty = query.trim().length === 0;
  const isSubmitDisabled = loading || isQueryEmpty;
  async function search(message: string) {
    if (!message.trim() || loading) return;
    setQuery(message); setLoading(true); setError(""); setSearched(message); setResult(null);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message, history }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Pencarian gagal. Coba lagi.");
      setResult(data);
      const context = `${data.answer}\n${(data as ChatResult).results.map((menu) => `${menu.id}: ${menu.name}, ${menu.displayPrice || "harga belum tercatat"}, ${menu.stall}`).join("\n")}`.slice(0, 1500);
      setHistory((previous) => [...previous, { role: "user" as const, content: message }, { role: "assistant" as const, content: context }].slice(-6));
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Koneksi terputus. Coba lagi."); }
    finally { setLoading(false); }
  }
  function submit(event: FormEvent) { event.preventDefault(); void search(query); }
  const items = result ? result.results : searched ? [] : featured;
  return <div className="site">
    <header className="header">
      <Link className="brand" href="/" aria-label="CampusBite AI beranda">CampusBite <span>AI</span></Link>
      <span className="header-note">Cari makan di kantin</span>
    </header>
    <main>
      <section className="search-section" aria-labelledby="search-title">
        <h1 id="search-title">Lagi pengen makan apa?</h1>
        <p className="subtitle" id="search-help">Cari menu sesuai budget, makanan yang kamu inginkan, atau stall.</p>
        <form className="search-form" onSubmit={submit} role="search" aria-label="Pencarian menu kantin">
          <label className="sr-only" htmlFor="food-query">Cari makanan dengan bahasa sehari-hari</label>
          <input id="food-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Budget 20 ribu, pengen ayam..." aria-describedby="search-help" maxLength={1000} required disabled={loading} />
          <button type="submit" disabled={isSubmitDisabled}>{loading ? "Mencari…" : "Cari menu"}</button>
        </form>
        <div className="suggestions"><span>Coba:</span>{suggestions.map((suggestion) => <button key={suggestion} disabled={loading} onClick={() => void search(suggestion)}>{suggestion}</button>)}</div>
      </section>
      <section className="results-section" aria-labelledby="results-title" aria-busy={loading}>
        <div className="section-heading">
          <h2 id="results-title">{searched ? "Hasil pencarian" : "Jelajahi menu kantin"}</h2>
          {searched && !loading && <button className="text-button" onClick={() => { setResult(null); setSearched(""); setQuery(""); setHistory([]); setError(""); }}>Lihat menu awal</button>}
        </div>
        <p className="sr-only" aria-live="polite" role="status">{loading ? "Sedang mencari menu sesuai permintaanmu." : result ? items.length ? `${items.length} pilihan menu ditampilkan.` : result.answer : ""}</p>
        {loading && <div className="status-state"><p>Memeriksa menu, harga, dan stall sesuai permintaanmu…</p></div>}
        {error && <div className="error-state" role="alert"><h3>Pencarian belum berhasil</h3><p>{error}</p><button className="text-button" onClick={() => void search(searched)}>Coba lagi</button></div>}
        {result && !items.length && <div className="empty-state"><p className="answer">{result.answer}</p><p>Sebutkan menu atau stall, atau coba budget lain.</p></div>}
        {!!items.length && <div className="menu-grid">{items.map((menu, index) => <article className="menu-item" key={menu.id}>
          <div className="food-image"><span aria-hidden="true">Foto belum tersedia</span>{menu.image && <Image src={menu.image} alt={menu.name} fill sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 960px) 50vw, 33vw" priority={!searched && index < 3} onError={(event) => { event.currentTarget.style.display = "none"; }} />}</div>
          <h3>{menu.name}</h3>
          <p className={menu.price === null ? "price price-unknown" : "price"}>{menu.price === null ? "Harga belum tersedia" : menu.displayPrice}</p>
          <p className="stall">{menu.stall}</p>
          {"reason" in menu && <p className="reason">{String(menu.reason)}</p>}
          {menu.description && <details className="menu-description"><summary>Keterangan menu</summary><p>{menu.description}</p></details>}
        </article>)}</div>}
        {result && !!items.length && <p className="answer results-note">{result.answer}</p>}
        {result && <details className="agent-trace"><summary>Agent Trace</summary><ol>{result.trace.map((entry, index) => <li key={index}><strong>{entry.tool}</strong><span>{entry.error || `${entry.resultCount} hasil dari CSV`}</span><code>{JSON.stringify(entry.arguments)}</code></li>)}</ol><p>Gemini memilih tool. Informasi menu berasal dari data kantin.</p></details>}
      </section>
    </main>
    <footer><p>Prototipe dengan satu dataset kantin. Harga mengikuti data yang tercatat; konfirmasi kembali di stall.</p></footer>
  </div>;
}


