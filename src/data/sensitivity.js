// +/-20% managerial sensitivity stress test. This is NOT a statistical confidence
// interval, NOT a forecast-accuracy range, and NOT based on historical demand
// variance (none exists). It is a round-number scenario band chosen by the
// analyst to bound the planning scenario.

export const sensitivityScenarios = [
  { scenario: "Pessimistic", demandFactor: 0.8, totalProjectedGrossContribution: 461252 },
  { scenario: "Base", demandFactor: 1.0, totalProjectedGrossContribution: 576540 },
  { scenario: "Optimistic", demandFactor: 1.2, totalProjectedGrossContribution: 691828 },
];

export const productSensitivity = [
  { product: "Whey Protein", grossProfitPerUnit: 800, baselineDemand: 420, pessimisticDemand: 336, optimisticDemand: 504, baselineProfit: 336000, pessimisticProfit: 268800, optimisticProfit: 403200 },
  { product: "BCAA", grossProfitPerUnit: 250, baselineDemand: 246, pessimisticDemand: 197, optimisticDemand: 295, baselineProfit: 61500, pessimisticProfit: 49250, optimisticProfit: 73750 },
  { product: "Creatine", grossProfitPerUnit: 200, baselineDemand: 420, pessimisticDemand: 336, optimisticDemand: 504, baselineProfit: 84000, pessimisticProfit: 67200, optimisticProfit: 100800 },
  { product: "Electrolytes", grossProfitPerUnit: 150, baselineDemand: 624, pessimisticDemand: 499, optimisticDemand: 749, baselineProfit: 93600, pessimisticProfit: 74850, optimisticProfit: 112350 },
  { product: "Eggs", grossProfitPerUnit: 24, baselineDemand: 60, pessimisticDemand: 48, optimisticDemand: 72, baselineProfit: 1440, pessimisticProfit: 1152, optimisticProfit: 1728 },
];

export const sensitivityNote =
  "The +/-20% range is a managerial stress test, not a statistical confidence interval or historical forecast-error range. Whey Protein remains the Category A product across all three scenarios.";
