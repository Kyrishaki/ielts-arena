# IELTS Arena & AI Learning Hub: System Architecture & Design Spec

**Date:** 2026-09-19  
**Status:** Approved  
**Author:** AI Pair Programmer & Lead Architect  

---

## 1. Executive Summary & Goals

**IELTS Arena** is an academic competitive learning platform combining IELTS exam preparation with real-time PvP and Co-op gaming mechanics. The platform integrates:
- Real-time multiplayer gaming with 5 academic minigames.
- Deep AI rubric evaluation across the 4 IELTS criteria (Task Achievement/Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy).
- An engineered, Linear-inspired user experience prioritizing extreme responsiveness, high information density, pure CSS reactive states (`:has()`), and seamless mobile and desktop fluidity.

---

## 2. Linear-Inspired UX Engine & Design Tokens

### 2.1 Design Philosophy: "Engineered Aesthetics"
- **Density Reads as Competence:** Standard data rows and leaderboards use a rigid 32px height, 13px font size, `-0.01em` letter-spacing.
- **Borders Over Shadows:** Zero wide blur shadows. Depth is achieved via 3 distinct surface layers separated by 1px crisp borders:
  - Dark Theme:
    - Canvas (Background): `#0B0F17`
    - Surface 1 (Card/Container): `#131B26`
    - Surface 2 (Hover/Active): `#1C2636`
    - Border: `1px solid rgba(255, 255, 255, 0.08)`
  - Light Theme:
    - Canvas: `#F8FAFC`
    - Surface 1: `#FFFFFF`
    - Surface 2: `#F1F5F9`
    - Border: `1px solid #E2E8F0`
- **Color Discipline:** Single brand accent color: Electric Indigo (`#6366F1`) or Cyan (`#06B6D4`). No multi-colored rainbow badges; secondary statuses use 16px neutral icons with text.
- **Instant Feedback:** Hover transitions under 80ms, state transitions under 150ms with zero bounce/overshoot. Keyboard shortcuts labeled directly on buttons (`[Enter]`, `[Space]`).
- **Alignment:** 4px grid multiple (4, 8, 16, 24, 32px). Text labels left-aligned, numbers and timestamps right-aligned.

### 2.2 Zero-JS Reactive CSS Engine (`:has()`)
- Automatic submit button lock without JS:
  ```css
  form:has(:user-invalid) button[type="submit"] {
    opacity: 0.45;
    pointer-events: none;
  }
  ```
- Selection card highlighting:
  ```css
  .game-option-card:has(input[type="radio"]:checked) {
    border-color: #6366F1;
    background: #1C2636;
  }
  ```
- Dialog body scroll lock:
  ```css
  body:has(dialog[open]) {
    overflow: hidden;
  }
  ```

### 2.3 Mobile-First Responsive Ergonomics
- **Fluid Sizing:** CSS `clamp()` calculates typography and spacing smoothly across viewports from 360px to 1920px.
- **Navigation Adaptation:**
  - Desktop (>= 1024px): 240px collapsible left sidebar (collapses to 64px icon bar).
  - Mobile (< 1024px): Bottom Navigation Dock (56px height, `env(safe-area-inset-bottom)` safe area padding) with 4 key tabs: Arena, AI Lab, Leaderboard, Profile.
- **Mobile Arena HUD:**
  - Compact sticky top bar: Game title, timer, and mini P1 vs P2 score meter.
  - Thumb-Zone controls: 52px full-width buzzer button for *Error Hunter* and sticky input bar with virtual keyboard protection (`interactive-widget=resizes-content`).

---

## 3. The 5 Academic Minigames Specification

1. **Word Duel (PvP 1v1):**
   - Mechanics: Real-time academic chain-word battle. Players must submit academic words (CEFR C1/C2 or Academic Word List - AWL) matching the designated topic and previous word ending within 15 seconds.
   - Scoring: Base score by word tier (B2 = 10 pts, C1 = 25 pts, C2 = 50 pts) multiplied by speed bonus.

