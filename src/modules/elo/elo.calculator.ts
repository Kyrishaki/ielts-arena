import { EloCalculationInput, EloCalculationResult } from "./elo.types";

const MINIMUM_ELO_FLOOR = 100;
const PROVISIONAL_MATCHES_THRESHOLD = 10;
const MASTER_ELO_THRESHOLD = 2400;

/**
 * Determine dynamic K-factor based on player experience and tier
 */
export function getKFactor(matchesPlayed: number, currentRating: number): number {
  if (matchesPlayed < PROVISIONAL_MATCHES_THRESHOLD) {
    return 40; // High mobility for calibration matches
  }
  if (currentRating >= MASTER_ELO_THRESHOLD) {
    return 16; // Stable rating at master level
  }
  return 24; // Standard competitive rating
}

/**
 * Calculate expected probability of winning: E = 1 / (1 + 10^((Rb - Ra) / 400))
 */
export function getExpectedScore(playerRating: number, opponentRating: number): number {
  return 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
}

/**
 * Pure function to calculate rating delta and next win streak
 */
export function calculateEloChange(input: EloCalculationInput): EloCalculationResult {
  const { playerRating, opponentRating, outcome, matchesPlayed, winStreak, stakeElo } = input;

  const kFactor = getKFactor(matchesPlayed, playerRating);
  const expected = getExpectedScore(playerRating, opponentRating);

  let actualScore = 0.5;
  if (outcome === "WIN") actualScore = 1.0;
  if (outcome === "LOSS") actualScore = 0.0;

  // Base Elo delta formula: ΔR = K * (Actual - Expected)
  let rawChange = Math.round(kFactor * (actualScore - expected));

  let nextWinStreak = 0;
  if (outcome === "WIN") {
    nextWinStreak = winStreak + 1;
    // Streak bonus: +3 Elo per streak level beyond 3 (capped at +12)
    if (winStreak >= 3) {
      const streakBonus = Math.min(12, (winStreak - 2) * 3);
      rawChange += streakBonus;
    }
  } else if (outcome === "DRAW") {
    nextWinStreak = winStreak;
  } else {
    nextWinStreak = 0;
  }

  // If match has an explicit custom stake (e.g., high roller arena room)
  if (stakeElo && stakeElo > 0) {
    const stakeMultiplier = stakeElo / 25;
    rawChange = Math.round(rawChange * Math.max(0.8, Math.min(2.0, stakeMultiplier)));
  }

  // Prevent rating from dipping below the floor
  const targetRating = playerRating + rawChange;
  const newRating = Math.max(MINIMUM_ELO_FLOOR, targetRating);
  const ratingChange = newRating - playerRating;

  return {
    oldRating: playerRating,
    newRating,
    ratingChange,
    newWinStreak: nextWinStreak,
    kFactor,
  };
}
