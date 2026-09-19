"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Languages,
  Headphones,
  Sparkles,
  Layers,
  Swords,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    {
      group: "HỌC THUẬT CỐT LÕI",
      items: [
        {
          name: "Dịch Thuật IELTS",
          href: "/",
          icon: Languages,
          badge: "Chính",
        },
        {
          name: "Shadowing Audio Lab",
          href: "/shadowing",
          icon: Headphones,
        },
        {
          name: "Paraphrase Studio",
          href: "/paraphrase",
          icon: Sparkles,
        },
      ],
    },
    {
      group: "GHI NHỚ (SRS)",
      items: [
        {
          name: "Card Learning (Quizlet)",
          href: "/cards",
          icon: Layers,
          badge: "SRS",
        },
      ],
    },
    {
      group: "ĐẤU TRƯỜNG CO-OP & PVP",
      items: [
        {
          name: "Cụm 5 Minigames",
          href: "/arena",
          icon: Swords,
          badge: "5 Games",
        },
      ],
    },
    {
      group: "THỐNG KÊ & XẾP HẠNG",
      items: [
        {
          name: "Bảng Vàng Elo",
          href: "/leaderboard",
          icon: Trophy,
        },
      ],
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-60 fixed top-14 left-0 bottom-0 z-40 bg-[#0B0F17] border-r border-[rgba(255,255,255,0.08)] select-none">
      {/* Navigation List (Scrollable if needed, firmly locked) */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {navigation.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            <p className="px-2 text-[10px] font-semibold text-[#64748B] tracking-wider uppercase mb-1">
              {section.group}
            </p>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-2.5 h-8 max-h-8 rounded text-[13px] font-medium transition-colors group",
                    isActive
                      ? "bg-[#1C2636] text-white border border-[rgba(255,255,255,0.08)]"
                      : "text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
                  )}
                >
                  <div className="flex items-center gap-2.5 truncate min-w-0">
                    <Icon
                      className={cn(
                        "w-4 h-4 shrink-0",
                        isActive ? "text-[#6366F1]" : "text-[#64748B]"
                      )}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ml-1",
                        item.badge === "Chính"
                          ? "bg-[#1E1B4B] text-[#A5B4FC] border border-[#4338CA]"
                          : item.badge === "SRS"
                          ? "bg-[#064E3B] text-[#A7F3D0] border border-[#047857]"
                          : "bg-[#1C2636] text-[#94A3B8] border border-[rgba(255,255,255,0.08)]"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer / Mini User Profile Card */}
      <div className="p-3 border-t border-[rgba(255,255,255,0.08)] bg-[#131B26]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#1C2636] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-xs font-semibold text-[#F8FAFC]">
            MT
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-white truncate">Minh Triết</span>
              <span className="text-[11px] font-mono text-[#6366F1] font-semibold">1,480 ELO</span>
            </div>
            <p className="text-[11px] text-[#64748B] truncate">Mục tiêu: Band 8.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
