---
name: Migrate React Portfolio to Astro with CMS (Async Execution)
overview: A detailed, prescriptive plan to migrate the `ref/ai-studio-portfolio` React app to Astro. Designed for async execution with explicit source-to-destination mappings and a "Copy & Adapt" strategy for speed.
todos:
  - id: install-deps
    content: Install dependencies (framer-motion, jotai, keystatic, etc.)
    status: pending
  - id: setup-cms
    content: "[Track A] Configure Keystatic and create content schemas"
    status: pending
    dependencies:
      - install-deps
  - id: migrate-content
    content: "[Track A] Extract data from constants.ts and create MDX files"
    status: pending
    dependencies:
      - setup-cms
  - id: copy-components
    content: "[Track B] Copy components from ref/.../components to src/components/react"
    status: pending
    dependencies:
      - install-deps
  - id: copy-utils
    content: "[Track B] Copy store/atoms.ts and utils/"
    status: pending
    dependencies:
      - install-deps
  - id: refactor-components
    content: "[Track B] Refactor components (remove router, fix imports, stub Aura)"
    status: pending
    dependencies:
      - copy-components
      - copy-utils
  - id: create-layout
    content: "[Track B] Create Layout.astro (Ref: App.tsx) with ViewTransitions"
    status: pending
    dependencies:
      - refactor-components
  - id: implement-pages
    content: Implement all pages (Home, Writings, Experiments, Services)
    status: pending
    dependencies:
      - migrate-content
      - create-layout
---

# Migrate React Portfolio to Astro with CMS

This plan outlines the steps to migrate your React Vite portfolio to the existing Astro project.

**CRITICAL INSTRUCTION FOR AGENTS:**

-   **Source of Truth**: All reference code is located in `ref/ai-studio-portfolio/`.
-   **Strategy**: **Copy, Paste, Adapt**. Do not rewrite logic from scratch unless necessary. Copy the file, move it to the new location, then fix imports, remove `react-router-dom`, and fix lint errors.
-   **Parallelism**: Track A (Content) and Track B (Components) are independent. Execute them in parallel.

## 1. Setup & Dependencies (Serial Start)

*Must be completed first to unblock parallel tracks.*

- **Dependencies**:
- `framer-motion`, `lucide-react`, `jotai`, `jotai/utils`, `clsx`, `tailwind-merge`
- `@keystatic/astro`, `@keystatic/core`
- **Configuration**:
- Update `astro.config.mjs` (ensure `react`, `mdx`, `tailwind` are active).
- Add Keystatic integration.

## 2. Track A: Content Architecture (CMS)

*Execute asynchronously/in parallel with Track B.*
*Source Reference: `ref/ai-studio-portfolio/constants.ts`*

- **CMS Integration**:
- Create `keystatic.config.ts`.
- Mount Keystatic at `/keystatic`.
- **Content Collections** (`src/content/`):
- **Strategy**: Read `ref/ai-studio-portfolio/constants.ts`. Extract the hardcoded data arrays (`WRITINGS_DATA`, `EXPERIMENTS_DATA`) and create individual `.mdx` files for them.
- `writings`: Create `src/content/writings/*.mdx` from `WRITINGS_DATA`.
- `experiments`: Create `src/content/experiments/*.mdx` from `EXPERIMENTS_DATA`.
- `services`: Create `src/content/services/*.mdx`.

## 3. Track B: UI & Component Migration

*Execute asynchronously/in parallel with Track A.*
*Source Reference: `ref/ai-studio-portfolio/components/` & `ref/ai-studio-portfolio/store/`*

- **Bulk Migration**:
- **Copy** all files from `ref/ai-studio-portfolio/components/` to `src/components/react/`.
- **Copy** `ref/ai-studio-portfolio/store/atoms.ts` to `src/store/atoms.ts`.
- **Refactoring (The "Adapt" Phase)**:
- **Remove Router**: Find all usages of `react-router-dom` (`Link`, `useNavigate`, `useLocation`, `<Routes>`). Replace `Link` with `a` tags. Remove routing logic (Astro handles routing).
- **Fix Imports**: Update imports to point to `src/store/atoms` or `src/utils` as needed.
- **Stub Aura**: Create `src/services/auraService.ts` (stub) to replace `geminiService.ts`. Update `Aura.tsx` to use this stub to prevent build errors.
- **Layout**:
- Create `src/layouts/Layout.astro`.
- **Reference**: Look at `ref/ai-studio-portfolio/App.tsx`.
- **Implement**: Move the `Navbar`, `Dock`, `Aura`, `StatusBar`, and `ThemeTransitionOverlay` into this layout.
- **Persistence**: Add `client:load` and `transition:persist` to these persistent islands so they stay alive during navigation.

## 4. Phase 3: Page Implementation (Serial Finish)

*Requires Track A & B to be substantially complete.*

Recreate routes in `src/pages/` using the migrated components and content collections.

- **Dashboard**: `src/pages/index.astro` (Ref: `Dashboard.tsx`)
- **About**: `src/pages/about.astro` (Ref: `About.tsx`)
- **Writings**:
- `src/pages/writings/index.astro` (Ref: `WritingIndex.tsx`)
- `src/pages/writings/[...slug].astro `(Ref: `BlogPost.tsx` + `getCollection`)
- **Experiments**:
- `src/pages/experiments/index.astro` (Ref: `Experiments.tsx`)
- `src/pages/experiments/[...slug].astro `(Ref: `ExperimentDetail.tsx` + `getCollection`)
- **Services**:
- `src/pages/services/index.astro` (Ref: `ServicesIndex.tsx`)
- `src/pages/services/[...slug].astro `(Ref: `ServiceDetail.tsx` + `getCollection`)

## 5. Migration Steps

1.  **Init**: Install dependencies.
2.  **Split Execution**:

- *Agent 1 (Content)*: Reference `constants.ts`. Setup Keystatic. Generate MDX files.
- *Agent 2 (Code)*: Copy `components/` -> `src/components/react/`. Copy `store/` -> `src/store/`. Fix imports. Stub services. Build Layout.

3.  **Converge**: Implement Astro Pages using resources from both tracks.
4.  **Final Polish**: Check transitions and styling.