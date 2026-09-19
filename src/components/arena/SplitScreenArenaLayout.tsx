"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Zap } from "lucide-react";
import { formatSecondsToTime } from "@/lib/utils";

export interface SplitScreenArenaProps {
  gameTitle: string;
  gameSubtitle: string;
  timeRemainingSeconds: number;
  player1: {
    username: string;
    elo: number;
    score: number;
    isCurrentTurn?: boolean;
    typingStatus?: string;
  };
  player2: {
    username: string;
    elo: number;
    score: number;
    isCurrentTurn?: boolean;
    typingStatus?: string;
  };
  stakeElo?: number;
  centerMeterNode?: React.ReactNode;
  children: React.ReactNode;
}

export function SplitScreenArenaLayout({
  gameTitle,
  gameSubtitle,
  timeRemainingSeconds,
  player1,
  player2,
  stakeElo = 25,
  centerMeterNode,
  children,
}: SplitScreenArenaProps) {
  const totalScore = Math.max(1, player1.score + player2.score);
  const p1Percentage = Math.round((player1.score / totalScore) * 100);

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-80px)]">
      {/* Top Arena Header */}
      <div className="h-12 border-b border-[rgba(255,255,255,0.08)] bg-[#0B0F17] flex items-center justify-between px-3 sm:px-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1 rounded text-[#94A3B8] hover:text-white hover:bg-[#1C2636] transition-colors"
            title="Thoát phòng đấu"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xs sm:text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <span>{gameTitle}</span>
              <span className="text-[10px] font-mono font-normal text-[#94A3B8] hidden sm:inline">
                ({gameSubtitle})
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Synchronized WebSocket timer (<50ms latency) */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#131B26] border border-[rgba(255,255,255,0.1)] text-xs font-mono font-bold text-[#F8FAFC]">
            <Clock className="w-3.5 h-3.5 text-[#6366F1]" />
            <span>{formatSecondsToTime(timeRemainingSeconds)}</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-mono text-[#F59E0B]">
            <Zap className="w-3.5 h-3.5" />
            <span>±{stakeElo} ELO</span>
          </div>
        </div>
      </div>

      {/* Mobile Top HUD Scoreboard (Only on small screens) */}
      <div className="lg:hidden bg-[#131B26] border-b border-[rgba(255,255,255,0.08)] px-3 py-2 space-y-1">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#6366F1] font-semibold truncate max-w-[120px]">
            {player1.username} ({player1.score}đ)
          </span>
          <span className="text-[#94A3B8] font-semibold truncate max-w-[120px] text-right">
            {player2.username} ({player2.score}đ)
          </span>
        </div>
        {/* Dynamic Dual-color score bar */}
        <div className="h-1.5 w-full bg-[#0B0F17] rounded-full overflow-hidden flex border border-[rgba(255,255,255,0.05)]">
          <div
            className="bg-[#6366F1] transition-all duration-150"
            style={{ width: `${p1Percentage}%` }}
          />
          <div
            className="bg-[#94A3B8] transition-all duration-150"
            style={{ width: `${100 - p1Percentage}%` }}
          />
        </div>
        {player2.typingStatus && (
          <p className="text-[10px] text-[#94A3B8] italic truncate">
            Đối thủ: {player2.typingStatus}
          </p>
        )}
      </div>

      {/* Desktop 3-Column Arena Layout vs Mobile Stack */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 p-3 sm:p-4">
        {/* Left Column: Player 1 Status (Desktop) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col justify-between surface-card rounded-md p-4 bg-[#131B26] border border-[rgba(255,255,255,0.08)]">
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-[rgba(255,255,255,0.08)] mb-3">
              <div className="w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center font-bold text-xs text-white">
                P1
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{player1.username} (Bạn)</p>
                <p className="text-[11px] font-mono text-[#6366F1]">{player1.elo} ELO</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-2.5 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.06)]">
                <span className="text-[11px] text-[#64748B]">Điểm số hiện tại</span>
                <p className="text-xl font-mono font-bold text-white">{player1.score}</p>
              </div>

              {player1.isCurrentTurn && (
                <div className="px-2.5 py-1 rounded bg-[#1E1B4B] border border-[#4338CA] text-[11px] font-medium text-[#A5B4FC] animate-pulse">
                  Đang là lượt của bạn
                </div>
              )}
            </div>
          </div>

          <div className="text-[11px] text-[#64748B]">
            Phản hồi nhanh dưới 80ms không độ trễ.
          </div>
        </div>

        {/* Center Main Viewport: The Gameplay Area */}
        <div className="lg:col-span-6 flex flex-col surface-card rounded-md p-4 bg-[#131B26] border border-[rgba(255,255,255,0.08)]">
          {centerMeterNode}
          <div className="flex-1 flex flex-col">{children}</div>
        </div>

        {/* Right Column: Player 2 Opponent Status (Desktop) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col justify-between surface-card rounded-md p-4 bg-[#131B26] border border-[rgba(255,255,255,0.08)]">
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-[rgba(255,255,255,0.08)] mb-3">
              <div className="w-8 h-8 rounded-full bg-[#1C2636] border border-[rgba(255,255,255,0.1)] flex items-center justify-center font-bold text-xs text-[#94A3B8]">
                P2
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{player2.username}</p>
                <p className="text-[11px] font-mono text-[#94A3B8]">{player2.elo} ELO</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-2.5 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.06)]">
                <span className="text-[11px] text-[#64748B]">Điểm số đối thủ</span>
                <p className="text-xl font-mono font-bold text-[#94A3B8]">{player2.score}</p>
              </div>

              {player2.isCurrentTurn && (
                <div className="px-2.5 py-1 rounded bg-[#1C2636] border border-[rgba(255,255,255,0.1)] text-[11px] text-[#94A3B8]">
                  Đang tới lượt đối thủ
                </div>
              )}

              {player2.typingStatus && (
                <div className="p-2 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.06)] text-xs text-[#94A3B8] italic">
                  {player2.typingStatus}
                </div>
              )}
            </div>
          </div>

          <div className="text-[11px] text-[#64748B]">
            Đồng bộ thời gian thực qua WebSocket.
          </div>
        </div>
      </div>
    </div>
  );
}
