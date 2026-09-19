"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Languages, Headphones, Sparkles, Layers, Swords, Trophy, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";

export function Sidebar() {
  const pathname = usePathname();
  const { user, profile, signOut } = useUser();

  const navigation = [
    {
      group: "HỌC THUẬT CỐT LÕI",
      items: [
        { name: "Dịch Thuật IELTS", href: "/", icon: Languages, badge: "Chính" },
        { name: "Shadowing Audio Lab", href: "/shadowing", icon: Headphones },
        { name: "Paraphrase Studio", href: "/paraphrase", icon: Sparkles },
      ],
    },
    {
      group: "GHI NHỚ (SRS)",
      items: [
        { name: "Card Learning (Quizlet)", href: "/cards", icon: Layers, badge: "SRS" },
      ],
    },
    {
      group: "ĐẤU TRƯỜNG CO-OP & PVP",
      items: [
        { name: "Cụm 5 Minigames", href: "/arena", icon: Swords, badge: "5 Games" },
      ],
    },
    {
      group: "THỐNG KÊ & XẾP HẠNG",
      items: [
        { name: "Bảng Vàng Elo", href: "/leaderboard", icon: Trophy },
      ],
    },
  ];

  const displayName = profile?.display_name || user?.user_metadata?.display_name || user?.email?.split("@")[0] || "Người dùng";
  const initials = displayName.slice(0, 2).toUpperCase();
  const bandTarget = profile?.band_target ?? "–";
  const elo = profile?.elo ?? "–";

  return (
    <aside
      className="hidden lg:flex flex-col w-60 fixed top-14 left-0 bottom-0 z-40 border-r select-none transition-colors duration-200"
      style={{ backgroundColor: "var(--canvas)", borderColor: "var(--border-subtle)" }}
    >
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {navigation.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <p className="px-2 text-[10px] font-semibold tracking-wider uppercase mb-1.5"
               style={{ color: "var(--text-faint)" }}>
              {section.group}
            </p>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-2.5 h-8 rounded text-[13px] font-medium transition-colors"
                  )}
                  style={{
                    backgroundColor: isActive ? "var(--surface-2)" : "transparent",
                    border: isActive ? "1px solid var(--border-subtle)" : "1px solid transparent",
                  }}
                >
                  <div className="flex items-center gap-2.5 truncate min-w-0">
                    <Icon className="w-4 h-4 shrink-0" style={{ color: isActive ? "var(--brand-indigo)" : "var(--text-muted)" }} />
                    <span className="truncate" style={{ color: isActive ? "var(--text-primary)" : "var(--text-muted)" }}>
                      {item.name}
                    </span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ml-1 border"
                      style={
                        item.badge === "Chính"
                          ? { background: "rgba(129,140,248,0.12)", color: "var(--brand-indigo)", borderColor: "rgba(129,140,248,0.25)" }
                          : item.badge === "SRS"
                          ? { background: "rgba(52,211,153,0.1)", color: "var(--brand-green)", borderColor: "rgba(52,211,153,0.25)" }
                          : { background: "var(--surface-2)", color: "var(--text-muted)", borderColor: "var(--border-subtle)" }
                      }>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t" style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--surface-1)" }}>
        {user ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: "rgba(129,140,248,0.15)", borderColor: "rgba(129,140,248,0.3)", color: "var(--brand-indigo)" }}>
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium truncate" style={{ color: "var(--text-primary)" }}>
                    {displayName}
                  </span>
                  <span className="text-[11px] font-mono font-semibold" style={{ color: "var(--brand-indigo)" }}>
                    {elo} ELO
                  </span>
                </div>
                <p className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>
                  Mục tiêu: Band {bandTarget}
                </p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="w-full flex items-center gap-2 px-2.5 h-7 rounded text-[12px] transition-colors hover:bg-[rgba(239,68,68,0.1)] text-[#94A3B8] hover:text-[#EF4444]"
            >
              <LogOut className="w-3.5 h-3.5" />
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="space-y-1.5">
            <Link href="/login"
              className="w-full flex items-center justify-center h-8 rounded text-[13px] font-medium transition-colors"
              style={{ background: "var(--brand-gradient)", color: "white" }}>
              Đăng nhập
            </Link>
            <Link href="/register"
              className="w-full flex items-center justify-center h-7 rounded text-[12px] border transition-colors"
              style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
              Đăng ký miễn phí
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
