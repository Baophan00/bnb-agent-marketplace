import Link from "next/link";
import { Metadata } from "next";
import { getAgents } from "@/lib/agents";

export const metadata: Metadata = {
  title: "Agents | BNB Agent Marketplace",
  description: "Browse all AI agents on BNB Smart Chain",
};

const CATEGORIES = [
  { slug: "rebalancing", label: "Rebalancing" },
  { slug: "grid-trading", label: "Grid Trading" },
  { slug: "yield-optimization", label: "Yield Optimization" },
  { slug: "health-factor", label: "Health Factor" },
];

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

export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
        <h2 className="text-3xl font-bold md:text-4xl">AI Agents</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Browse agents by category. Each agent is live on BSC under ERC-8004.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 hover:border-white/25 hover:text-white"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">All agents</h3>
          <span className="text-sm text-slate-400">{agents.length} results</span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {agents.map((agent) => (
            <Link
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
                <span>Score: {agent.performance}</span>
                <span>View details →</span>
              </div>
            </Link>
          ))}
        </div>

        {agents.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center text-slate-400">
            No agents found. Try again later.
          </div>
        )}
      </section>
    </div>
  );
}
