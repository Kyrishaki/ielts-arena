import React from "react";
import { LiveMatchArenaCard } from "@/components/bento/LiveMatchArenaCard";
import { BandUpgraderCard } from "@/components/bento/BandUpgraderCard";
import { RadarScoreCard } from "@/components/bento/RadarScoreCard";
import { ListeningBombCard } from "@/components/bento/ListeningBombCard";
import { WeeklyLeaderboardCard } from "@/components/bento/WeeklyLeaderboardCard";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[rgba(255,255,255,0.08)]">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            Trung Tâm Đấu Trường & Học Thuật IELTS
          </h1>
          <p className="text-xs text-[#94A3B8]">
            Luyện tập phản xạ ngôn ngữ C1/C2 qua 5 Minigames và AI chấm điểm 4 tiêu chí.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#131B26] border border-[rgba(255,255,255,0.08)] text-xs">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="font-mono text-[#F8FAFC]">Server Latency: 28ms</span>
          </div>
        </div>
      </div>

      {/* Asymmetric Bento Grid (12 Columns Desktop, 1 Column Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
        {/* Large Tile: Span 7 cols - Live Match Arena */}
        <div className="lg:col-span-7 min-h-[320px]">
          <LiveMatchArenaCard />
        </div>

        {/* Vertical Tile: Span 5 cols - AI Writing Band-Upgrader */}
        <div className="lg:col-span-5 min-h-[320px]">
          <BandUpgraderCard />
        </div>

        {/* 3 Horizontal Tiles: Span 4 cols each */}
        <div className="lg:col-span-4 min-h-[220px]">
          <RadarScoreCard />
        </div>

        <div className="lg:col-span-4 min-h-[220px]">
          <ListeningBombCard />
        </div>

        <div className="lg:col-span-4 min-h-[220px]">
          <WeeklyLeaderboardCard />
        </div>
      </div>
    </div>
  );
}
