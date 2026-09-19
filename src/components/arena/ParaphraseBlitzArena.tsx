"use client";

import React, { useState } from "react";
import { SplitScreenArenaLayout } from "./SplitScreenArenaLayout";
import {
  initParaphraseBlitz,
  submitParaphrase,
  ParaphraseBlitzState,
} from "@/modules/game-engines/paraphrase.engine";
import { Button } from "@/components/ui/Button";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function ParaphraseBlitzArena() {
  const [gameState, setGameState] = useState<ParaphraseBlitzState>(() =>
    initParaphraseBlitz("pb-match-1", ["p1-user", "p2-opponent"])
  );
  const [inputText, setInputText] = useState("");
  const mySubmission = gameState.submissions["p1-user"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || mySubmission) return;

    setGameState((prev) => submitParaphrase(prev, "p1-user", inputText));
  };

  return (
    <SplitScreenArenaLayout
      gameTitle="Paraphrase Blitz"
      gameSubtitle="Tái Cấu Trúc Câu Trong 45 Giây"
      timeRemainingSeconds={gameState.timeRemainingSeconds}
      player1={{
        username: "MinhTriet (Bạn)",
        elo: 1480,
        score: mySubmission ? mySubmission.overallBand * 10 : 0,
        isCurrentTurn: !mySubmission,
      }}
      player2={{
        username: "DucThang_C2",
        elo: 1520,
        score: 75,
        isCurrentTurn: false,
        typingStatus: "Đã hoàn thành bài nộp trong 32s (Band 7.5)",
      }}
      stakeElo={35}
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        {/* Original Sentence Box */}
        <div className="p-3.5 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center justify-between text-[11px] text-[#64748B] mb-1.5">
            <span>CÂU GỐC CẦN VIẾT LẠI</span>
            <span className="font-mono text-[#F59E0B]">Độ khó: Band 5.5 -&gt; 8.0+</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-white italic">
            "{gameState.originalSentence}"
          </p>
        </div>

        {/* Input / Form or Result Review */}
        {!mySubmission ? (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-3">
            <div className="flex-1">
              <label className="block text-[11px] text-[#94A3B8] mb-1">
                Bản viết lại học thuật của bạn:
              </label>
              <textarea
                required
                minLength={15}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Nhập câu nâng cấp sử dụng cấu trúc bị động, mệnh đề quan hệ hoặc từ nối C1/C2..."
                rows={4}
                className="w-full h-28 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.12)] p-3 text-xs text-white placeholder-[#64748B] focus:border-[#6366F1] focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.08)]">
              <span className="text-[11px] text-[#64748B]">
                Tiêu chí chấm: Lexical Resource & Syntactic Variety
              </span>
              <Button type="submit" variant="primary" size="md" shortcut="ENTER">
                Nộp câu trả lời
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex-1 p-4 rounded bg-[#1C2636] border border-[#6366F1]/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#A5B4FC]">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                Kết quả Chấm Điểm AI
              </span>
              <span className="font-mono font-bold text-sm text-[#22C55E]">
                Band {mySubmission.overallBand}
              </span>
            </div>

            <p className="text-xs text-white italic">"{mySubmission.paraphrasedText}"</p>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[rgba(255,255,255,0.08)] text-xs">
              <div className="p-2 rounded bg-[#0B0F17]">
                <span className="text-[10px] text-[#64748B] block">Lexical Resource</span>
                <span className="font-mono font-semibold text-white">
                  {mySubmission.lexicalScore}
                </span>
              </div>
              <div className="p-2 rounded bg-[#0B0F17]">
                <span className="text-[10px] text-[#64748B] block">Syntactic Variety</span>
                <span className="font-mono font-semibold text-white">
                  {mySubmission.syntacticVarietyScore}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-[#94A3B8]">
              {mySubmission.feedbackSnippets.map((fb, idx) => (
                <p key={idx} className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#6366F1] shrink-0" />
                  {fb}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </SplitScreenArenaLayout>
  );
}
