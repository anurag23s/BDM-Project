// Descriptive occupation breakdown of retrospective severe/observed drop-offs.
// No significance testing was run -- these are descriptive comparisons only.

export const occupationDropoff = [
  { occupation: "Student", members: 84, observedDropoffs: 26, dropoffRate: 0.3095, shareOfBase: 0.6364 },
  { occupation: "Business", members: 10, observedDropoffs: 2, dropoffRate: 0.2 },
  { occupation: "Job", members: 16, observedDropoffs: 1, dropoffRate: 0.0625 },
  { occupation: "Housewife", members: 6, observedDropoffs: 4, dropoffRate: 0.6667, smallSampleWarning: true },
];

export const studentShareOfDropoffs = {
  studentDropoffs: 26,
  totalObservedDropoffs: 37,
  share: 0.7027,
};

export const occupationMethodologyNote =
  "Occupation analysis is descriptive. No significance testing (e.g. proportion test or logistic regression) was run; differences shown here should not be read as statistically confirmed. Small-sample groups (n<10) are flagged and should not be treated as comparable evidence.";
