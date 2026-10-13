// EOQ and ROP planning benchmarks. Ordering costs, holding costs, lead times and
// safety stock are ALL managerial assumptions -- no historical procurement or
// inventory-carrying-cost records exist for Armstrong Gym.

export const eoqInputs = {
  whey: {
    product: "Whey Protein",
    demandUnits6mo: 420,
    orderingCostPerOrder: 100,
    holdingCostPerUnit: 560,
    eoqRaw: 12.25,
    eoqRounded: 12,
    unit: "tubs",
  },
};

export const eoqFormulaNote = "EOQ = sqrt(2 x D x S / H), where D = six-month planning demand, S = assumed ordering cost per order, H = assumed holding cost per unit.";

export const ropInputs = [
  { product: "Whey Protein", avgDailyDemand: 2.33, leadTimeDays: 5, safetyStock: 4, ropRaw: 15.65, ropFinal: 16, unit: "tubs" },
  { product: "Creatine", avgDailyDemand: 2.33, leadTimeDays: 5, safetyStock: 4, ropRaw: 15.65, ropFinal: 16, unit: "tubs" },
  { product: "BCAA", avgDailyDemand: 1.37, leadTimeDays: 5, safetyStock: 3, ropRaw: 9.85, ropFinal: 10, unit: "tubs" },
  { product: "Electrolytes", avgDailyDemand: 3.47, leadTimeDays: 5, safetyStock: 6, ropRaw: 23.35, ropFinal: 24, unit: "boxes" },
  { product: "Eggs", approach: "Just-in-time (perishable product; no fixed ROP calculated)" },
];

export const ropFormulaNote = "ROP = (average daily demand x lead time) + safety stock.";

export const inventoryAssumptionsNote =
  "No historical procurement data was available. Ordering costs, holding costs, lead times and safety stocks are managerial planning assumptions, not figures derived from Armstrong Gym's own purchasing history.";

export const inventoryPrioritization = {
  A: ["Whey Protein"],
  B: ["Electrolytes", "Creatine", "BCAA"],
  C: ["Eggs"],
};
