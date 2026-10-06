# CampusBite AI

CampusBite AI adalah asisten kantin kampus berbasis Agentic AI yang membantu mahasiswa menemukan makanan sesuai budget, preferensi makanan, dan stall yang tersedia melalui bahasa sehari-hari.

Proyek ini dikembangkan untuk **NUSA Lab Vibe Coding Challenge**.

## Masalah

Mahasiswa sering perlu memilih makanan dengan cepat, sambil mempertimbangkan:

- Budget yang dimiliki.
- Makanan yang sedang diinginkan.
- Pilihan stall di kantin.

Informasi menu kantin biasanya tersebar dan belum mudah dicari dengan bahasa sehari-hari. Untuk menemukan pilihan yang sesuai, mahasiswa perlu memeriksa menu dan harga satu per satu.

## Solusi

CampusBite AI menggunakan Gemini sebagai agent yang menentukan tool menu di server sesuai permintaan pengguna. Misalnya, permintaan ayam dengan budget tertentu dapat diproses melalui tool penyaringan harga dan kata kunci.

Semua fakta menu—nama, harga, stall, keterangan, dan referensi gambar—berasal dari dataset terstruktur di `data/menu-kantin.csv`. Tool menjalankan pencarian secara deterministik; Gemini memilih rekomendasi dari hasil yang ditemukan. Aplikasi memvalidasi ID menu dan menyusun informasi yang ditampilkan dari data tersebut.

Prototipe saat ini menggunakan dataset dari satu kantin kampus sebagai **proof of concept**. Identitas produk tidak terikat pada satu universitas. Arsitekturnya dapat mendukung dataset dari kampus lain dengan struktur kolom yang sama dan gambar yang sesuai.

Jika tidak ada menu yang cocok, aplikasi menyampaikan bahwa hasil tidak ditemukan. Harga yang kosong diperlakukan sebagai belum diketahui, bukan nol atau gratis.

## Fitur

- **Pencarian bahasa alami:** cari menu dengan kalimat sehari-hari.
- **Filter budget:** temukan menu dengan batas harga tertentu.
- **Filter stall:** cari menu dari stall yang diinginkan.
- **Pencarian termurah atau termahal:** berdasarkan harga yang tercatat dan kriteria pencarian.
- **Perbandingan menu:** bandingkan harga dan keterangan beberapa pilihan.
- **Gambar menu:** tampilkan foto dari folder `public/menu-images/`.
- **Agent Trace:** lihat tool yang dipilih, parameter pencarian, dan jumlah hasil dalam panel yang dapat dibuka.

## Cara Kerja

```text
User
→ Next.js UI
→ /api/chat
→ Gemini Agent
→ Tool Selection
→ CSV Dataset
→ Tool Result
→ Gemini Recommendation
→ UI
```

UI mengirim pesan dan, jika ada, riwayat percakapan singkat melalui `POST /api/chat`. Gemini menggunakan function calling untuk memilih tool: pencarian menu, filter budget, filter stall, pencarian harga ekstrem, perbandingan menu, atau daftar stall.

Kode di server menjalankan tool terhadap dataset CSV, lalu mengirim hasilnya kembali ke Gemini. Agent mengamati hasil tool, dapat melakukan pencarian lanjutan, lalu menghasilkan pilihan rekomendasi akhir. Aplikasi memvalidasi pilihan tersebut sebelum menampilkan fakta menu dan alasan rekomendasi.

Alur ini bersifat **agentic** karena model menentukan tool yang diperlukan berdasarkan permintaan dan hasil yang diamati, bukan sekadar menjawab dari pengetahuan umum atau mengikuti satu pencarian tetap.

## Technology Stack

- Next.js dengan App Router
- TypeScript
- React
- Gemini API
- `@google/genai` untuk integrasi Gemini dan function calling
- `csv-parse` untuk membaca dataset CSV
- CSS untuk tampilan responsif

## Struktur Project

```text
app/
├── api/chat/route.ts     # Endpoint chat dan validasi permintaan
├── page.tsx             # Halaman utama dan menu awal
├── food-search.tsx      # Pencarian, hasil, dan Agent Trace
├── layout.tsx           # Layout dan metadata
└── globals.css          # Styling responsif
lib/
├── agent.ts             # Gemini agent dan alur function calling
├── menu.ts              # Parsing CSV, harga, gambar, dan tool menu
└── chat-types.ts        # Tipe respons dan riwayat percakapan
data/
└── menu-kantin.csv      # Sumber fakta menu
public/
└── menu-images/         # Gambar menu
scripts/
├── check-menu.ts        # Pemeriksaan dataset dan tool menu
└── check-chat.mjs       # Pemeriksaan API dengan Gemini
AGENTS.md                # Panduan pengembangan
design.md                # Panduan desain
```

## Cara Menjalankan

Pastikan Node.js dan npm sudah terpasang. Dari folder proyek, instal dependensi:

```bash
npm install
```

Buat file `.env.local` di root proyek:

```dotenv
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-3.5-flash-lite
```

Ganti `your_key_here` dengan API key Gemini milikmu. Gunakan model yang tersedia untuk API key tersebut. Kedua variabel dibaca di server; API key tidak dikirim ke browser. File `.env*`, termasuk `.env.local`, sudah diabaikan oleh Git. Jangan membagikan atau memasukkan API key ke repository.

Jalankan aplikasi:

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000), lalu masukkan permintaan makanan pada kolom pencarian.

## Example Queries

- "Aku punya budget Rp20.000 dan mau ayam."
- "Ada makanan dari Japanese Food di bawah Rp30.000?"
- "Menu paling murah apa?"
- "Ada steak wagyu Rp10.000? Kalau tidak ada jangan buat menu sendiri."

## Limitations

- Dataset prototipe saat ini mewakili satu kantin kampus.
- Aplikasi tidak mengetahui stok makanan secara real-time. Menu yang tercatat belum tentu tersedia saat pengguna datang.
- Dataset sumber dapat memiliki nilai yang tidak lengkap. Menu tanpa harga tidak disertakan dalam filter budget atau pencarian termurah/termahal.
- Kuota dan rate limit Gemini API dapat membatasi pencarian. Jika batas tercapai, pengguna perlu menunggu atau memeriksa kuota API.

## AI Use Declaration

**ChatGPT** digunakan untuk:

- Pengembangan konsep proyek.
- Perencanaan.
- Diskusi arsitektur.
- Persiapan prompt.
- Panduan debugging.

**OpenAI Codex** digunakan untuk:

- Implementasi aplikasi.
- Integrasi Gemini.
- Pembuatan tool menu.
- Debugging.
- Penyempurnaan frontend.
- Bantuan penyusunan README.

Kode dan keluaran yang dihasilkan dengan bantuan AI telah diuji secara manual sebelum pengumpulan proyek.
