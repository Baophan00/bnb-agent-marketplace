import { Metadata } from "next";

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

const SAMPLE_AGENTS = [
  {
    id: "bnb-studio-reference-001",
    name: "PancakeSwap Liquidity Manager",
    category: "rebalancing",
    description: "Monitors PancakeSwap V2/USDT positions and rebalances LP ranges when price drifts outside ±2%.",
    performance: "Sharpe-like 1.4 over 30 days on testnet",
  },
  {
    id: "bnb-studio-reference-005",
    name: "Multi-Pool Rebalancer",
    category: "rebalancing",
    description: "Manages multiple LP positions across PancakeSwap stablecoin pools with shared capital.",
    performance: "Reduced idle capital 22% in backtest",
  },
  {
    id: "bnb-studio-reference-002",
    name: "BNB/USDT Grid Bot",
    category: "grid-trading",
    description: "Runs a 12-level grid on BNB/USDT with volume-weighted spacing.",
    performance: "Fill rate 68% last 7 days on testnet",
  },
  {
    id: "bnb-studio-reference-006",
    name: "Volatility Grid",
    category: "grid-trading",
    description: "Adjusts grid spacing based on recent ATR to avoid whipsaw losses.",
    performance: "Lower max drawdown than fixed grid in testnet",
  },
  {
    id: "bnb-studio-reference-003",
    name: "Yield Router",
    category: "yield-optimization",
    description: "Compares PancakeSwap, ApeSwap, and Thena farms and rotates capital weekly.",
    performance: "Net APR +3.1pp vs baseline in testnet",
  },
  {
    id: "bnb-studio-reference-007",
    name: "Auto Farm Optimizer",
    category: "yield-optimization",
    description: "Auto-compounds rewards and routes new deposits to best yield after fees.",
    performance: "Gas-aware switching in 48h horizon tests",
  },
  {
    id: "bnb-studio-reference-004",
    name: "Lending Watchdog",
    category: "health-factor",
    description: "Tracks BNB-backed loan positions and triggers partial repay before HF drops below 1.15.",
    performance: "Prevented simulated liquidation in 9/10 shock tests",
  },
  {
    id: "bnb-studio-reference-008",
    name: "Margin Guard",
    category: "health-factor",
    description: "Monitors cross-margin health factor and adds collateral when buffer shrinks.",
    performance: "Kept HF > 1.25 in -12% price shock test",
  },
];

export default function CategoryPage({ params }: { params: { name: string } }) {
  const slug = params.name;
  const meta = CATEGORY_META[slug] ?? { title: slug, description: "" };
  const agents = SAMPLE_AGENTS.filter((a) => a.category === slug);

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
            <a
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/25 transition"
            >
              <h3 className="font-semibold text-white">{agent.name}</h3>
              <p className="mt-2 text-sm text-slate-300 line-clamp-2">{agent.description}</p>
              <p className="mt-3 text-xs text-slate-400">Performance: {agent.performance}</p>
              <div className="mt-4 text-xs text-white">View details →</div>
            </a>
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
