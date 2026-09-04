import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BNB Agent Marketplace",
  description: "Find, compare, and hire AI agents on BNB Smart Chain",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-white antialiased`}>
        <header className="border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight">
              BNB Agent Marketplace
            </a>
            <nav className="flex items-center gap-6 text-sm text-slate-300">
              <a href="/agents" className="hover:text-white">Agents</a>
              <a href="/category/rebalancing" className="hover:text-white">Rebalancing</a>
              <a href="/category/grid-trading" className="hover:text-white">Grid Trading</a>
              <a href="/category/yield-optimization" className="hover:text-white">Yield</a>
              <a href="/category/health-factor" className="hover:text-white">Health Factor</a>
              <a href="/stats" className="hover:text-white">Stats</a>
              <a href="/compare" className="hover:text-white">Compare</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-white/10 mt-20">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-400">
            BNB Agent Marketplace · Built for BNB Chain Build the Era Hackathon
          </div>
        </footer>
      </body>
    </html>
  );
}
