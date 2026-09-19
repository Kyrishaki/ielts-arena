"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Swords,
  Flame,
  ShieldAlert,
  Brain,
  Zap,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MinigameInfo {
  slug: string;
  title: string;
  category: "PVP_1V1" | "COOP" | "AI_REFEREE";
  categoryLabel: string;
  description: string;
  focusSkill: string;
  timeEstimate: string;
  stakeElo: number;
  activePlayers: number;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const MINIGAMES: MinigameInfo[] = [
  {
    slug: "word-duel",
    title: "Word Duel 1v1",
    category: "PVP_1V1",
    categoryLabel: "1v1 PvP",
    description: "Đấu nối chuỗi từ vựng học thuật C1/C2 theo chủ đề IELTS. Tính điểm theo cấp bậc từ vựng CEFR và tốc độ phản xạ.",
    focusSkill: "Academic Lexical Resource (AWL)",
    timeEstimate: "15s / lượt",
    stakeElo: 30,
    activePlayers: 0,
    icon: Swords,
    accentColor: "#6366F1",
  },
  {
    slug: "paraphrase-blitz",
    title: "Paraphrase Blitz",
    category: "PVP_1V1",
    categoryLabel: "1v1 PvP",
    description: "Thi viết lại câu Band 5.5 thành cấu trúc câu học thuật trong 45 giây. AI chấm điểm Lexical Density và Syntactic Variety.",
    focusSkill: "Writing Task 2 Sentence Restructuring",
    timeEstimate: "45 giây",
    stakeElo: 35,
    activePlayers: 0,
    icon: Flame,
    accentColor: "#F59E0B",
  },
  {
    slug: "error-hunter",
    title: "Error Hunter (Bấm Chuông)",
    category: "PVP_1V1",
    categoryLabel: "Buzzer PvP",
    description: "Nhấn phím [Space] để bấm chuông nhanh nhất và sửa bẫy Collocation hoặc Ngữ pháp trong câu đề thi.",
    focusSkill: "Grammatical Accuracy & Collocation",
    timeEstimate: "10 câu / trận",
    stakeElo: 25,
    activePlayers: 0,
    icon: ShieldAlert,
    accentColor: "#EF4444",
  },
  {
    slug: "listening-bomb",
    title: "Listening Bomb (Co-op)",
    category: "COOP",
    categoryLabel: "Co-op 2-4 Người",
    description: "Đội ngũ phối hợp nghe chép chính tả đoạn bài giảng Section 4 với tốc độ cao để cắt dây kíp nổ trước khi phát nổ.",
    focusSkill: "Listening Section 4 Spelling & Speed",
    timeEstimate: "60 giây kíp nổ",
    stakeElo: 40,
    activePlayers: 0,
    icon: ShieldAlert,
    accentColor: "#22C55E",
  },
  {
    slug: "topic-debate",
    title: "Topic Debate 1v1",
    category: "AI_REFEREE",
    categoryLabel: "AI Trọng Tài",
    description: "Đấu khẩu trực tiếp chủ đề Speaking Part 3. AI Trọng tài phân tích phổ âm thanh chấm điểm Fluency và Luận cứ học thuật.",
    focusSkill: "Speaking Part 3 Fluency & Argumentation",
    timeEstimate: "2 hiệp x 60 giây",
    stakeElo: 50,
    activePlayers: 0,
    icon: Brain,
    accentColor: "#A855F7",
  },
];

export default function ConsolidatedArenaPage() {
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  const filteredGames =
    filterCategory === "ALL"
      ? MINIGAMES
      : MINIGAMES.filter((g) => g.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[rgba(255,255,255,0.08)]">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Swords className="w-5 h-5 text-[#6366F1]" />
            Cụm Đấu Trường Co-op & PvP (5 Minigames Hub)
          </h1>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Tất cả minigames học thuật được quy tụ trong một sảnh đấu duy nhất. Ghép trận tự động theo mức điểm Elo tương đương.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1 bg-[#131B26] p-1 rounded border border-[rgba(255,255,255,0.08)] self-start sm:self-auto">
          {[
            { id: "ALL", label: "Tất cả (5)" },
            { id: "PVP_1V1", label: "1v1 Đối kháng" },
            { id: "COOP", label: "Co-op Đồng đội" },
            { id: "AI_REFEREE", label: "AI Trọng tài" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                filterCategory === tab.id
                  ? "bg-[#6366F1] text-white"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5 Minigames Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGames.map((game) => {
          const Icon = game.icon;
          return (
            <div
              key={game.slug}
              className="surface-card rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-4 flex flex-col justify-between hover:border-[#6366F1] transition-all group"
            >
              <div>
                {/* Top Meta Bar */}
                <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(255,255,255,0.08)] mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#1C2636] text-[#A5B4FC] border border-[rgba(255,255,255,0.08)]">
                    {game.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono text-[#F59E0B]">
                    <Zap className="w-3 h-3" />
                    ±{game.stakeElo} ELO
                  </div>
                </div>

                {/* Title & Icon */}
                <div className="flex items-start gap-3 mb-2.5">
                  <div
                    className="w-9 h-9 rounded flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${game.accentColor}20`, color: game.accentColor }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white group-hover:text-[#A5B4FC] transition-colors">
                      {game.title}
                    </h2>
                    <span className="text-[11px] text-[#64748B] block">
                      {game.focusSkill}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
                  {game.description}
                </p>
              </div>

              {/* Footer CTA & Stats */}
              <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {game.timeEstimate}
                  </span>
                  <span className="flex items-center gap-1 text-[#22C55E]">
                    <Users className="w-3 h-3" /> {game.activePlayers} đang trực tuyến
                  </span>
                </div>

                <Link href={`/arena/${game.slug}`} className="block w-full">
                  <Button
                    type="button"
                    variant="primary"
                    size="compact"
                    className="w-full text-xs font-semibold"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Vào phòng đấu ngay
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
