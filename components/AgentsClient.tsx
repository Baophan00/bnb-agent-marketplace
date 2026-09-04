"use client";

import { useState, useEffect, useMemo } from "react";

const CATEGORIES = [
  { slug: "rebalancing", label: "Rebalancing" },
  { slug: "grid-trading", label: "Grid Trading" },
  { slug: "yield-optimization", label: "Yield Optimization" },
  { slug: "health-factor", label: "Health Factor" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "score", label: "Highest score" },
  { value: "name", label: "Name A-Z" },
];

type Agent = {
  id: string;
  name: string;
  description: string;
  category: string;
  performance: string;
  chain: string;
  standard: string;
  status: string;
  tokenId: string;
  owner: string;
  imageUrl: string | null;
};

function CategoryBadge({ category }: { category: string }) {
  const map: Record<string, string> = {
    rebalancing: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
    "grid-trading": "bg-violet-500/15 text-violet-300 border-violet-500/25",
    "yield-optimization": "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    "health-factor": "bg-amber-500/15 text-amber-300 border-amber-500/25",
  };

  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${map[category] ?? "bg-slate-500/15 text-slate-300 border-slate-500/25"}`}>
      {category.replace(/-/g, " ")}
    </span>
  );
}

export default function AgentsPage({ initialAgents }: { initialAgents: Agent[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    let result = [...initialAgents];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tokenId.includes(q)
      );
    }

    if (category) {
      result = result.filter((a) => a.category === category);
    }

    if (sort === "score") {
      result.sort((a, b) => parseFloat(b.performance.replace(/[^0-9.]/g, "") || "0") - parseFloat(a.performance.replace(/[^0-9.]/g, "") || "0"));
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [query, category, sort, initialAgents]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
        <h2 className="text-3xl font-bold md:text-4xl">AI Agents</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Browse agents by category. Each agent is live on BSC under ERC-8004.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Search agents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-slate-400 focus:border-white/25 focus:outline-none md:col-span-1"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-white/25 focus:outline-none"
          >
            <option value="">All categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.label}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-white/25 focus:outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">All agents</h3>
          <span className="text-sm text-slate-400">{filtered.length} results</span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((agent) => (
            <a
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/25 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{agent.name}</h3>
                  <p className="mt-1 text-sm text-slate-300 line-clamp-2">{agent.description}</p>
                </div>
                <CategoryBadge category={agent.category} />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Token #{agent.tokenId}</span>
                <span>View details →</span>
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center text-slate-400">
            No agents match your search. Try different keywords or clear filters.
          </div>
        )}
      </section>
    </div>
  );
}
