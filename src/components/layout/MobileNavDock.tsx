"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages, Headphones, Layers, Swords } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNavDock() {
  const pathname = usePathname();

  const tabs = [
    { name: "Dịch thuật", href: "/", icon: Languages },
    { name: "Shadowing", href: "/shadowing", icon: Headphones },
    { name: "Cards SRS", href: "/cards", icon: Layers },
    { name: "Đấu trường", href: "/arena", icon: Swords },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md border-t safe-bottom transition-colors duration-200"
      style={{
        backgroundColor: "color-mix(in srgb, var(--canvas) 92%, transparent)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="h-14 grid grid-cols-4 items-center px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center h-full text-center transition-colors select-none"
              )}
              style={{
                color: isActive ? "var(--brand-indigo)" : "var(--text-muted)",
              }}
            >
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                  style={{ backgroundColor: "var(--brand-indigo)" }}
                />
              )}
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-medium tracking-tight">
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
