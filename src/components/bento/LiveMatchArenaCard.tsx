"use client";

import React from "react";
import Link from "next/link";
import { Swords, Clock, Zap, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LiveMatch {
  id: string;
  gameType: string;
  gameSlug: string;
  hostName: string;
  hostElo: number;
  stakeElo: number;
  timeLimit: string;
  status: "WAITING" | "STARTING";
}

const SAMPLE_MATCHES: LiveMatch[] = [
  {
    id: "m-101",
    gameType: "Word Duel (C1/C2)",
    gameSlug: "word-duel",
    hostName: "AnhKhoa_9.0",
    hostElo: 1560,
    stakeElo: 30,
    timeLimit: "15s/lượt",
    status: "WAITING",
  },
  {
    id: "m-102",
    gameType: "Error Hunter (Bấm chuông)",
    gameSlug: "error-hunter",
    hostName: "BaoChau_IELTS",
    hostElo: 1420,
    stakeElo: 25,
    timeLimit: "10 câu",
    status: "WAITING",
  },
  {
    id: "m-103",
    gameType: "Paraphrase Blitz",
    gameSlug: "paraphrase-blitz",
    hostName: "DucThang_C2",
    hostElo: 1680,
    stakeElo: 50,
    timeLimit: "45s",
    status: "STARTING",
  },
];

export function LiveMatchArenaCard() {
  return (
    <div className="surface-card rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-4 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)] mb-3">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-[#6366F1]" />
            <h2 className="text-sm font-semibold tracking-tight text-[#F8FAFC]">
              Đấu Trường Trực Tiếp (Live PvP Arena)
            </h2>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] text-[#22C55E] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            14 phòng đang mở
          </span>
        </div>

        {/* Match List (32px density) */}
        <div className="divide-y divide-[rgba(255,255,255,0.06)]">
          {SAMPLE_MATCHES.map((match) => (
            <div
              key={match.id}
              className="h-9 flex items-center justify-between px-2 hover:bg-[#1C2636] transition-colors rounded"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[13px] font-medium text-[#F8FAFC] truncate">
                  {match.gameType}
                </span>
                <span className="text-[11px] text-[#64748B] hidden sm:inline">
                  vs {match.hostName} ({match.hostElo})
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#F59E0B]">
                  <Zap className="w-3 h-3" />
                  ±{match.stakeElo}
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#94A3B8] hidden sm:flex">
                  <Clock className="w-3 h-3" />
                  {match.timeLimit}
                </div>
                <Link href={`/arena/${match.gameSlug}`}>
                  <Button size="compact" variant="secondary" className="h-7 text-xs px-2.5">
                    Tham gia
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Launch CTA */}
      <div className="pt-4 mt-3 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <span className="text-[11px] text-[#94A3B8]">
          Cơ chế ghép trận ngẫu nhiên theo chỉ số Elo tương đương (±50).
        </span>
        <Link href="/arena/word-duel" className="w-full sm:w-auto">
          <Button variant="primary" size="md" className="w-full sm:w-auto text-xs" shortcut="ENTER">
            Vào phòng đấu 1v1
          </Button>
        </Link>
      </div>
    </div>
  );
}
