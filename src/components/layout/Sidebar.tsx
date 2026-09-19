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
    <aside className="hidden lg:flex flex-col w-60 fixed top-14 left-0 bottom-0 z-40 border-r select-none transition-colors duration-200"
      style={{
        backgroundColor: "var(--canvas)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {navigation.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <p className="px-2 text-[10px] font-semibold tracking-wider uppercase mb-1.5"
               style={{ color: "var(--text-faint)" }}>
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
                      ? "sidebar-item-active"
                      : "sidebar-item-idle"
                  )}
                >
                  <div className="flex items-center gap-2.5 truncate min-w-0">
                    <Icon
                      className={cn(
                        "w-4 h-4 shrink-0 transition-colors",
                        isActive ? "sidebar-icon-active" : "sidebar-icon-idle"
                      )}
                      style={
                        isActive
                          ? { color: "var(--brand-indigo)" }
                          : { color: "var(--text-muted)" }
                      }
                    />
                    <span className="truncate" style={{
                      color: isActive ? "var(--text-primary)" : "var(--text-muted)"
                    }}>
                      {item.name}
                    </span>
                  </div>

                  {item.badge && (
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ml-1 border"
                      style={
                        item.badge === "Chính"
                          ? {
                              background: "rgba(129,140,248,0.12)",
                              color: "var(--brand-indigo)",
                              borderColor: "rgba(129,140,248,0.25)",
                            }
                          : item.badge === "SRS"
                          ? {
                              background: "rgba(52,211,153,0.1)",
                              color: "var(--brand-green)",
                              borderColor: "rgba(52,211,153,0.25)",
                            }
                          : {
                              background: "var(--surface-2)",
                              color: "var(--text-muted)",
                              borderColor: "var(--border-subtle)",
                            }
                      }
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
      <div className="p-3 border-t" style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--surface-1)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border flex items-center justify-center text-xs font-semibold"
            style={{
              backgroundColor: "var(--surface-2)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-muted)",
            }}>
            --
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium truncate" style={{ color: "var(--text-primary)" }}>
                Người dùng
              </span>
              <span className="text-[11px] font-mono font-semibold" style={{ color: "var(--brand-indigo)" }}>
                -- ELO
              </span>
            </div>
            <p className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>
              Mục tiêu: Band --
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
