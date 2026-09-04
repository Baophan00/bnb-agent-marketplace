import Link from "next/link";
import { Metadata } from "next";
import { getAgentsByCategory } from "@/lib/agents";

export const metadata: Metadata = {
  title: "Category | BNB Agent Marketplace",
  description: "Browse agents by category",
};

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  rebalancing: {
    title: "Rebalancing",
    description: "Agents that manage LP ranges and reset positions automatically.",
  },
  "grid-trading": {
    title: "Grid Trading",
    description: "Agents that place and manage automated grid orders.",
  },
  "yield-optimization": {
    title: "Yield Optimization",
    description: "Agents that route liquidity to the highest available APR.",
  },
  "health-factor": {
    title: "Health Factor",
    description: "Agents that protect lending positions from liquidation.",
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((name) => ({ name }));
}

export default async function CategoryPage({ params }: { params: { name: string } }) {
  const slug = params.name;
  const meta = CATEGORY_META[slug] ?? { title: slug, description: "" };
  const agents = await getAgentsByCategory(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
        <h2 className="text-3xl font-bold md:text-4xl">{meta.title}</h2>
        <p className="mt-3 max-w-2xl text-slate-300">{meta.description}</p>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Agents</h3>
          <span className="text-sm text-slate-400">{agents.length} results</span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {agents.map((agent) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/25 transition"
            >
              <h3 className="font-semibold text-white">{agent.name}</h3>
              <p className="mt-2 text-sm text-slate-300 line-clamp-2">{agent.description}</p>
              <p className="mt-3 text-xs text-slate-400">Performance: {agent.performance}</p>
              <div className="mt-4 text-xs text-white">View details →</div>
            </Link>
          ))}
        </div>

        {agents.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center text-slate-400">
            No agents in this category yet.
          </div>
        )}
      </section>
    </div>
  );
}
