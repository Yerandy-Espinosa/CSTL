# CSTL Field Trip — Stabilization & Recovery Plan

## Phase 1: Root Cause Diagnosis

The current implementation has drifted from a stable, cohesive foundation into a fragmented state with severe visual inconsistencies.

### Identified Root Causes

| Issue | Technical Root Cause | Impact |
| :--- | :--- | :--- |
| **Typography Hierarchy** | Overuse of `font-black` (900) across all levels and extreme heading scales (`text-7xl`). | Loss of emphasis; UI feels heavy and "shouting." |
| **Design System Fragmentation** | `globals.css` tokens are ignored in favor of ad-hoc, inconsistent Tailwind utility classes. | Visual drift across routes; difficult to maintain. |
| **Grid & Spacing Drift** | Ad-hoc paddings (`p-10` vs `p-8`) and gaps (`gap-10`) instead of a shared spacing scale. | Cards and sections look "glued together" or inconsistently spaced. |
| **Over-Styling** | Aggressive border radii (`2.5rem`) and extreme shadows (`shadow-premium` vs `shadow-xl`). | UI feels "puffy" and lacks the professional SaaS "Lumina" aesthetic. |
| **Responsive Failures** | Hardcoded large paddings on `main-content` and large text scales not adapting well to viewport changes. | Horizontal scrolling or layout breakage on standard laptop resolutions. |

---

## Phase 2: Visual Foundation Recovery Plan

### 1. Stabilize `globals.css`
- Refine design tokens (typography, spacing, radius).
- Re-standardize global heading styles (`h1`, `h2`, `h3`).
- Implement a consistent `surface` and `card` foundation using CSS variables.

### 2. Standardize Page Headers
- Replace ad-hoc `text-5xl` / `text-7xl` headers with a consistent `PageHeader` component or utility.
- Target `h1` at ~`32px` - `36px` (2rem - 2.25rem) instead of `60px+`.

### 3. Recover Typography Scale
- Limit `font-black` to very specific accents.
- Re-introduce `font-semibold` (600) for standard headings and `font-medium` (500) for UI elements.
- Ensure body text is at a readable `14px` - `16px` scale.

### 4. Cohesive Card System
- Standardize `.card` padding at `24px` (1.5rem).
- Standardize border radii at `12px` (md) - `16px` (lg).

---

## Phase 3: Keep / Refine / Rebuild Classification

| Screen | Classification | Action |
| :--- | :--- | :--- |
| **Dashboard (`/`)** | **REFINE** | Standardize header, stat cards, and spacing. Fix typography weights. |
| **Bookings List (`/bookings`)** | **REFINE** | Standardize list items, status badges, and search bar spacing. |
| **Booking Detail (`/bookings/[id]`)** | **REFINE** | (TBD upon audit) Ensure it follows the new layout standard. |
| **Booking Wizard (`/bookings/new`)** | **REFINE/REBUILD** | Likely needs logic check + heavy styling standardization. |
| **Schools (`/schools`)** | **REFINE** | Standardize directory layout. |
| **Invoices (`/invoices`)** | **REBUILD** | Ensure high-fidelity document preview matches modern direction. |
| **Reports (`/reports`)** | **REFINE** | Optimize data presentation for clarity. |

---

## Deliverable Order

1.  **Foundation Fix**: Update `globals.css` and `lib/tokens` (if exists).
2.  **Layout Fix**: Adjust `RootLayout` and `Sidebar` for consistency.
3.  **Component Pass**: Standardize `Badge`, `Button`, and `Card` styles.
4.  **Route Pass**: Sequential refinement of Dashboard -> Bookings -> etc.
