import { Metadata } from "next";
import AgentsClient from "@/components/AgentsClient";
import { getAgents } from "@/lib/agents";

export const metadata: Metadata = {
  title: "Agents | BNB Agent Marketplace",
  description: "Browse all AI agents on BNB Smart Chain",
};

export default async function AgentsPage() {
  const agents = await getAgents();
  return <AgentsClient initialAgents={agents} />;
}
