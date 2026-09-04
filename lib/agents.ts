export interface Agent {
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
}

const API = "https://8004scan.io/api/v1/agents";
const BSC_CHAIN_ID = "56";

async function fetchBscAgents(limit = 60, offset = 0): Promise<any[]> {
  const res = await fetch(`${API}?chain=${BSC_CHAIN_ID}&limit=${limit}&offset=${offset}`, {
    next: { revalidate: 120 },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items ?? [];
}

import { categorizeAgent } from "./categories";

export async function getAgents(): Promise<Agent[]> {
  const items = await fetchBscAgents(80, 0);
  const seen = new Set<string>();
  const out: Agent[] = [];

  for (const item of items) {
    const tokenId = String(item.token_id ?? item.id);
    if (seen.has(tokenId)) continue;
    seen.add(tokenId);

    const name = item.name || `Agent #${tokenId}`;
    const description = item.description || "No description available on 8004scan.";
    const category = categorizeAgent(name, description);

    out.push({
      id: tokenId,
      name,
      description,
      category,
      performance: item.total_score ? `Score ${item.total_score}` : "New on BSC",
      chain: "BNB Smart Chain",
      standard: "ERC-8004",
      status: "Active",
      tokenId,
      owner: item.owner_address || "",
      imageUrl: item.image_url || null,
    });
  }

  return out;
}

export async function getAgentByTokenId(tokenId: string): Promise<Agent | null> {
  const agents = await getAgents();
  return agents.find((a) => a.id === tokenId) ?? null;
}

export async function getAgentsByCategory(category: string): Promise<Agent[]> {
  const agents = await getAgents();
  if (!category) return agents;
  return agents.filter((a) => a.category === category);
}
