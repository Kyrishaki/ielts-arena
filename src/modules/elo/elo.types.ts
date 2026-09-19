export type MatchOutcome = "WIN" | "LOSS" | "DRAW";

export interface EloCalculationInput {
  playerRating: number;
  opponentRating: number;
  outcome: MatchOutcome;
  matchesPlayed: number;
  winStreak: number;
  stakeElo?: number;
}

export interface EloCalculationResult {
  oldRating: number;
  newRating: number;
  ratingChange: number;
  newWinStreak: number;
  kFactor: number;
}
