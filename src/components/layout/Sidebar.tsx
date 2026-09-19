"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Swords,
  Brain,
  Trophy,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navigation = [
    {
      group: "ĐẤU TRƯỜNG PVP / CO-OP",
      items: [
        { name: "Tổng quan Đấu trường", href: "/", icon: Swords },
        { name: "Word Duel (C1/C2)", href: "/arena/word-duel", icon: Swords },
        { name: "Paraphrase Blitz (45s)", href: "/arena/paraphrase-blitz", icon: Flame },
        { name: "Error Hunter (Bấm chuông)", href: "/arena/error-hunter", icon: ShieldAlert },
        { name: "Listening Bomb (Co-op)", href: "/arena/listening-bomb", icon: ShieldAlert },
        { name: "Topic Debate 1v1", href: "/arena/topic-debate", icon: Brain },
      ],
    },
    {
      group: "AI LEARNING LAB",
      items: [
        { name: "AI Band Upgrader", href: "/ai/writing-upgrader", icon: Brain },
        { name: "Bảng xếp hạng Elo", href: "/leaderboard", icon: Trophy },
        { name: "Vocabulary SRS Deck", href: "/vocab", icon: BookOpen },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col border-r border-[rgba(255,255,255,0.08)] bg-[#0B0F17] transition-all duration-150 select-none z-30 h-screen sticky top-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Brand Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-[rgba(255,255,255,0.08)]">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-white">
            <div className="w-6 h-6 rounded bg-[#6366F1] flex items-center justify-center text-xs font-mono font-black text-white">
              IA
            </div>
            <span className="text-sm font-semibold tracking-normal">IELTS ARENA</span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded bg-[#6366F1] flex items-center justify-center text-xs font-mono font-black text-white mx-auto">
            IA
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1 rounded text-[#94A3B8] hover:text-white hover:bg-[#1C2636] transition-colors",
            collapsed && "hidden"
          )}
          title={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navigation.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!collapsed && (
              <p className="px-2 text-[10px] font-semibold text-[#64748B] tracking-wider uppercase mb-1">
                {section.group}
              </p>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-2.5 h-8 rounded text-[13px] font-medium transition-colors group",
                    isActive
                      ? "bg-[#1C2636] text-white border border-[rgba(255,255,255,0.08)]"
                      : "text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.04)]",
                    collapsed && "justify-center px-0"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-[#6366F1]" : "text-[#64748B]")} />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer / Mini User Profile */}
      <div className="p-3 border-t border-[rgba(255,255,255,0.08)] bg-[#131B26]">
        <div className={cn("flex items-center gap-2.5", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-[#1C2636] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-xs font-semibold text-[#F8FAFC]">
            VN
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-white truncate">Minh Triết</span>
                <span className="text-[11px] font-mono text-[#6366F1] font-semibold">1,480 ELO</span>
              </div>
              <p className="text-[11px] text-[#64748B] truncate">Mục tiêu: Band 8.0</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
