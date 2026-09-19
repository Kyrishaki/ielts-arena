"use client";

import React, { useState, useEffect, useRef } from "react";
import { SplitScreenArenaLayout } from "./SplitScreenArenaLayout";
import {
  initWordDuel,
  applyWordDuelMove,
  validateWordDuelMove,
  WordDuelState,
} from "@/modules/game-engines/word-duel.engine";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export function WordDuelArena() {
  const [gameState, setGameState] = useState<WordDuelState>(() =>
    initWordDuel("wd-match-1", ["p1-user", "p2-opponent"], "Environment & Technology", "empirical")
  );
  const [inputWord, setInputWord] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [feedbackFlash, setFeedbackFlash] = useState<"success" | "error" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const lastTurn = gameState.history[gameState.history.length - 1];
  const requiredChar = lastTurn.word.slice(-1).toUpperCase();
  const isMyTurn = gameState.currentTurnPlayerId === "p1-user";

  useEffect(() => {
    if (isMyTurn && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMyTurn]);

  // Simulate opponent's automatic response after 2.5s for demo/playability
  useEffect(() => {
    if (!isMyTurn && gameState.status === "IN_PROGRESS") {
      const timer = setTimeout(() => {
        const requiredCharLower = lastTurn.word.slice(-1).toLowerCase();
        // Sample opponent word bank based on letter
        const opponentWords: Record<string, string> = {
          l: "lucid",
          d: "dichotomy",
          y: "yield",
          e: "elucidate",
          s: "substantiate",
          t: "transcend",
          c: "catalyst",
          m: "meticulous",
          n: "nuance",
          r: "resilience",
        };

        const chosenWord = opponentWords[requiredCharLower] || `${requiredCharLower}minent`;
        try {
          setGameState((prev) => applyWordDuelMove(prev, "p2-opponent", chosenWord));
        } catch {
          // Fallback pass turn
        }
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isMyTurn, gameState.status, lastTurn.word]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputWord.trim() || !isMyTurn) return;

    const validation = validateWordDuelMove(gameState, "p1-user", inputWord);
    if (!validation.isValid) {
      setErrorMessage(validation.reason || "Từ không hợp lệ");
      setFeedbackFlash("error");
      setTimeout(() => setFeedbackFlash(null), 300);
      return;
    }

    try {
      setGameState((prev) => applyWordDuelMove(prev, "p1-user", inputWord));
      setInputWord("");
      setErrorMessage(null);
      setFeedbackFlash("success");
      setTimeout(() => setFeedbackFlash(null), 300);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã có lỗi xảy ra";
      setErrorMessage(msg);
      setFeedbackFlash("error");
      setTimeout(() => setFeedbackFlash(null), 300);
    }
  };

  return (
    <SplitScreenArenaLayout
      gameTitle="Word Duel 1v1"
      gameSubtitle="Nối Từ Vựng Học Thuật C1/C2"
      timeRemainingSeconds={gameState.timeRemainingSeconds}
      player1={{
        username: "MinhTriet (Bạn)",
        elo: 1480,
        score: gameState.scores["p1-user"] || 0,
        isCurrentTurn: isMyTurn,
      }}
      player2={{
        username: "BaoChau_IELTS",
        elo: 1460,
        score: gameState.scores["p2-opponent"] || 0,
        isCurrentTurn: !isMyTurn,
        typingStatus: !isMyTurn ? "Đang suy nghĩ từ vựng nối tiếp..." : undefined,
      }}
      stakeElo={30}
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        {/* Active Letter Prompt Container */}
        <div
          className={`p-4 rounded-md border text-center transition-colors ${
            feedbackFlash === "success"
              ? "border-[#22C55E] bg-[#064E3B]/30"
              : feedbackFlash === "error"
              ? "border-[#EF4444] bg-[#7F1D1D]/30"
              : "border-[rgba(255,255,255,0.08)] bg-[#0B0F17]"
          }`}
        >
          <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-1">
            Từ vựng vừa đánh:{" "}
            <span className="font-mono font-bold text-white text-sm">
              "{lastTurn.word}"
            </span>
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-xs text-[#94A3B8]">Chữ cái bắt đầu tiếp theo:</span>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-[#6366F1] font-mono text-base font-black text-white">
              {requiredChar}
            </span>
          </div>
        </div>

        {/* Word Chain History (Compact scrollable list) */}
        <div className="flex-1 overflow-y-auto max-h-[220px] rounded border border-[rgba(255,255,255,0.08)] bg-[#0B0F17] p-2 space-y-1.5">
          <p className="text-[10px] text-[#64748B] uppercase tracking-wider px-2 mb-1">
            Lịch sử chuỗi từ ({gameState.history.length} từ)
          </p>
          {gameState.history.map((turn, i) => (
            <div
              key={i}
              className="h-8 flex items-center justify-between px-2.5 rounded bg-[#131B26] text-xs border border-[rgba(255,255,255,0.05)]"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[#64748B] text-[10px]">#{i + 1}</span>
                <span className="font-medium text-white">{turn.word}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#1E1B4B] text-[#A5B4FC] border border-[#4338CA]">
                  {turn.tier}
                </span>
                <span className="text-[11px] font-mono text-[#22C55E]">+{turn.points}đ</span>
              </div>
            </div>
          ))}
        </div>

        {/* User Input Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          {errorMessage && (
            <p className="text-xs text-[#EF4444] font-medium">{errorMessage}</p>
          )}

          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              required
              disabled={!isMyTurn}
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              placeholder={
                isMyTurn
                  ? `Nhập từ tiếng Anh bắt đầu bằng '${requiredChar}'...`
                  : "Đang đợi đối thủ ra từ..."
              }
              className="flex-1 h-10 px-3 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.12)] text-xs text-white placeholder-[#64748B] focus:border-[#6366F1] focus:outline-none disabled:opacity-50"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!isMyTurn || !inputWord.trim()}
              shortcut="ENTER"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Đánh từ
            </Button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#64748B]">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#F59E0B]" />
              B2 = 10đ | C1 = 25đ | C2 = 50đ
            </span>
            <span>Bấm [Enter] để nộp</span>
          </div>
        </form>
      </div>
    </SplitScreenArenaLayout>
  );
}
