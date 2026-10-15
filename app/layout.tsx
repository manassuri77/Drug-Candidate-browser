import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drug Candidate Browser",
  description: "Browse, search and filter a pipeline of drug candidates.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-4">
            <span className="text-xl" aria-hidden>🧬</span>
            <a href="/" className="text-lg font-semibold tracking-tight">
              Drug Candidate Browser
            </a>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
