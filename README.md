# Mosaic — SaaS Analytics Dashboard Starter

A production-ready Next.js + TypeScript dashboard demonstrating scalable frontend architecture for data-heavy SaaS products. Every structural decision is intentional and documented below.

**[Live demo →](https://mosaic-demo-dashboard.vercel.app)**

![Dashboard preview](docs/preview.png)

**Stack**: Next.js 14 · TypeScript · Tailwind CSS · TanStack Query · TanStack Table · Recharts · React Hook Form · Zod

---

## What's inside

Four screens, each demonstrating a different architecture pattern:

| Screen          | What it demonstrates                                                    |
| --------------- | ----------------------------------------------------------------------- |
| **Overview**    | KPI cards, revenue chart, user growth chart, skeleton loading states    |
| **Users table** | Sortable/filterable table, column visibility, pagination, CSV export    |
| **User detail** | Dynamic routing, activity timeline, co-located data fetching            |
| **Settings**    | Form architecture with validation, Zod schema as single source of truth |

---

## Architecture decisions

This section explains the _why_ behind the structure — not what was built, but the reasoning behind each choice. If you're evaluating this codebase, this is the part worth reading.

### 1. Feature-based folder structure, not layer-based

Most tutorials organise code by layer:

```
components/
  Button.tsx
  UserCard.tsx
  RevenueChart.tsx
hooks/
  useUsers.ts
  useAnalytics.ts
utils/
  formatters.ts
```

This feels clean at first. It breaks down once you have multiple features and multiple engineers, because:

- A change to the `users` feature touches files scattered across 4 folders
- No clear ownership boundaries — anyone can touch anything
- `components/` becomes a 40-file dumping ground with no internal structure

**This codebase uses feature-based structure instead:**

```
src/features/
  analytics/
    components/   # only used by analytics feature
    hooks/        # data-fetching logic scoped to analytics
    api/          # API call definitions
    types/        # TypeScript types for this feature only
    index.ts      # public API — only export what other features need
  users/
    components/
    hooks/
    api/
    types/
    index.ts
src/shared/
  components/     # truly reusable: Button, Table, Badge, Modal
  hooks/          # useDebounce, useLocalStorage
  utils/          # pure functions, formatters
```

**The rule**: a component lives inside a feature until a second feature needs it. Then it moves to `shared/`. This keeps the shared layer genuinely small and intentional.

**The payoff at scale**: a new engineer can be assigned the `billing` feature and work entirely inside `src/features/billing/` without touching anything else. That's the goal.

---

### 2. React Query for server state — not Redux

Redux is the right tool for complex client-side state: multi-step forms, optimistic updates, real-time sync across disconnected components. For most SaaS dashboards, 80% of "state" is really just _server data with loading and error states_. Redux is overkill for that.

React Query handles server state better:

- Automatic background refetching when the window regains focus
- Request deduplication (two components asking for the same data = one network request)
- Cache invalidation without action/reducer boilerplate
- `isLoading`, `isError`, `data` out of the box — no manual state machines

The remaining client state (UI state, active filters, selected table rows) lives in `useState` or `useReducer`, co-located with the component that owns it. No global store needed.

---

### 3. Zod at API boundaries — not just for forms

TypeScript gives compile-time safety. The moment data crosses the network, you're back to `any`. Zod gives you runtime validation at that boundary.

Every API response in this codebase is validated against a Zod schema before it reaches the UI. The TypeScript types are then _derived_ from the schema:

```typescript
// Define once
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  plan: z.enum(["starter", "pro", "enterprise"]),
  status: z.enum(["active", "inactive", "pending"]),
  mrr: z.number(),
});

// Type is inferred — no duplication
type User = z.infer<typeof UserSchema>;
```

The same schema validates the API response _and_ the settings form. The API contract and the form contract cannot drift apart.

---

### 4. TanStack Table — headless, not opinionated

Most table libraries give you a pre-styled component. You spend two hours fighting the library's CSS to make it match your design system.

TanStack Table is headless: it gives you state and logic, you provide the markup. This means:

- Full control over every `<tr>`, `<td>`, and `<th>`
- Column sorting, filtering, visibility, and pagination work out of the box
- The table looks exactly like the rest of the design system — no overrides

---

### 5. Performance defaults baked in

- `next/image` everywhere (automatic WebP, lazy loading, no layout shift)
- Heavy chart components loaded with `dynamic(() => import(...), { ssr: false })` — not in the initial bundle
- Skeleton loading states instead of spinners — better perceived performance for data-heavy views
- `React.memo` applied _after profiling_, not preemptively — premature memoisation adds complexity without measurable benefit

**Lighthouse score: 97 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**

---

### 6. How to add a new feature

This is the most important section for evaluating team scalability. A new engineer should be able to ship a feature by following this pattern without asking anyone:

```bash
# Step 1: Create the feature folder
mkdir -p src/features/billing/{components,hooks,api,types}

# Step 2: Define types first — forces you to think about the domain model
touch src/features/billing/types/index.ts

# Step 3: Define Zod schemas and API fetching functions
touch src/features/billing/api/index.ts

# Step 4: Wrap fetching in React Query hooks
touch src/features/billing/hooks/useBilling.ts

# Step 5: Build components that consume the hooks
touch src/features/billing/components/BillingTable.tsx

# Step 6: Expose only what other features need
# src/features/billing/index.ts
export { BillingTable } from "./components/BillingTable"
export type { Invoice } from "./types"

# Step 7: Add the route
touch src/app/(dashboard)/billing/page.tsx
```

The feature owns its types, its data fetching, its components, and its public interface. Other features only import from `src/features/billing/index.ts` — never from internal paths. This keeps coupling explicit and refactoring safe.

---

## Project structure

```
src/
├── features/
│   ├── analytics/
│   │   ├── components/
│   │   │   ├── KpiCard.tsx
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── UserGrowthChart.tsx
│   │   │   └── OverviewSkeleton.tsx
│   │   ├── hooks/
│   │   │   └── useAnalytics.ts
│   │   ├── api/
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts
│   └── users/
│       ├── components/
│       │   ├── UsersTable.tsx
│       │   ├── UserFilters.tsx
│       │   ├── UserDetail.tsx
│       │   └── ActivityTimeline.tsx
│       ├── hooks/
│       │   ├── useUsers.ts
│       │   └── useUserDetail.ts
│       ├── api/
│       │   └── index.ts
│       ├── types/
│       │   └── index.ts
│       └── index.ts
├── shared/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── Modal.tsx
│   │   └── layout/
│   │       ├── Sidebar.tsx
│   │       ├── Header.tsx
│   │       └── DashboardLayout.tsx
│   ├── hooks/
│   │   └── useDebounce.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   └── cn.ts
│   └── types/
│       └── index.ts
├── app/
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── users/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── settings/page.tsx
│   ├── providers.tsx
│   └── layout.tsx
├── mocks/
│   ├── analytics.ts
│   └── users.ts
└── lib/
    └── queryClient.ts
```

---

## Getting started

```bash
git clone https://github.com/yourusername/mosaic-dashboard
cd mosaic-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Tech stack rationale

| Tool                    | Alternative considered         | Why this one                                                               |
| ----------------------- | ------------------------------ | -------------------------------------------------------------------------- |
| Next.js 14 (App Router) | Vite + React                   | Server components reduce client bundle; route-based code splitting is free |
| TanStack Query          | Redux Toolkit Query            | Simpler mental model; better DX for pure server-state use cases            |
| TanStack Table          | AG Grid, React Table v7        | Headless — no style conflicts; fully typed                                 |
| Zod                     | Yup, io-ts                     | Best TypeScript inference; works for both API validation and form schemas  |
| Recharts                | Chart.js, Nivo                 | React-native API; easy to compose custom chart shapes                      |
| React Hook Form         | Formik                         | No controlled inputs — far fewer re-renders on keystroke                   |
| Tailwind CSS            | CSS Modules, styled-components | Co-located styles eliminate dead CSS; consistent design tokens             |

---

## License

MIT — use this however you like.

---

_Built by [Safiullah Hamidi](https://www.linkedin.com/in/your-profile) · Senior Frontend Engineer · [Upwork profile](https://www.upwork.com/freelancers/~012a7b3015a184f996)_
