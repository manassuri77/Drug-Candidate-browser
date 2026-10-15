# Drug Candidate Browser

A small web app to **view, search, and filter** a list of drug candidates, built with **Next.js (App Router), TypeScript, and Tailwind CSS**.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm test           # vitest unit tests
npm run typecheck  # tsc --noEmit
```

## Features

- **Homepage** — card grid of drug candidates (name, status badge, description)
- **Search** — debounced, case-insensitive name search
- **Filter** — status dropdown (Approved / Phase III / In Development / Discontinued)
- **Pagination** — server-side, 9 per page
- **Detail page** — `/candidates/:id` with mechanism of action, indication, developer, phase, side effects; 404 page for unknown ids
- **Mock API** — `GET /api/candidates` (query params `search`, `status`, `page`, `pageSize`) and `GET /api/candidates/:id`, backed by `data/drugs.json`

## Architecture & approach

```
app/
  page.tsx                  # Server Component: reads searchParams, fetches, renders
  candidates/[id]/page.tsx  # Server Component detail page + generateMetadata
  api/candidates/           # Route handlers exposing the same data layer as JSON
components/                 # CandidateCard, StatusBadge, SearchFilters (client), Pagination (client)
lib/drugs.ts                # Data-access layer (server-only): list/get/statuses
lib/types.ts                # Shared TypeScript types
data/drugs.json             # Mock dataset (12 candidates)
__tests__/                  # Vitest unit tests for the data layer
```

Key decisions:

- **Server Components by default.** The list page is a Server Component that reads filters from the URL query string and fetches on the server — the client never downloads the full dataset, and results are shareable/bookmarkable.
- **All querying behind `lib/drugs.ts`.** The `list` contract (search + status + pagination) is identical to what a real API or DB would expose, so the JSON file can be swapped for Postgres/REST with zero UI changes. This is what lets the architecture handle large datasets even though the exercise ships 12 rows.
- **Scales to large data**: server-side filtering + pagination means only one page crosses the wire; `React.cache` dedupes the file read per render; the debounced search input avoids a fetch per keystroke.
- **Both render paths and API reuse the same layer** — `lib/drugs.ts` powers the SSR pages *and* the `/api/candidates` route handlers, so there is a single source of truth.
- **Client components only where interactivity requires it** (search input, pagination buttons) — keeps the JS bundle small and LCP fast.
- Type-safe end to end (`strict` TS), accessible labels, and a `loading.tsx` skeleton for perceived performance.

Features supported:

**Candidate listing** — responsive card grid on the homepage showing name, status badge, and description for each drug candidate (12 mock records).
**Search** — case-insensitive name search, debounced (300ms) so it doesn't fetch on every keystroke.
**Status filter** — dropdown to filter by Approved / Phase III / In Development / Discontinued; combines with search.
**Pagination** — server-side, 9 results per page with Previous/Next controls and result counts.
**Detail page** — /candidates/:id showing indication, developer, phase, mechanism of action, and side effects as tags, with a back link.
**Mock REST API** — GET /api/candidates?search=&status=&page=&pageSize= (paginated JSON) and GET /api/candidates/:id (full record, proper 404).
**Shareable URLs** — filters live in the query string (/?search=vera&status=Approved&page=1), so any filtered view can be bookmarked/shared.
**UX polish** — loading skeleton, empty-state message, styled not-found page, hover/focus states, accessible labels, per-page title metadata.
**Quality gates** — strict TypeScript, 8 Vitest unit tests covering the data layer, clean production build, README documenting architecture and trade-offs.

## Testing

`__tests__/drugs.test.ts` covers the data layer: pagination, case-insensitive search, status filtering, combined filters, page clamping, detail lookup, and status enumeration.
