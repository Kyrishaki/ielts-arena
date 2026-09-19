"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Flame,
  Zap,
  Target,
  Bell,
  Command,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function TopNavbar() {
  const pathname = usePathname();

  const getBreadcrumb = () => {
    if (pathname === "/") return "Dịch Thuật Học Thuật (Academic Translation)";
    if (pathname.startsWith("/shadowing")) return "Shadowing Audio Lab";
    if (pathname.startsWith("/paraphrase")) return "Paraphrase Studio";
    if (pathname.startsWith("/cards")) return "Card Learning (Quizlet SRS)";
    if (pathname.startsWith("/arena")) return "Đấu Trường Minigames Hub";
    return "IELTS Arena";
  };

  return (
    <header className="h-14 fixed top-0 left-0 right-0 z-50 bg-[#0B0F17]/95 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)] px-3 sm:px-5 flex items-center justify-between select-none">
      {/* Left: Brand & Breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-white shrink-0 group">
          <BrandLogo size={30} className="w-7 h-7 shrink-0 transition-transform group-hover:scale-105" />
          <span className="text-sm font-semibold tracking-normal hidden md:inline">
            IELTS ARENA
          </span>
        </Link>

        <span className="text-[rgba(255,255,255,0.2)] hidden sm:inline">/</span>

        <span className="text-xs sm:text-[13px] font-medium text-[#94A3B8] truncate max-w-[200px] sm:max-w-none">
          {getBreadcrumb()}
        </span>
      </div>

      {/* Center: Command Palette Search Bar (Desktop) */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="w-full relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-3 text-[#64748B]" />
          <input
            type="text"
            readOnly
            placeholder="Tìm nhanh từ vựng C1/C2, collocation, đề thi... (Ctrl + K)"
            className="w-full h-8 pl-8 pr-12 rounded bg-[#131B26] border border-[rgba(255,255,255,0.08)] text-xs text-[#F8FAFC] placeholder-[#64748B] focus:border-[#6366F1] focus:outline-none cursor-pointer hover:border-[rgba(255,255,255,0.15)] transition-colors"
          />
          <kbd className="absolute right-2 text-[10px] font-mono bg-[#1C2636] border border-[rgba(255,255,255,0.1)] text-[#94A3B8] px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </div>
      </div>

      {/* Right: Gamification Badges & Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Streak Counter */}
        <div
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#1C2636] border border-[rgba(255,255,255,0.08)] text-xs font-mono text-[#F59E0B]"
          title="Chuỗi ngày học liên tục"
        >
          <Flame className="w-3.5 h-3.5 text-[#F59E0B] fill-current" />
          <span className="font-semibold">--</span>
        </div>

        {/* ELO Rating Badge */}
        <div
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#1E1B4B] border border-[#4338CA] text-xs font-mono text-[#A5B4FC]"
          title="Điểm Elo Đấu Trường"
        >
          <Zap className="w-3.5 h-3.5 text-[#6366F1]" />
          <span className="font-bold">ELO</span>
        </div>

        {/* Target Band */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-[#131B26] border border-[rgba(255,255,255,0.08)] text-xs text-[#F8FAFC]"
          title="Band mục tiêu"
        >
          <Target className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>Band --</span>
        </div>

        {/* Notification Bell */}
        <button className="p-1.5 rounded text-[#94A3B8] hover:text-white hover:bg-[#1C2636] transition-colors relative">
          <Bell className="w-4 h-4" />
        </button>

        {/* Mini User Profile Avatar */}
        <div className="w-7 h-7 rounded-full bg-[#1C2636] border border-[rgba(255,255,255,0.12)] flex items-center justify-center text-xs font-bold text-white ml-1">
          <Target className="w-3.5 h-3.5 text-[#94A3B8]" />
        </div>
      </div>
    </header>
  );
}
