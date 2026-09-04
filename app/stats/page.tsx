import { Metadata } from "next";
import StatsClient from "@/components/StatsClient";
import { getAgents } from "@/lib/agents";

export const metadata: Metadata = {
  title: "Stats | BNB Agent Marketplace",
  description: "BSC agent ecosystem statistics",
};

export default async function StatsPage() {
  const agents = await getAgents();
  return <StatsClient agents={agents} />;
}
