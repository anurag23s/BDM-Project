# Armstrong Gym &mdash; BDM Capstone Decision-Support Dashboard

An operational frontend prototype that translates the BDM Capstone analysis
("Optimizing Customer Retention and Revenue in a Small-Scale Gymnasium") into a
practical decision-support dashboard for Armstrong Gym, Muzaffarpur.


## Running locally

## Implemented pages

1. **Overview** &mdash; executive summary: KPI cards, financial/attendance charts, Oct&rarr;Nov deterioration, action priorities.
2. **Retention Dashboard** &mdash; live outreach workflow: monitoring pool, funnel, filters, member table, process/outcome KPIs.
3. **Members** &mdash; searchable directory of all 132 real tracked members.
4. **Attendance** &mdash; attendance analytics: retrospective vs. live gap distributions, slot breakdown, what this can/cannot establish.
5. **Supplement Inventory** &mdash; product economics cards + transaction entry form.
6. **Supplement Transactions** &mdash; ledger of locally-logged transactions (starts empty).
7. **Inventory Analysis** &mdash; contribution-based ABC ranking, demand planning table, A/B/C prioritization, **and a form to add a candidate product** (name, cost, price, estimated demand, demand unit, consumption assumption) that live-recalculates contribution share and ABC category across the whole product set.
8. **EOQ & ROP** &mdash; the project's own preliminary EOQ/ROP figures, plus a **free-entry EOQ calculator and ROP calculator** for testing your own demand/cost/lead-time assumptions on the fly.
9. **Sensitivity Analysis** &mdash; pessimistic/base/optimistic scenario cards, chart, per-product table.
10. **About / Capstone** &mdash; gym details, owner details (placeholder -- see below), student/author details with IIT Madras affiliation, a photo section, the project's narrative arc, and a local-data reset control.


## EOQ / ROP calculator

The EOQ & ROP page now has two independent, free-entry calculators at the
bottom (below the project's own Whey Protein figures): one for EOQ
(demand, ordering cost, holding cost &rarr; EOQ) and one for ROP (daily
demand, lead time, safety stock &rarr; ROP). They compute live in the
browser, are not tied to any specific product, and are not saved anywhere.


