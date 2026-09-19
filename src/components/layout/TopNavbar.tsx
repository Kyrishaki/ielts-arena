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
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { useUser } from "@/context/UserContext";

export function TopNavbar() {
  const pathname = usePathname();
  const { user, profile } = useUser();

  const displayName = profile?.display_name || user?.user_metadata?.display_name || user?.email?.split("@")[0] || "";
  const initials = displayName ? displayName.slice(0, 2).toUpperCase() : "?";
  const elo = profile?.elo ?? null;
  const streak = profile?.streak ?? null;
  const bandTarget = profile?.band_target ?? null;

  const getBreadcrumb = () => {
    if (pathname === "/") return "Dịch Thuật Học Thuật (Academic Translation)";
    if (pathname.startsWith("/shadowing")) return "Shadowing Audio Lab";
    if (pathname.startsWith("/paraphrase")) return "Paraphrase Studio";
    if (pathname.startsWith("/cards")) return "Card Learning (Quizlet SRS)";
    if (pathname.startsWith("/arena")) return "Đấu Trường Minigames Hub";
    return "IELTS Arena";
  };

  return (
    <header className="h-14 fixed top-0 left-0 right-0 z-50 bg-[var(--canvas)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] px-3 sm:px-5 flex items-center justify-between select-none transition-colors duration-200">
      {/* Left: Brand & Breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-white shrink-0 group">
          <BrandLogo size={30} className="w-7 h-7 shrink-0 transition-transform group-hover:scale-105" />
          <span className="text-sm font-semibold tracking-normal hidden md:inline text-[var(--text-primary)]">
            IELTS ARENA
          </span>
        </Link>

        <span className="text-[var(--border-subtle)] hidden sm:inline">/</span>

        <span className="text-xs sm:text-[13px] font-medium text-[var(--text-muted)] truncate max-w-[200px] sm:max-w-none">
          {getBreadcrumb()}
        </span>
      </div>

      {/* Center: Command Palette Search Bar (Desktop) */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="w-full relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-3 text-[var(--text-muted)]" />
          <input
            type="text"
            readOnly
            placeholder="Tìm nhanh từ vựng C1/C2, collocation, đề thi... (Ctrl + K)"
            className="w-full h-8 pl-8 pr-12 rounded bg-[var(--surface-1)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--brand-indigo)] focus:outline-none cursor-pointer hover:border-[rgba(255,255,255,0.15)] transition-colors"
          />
          <kbd className="absolute right-2 text-[10px] font-mono bg-[var(--surface-2)] border border-[var(--border-subtle)] text-[var(--text-muted)] px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </div>
      </div>

      {/* Right: Theme Switcher + Gamification Badges */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Theme Switcher */}
        <ThemeSwitcher />

        {user && (
          <>
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[var(--surface-2)] border border-[var(--border-subtle)] text-xs font-mono text-[#F59E0B]" title="Chuỗi ngày học">
              <Flame className="w-3.5 h-3.5 text-[#F59E0B] fill-current" />
              <span className="font-semibold hidden sm:inline">{streak ?? "–"}</span>
            </div>

            {/* ELO */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[var(--surface-2)] border border-[var(--border-subtle)] text-xs font-mono" style={{ color: "var(--brand-indigo)" }} title="Điểm Elo">
              <Zap className="w-3.5 h-3.5" style={{ color: "var(--brand-indigo)" }} />
              <span className="font-bold hidden sm:inline">{elo ?? "–"}</span>
            </div>

            {/* Band Target */}
            {bandTarget && (
              <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded bg-[var(--surface-2)] border border-[var(--border-subtle)] text-xs" style={{ color: "var(--text-primary)" }} title="Band mục tiêu">
                <Target className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Band {bandTarget}</span>
              </div>
            )}
          </>
        )}

        {/* Notification Bell */}
        <button className="p-1.5 rounded transition-colors" style={{ color: "var(--text-muted)" }}>
          <Bell className="w-4 h-4" />
        </button>

        {/* Avatar / Login */}
        {user ? (
          <div className="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold ml-1"
            style={{ backgroundColor: "rgba(129,140,248,0.15)", borderColor: "rgba(129,140,248,0.3)", color: "var(--brand-indigo)" }}
            title={displayName}>
            {initials}
          </div>
        ) : (
          <Link href="/login"
            className="px-3 py-1 rounded text-xs font-semibold ml-1 transition-colors"
            style={{ background: "var(--brand-gradient)", color: "white" }}>
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
}
