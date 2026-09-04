import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agents | BNB Agent Marketplace",
  description: "Browse all AI agents on BNB Smart Chain",
};

const CATEGORIES = [
  { slug: "rebalancing", label: "Rebalancing", description: "Auto LP range management" },
  { slug: "grid-trading", label: "Grid Trading", description: "Automated range orders" },
  { slug: "yield-optimization", label: "Yield Optimization", description: "Highest APR routing" },
  { slug: "health-factor", label: "Health Factor", description: "Liquidation protection" },
];

const SAMPLE_AGENTS = [
  {
    id: "bnb-studio-reference-001",
    name: "PancakeSwap Liquidity Manager",
    category: "rebalancing",
    description: "Monitors PancakeSwap V2/USDT positions and rebalances LP ranges when price drifts outside ±2%.",
    performance: "Sharpe-like 1.4 over 30 days on testnet",
    txHash: "0x" + "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2".slice(0, 64),
  },
  {
    id: "bnb-studio-reference-002",
    name: "BNB/USDT Grid Bot",
    category: "grid-trading",
    description: "Runs a 12-level grid on BNB/USDT with volume-weighted spacing.",
    performance: "Fill rate 68% last 7 days on testnet",
    txHash: "0x" + "b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3".slice(0, 64),
  },
  {
    id: "bnb-studio-reference-003",
    name: "Yield Router",
    category: "yield-optimization",
    description: "Compares PancakeSwap, ApeSwap, and Thena farms and rotates capital weekly.",
    performance: "Net APR +3.1pp vs baseline in testnet",
    txHash: "0x" + "c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4".slice(0, 64),
  },
  {
    id: "bnb-studio-reference-004",
    name: "Lending Watchdog",
    category: "health-factor",
    description: "Tracks BNB-backed loan positions and triggers partial repay before HF drops below 1.15.",
    performance: "Prevented simulated liquidation in 9/10 shock tests",
    txHash: "0x" + "d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5".slice(0, 64),
  },
  {
    id: "bnb-studio-reference-005",
    name: "Multi-Pool Rebalancer",
    category: "rebalancing",
    description: "Manages multiple LP positions across PancakeSwap stablecoin pools with shared capital.",
    performance: "Reduced idle capital 22% in backtest",
    txHash: "0x" + "e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6".slice(0, 64),
  },
  {
    id: "bnb-studio-reference-006",
    name: "Volatility Grid",
    category: "grid-trading",
    description: "Adjusts grid spacing based on recent ATR to avoid whipsaw losses.",
    performance: "Lower max drawdown than fixed grid in testnet",
    txHash: "0x" + "f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1".slice(0, 64),
  },
  {
    id: "bnb-studio-reference-007",
    name: "Auto Farm Optimizer",
    category: "yield-optimization",
    description: "Auto-compounds rewards and routes new deposits to best yield after fees.",
    performance: "Gas-aware switching in 48h horizon tests",
    txHash: "0x" + "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2".slice(0, 64),
  },
  {
    id: "bnb-studio-reference-008",
    name: "Margin Guard",
    category: "health-factor",
    description: "Monitors cross-margin health factor and adds collateral when buffer shrinks.",
    performance: "Kept HF > 1.25 in -12% price shock test",
    txHash: "0x" + "b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3".slice(0, 64),
  },
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

export default function AgentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
        <h2 className="text-3xl font-bold md:text-4xl">AI Agents</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Browse agents by category. Each agent is live on BSC under ERC-8004.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 hover:border-white/25 hover:text-white"
            >
              {cat.label}
            </a>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">All agents</h3>
          <span className="text-sm text-slate-400">{SAMPLE_AGENTS.length} results</span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {SAMPLE_AGENTS.map((agent) => (
            <a
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/25 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{agent.name}</h3>
                  <p className="mt-1 text-sm text-slate-300 line-clamp-2">{agent.description}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <CategoryBadge category={agent.category} />
                <span className="text-xs text-slate-400">View details →</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
