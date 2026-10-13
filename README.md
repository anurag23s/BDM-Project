# Armstrong Gym &mdash; BDM Capstone Decision-Support Dashboard

An operational frontend prototype that translates the BDM Capstone analysis
("Optimizing Customer Retention and Revenue in a Small-Scale Gymnasium") into a
practical decision-support dashboard for Armstrong Gym, Muzaffarpur.

This is **not** a production-ready commercial gym-management platform. It is a
faithful, evidence-aware analytics and operational dashboard built for a
capstone evaluation.

## Running locally

Requires Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

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

> The earlier Recommendations, Data & Methodology, and Project Assumptions
> tabs have been removed per request. Their underlying explanatory text
> (method-reasoning notes, assumption registry) still lives inline as
> `AssumptionBanner`s on the pages the figures actually appear on (e.g. the
> ABC note on Inventory Analysis, the EOQ/ROP assumptions note on EOQ & ROP).

## Where project data lives

All static project data (the actual capstone figures) lives in `src/data/*.js`
and is read-only:

- `members.js` &mdash; **132 real per-member records**, extracted directly from
  the project's analysis spreadsheet (Retention Dashboard + Member_Demography +
  Consolidated Directory tabs): Member ID, name, occupation, age, gender,
  preferred slot, actual subscription fee, total observed attendance, last
  attendance date, current (dynamic) gap, engagement category, and contact
  status. No names, IDs, or values here are invented.
- `attendance.js`, `financial.js`, `occupation.js` &mdash; the observed/derived
  attendance and financial figures reported in the capstone.
- `supplement.js`, `inventory.js`, `sensitivity.js` &mdash; the supplement
  survey, product economics, EOQ/ROP, and +/-20% scenario figures.
- `about.js` &mdash; gym/owner/student details shown on the About page. **Edit
  this file with your real owner name, contact, and photo path** &mdash; the
  owner's name/contact were not in the project materials, so they're left as
  clearly-labelled placeholders rather than invented.

## Observed vs. Derived vs. Planning-estimate handling

Every metric in the UI carries one of three evidence badges, defined once in
`src/components/EvidenceBadge.jsx` and used consistently everywhere:

- **Observed data** (teal) &mdash; actual collected data (8,404 attendance
  records, 132 members, 95 survey responses, etc.)
- **Derived from project data** (blue) &mdash; a metric calculated directly
  from observed data (75.76% gap share, occupation drop-off rates, ABC
  contribution shares, etc.)
- **Planning estimate** (ochre) &mdash; generated from stated assumptions
  because no historical data exists (six-month demand, EOQ, ROP, projected
  gross contribution, +/-20% scenarios)

The same three-color system is used for `AssumptionBanner` callouts, so a
reader learns the visual language once and it holds across all 13 pages.

### Two attendance-gap metrics, deliberately kept distinct

The app shows **two different, both-legitimate** gap metrics, and is explicit
about which is which:

- **Retrospective maximum gap** (used in Overview/Attendance charts and the
  capstone report's 75.76% headline) &mdash; the single longest gap each
  member ever had across the full study window.
- **Live/dynamic gap** (used in the Retention Dashboard and Members page) &mdash;
  days since each member's *most recent* observed visit, as of the dataset's
  reference date (5 Jan 2026). This is lower because 23 members who had a
  severe gap earlier in the window have since returned.

This distinction is called out explicitly on the Retention Dashboard and in
`src/data/members.js`'s header comment, specifically so it doesn't read as a
data inconsistency.

## Adding a candidate product (Inventory Analysis)

The "Add a candidate product" form on the Inventory Analysis page lets you
enter a name, unit cost, selling price, six-month demand estimate, demand
unit, and consumption assumption for a new product. On submit:

- It's stored locally (via `AppDataContext` + localStorage) as a
  `customProduct`, tagged `isCustom: true` and shown with an "Added" badge.
- `src/utils/productMath.js` recombines it with the five original project
  products and **recalculates contribution share and ABC category for every
  product**, using the same classification convention as the original
  analysis (A &ge; 40% share, B 5&ndash;40%, C &lt; 5% &mdash; verified to
  reproduce the report's own A/B/C assignments exactly).
- Removing a custom product restores the original five-product ranking.

This never touches the read-only project dataset in `supplement.js`.

## EOQ / ROP calculator

The EOQ & ROP page now has two independent, free-entry calculators at the
bottom (below the project's own Whey Protein figures): one for EOQ
(demand, ordering cost, holding cost &rarr; EOQ) and one for ROP (daily
demand, lead time, safety stock &rarr; ROP). They compute live in the
browser, are not tied to any specific product, and are not saved anywhere.

## Local-only operational data

Three things are editable in the UI, and all are stored **only in
`localStorage` in your browser** via `src/context/AppDataContext.jsx` &mdash;
never written back into the static project dataset:

- **Retention outreach actions** (contacted / response / return / renewal),
  set from the Member Drawer.
- **Supplement transactions**, logged from the Supplement Inventory page and
  listed on the Supplement Transactions page.
- **Candidate products**, added from the Inventory Analysis page.

Every place this local data appears is labelled "Locally entered operational
data," "Locally added planning entry," or "Local demo state -- not persisted
to a backend." Use the **Reset local demo data** button on the About page to
clear all three at once.

## What was intentionally left out (per the project's data-integrity rule)

No phone numbers, payment histories, renewal dates, actual stock levels,
actual supplement sales, actual retention outcomes, ROI, forecast-accuracy
claims, or churn-prediction/ML features are present anywhere in this app.
Fields the project has no data for are shown as **"Not recorded"** or
**"Pending validation"** rather than fabricated.

## Personalizing the About page

Before presenting, edit `src/data/about.js`:

- `ownerInfo.name` / `ownerInfo.contact` &mdash; currently placeholders
  ("Add gym owner's name here"), since the project materials didn't include
  the owner's name or contact details.
- `photoInfo.path` &mdash; currently empty. Drop an image file into `public/`
  and point `path` to it (see `public/HOW_TO_ADD_PHOTO.txt`) to have it appear
  on the About page; until then it shows an honest "no photo added yet"
  placeholder rather than a fabricated image.
- `studentInfo` is pre-filled from the report's title page (Anurag Sinha,
  21F3002198, IITM Online BS Degree Program, IIT Madras) &mdash; update if
  anything has changed.

## Known limitations

- This was built and syntax-validated (including a full esbuild bundle
  smoke-test against stubbed dependencies) without network access to actually
  run `npm install`, so you are the first real `npm run dev` for this exact
  dependency set &mdash; if a minor version mismatch surfaces, bump the
  affected package in `package.json`.
- No backend, database, or authentication exists, by design.
- Retention/transaction data entered in the UI is per-browser (localStorage),
  not shared across devices.
