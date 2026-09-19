"use client";

import React, { useState, useEffect } from "react";
import { SplitScreenArenaLayout } from "./SplitScreenArenaLayout";
import {
  initErrorHunter,
  hitBuzzer,
  submitCorrection,
  ErrorHunterState,
} from "@/modules/game-engines/error-hunter.engine";
import { Button } from "@/components/ui/Button";
import { BellRing, ShieldAlert, CheckCircle2 } from "lucide-react";

export function ErrorHunterArena() {
  const [gameState, setGameState] = useState<ErrorHunterState>(() =>
    initErrorHunter("eh-match-1", ["p1-user", "p2-opponent"], [])
  );
  const [mistakeText, setMistakeText] = useState("");
  const [correctionText, setCorrectionText] = useState("");
  const [feedbackFlash, setFeedbackFlash] = useState<"success" | "error" | null>(null);

  const isBuzzerLockedByMe = gameState.buzzerLockedByPlayerId === "p1-user";
  const canBuzz = gameState.status === "WAITING_BUZZER";

  // Desktop [Space] keyboard shortcut to buzz
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && canBuzz && e.target === document.body) {
        e.preventDefault();
        triggerBuzzer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canBuzz, gameState]);

  const triggerBuzzer = () => {
    const res = hitBuzzer(gameState, "p1-user");
    if (res.allowed) {
      setGameState(res.state);
    }
  };

  const handleCorrectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBuzzerLockedByMe) return;

    try {
      const nextState = submitCorrection(
        gameState,
        "p1-user",
        mistakeText,
        correctionText
      );
      setGameState(nextState);
      if (nextState.status === "ROUND_RESOLVED") {
        setFeedbackFlash("success");
      } else {
        setFeedbackFlash("error");
      }
      setTimeout(() => setFeedbackFlash(null), 1000);
    } catch {
      // Error handling
    }
  };

  return (
    <SplitScreenArenaLayout
      gameTitle="Error Hunter"
      gameSubtitle="Bấm Chuông Bắt Lỗi Collocation / Ngữ Pháp"
      timeRemainingSeconds={10}
      player1={{
        username: "MinhTriet (Bạn)",
        elo: 1480,
        score: gameState.scores["p1-user"] || 0,
        isCurrentTurn: isBuzzerLockedByMe,
      }}
      player2={{
        username: "AnhKhoa_9.0",
        elo: 1510,
        score: gameState.scores["p2-opponent"] || 0,
        isCurrentTurn: gameState.buzzerLockedByPlayerId === "p2-opponent",
      }}
      stakeElo={25}
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        {/* Target Sentence Display */}
        <div
          className={`p-4 rounded-md border text-center transition-colors ${
            feedbackFlash === "success"
              ? "border-[#22C55E] bg-[#064E3B]/20"
              : feedbackFlash === "error"
              ? "border-[#EF4444] bg-[#7F1D1D]/20"
              : "border-[rgba(255,255,255,0.08)] bg-[#0B0F17]"
          }`}
        >
          <div className="flex items-center justify-between text-[11px] text-[#94A3B8] mb-2">
            <span>CÂU CHỨA LỖI SAI CẦN BẮT</span>
            <span className="px-2 py-0.5 rounded bg-[#1E1B4B] text-[#A5B4FC] font-mono text-[10px]">
              {gameState.currentSentence.category}
            </span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-white tracking-wide">
            "{gameState.currentSentence.sentenceWithMistake}"
          </p>
        </div>

        {/* State Banner / Status */}
        {gameState.status === "WAITING_BUZZER" && (
          <div className="p-3 rounded bg-[#131B26] border border-[rgba(255,255,255,0.08)] text-center space-y-2">
            <p className="text-xs text-[#94A3B8]">
              Phát hiện lỗi sai? Nhấn nút bên dưới hoặc gõ phím{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-[#1C2636] font-mono text-white text-xs border border-[rgba(255,255,255,0.2)]">
                SPACE
              </kbd>{" "}
              để giành quyền trả lời!
            </p>

            {/* Mobile Thumb-Zone & Desktop Big Buzzer Button */}
            <Button
              type="button"
              variant="primary"
              size="touch-buzzer"
              onClick={triggerBuzzer}
              icon={<BellRing className="w-5 h-5 animate-bounce" />}
              className="bg-[#EF4444] hover:bg-[#DC2626] border-[#B91C1C] text-white font-bold"
            >
              BẤM CHUÔNG GIÀNH QUYỀN SỬA
            </Button>
          </div>
        )}

        {/* Answering Form if locked by player */}
        {isBuzzerLockedByMe && gameState.status === "ANSWERING" && (
          <form onSubmit={handleCorrectionSubmit} className="p-4 rounded bg-[#1C2636] border border-[#6366F1] space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#A5B4FC]">
              <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
              Bạn đã giành quyền! Bạn có 10 giây để chỉ ra lỗi và sửa:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-[#94A3B8] block mb-1">Cụm từ bị sai:</label>
                <input
                  type="text"
                  required
                  value={mistakeText}
                  onChange={(e) => setMistakeText(e.target.value)}
                  placeholder="Ví dụ: do efforts"
                  className="w-full h-9 px-2.5 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.1)] text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#94A3B8] block mb-1">Sửa lại đúng:</label>
                <input
                  type="text"
                  required
                  value={correctionText}
                  onChange={(e) => setCorrectionText(e.target.value)}
                  placeholder="Ví dụ: make efforts"
                  className="w-full h-9 px-2.5 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.1)] text-xs text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-[#94A3B8]">Sai: -25đ & phạt khóa chuông 5s</span>
              <Button type="submit" variant="primary" size="compact">
                Xác nhận sửa lỗi (+50đ)
              </Button>
            </div>
          </form>
        )}

        {/* Round Resolved Explanation */}
        {gameState.status === "ROUND_RESOLVED" && (
          <div className="p-4 rounded bg-[#064E3B]/30 border border-[#059669] space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A7F3D0]">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              Chính xác! (+50 điểm)
            </div>
            <p className="text-xs text-white">{gameState.currentSentence.explanation}</p>
          </div>
        )}
      </div>
    </SplitScreenArenaLayout>
  );
}
