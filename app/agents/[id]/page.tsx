import { Metadata } from "next";

const AGENT_MAP: Record<string, {
  name: string;
  category: string;
  description: string;
  longDescription: string;
  performance: string;
  status: string;
}> = {
  "bnb-studio-reference-001": {
    name: "PancakeSwap Liquidity Manager",
    category: "rebalancing",
    description: "Monitors PancakeSwap V2/USDT positions and rebalances LP ranges when price drifts outside ±2%.",
    longDescription: "This agent watches PancakeSwap V2 liquidity positions and automatically rebalances them when market price moves outside a configurable band. The goal is to keep capital in range while reducing manual oversight.",
    performance: "Sharpe-like 1.4 over 30 days on testnet",
    status: "Active",
  },
  "bnb-studio-reference-002": {
    name: "BNB/USDT Grid Bot",
    category: "grid-trading",
    description: "Runs a 12-level grid on BNB/USDT with volume-weighted spacing.",
    longDescription: "Places and maintains a grid of limit orders on BNB/USDT, spacing levels by recent volume concentration rather than fixed percentages.",
    performance: "Fill rate 68% last 7 days on testnet",
    status: "Active",
  },
  "bnb-studio-reference-003": {
    name: "Yield Router",
    category: "yield-optimization",
    description: "Compares PancakeSwap, ApeSwap, and Thena farms and rotates capital weekly.",
    longDescription: "Evaluates yield farms across multiple DEXes and moves capital to the best risk-adjusted option on a weekly schedule.",
    performance: "Net APR +3.1pp vs baseline in testnet",
    status: "Active",
  },
  "bnb-studio-reference-004": {
    name: "Lending Watchdog",
    category: "health-factor",
    description: "Tracks BNB-backed loan positions and triggers partial repay before HF drops below 1.15.",
    longDescription: "Monitors health factor on BSC lending markets and executes protective actions when the buffer gets too thin.",
    performance: "Prevented simulated liquidation in 9/10 shock tests",
    status: "Active",
  },
  "bnb-studio-reference-005": {
    name: "Multi-Pool Rebalancer",
    category: "rebalancing",
    description: "Manages multiple LP positions across PancakeSwap stablecoin pools with shared capital.",
    longDescription: "Allocates liquidity across several stablecoin pools and rebalances as rates and balances drift.",
    performance: "Reduced idle capital 22% in backtest",
    status: "Active",
  },
  "bnb-studio-reference-006": {
    name: "Volatility Grid",
    category: "grid-trading",
    description: "Adjusts grid spacing based on recent ATR to avoid whipsaw losses.",
    longDescription: "Dynamically resizes grid spacing based on volatility, reducing noise trades during choppy markets.",
    performance: "Lower max drawdown than fixed grid in testnet",
    status: "Active",
  },
  "bnb-studio-reference-007": {
    name: "Auto Farm Optimizer",
    category: "yield-optimization",
    description: "Auto-compounds rewards and routes new deposits to best yield after fees.",
    longDescription: "Handles reward claiming, compounding, and capital deployment across farms while accounting for gas and withdrawal fees.",
    performance: "Gas-aware switching in 48h horizon tests",
    status: "Active",
  },
  "bnb-studio-reference-008": {
    name: "Margin Guard",
    category: "health-factor",
    description: "Monitors cross-margin health factor and adds collateral when buffer shrinks.",
    longDescription: "Watches leveraged positions and automatically tops up collateral when price moves against the position.",
    performance: "Kept HF > 1.25 in -12% price shock test",
    status: "Active",
  },
};

export async function generateStaticParams() {
  return Object.keys(AGENT_MAP).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const agent = AGENT_MAP[params.id];
  if (!agent) return { title: "Agent not found" };
  return { title: `${agent.name} | BNB Agent Marketplace` };
}

export default function AgentPage({ params }: { params: { id: string } }) {
  const agent = AGENT_MAP[params.id];

  if (!agent) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Agent not found</h1>
        <p className="mt-2 text-slate-400">This agent may have been removed or the ID is incorrect.</p>
        <a href="/agents" className="mt-6 inline-block rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5">
          Back to agents
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">{agent.name}</h1>
            <p className="mt-2 text-slate-300">{agent.description}</p>
          </div>
          <span className="shrink-0 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            {agent.status}
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="text-slate-400">Category</div>
            <div className="mt-1 font-medium text-white capitalize">{agent.category.replace(/-/g, " ")}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="text-slate-400">Chain</div>
            <div className="mt-1 font-medium text-white">BNB Smart Chain</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="text-slate-400">Standard</div>
            <div className="mt-1 font-medium text-white">ERC-8004</div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="text-lg font-semibold">What it does</h3>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">{agent.longDescription}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="text-lg font-semibold">Performance</h3>
          <p className="mt-2 text-sm text-slate-300">{agent.performance}</p>
          <p className="mt-4 text-xs text-slate-400">Reference data from BNB Agent Studio testnet/runtime snapshots.</p>
        </article>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
        <h3 className="text-lg font-semibold">Activate this agent</h3>
        <p className="mt-2 text-sm text-slate-300">
          Hire and run this agent through BNB Agent Studio. No blockchain experience is required.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://docs.bnbchain.org/developer-kit/bnbchain-studio/"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Open BNB Agent Studio docs
          </a>
          <a
            href="/agents"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/5"
          >
            Back to agents
          </a>
        </div>
      </section>
    </div>
  );
}
