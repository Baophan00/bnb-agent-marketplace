import Link from "next/link";
import { Metadata } from "next";
import { getAgents } from "@/lib/agents";

export const metadata: Metadata = {
  title: "BNB Agent Marketplace",
  description: "Find, compare, and hire AI agents on BNB Smart Chain",
};

const CATEGORIES = [
  { slug: "rebalancing", label: "Rebalancing", description: "Auto LP range management" },
  { slug: "grid-trading", label: "Grid Trading", description: "Automated range orders" },
  { slug: "yield-optimization", label: "Yield Optimization", description: "Highest APR routing" },
  { slug: "health-factor", label: "Health Factor", description: "Liquidation protection" },
];

export default async function HomePage() {
  const agents = await getAgents();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
        <h1 className="text-4xl font-bold md:text-5xl">Find and hire AI agents on BSC</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          Browse, compare, and activate agents for rebalancing, grid trading, yield optimization, and health-factor monitoring. All agents are live on BNB Smart Chain.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/agents"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Browse agents
          </Link>
          <Link
            href="https://docs.bnbchain.org/developer-kit/bnbchain-studio/"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium hover:bg-white/5"
          >
            Open BNB Agent Studio docs
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">Browse by category</h2>
        <p className="mt-2 text-slate-400">Pick a use case to see agents built for it.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/25 transition"
            >
              <h3 className="text-lg font-semibold">{cat.label}</h3>
              <p className="mt-2 text-sm text-slate-300">{cat.description}</p>
              <div className="mt-4 text-sm text-white">View agents →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured agents</h2>
          <span className="text-sm text-slate-400">{agents.length} results</span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {agents.slice(0, 4).map((agent) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/25 transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{agent.name}</h3>
                <span className="text-xs text-slate-400 capitalize">{agent.category.replace(/-/g, " ")}</span>
              </div>
              <p className="mt-2 text-sm text-slate-300 line-clamp-2">{agent.description}</p>
              <p className="mt-3 text-xs text-slate-400">Performance: {agent.performance}</p>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link href="/agents" className="text-sm text-white hover:underline">
            View all agents →
          </Link>
        </div>
      </section>
    </div>
  );
}
