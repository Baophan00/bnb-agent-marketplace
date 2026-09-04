import { Metadata } from "next";
import CompareClient from "@/components/CompareClient";
import { getAgents } from "@/lib/agents";

export const metadata: Metadata = {
  title: "Compare | BNB Agent Marketplace",
  description: "Compare two AI agents side by side",
};

export default async function ComparePage() {
  const agents = await getAgents();
  return <CompareClient initialAgents={agents} />;
}
