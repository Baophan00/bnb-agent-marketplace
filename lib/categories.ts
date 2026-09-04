const CATEGORY_KEYWORDS: Record<string, string[]> = {
  rebalancing: ["rebalanc", "lp ", "liquidity", "range", "position", "pool", "amm"],
  "grid-trading": ["grid", "trading", "order", "trade", "bot", "execution"],
  "yield-optimization": ["yield", "farm", "apr", "apy", "compound", "reward", "optimize"],
  "health-factor": ["health", "factor", "liquidation", "loan", "borrow", "margin", "risk"],
};

export function categorizeAgent(name: string, description: string): string {
  const text = `${name} ${description}`.toLowerCase();
  let bestCat = "rebalancing";
  let bestScore = 0;

  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = keywords.reduce((s, kw) => s + (text.includes(kw) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestCat = cat;
    }
  }

  return bestCat;
}
