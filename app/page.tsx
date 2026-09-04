import { Metadata } from "next";

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

const FEATURED_AGENTS = [
  {
    id: "bnb-studio-reference-001",
    name: "PancakeSwap Liquidity Manager",
    category: "rebalancing",
    description: "Monitors PancakeSwap V2/USDT positions and rebalances LP ranges when price drifts outside ±2%.",
    performance: "Sharpe-like 1.4 over 30 days on testnet",
  },
  {
    id: "bnb-studio-reference-002",
    name: "BNB/USDT Grid Bot",
    category: "grid-trading",
    description: "Runs a 12-level grid on BNB/USDT with volume-weighted spacing.",
    performance: "Fill rate 68% last 7 days on testnet",
  },
  {
    id: "bnb-studio-reference-003",
    name: "Yield Router",
    category: "yield-optimization",
    description: "Compares PancakeSwap, ApeSwap, and Thena farms and rotates capital weekly.",
    performance: "Net APR +3.1pp vs baseline in testnet",
  },
  {
    id: "bnb-studio-reference-004",
    name: "Lending Watchdog",
    category: "health-factor",
    description: "Tracks BNB-backed loan positions and triggers partial repay before HF drops below 1.15.",
    performance: "Prevented simulated liquidation in 9/10 shock tests",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
        <h1 className="text-4xl font-bold md:text-5xl">Find and hire AI agents on BSC</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          Browse, compare, and activate agents for rebalancing, grid trading, yield optimization, and health-factor monitoring. All agents are live on BNB Smart Chain.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/agents"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Browse agents
          </a>
          <a
            href="https://www.bnbchain.org/en/hackathons/smart-money-era"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium hover:bg-white/5"
          >
            Hackathon info
          </a>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">Browse by category</h2>
        <p className="mt-2 text-slate-400">Pick a use case to see agents built for it.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/25 transition"
            >
              <h3 className="text-lg font-semibold">{cat.label}</h3>
              <p className="mt-2 text-sm text-slate-300">{cat.description}</p>
              <div className="mt-4 text-sm text-white">View agents →</div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">Featured agents</h2>
        <p className="mt-2 text-slate-400">Hand-picked agents with verifiable on-chain activity.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {FEATURED_AGENTS.map((agent) => (
            <a
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
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
