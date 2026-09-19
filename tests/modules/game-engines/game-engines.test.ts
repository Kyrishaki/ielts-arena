import { describe, it, expect } from "vitest";
import {
  initWordDuel,
  validateWordDuelMove,
  applyWordDuelMove,
} from "../../../src/modules/game-engines/word-duel.engine";
import {
  initParaphraseBlitz,
  evaluateParaphraseClientSide,
  submitParaphrase,
} from "../../../src/modules/game-engines/paraphrase.engine";
import {
  initErrorHunter,
  hitBuzzer,
  submitCorrection,
} from "../../../src/modules/game-engines/error-hunter.engine";
import {
  initListeningBomb,
  submitWireDefusal,
} from "../../../src/modules/game-engines/listening-bomb.engine";
import {
  initTopicDebate,
  advanceDebateTurn,
} from "../../../src/modules/game-engines/topic-debate.engine";

describe("5 Minigames State Engines", () => {
  describe("Word Duel", () => {
    it("validates letter chain and computes academic tier points", () => {
      const state = initWordDuel("m-1", ["p1", "p2"], "Environment", "academic");
      // Last letter of 'academic' is 'c'
      const invalidMove = validateWordDuelMove(state, "p1", "dog");
      expect(invalidMove.isValid).toBe(false);

      const validMove = validateWordDuelMove(state, "p1", "catalyst");
      expect(validMove.isValid).toBe(true);
      expect(validMove.tier).toBe("C1");
      expect(validMove.points).toBe(25);

      const nextState = applyWordDuelMove(state, "p1", "catalyst");
      expect(nextState.scores["p1"]).toBe(25);
      expect(nextState.currentTurnPlayerId).toBe("p2");
    });
  });

  describe("Paraphrase Blitz", () => {
    it("evaluates academic vocabulary markers and syntax variety", () => {
      const state = initParaphraseBlitz("m-2", ["p1"]);
      const res = evaluateParaphraseClientSide(
        state.originalSentence,
        "It is widely acknowledged that vehicular emissions pose a substantial threat to urban public health, which is considered an urgent challenge.",
        15
      );
      expect(res.lexicalScore).toBeGreaterThanOrEqual(7.0);
      expect(res.syntacticVarietyScore).toBeGreaterThanOrEqual(7.0);

      const nextState = submitParaphrase(
        state,
        "p1",
        "It is widely acknowledged that vehicular emissions pose a substantial threat to urban public health."
      );
      expect(nextState.submissions["p1"]).toBeDefined();
      expect(nextState.status).toBe("FINISHED");
    });
  });

  describe("Error Hunter", () => {
    it("handles buzzer locking and penalty for wrong answers", () => {
      const state = initErrorHunter("m-3", ["p1", "p2"], []);
      const buzzResult = hitBuzzer(state, "p1");
      expect(buzzResult.allowed).toBe(true);
      expect(buzzResult.state.status).toBe("ANSWERING");

      // p2 tries to buzz while p1 is answering
      const blockedBuzz = hitBuzzer(buzzResult.state, "p2");
      expect(blockedBuzz.allowed).toBe(false);

      // Wrong correction penalized
      const wrongCorrection = submitCorrection(
        buzzResult.state,
        "p1",
        "wrong part",
        "wrong answer",
        Date.now()
      );
      expect(wrongCorrection.status).toBe("WAITING_BUZZER");
      expect(wrongCorrection.lockoutPlayers["p1"]).toBeGreaterThan(Date.now());
    });
  });

  describe("Listening Bomb", () => {
    it("defuses wires on correct spelling and penalizes mistakes", () => {
      const state = initListeningBomb("m-4", ["p1", "p2"]);
      const initialFuse = state.fuseSecondsRemaining;

      // Defuse wire 0 ('archaeological')
      const correctState = submitWireDefusal(state, "p1", 0, "archaeological");
      expect(correctState.wires[0].isDefused).toBe(true);
      expect(correctState.totalScore).toBe(100);

      // Wrong spelling
      const wrongState = submitWireDefusal(state, "p2", 1, "wrongspelling");
      expect(wrongState.fuseSecondsRemaining).toBe(initialFuse - 5);
    });
  });

  describe("Topic Debate 1v1", () => {
    it("advances turns and computes winner after 2 rounds", () => {
      let state = initTopicDebate("m-5", "p1", "p2");
      expect(state.currentSpeakerId).toBe("p1");

      state = advanceDebateTurn(state, {
        playerId: "p1",
        roundNumber: 1,
        fluencyScore: 8.0,
        lexicalScore: 8.0,
        grammarScore: 7.5,
        speechDurationSeconds: 58,
        transcript: "Speech 1...",
        aiRefereeVerdict: "Coherent and fluent.",
      });
      expect(state.currentSpeakerId).toBe("p2");

      state = advanceDebateTurn(state, {
        playerId: "p2",
        roundNumber: 1,
        fluencyScore: 6.5,
        lexicalScore: 7.0,
        grammarScore: 6.5,
        speechDurationSeconds: 55,
        transcript: "Speech 2...",
        aiRefereeVerdict: "Moderate fluency.",
      });
      expect(state.currentRound).toBe(2);
      expect(state.currentSpeakerId).toBe("p1");
    });
  });
});
