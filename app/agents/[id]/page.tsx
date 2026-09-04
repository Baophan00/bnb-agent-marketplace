import { Metadata } from "next";
import Link from "next/link";
import { getAgents } from "@/lib/agents";
import type { Agent } from "@/lib/agents";
import ReviewsClient from "@/components/ReviewsClient";

const BAG_DOCS = "https://docs.bnbchain.org/developer-kit/bnbchain-studio/";
const BAG_CLI = "https://docs.bnbchain.org/developer-kit/bnbchain-studio/cli-reference";

export async function generateStaticParams() {
  let agents: Agent[] = [];
  try {
    agents = await getAgents();
  } catch {
    // during static export, API may be unavailable
  }
  if (!agents.length) {
    return [
      { id: "12189" },
      { id: "12190" },
      { id: "12191" },
      { id: "12192" },
      { id: "12193" },
    ];
  }
  return agents.slice(0, 20).map((agent) => ({ id: agent.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  let agents: Agent[] = [];
  try {
    agents = await getAgents();
  } catch {
    // ignore
  }
  const agent = agents.find((a) => a.id === params.id);
  if (!agent) return { title: "Agent not found" };
  return { title: `${agent.name} | BNB Agent Marketplace` };
}

export default async function AgentPage({ params }: { params: { id: string } }) {
  let agents: Agent[] = [];
  try {
    agents = await getAgents();
  } catch {
    // ignore
  }
  const agent = agents.find((a) => a.id === params.id);

  if (!agent) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Agent not found</h1>
        <p className="mt-2 text-slate-400">This agent may have been removed or the ID is incorrect.</p>
        <Link href="/agents" className="mt-6 inline-block rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5">
          Back to agents
        </Link>
      </div>
    );
  }

  const explorerUrl = `https://8004scan.io/agents/${agent.id}`;
  const bagInitCmd = `bag init ${agent.name.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase()} --framework adk --network bsc`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
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
            <div className="mt-1 font-medium text-white">{agent.chain}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="text-slate-400">Standard</div>
            <div className="mt-1 font-medium text-white">{agent.standard}</div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="text-lg font-semibold">On-chain identity</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-300">
            <div>
              <span className="text-slate-400">Token ID:</span> <span className="font-mono text-white">{agent.tokenId}</span>
            </div>
            <div>
              <span className="text-slate-400">Owner:</span>{" "}
              <span className="font-mono text-white">
                {agent.owner.slice(0, 6)}...{agent.owner.slice(-4)}
              </span>
            </div>
            <div>
              <span className="text-slate-400">Registry:</span>{" "}
              <Link href={explorerUrl} target="_blank" rel="noreferrer" className="text-white hover:underline">
                View on 8004scan →
              </Link>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="text-lg font-semibold">Performance</h3>
          <p className="mt-2 text-sm text-slate-300">{agent.performance}</p>
          <p className="mt-4 text-xs text-slate-400">Data from 8004scan, the ERC-8004 explorer.</p>
        </article>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
        <h3 className="text-lg font-semibold">Activate this agent</h3>
        <p className="mt-2 text-sm text-slate-300">
          Hire and run this agent through BNB Agent Studio. No blockchain experience is required.
        </p>

        <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
          <div className="text-slate-400">Quick start</div>
          <code className="mt-2 block font-mono text-white">{bagInitCmd}</code>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={BAG_DOCS}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Open BNB Agent Studio docs
          </Link>
          <Link
            href={BAG_CLI}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/5"
          >
            CLI Reference
          </Link>
          <Link
            href="/agents"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/5"
          >
            Back to agents
          </Link>
        </div>
      </section>

      <ReviewsClient agentId={agent.id} />
    </div>
  );
}
