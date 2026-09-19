# IELTS Arena: Foundation Scaffolding & 5 Minigames Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete foundation for IELTS Arena, including Next.js 14/15 App Router setup, Linear-inspired pure CSS design engine, Prisma database schema, Clean Architecture deep modules (Elo & 5 Game engines with TDD), and full UI component scaffolds for the Bento Grid and the 5 Minigames with Desktop & Mobile responsiveness.

**Architecture:** Next.js App Router with Clean Architecture decoupling. Pure TypeScript modules handle Elo calculations and game state machines independently of UI. The UI adheres strictly to the Linear UX engine (high density, 32px data rows, border-first depth, zero soft shadows, CSS `:has()` parent selectors, mobile bottom dock and compact arena HUD).

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Prisma ORM, Lucide React, Vitest.

**Spec:** [docs/superpowers/specs/2026-09-19-ielts-arena-design.md](file:///d:/Codes/IeltsNicheSkill/docs/superpowers/specs/2026-09-19-ielts-arena-design.md)

## Global Constraints
- Maximum table/row height: 32px for data tables and leaderboard lists; font size: 13px; letter-spacing: -0.01em.
- Color discipline: Dark Canvas `#0B0F17`, Surface 1 `#131B26`, Surface 2 `#1C2636`, Border `1px solid rgba(255,255,255,0.08)`, Brand `#6366F1`.
- Borders over shadows: absolutely zero wide blur shadows (`box-shadow: none` across cards).
- CSS Reactive State: Use CSS `:has()` for form submit button locks and card selection states.
- Mobile-First: Bottom Dock for navigation on screens < 1024px, compact Arena HUD, thumb-zone buzzer for Error Hunter, and `interactive-widget=resizes-content` viewport meta.
- No AI copywriting fluff, no em dashes (—), button copy follows Action Verb + Concrete Outcome.

---

### Task 1: Initialize Next.js Project & Linear UX Design Tokens

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `next.config.mjs`
- Create: `src/app/globals.css`, `src/app/layout.tsx`

**Interfaces:**
- Produces: CSS utility tokens (`--canvas`, `--surface-1`, `--surface-2`, `--border-subtle`, `--brand-indigo`, `--font-sans`), pure CSS `:has()` rules, clamp typography.

- [ ] **Step 1: Create package.json with dependencies**
  Include Next.js 14/15, React 18/19, Tailwind CSS, Lucide React, Prisma, Vitest.

- [ ] **Step 2: Run npm install**
  Run `npm install` and verify node_modules are created without conflicts.

- [ ] **Step 3: Configure tailwind.config.ts with Linear tokens**
  Map out background colors (`#0B0F17`, `#131B26`, `#1C2636`), border colors, and Electric Indigo (`#6366F1`).

- [ ] **Step 4: Implement src/app/globals.css with Pure CSS :has() and clamp() rules**
  Write CSS variables, zero-shadow rules, `:has()` button disabling, and 32px compact table utility.

- [ ] **Step 5: Create root layout in src/app/layout.tsx**
  Include viewport `<meta name="viewport" content="width=device-width, initial-scale=1, interactive-widget=resizes-content">` and Inter font.

- [ ] **Step 6: Commit**
  `git add . && git commit -m "chore: setup Next.js project and Linear UX design tokens"`

---

### Task 2: Database Layer & Prisma Schema

**Files:**
- Create: `prisma/schema.prisma`
- Create: `src/lib/prisma.ts`
- Create: `src/types/database.types.ts`

**Interfaces:**
- Produces: `User`, `EloRating`, `EloHistory`, `Match`, `MatchParticipant`, `GameRoundSubmission` types and Prisma client.

- [ ] **Step 1: Write prisma/schema.prisma**
  Define models for User, EloRating (per GameType enum), EloHistory, Match, MatchParticipant, and GameRoundSubmission.

- [ ] **Step 2: Generate Prisma Client**
  Run `npx prisma generate` to verify schema validity.

- [ ] **Step 3: Create src/lib/prisma.ts**
  Export global Prisma client singleton.

- [ ] **Step 4: Create src/types/database.types.ts**
  Export typed domain interfaces for game submissions and match metadata.

- [ ] **Step 5: Commit**
  `git add prisma/ src/lib/ src/types/ && git commit -m "feat(db): add Prisma schema and database types"`

---

### Task 3: Deep Modules & TDD: Elo Calculation Engine

**Files:**
- Create: `src/modules/elo/elo.calculator.ts`
- Create: `src/modules/elo/elo.types.ts`
- Test: `tests/modules/elo/elo.calculator.test.ts`

**Interfaces:**
- Consumes: None (Pure module).
- Produces: `calculateEloChange(playerRating, opponentRating, result, options): EloCalculationResult`

- [ ] **Step 1: Write failing test in tests/modules/elo/elo.calculator.test.ts**
  Test base win/loss Elo changes, placement match K-factor scaling, and win-streak bonuses.

- [ ] **Step 2: Run test to verify it fails**
  Run `npx vitest run tests/modules/elo/elo.calculator.test.ts`
  Expected: FAIL (module not implemented).

- [ ] **Step 3: Implement src/modules/elo/elo.calculator.ts**
  Implement the standard Glicko/Elo formula with dynamic K-factors (K=40 for provisional, K=24 for normal, K=16 for master), win streak multipliers, and draw handling.

- [ ] **Step 4: Run test to verify it passes**
  Run `npx vitest run tests/modules/elo/elo.calculator.test.ts`
  Expected: PASS.

- [ ] **Step 5: Commit**
  `git add src/modules/elo/ tests/modules/elo/ && git commit -m "feat(elo): implement Elo calculation engine with tests"`

---

### Task 4: Deep Modules: 5 Minigame State Engines

**Files:**
- Create: `src/modules/game-engines/word-duel.engine.ts`
- Create: `src/modules/game-engines/paraphrase.engine.ts`
- Create: `src/modules/game-engines/error-hunter.engine.ts`
- Create: `src/modules/game-engines/listening-bomb.engine.ts`
- Create: `src/modules/game-engines/topic-debate.engine.ts`
- Test: `tests/modules/game-engines/game-engines.test.ts`

**Interfaces:**
- Produces: State machines and action reducers for the 5 games.

- [ ] **Step 1: Write failing tests in tests/modules/game-engines/game-engines.test.ts**
  Test Word Duel word-chain validation, Error Hunter buzzer lockouts, and Listening Bomb defusal timer.

- [ ] **Step 2: Run test to verify it fails**
  Run `npx vitest run tests/modules/game-engines/game-engines.test.ts`
  Expected: FAIL.

- [ ] **Step 3: Implement the 5 game state engines**
  Write pure functional reducers managing word chains, buzzer locking, timer countdowns, and scoring rules.

- [ ] **Step 4: Run test to verify it passes**
  Run `npx vitest run tests/modules/game-engines/game-engines.test.ts`
  Expected: PASS.

- [ ] **Step 5: Commit**
  `git add src/modules/game-engines/ tests/modules/game-engines/ && git commit -m "feat(games): implement state engines for 5 minigames"`

---

### Task 5: Linear UI Component Library & Layout Shell

**Files:**
- Create: `src/components/ui/Button.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/Badge.tsx`
- Create: `src/components/ui/BoneyardSkeleton.tsx`
- Create: `src/components/layout/Sidebar.tsx` (Desktop collapsible)
- Create: `src/components/layout/MobileNavDock.tsx` (Mobile bottom navigation)
- Create: `src/components/layout/AppShell.tsx`

**Interfaces:**
- Produces: Reusable Linear-styled UI components with zero blur shadows, 1px crisp borders, and full responsiveness.

- [ ] **Step 1: Build Button, Card, Badge components**
  Strictly follow borders-over-shadows, 80ms hover transitions, and keyboard shortcut indicators.

- [ ] **Step 2: Build BoneyardSkeleton component**
  Pixel-perfect skeleton screen matching 32px density for tables and bento cards to eliminate layout shifts.

- [ ] **Step 3: Build Sidebar & MobileNavDock**
  Sidebar for desktop (collapsible 240px -> 64px) and Mobile Bottom Dock (56px with safe-area padding).

- [ ] **Step 4: Build AppShell wrapper**
  Seamlessly integrates Sidebar and MobileNavDock around children.

- [ ] **Step 5: Commit**
  `git add src/components/ && git commit -m "feat(ui): add Linear UI components and responsive AppShell"`

---

### Task 6: Asymmetric Bento Grid Dashboard

**Files:**
- Create: `src/components/bento/LiveMatchArenaCard.tsx`
- Create: `src/components/bento/BandUpgraderCard.tsx`
- Create: `src/components/bento/RadarScoreCard.tsx`
- Create: `src/components/bento/ListeningBombCard.tsx`
- Create: `src/components/bento/WeeklyLeaderboardCard.tsx`
- Create: `src/app/(dashboard)/page.tsx`

**Interfaces:**
- Produces: 12-column Bento Grid on Desktop, 1-column responsive priority stack on Mobile.

- [ ] **Step 1: Build LiveMatchArenaCard (Span 7 col x 2 row)**
  Displays active 1v1 PvP rooms, countdown timers, Elo stakes, and "Vào phòng đấu 1v1" CTA.

- [ ] **Step 2: Build BandUpgraderCard (Span 5 col x 2 row)**
  Fast submission box for Task 2 essays with "Tái tạo Band 8.5" instant conversion preview.

- [ ] **Step 3: Build RadarScoreCard, ListeningBombCard & WeeklyLeaderboardCard**
  Radar chart of 4 IELTS criteria (TR, CC, LR, GRA) and 32px compact leaderboard table.

- [ ] **Step 4: Assemble Bento Grid in src/app/(dashboard)/page.tsx**
  Compose the 12-column desktop grid and 1-column mobile stack.

- [ ] **Step 5: Commit**
  `git add src/components/bento/ src/app/ && git commit -m "feat(dashboard): build Asymmetric Bento Grid hub"`

---

### Task 7: The 5 Minigame Arena Component Scaffolds

**Files:**
- Create: `src/components/arena/SplitScreenArenaLayout.tsx`
- Create: `src/components/arena/WordDuelArena.tsx`
- Create: `src/components/arena/ParaphraseBlitzArena.tsx`
- Create: `src/components/arena/ErrorHunterArena.tsx`
- Create: `src/components/arena/ListeningBombArena.tsx`
- Create: `src/components/arena/TopicDebateArena.tsx`
- Create: `src/app/arena/[gameType]/page.tsx`

**Interfaces:**
- Produces: Split-screen desktop arena and mobile compact HUD for all 5 minigames with border-flash visual feedback and keyboard/touch triggers.

- [ ] **Step 1: Build SplitScreenArenaLayout**
  3-column layout on Desktop (Player 1 | Sync Timer & Meter | Opponent) and Compact HUD on Mobile.

- [ ] **Step 2: Build WordDuelArena scaffold**
  Academic C1/C2 word-chain input, timer, and lexical level tags.

- [ ] **Step 3: Build ParaphraseBlitzArena scaffold**
  Original sentence, 45s countdown, Lexical Resource & Syntactic variety meter.

- [ ] **Step 4: Build ErrorHunterArena scaffold**
  Sentence with collocation trap, desktop `[Space]` buzzer & mobile 52px thumb buzzer.

- [ ] **Step 5: Build ListeningBombArena & TopicDebateArena scaffolds**
  Co-op dictation bomb defusal and Part 3 debate audio visualizer.

- [ ] **Step 6: Build dynamic route src/app/arena/[gameType]/page.tsx**
  Renders the respective arena component based on URL parameter.

- [ ] **Step 7: Commit**
  `git add src/components/arena/ src/app/arena/ && git commit -m "feat(arena): build 5 minigame arena component scaffolds"`

---

### Task 8: Verification, Test Suite & End-to-End Build

**Files:**
- Test: All tests in `tests/`

- [ ] **Step 1: Run all unit tests**
  Run `npx vitest run` and confirm 100% pass rate.

- [ ] **Step 2: Build Next.js application**
  Run `npm run build` and ensure zero TypeScript errors and zero lint failures.

- [ ] **Step 3: Start local development server & visual check**
  Run `npm run dev` and verify Bento Grid and Arena screens.

- [ ] **Step 4: Final commit**
  `git commit -m "chore: complete initial scaffolding and 5 minigame arena milestone"`
