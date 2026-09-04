"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";

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

const CATEGORY_COLORS: Record<string, string> = {
  rebalancing: "#06b6d4",
  "grid-trading": "#8b5cf6",
  "yield-optimization": "#10b981",
  "health-factor": "#f59e0b",
};

export default function StatsClient({ agents }: { agents: Agent[] }) {
  const [stats, setStats] = useState({
    total: 0,
    categories: {} as Record<string, number>,
    topScore: "0",
    topAgent: "—",
  });

  useEffect(() => {
    const categories: Record<string, number> = {};
    let topScore = 0;
    let topAgent = "—";

    for (const agent of agents) {
      categories[agent.category] = (categories[agent.category] || 0) + 1;
      const score = parseFloat(agent.performance.replace(/[^0-9.]/g, "") || "0");
      if (score > topScore) {
        topScore = score;
        topAgent = agent.name;
      }
    }

    setStats({
      total: agents.length,
      categories,
      topScore: topScore.toFixed(1),
      topAgent,
    });
  }, [agents]);

  const chartData = Object.entries(stats.categories).map(([name, value]) => ({
    name: name.replace(/-/g, " "),
    value,
    fill: CATEGORY_COLORS[name] || "#94a3b8",
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
        <h2 className="text-3xl font-bold md:text-4xl">BSC Agent Stats</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Real-time snapshot of the BSC agent ecosystem, sourced from 8004scan.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-slate-400">Agents listed</div>
            <div className="mt-2 text-3xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-slate-400">Top score</div>
            <div className="mt-2 text-3xl font-bold text-white">{stats.topScore}</div>
            <div className="mt-1 text-xs text-slate-400 truncate">{stats.topAgent}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-slate-400">Categories covered</div>
            <div className="mt-2 text-3xl font-bold text-white">{Object.keys(stats.categories).length}</div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
        <h3 className="text-xl font-semibold">Category distribution</h3>
        <p className="mt-2 text-sm text-slate-400">How agents are distributed across the four required categories.</p>

        <div className="mt-6 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#f8fafc",
                }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
