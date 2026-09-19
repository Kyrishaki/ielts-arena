"use client";

import React, { useState } from "react";
import { SplitScreenArenaLayout } from "./SplitScreenArenaLayout";
import {
  initTopicDebate,
  advanceDebateTurn,
  TopicDebateState,
} from "@/modules/game-engines/topic-debate.engine";
import { Button } from "@/components/ui/Button";
import { Mic, MicOff, Brain, Sparkles, Scale } from "lucide-react";

export function TopicDebateArena() {
  const [gameState, setGameState] = useState<TopicDebateState>(() =>
    initTopicDebate("td-match-1", "p1-user", "p2-opponent")
  );
  const [isRecording, setIsRecording] = useState(false);

  const isMyTurn = gameState.currentSpeakerId === "p1-user";

  const handleFinishTurn = () => {
    setIsRecording(false);
    // Simulate AI grading deliberation
    const sampleEval = {
      playerId: isMyTurn ? "p1-user" : "p2-opponent",
      roundNumber: gameState.currentRound,
      fluencyScore: 8.0,
      lexicalScore: 8.5,
      grammarScore: 7.5,
      speechDurationSeconds: 58,
      transcript:
        "Restricting generative tools might inadvertently disadvantage students in global professional environments...",
      aiRefereeVerdict:
        "Luận điểm rõ ràng, sử dụng các collocation học thuật xuất sắc (cognitive synthesis, digital literacy).",
    };

    setGameState((prev) => advanceDebateTurn(prev, sampleEval));
  };

  return (
    <SplitScreenArenaLayout
      gameTitle="Topic Debate 1v1"
      gameSubtitle="Speaking Part 3 & AI Referee"
      timeRemainingSeconds={gameState.roundTimeSeconds}
      player1={{
        username: "MinhTriet (Bạn)",
        elo: 1480,
        score: 85,
        isCurrentTurn: isMyTurn,
      }}
      player2={{
        username: "QuocBao_9.0",
        elo: 1510,
        score: 80,
        isCurrentTurn: !isMyTurn,
        typingStatus: !isMyTurn ? "Đang phát biểu phản biện luận điểm..." : undefined,
      }}
      stakeElo={50}
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        {/* Debate Topic Card */}
        <div className="p-4 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.08)] space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#64748B]">
            <span className="flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-[#6366F1]" />
              CHỦ ĐỀ TRANH BIỆN (ROUND {gameState.currentRound}/{gameState.maxRounds})
            </span>
            <span className="font-mono text-[#F59E0B]">AI Trọng Tài: Part 3 IELTS</span>
          </div>

          <h3 className="text-sm font-bold text-white">
            "{gameState.topicCard.title}"
          </h3>
          <p className="text-xs text-[#94A3B8]">{gameState.topicCard.description}</p>
        </div>

        {/* Real-time Mic Voice Waveform & Visualizer */}
        <div className="p-4 rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] text-center space-y-3">
          <div className="flex items-center justify-center gap-1.5 h-12">
            {[40, 65, 85, 30, 95, 75, 45, 80, 60, 90, 50, 70].map((height, idx) => (
              <div
                key={idx}
                className={`w-1.5 rounded-full transition-all duration-150 ${
                  isRecording
                    ? "bg-[#6366F1] animate-pulse"
                    : "bg-[rgba(255,255,255,0.1)]"
                }`}
                style={{ height: isRecording ? `${height}%` : "20%" }}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            {isRecording ? (
              <span className="flex items-center gap-1.5 text-xs text-[#22C55E] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                Đang ghi âm và phân tích Fluency & Pronunciation...
              </span>
            ) : (
              <span className="text-xs text-[#94A3B8]">
                {isMyTurn ? "Nhấn micro để bắt đầu phát biểu 60 giây" : "Đang nghe phần tranh biện của đối thủ..."}
              </span>
            )}
          </div>
        </div>

        {/* Speech Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.08)]">
          {isMyTurn ? (
            !isRecording ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => setIsRecording(true)}
                icon={<Mic className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Bật Mic phát biểu (60s)
              </Button>
            ) : (
              <Button
                type="button"
                variant="danger"
                size="md"
                onClick={handleFinishTurn}
                icon={<MicOff className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Kết thúc lượt nói & Gửi AI chấm
              </Button>
            )
          ) : (
            <div className="text-xs text-[#64748B] flex items-center gap-1">
              <Brain className="w-3.5 h-3.5 text-[#6366F1]" />
              AI đang lắng nghe và trích xuất Lexical Density...
            </div>
          )}

          <span className="text-[11px] text-[#64748B] hidden sm:inline">
            Tiêu chí: Fluency (25%) | Lexical (25%) | Grammar (25%) | Logic (25%)
          </span>
        </div>
      </div>
    </SplitScreenArenaLayout>
  );
}