2. **Paraphrase Blitz (PvP / Solo):**
   - Mechanics: 45-second sprint. Players are presented with a Band 5.0/6.0 sentence and must rewrite it into an academic Band 8.0+ equivalent.
   - Scoring: AI evaluates Lexical Density, Collocation Accuracy, and Syntactic Variety.

3. **Error Hunter (PvP Buzzer / Co-op):**
   - Mechanics: Sentences containing subtle IELTS collocations or grammatical pitfalls appear. Players press the buzzer (`[Space]` on Desktop, bottom touch bar on Mobile) to lock in and fix the error within 10 seconds.
   - Penalty: False buzzer lockout for 5 seconds.

4. **Listening Bomb (Co-op 2-4 Players):**
   - Mechanics: High-tempo audio snippet playback (IELTS Section 3/4 lectures or conversations). Players must collaboratively transcribe missing keyword sequences before the fuse countdown reaches zero.
   - Roles: Caller (identifies word type/context) & Typer (submits exact spelling).

5. **Topic Debate 1v1 (PvP with AI Referee):**
   - Mechanics: Speaking Part 3 prompt. Two players alternate 60-second speech rounds via microphone.
   - Scoring: Real-time AI evaluation of Fluency & Coherence, Lexical Resource, and Pronunciation/Grammar markers.

---

## 4. Deep Modules & Clean Architecture

Domain logic is completely decoupled from UI components:

```
src/modules/
├── elo/
│   ├── elo.calculator.ts       # Pure Glicko/Elo formula with dynamic K-factors
│   └── elo.types.ts
├── matchmaking/
│   ├── room.machine.ts         # Match state machine (Waiting, InProgress, Finished)
│   └── room.types.ts
├── ai-evaluator/
│   ├── lexical.evaluator.ts    # AWL / C1-C2 vocabulary analyzer
│   ├── grammar.evaluator.ts    # Grammar and syntactic range scorer
│   └── ai.contracts.ts
└── game-engines/
    ├── word-duel.engine.ts     # Pure state reducer for Word Duel
    ├── paraphrase.engine.ts   # State reducer for Paraphrase Blitz
    ├── error-hunter.engine.ts # Buzzer lock state reducer
    ├── listening-bomb.engine.ts # Co-op fuse timer reducer
    └── topic-debate.engine.ts # Turn-taking debate reducer
```

---

## 5. Database Schema (Prisma & PostgreSQL)

The schema models:
- `users`: Core profile and target band score.
- `elo_ratings`: Per-game Elo tracking (`WORD_DUEL`, `PARAPHRASE_BLITZ`, `ERROR_HUNTER`, `LISTENING_BOMB`, `TOPIC_DEBATE`, `GLOBAL_RANK`).
- `elo_histories`: Rating change audit log per match.
- `matches`: Match lifecycle, room code, mode (PvP vs Co-op), stake, and metadata.
- `match_participants`: Player role, ready state, final score, and Elo delta.
- `game_round_submissions`: Submissions per round, latencies, and AI rubric feedback JSON.

---

## 6. Layout Architecture (Asymmetric Bento Grid)

On Desktop:
- **Span 7 col x 2 row:** "Live Match Arena" - Active rooms, Elo stakes, quick join.
- **Span 5 col x 2 row:** "AI Writing Band-Upgrader" - Quick submission with Band 8.5 re-engineering.
- **Span 4 col x 1 row (3 cards):**
  - Card 1: 4-Criteria Radar Chart (TR, CC, LR, GRA).
  - Card 2: Next Co-op Listening Bomb match.
  - Card 3: Weekly Top 5 Leaderboard (32px row density).

On Mobile:
- Automatically stacks into a 1-column priority feed with sticky actions.

---

## 7. Quality Assurance & TDD Strategy
- Unit tests for pure modules (`elo`, `game-engines`, `ai-evaluator`) using Vitest.
- Zero Layout Shift: Skeleton screens match rendered elements down to 1px.
- Zero accessibility violations: WCAG AAA contrast, keyboard shortcut support, ARIA live regions for match countdowns.
