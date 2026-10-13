// Observed + derived attendance data.
// Source: Armstrong Gym attendance registers, 2 Jun 2025 - 5 Jan 2026 (OCR + manual verification).

export const attendanceWindow = {
  start: "2025-06-02",
  end: "2026-01-05",
  totalRecords: 8404,
  trackedMembers: 132,
};

// OBSERVED DATA -> DERIVED METRIC: retrospective maximum-gap classification
// (the headline figures used throughout the capstone report).
export const retrospectiveGapCategories = [
  { category: "High", criteria: "<= 7 days", count: 15, share: 0.1136 },
  { category: "Medium", criteria: "8-14 days", count: 17, share: 0.1288 },
  { category: "Low / At-Risk", criteria: "15-29 days", count: 63, share: 0.4773 },
  { category: "Severe Drop-off", criteria: ">= 30 days", count: 37, share: 0.2803 },
];

export const retrospectiveAtRisk = {
  membersAtOrAbove15Days: 100,
  totalMembers: 132,
  share: 0.7576,
};

// DERIVED METRIC: how many historically-severe members had, by the dashboard's
// reference date, already returned to active attendance. Real figure from the
// project's Retention Dashboard tab methodology note.
export const recoveredFromSevere = {
  count: 23,
  note: "23 members who experienced a severe drop-off (30+ day gap) in an earlier month were attending again as of the dashboard reference date.",
};
