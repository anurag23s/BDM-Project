// Shared logic for combining the project's five static supplement products
// with any locally-added custom products, and recomputing contribution share
// and ABC category across the WHOLE combined set every time the set changes.
//
// Classification rule (reverse-engineered from, and consistent with, the
// original capstone classification): A >= 40% share, 5% <= B < 40%, C < 5%.
// Checking it against the original five products confirms it reproduces the
// report's own categories exactly: Whey 58.3% -> A; Electrolytes 16.2%,
// Creatine 14.6%, BCAA 10.7% -> B; Eggs 0.2% -> C.

const A_THRESHOLD = 0.4;
const B_THRESHOLD = 0.05;

export function classify(share) {
  if (share >= A_THRESHOLD) return "A";
  if (share >= B_THRESHOLD) return "B";
  return "C";
}

// staticProducts: the read-only project products (src/data/supplement.js)
// customProducts: locally-added products, each with
//   { id, name, unitCost, sellingPrice, demandUnits, demandUnit, consumptionAssumption }
export function combineAndRecompute(staticProducts, customProducts) {
  const normalizedCustom = customProducts.map((p) => {
    const grossContributionPerUnit = p.sellingPrice - p.unitCost;
    const projectedGrossContribution = grossContributionPerUnit * p.demandUnits;
    return {
      id: p.id,
      name: p.name,
      unitCost: p.unitCost,
      sellingPrice: p.sellingPrice,
      grossContributionPerUnit,
      planningDemandUnits: p.demandUnits,
      demandUnit: p.demandUnit,
      consumptionAssumption: p.consumptionAssumption,
      projectedGrossContribution,
      isCustom: true,
    };
  });

  const merged = [
    ...staticProducts.map((p) => ({ ...p, isCustom: false })),
    ...normalizedCustom,
  ];

  const total = merged.reduce((sum, p) => sum + p.projectedGrossContribution, 0) || 1;

  return merged
    .map((p) => {
      const contributionShare = p.projectedGrossContribution / total;
      return {
        ...p,
        contributionShare,
        abcCategory: classify(contributionShare),
      };
    })
    .sort((a, b) => b.projectedGrossContribution - a.projectedGrossContribution);
}
