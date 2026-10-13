// Estimated subscription revenue and net profit, derived from attendance-based
// active-member counts mapped to the two subscription fee tiers (Rs.500 / Rs.700).
// These are ESTIMATES: no member-wise payment ledger exists to confirm actual
// cash collections, so these figures must never be presented as actual revenue.

export const subscriptionTiers = {
  regular: 500,
  cardioInclusive: 700,
};

export const monthlyFinancials = [
  { month: "Jun", activeMembers: 119, estRevenue: 65500, estNetProfit: 49919 },
  { month: "Jul", activeMembers: 132, estRevenue: 73200, estNetProfit: 57020 },
  { month: "Aug", activeMembers: 132, estRevenue: 73200, estNetProfit: 56640 },
  { month: "Sep", activeMembers: 126, estRevenue: 69600, estNetProfit: 53834 },
  { month: "Oct", activeMembers: 127, estRevenue: 70300, estNetProfit: 53974 },
  { month: "Nov", activeMembers: 110, estRevenue: 60600, estNetProfit: 45167 },
  { month: "Dec", activeMembers: 117, estRevenue: 64300, estNetProfit: 48333 },
];

// DERIVED: October -> November co-movement. Causality is explicitly NOT established.
export const octNovMovement = {
  fromMonth: "Oct",
  toMonth: "Nov",
  activeMembers: { from: 127, to: 110, changePct: -13.39 },
  estRevenue: { from: 70300, to: 60600, changePct: -13.8 },
  estNetProfit: { from: 53974, to: 45167, changePct: -16.32, absoluteDecline: 8807 },
  causalityNote:
    "Active-member decline and estimated financial decline co-moved in October-November. Causality is not established -- November also coincided with regional festivals and university examinations, noted only as possible contextual factors.",
};
