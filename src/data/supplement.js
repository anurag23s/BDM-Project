// Supplement survey interest (OBSERVED) and six-month planning scenario
// (ASSUMPTION-DRIVEN PLANNING). Multiple product selections were allowed in the
// survey, so interest percentages are NOT mutually exclusive.

export const surveyMeta = {
  validResponses: 95,
  multipleSelectionAllowed: true,
};

export const productInterest = [
  { product: "Whey Protein", respondents: 70, share: 0.7368 },
  { product: "Creatine", respondents: 70, share: 0.7368 },
  { product: "BCAA", respondents: 41, share: 0.4316 },
  { product: "Electrolytes", respondents: 24, share: 0.2526 },
  { product: "Eggs", respondents: 12, share: 0.1263 },
];

// Product economics + six-month planning demand + projected gross contribution.
// "Projected gross contribution" is NOT revenue, NOT net profit, NOT guaranteed.
export const products = [
  {
    id: "whey",
    name: "Whey Protein",
    unitCost: 5600,
    sellingPrice: 6400,
    grossContributionPerUnit: 800,
    planningDemandUnits: 420,
    demandUnit: "tubs",
    consumptionAssumption: "1 tub / interested respondent / month x 6 months",
    projectedGrossContribution: 336000,
    contributionShare: 0.583,
    abcCategory: "A",
  },
  {
    id: "electrolytes",
    name: "Electrolytes",
    unitCost: 400,
    sellingPrice: 550,
    grossContributionPerUnit: 150,
    planningDemandUnits: 624,
    demandUnit: "boxes",
    consumptionAssumption: "1 box / interested respondent / week x 26 weeks",
    projectedGrossContribution: 93600,
    contributionShare: 0.162,
    abcCategory: "B",
  },
  {
    id: "creatine",
    name: "Creatine",
    unitCost: 800,
    sellingPrice: 1000,
    grossContributionPerUnit: 200,
    planningDemandUnits: 420,
    demandUnit: "tubs",
    consumptionAssumption: "1 tub / interested respondent / month x 6 months",
    projectedGrossContribution: 84000,
    contributionShare: 0.146,
    abcCategory: "B",
  },
  {
    id: "bcaa",
    name: "BCAA",
    unitCost: 1200,
    sellingPrice: 1450,
    grossContributionPerUnit: 250,
    planningDemandUnits: 246,
    demandUnit: "tubs",
    consumptionAssumption: "1 tub / interested respondent / month x 6 months",
    projectedGrossContribution: 61500,
    contributionShare: 0.107,
    abcCategory: "B",
  },
  {
    id: "eggs",
    name: "Eggs",
    unitCost: 196,
    sellingPrice: 220,
    grossContributionPerUnit: 24,
    planningDemandUnits: 60,
    demandUnit: "trays",
    consumptionAssumption: "5 trays / interested respondent over 6 months",
    projectedGrossContribution: 1440,
    contributionShare: 0.002,
    abcCategory: "C",
  },
];

export const demandTotals = {
  totalUnits: 1770,
  totalProjectedGrossContribution: 576540,
};

export const abcMethodologyNote =
  "This is an adapted contribution-based ABC classification, not conventional revenue- or inventory-investment-based ABC. No historical supplement sales or inventory-investment data exists for Armstrong Gym, so projected six-month gross-profit contribution is used as a planning proxy for inventory-management priority.";

export const demandMethodologyNote =
  "Stated purchase interest is not actual purchase behaviour. Six-month planning demand converts survey interest into unit quantities using explicit consumption assumptions (shown per product) because no historical transaction data exists. Requires validation through actual sales.";
