import { describe, it, expect } from "vitest";
import { calculateEloChange } from "../../../src/modules/elo/elo.calculator";

describe("Elo Rating Calculator", () => {
  it("calculates standard win against equally rated opponent", () => {
    const result = calculateEloChange({
      playerRating: 1200,
      opponentRating: 1200,
      outcome: "WIN",
      matchesPlayed: 20,
      winStreak: 0,
    });

    expect(result.ratingChange).toBeGreaterThan(0);
    expect(result.newRating).toBe(1200 + result.ratingChange);
    expect(result.newWinStreak).toBe(1);
    expect(result.kFactor).toBe(24);
  });

  it("calculates standard loss against equally rated opponent", () => {
    const result = calculateEloChange({
      playerRating: 1200,
      opponentRating: 1200,
      outcome: "LOSS",
      matchesPlayed: 20,
      winStreak: 3,
    });

    expect(result.ratingChange).toBeLessThan(0);
    expect(result.newRating).toBe(1200 + result.ratingChange);
    expect(result.newWinStreak).toBe(0); // Resets win streak
  });

  it("applies provisional K-factor (K=40) for new players with < 10 matches", () => {
    const result = calculateEloChange({
      playerRating: 1200,
      opponentRating: 1200,
      outcome: "WIN",
      matchesPlayed: 4,
      winStreak: 0,
    });

    expect(result.kFactor).toBe(40);
    expect(result.ratingChange).toBe(20); // 40 * (1 - 0.5)
  });

  it("awards streak bonus when on a win streak >= 3", () => {
    const standardWin = calculateEloChange({
      playerRating: 1400,
      opponentRating: 1400,
      outcome: "WIN",
      matchesPlayed: 25,
      winStreak: 0,
    });

    const streakWin = calculateEloChange({
      playerRating: 1400,
      opponentRating: 1400,
      outcome: "WIN",
      matchesPlayed: 25,
      winStreak: 4,
    });

    expect(streakWin.ratingChange).toBeGreaterThan(standardWin.ratingChange);
    expect(streakWin.newWinStreak).toBe(5);
  });

  it("never drops rating below minimum floor (100)", () => {
    const result = calculateEloChange({
      playerRating: 105,
      opponentRating: 1800,
      outcome: "LOSS",
      matchesPlayed: 50,
      winStreak: 0,
    });

    expect(result.newRating).toBeGreaterThanOrEqual(100);
  });
});
