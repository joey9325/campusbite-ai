import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusBite AI — Cari makan sesuai budget",
  description: "Temukan menu kantin berdasarkan budget, makanan yang kamu inginkan, dan stall dengan CampusBite AI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
