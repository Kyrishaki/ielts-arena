"use client";

import React, { useState } from "react";
import { SplitScreenArenaLayout } from "./SplitScreenArenaLayout";
import {
  initListeningBomb,
  submitWireDefusal,
  ListeningBombState,
} from "@/modules/game-engines/listening-bomb.engine";
import { Button } from "@/components/ui/Button";
import { Bomb, Play, Volume2, ShieldCheck, AlertTriangle } from "lucide-react";

export function ListeningBombArena() {
  const [gameState, setGameState] = useState<ListeningBombState>(() =>
    initListeningBomb("lb-match-1", ["p1-user", "p2-partner"])
  );
  const [currentInput, setCurrentInput] = useState("");
  const [activeWireIndex, setActiveWireIndex] = useState(0);

  const activeWire = gameState.wires[activeWireIndex];

  const handleDefuse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    setGameState((prev) =>
      submitWireDefusal(prev, "p1-user", activeWireIndex, currentInput)
    );
    setCurrentInput("");
    if (activeWireIndex < gameState.wires.length - 1) {
      setActiveWireIndex(activeWireIndex + 1);
    }
  };

  return (
    <SplitScreenArenaLayout
      gameTitle="Listening Bomb (Co-op)"
      gameSubtitle="Nghe Chép Chính Tả Tốc Độ Cao Gỡ Kíp Nổ"
      timeRemainingSeconds={gameState.fuseSecondsRemaining}
      player1={{
        username: "MinhTriet (Caller)",
        elo: 1480,
        score: gameState.totalScore,
        isCurrentTurn: true,
      }}
      player2={{
        username: "ThuyTien (Typer)",
        elo: 1540,
        score: gameState.totalScore,
        isCurrentTurn: true,
        typingStatus: "Đang đồng bộ transcript nghe giảng Section 4...",
      }}
      stakeElo={40}
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        {/* Audio Player & Fuse Bar */}
        <div className="p-3.5 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.08)] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Volume2 className="w-4 h-4 text-[#6366F1]" />
              <span>Audio Lecture: Archaeology & Ancient Civilization</span>
            </div>
            <button className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1C2636] border border-[rgba(255,255,255,0.1)] text-xs text-[#A5B4FC] hover:text-white">
              <Play className="w-3 h-3 fill-current" />
              <span>Phát lại đoạn nghe</span>
            </button>
          </div>

          {/* Fuse countdown progress */}
          <div>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-[#EF4444] font-semibold flex items-center gap-1">
                <Bomb className="w-3.5 h-3.5" /> Kíp nổ:
              </span>
              <span className="font-mono text-[#EF4444] font-bold">
                {gameState.fuseSecondsRemaining}s còn lại
              </span>
            </div>
            <div className="h-2 w-full bg-[#131B26] rounded-full overflow-hidden border border-[rgba(255,255,255,0.06)]">
              <div
                className="h-full bg-[#EF4444] transition-all duration-300"
                style={{ width: `${(gameState.fuseSecondsRemaining / 60) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Wires to Defuse (Blanks in sentence) */}
        <div className="space-y-2">
          <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider block">
            Các dây nổ từ vựng cần giải mã:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {gameState.wires.map((wire, idx) => (
              <div
                key={idx}
                onClick={() => setActiveWireIndex(idx)}
                className={`p-2.5 rounded border text-xs cursor-pointer transition-colors ${
                  wire.isDefused
                    ? "border-[#22C55E] bg-[#064E3B]/20 text-[#A7F3D0]"
                    : activeWireIndex === idx
                    ? "border-[#6366F1] bg-[#1C2636] text-white"
                    : "border-[rgba(255,255,255,0.08)] bg-[#0B0F17] text-[#94A3B8]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono">DÂY #{idx + 1}</span>
                  {wire.isDefused ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B]" />
                  )}
                </div>
                <p className="font-mono font-semibold">
                  {wire.isDefused ? wire.expectedWord : "•••••••••••"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Defusal Input */}
        <form onSubmit={handleDefuse} className="space-y-2">
          <label className="text-[11px] text-[#94A3B8] block">
            Gõ chính tả từ vựng cho Dây #{activeWireIndex + 1}:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Gõ từ nghe được (ví dụ: archaeological)..."
              className="flex-1 h-10 px-3 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.12)] text-xs text-white"
            />
            <Button type="submit" variant="primary" size="md">
              Cắt dây nổ
            </Button>
          </div>
          <p className="text-[10px] text-[#EF4444]">
            * Lưu ý: Gõ sai chính tả sẽ bị trừ 5 giây kíp nổ!
          </p>
        </form>
      </div>
    </SplitScreenArenaLayout>
  );
}
