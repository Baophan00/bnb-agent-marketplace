"use client";

import { useState } from "react";
import Link from "next/link";

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

const CATEGORIES = [
  { slug: "rebalancing", label: "Rebalancing" },
  { slug: "grid-trading", label: "Grid Trading" },
  { slug: "yield-optimization", label: "Yield Optimization" },
  { slug: "health-factor", label: "Health Factor" },
];

export default function CompareClient({ initialAgents }: { initialAgents: Agent[] }) {
  const [leftId, setLeftId] = useState("");
  const [rightId, setRightId] = useState("");

  const left = initialAgents.find((a) => a.id === leftId);
  const right = initialAgents.find((a) => a.id === rightId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
        <h2 className="text-3xl font-bold md:text-4xl">Compare Agents</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Pick two agents and compare their on-chain identity, category, and performance side by side.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm text-slate-400">Agent A</label>
            <select
              value={leftId}
              onChange={(e) => setLeftId(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-white/25 focus:outline-none"
            >
              <option value="">Select agent</option>
              {CATEGORIES.map((cat) => (
                <optgroup key={cat.slug} label={cat.label}>
                  {initialAgents.filter((a) => a.category === cat.slug).map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} (#{a.tokenId})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400">Agent B</label>
            <select
              value={rightId}
              onChange={(e) => setRightId(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-white/25 focus:outline-none"
            >
              <option value="">Select agent</option>
              {CATEGORIES.map((cat) => (
                <optgroup key={cat.slug} label={cat.label}>
                  {initialAgents.filter((a) => a.category === cat.slug).map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} (#{a.tokenId})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
      </section>

      {(left || right) && (
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
          <div className="grid gap-6 md:grid-cols-2">
            {left && (
              <AgentCard agent={left} />
            )}
            {right && (
              <AgentCard agent={right} />
            )}
          </div>

          {left && right && (
            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              <div className="font-semibold text-white">Quick verdict</div>
              <p className="mt-2">
                {left.performance !== right.performance
                  ? `${left.name} shows higher score (${left.performance}) vs ${right.name} (${right.performance}).`
                  : "Both agents have comparable scores."}
                {" Choose based on category fit and owner reputation."}
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">{agent.name}</h3>
        <span className="text-xs text-slate-400">Token #{agent.tokenId}</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-slate-400">Category</div>
          <div className="mt-1 text-white capitalize">{agent.category.replace(/-/g, " ")}</div>
        </div>
        <div>
          <div className="text-slate-400">Chain</div>
          <div className="mt-1 text-white">{agent.chain}</div>
        </div>
        <div>
          <div className="text-slate-400">Standard</div>
          <div className="mt-1 text-white">{agent.standard}</div>
        </div>
        <div>
          <div className="text-slate-400">Score</div>
          <div className="mt-1 text-white">{agent.performance}</div>
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-300 line-clamp-2">{agent.description}</div>

      <Link
        href={`/agents/${agent.id}`}
        className="mt-4 inline-block rounded-lg border border-white/20 px-3 py-1.5 text-xs font-medium hover:bg-white/5"
      >
        View details →
      </Link>
    </div>
  );
}
