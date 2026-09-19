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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-t border-[rgba(255,255,255,0.08)] safe-bottom">
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
                "flex flex-col items-center justify-center h-full text-center transition-colors select-none",
                isActive ? "text-[#6366F1]" : "text-[#94A3B8] hover:text-[#F8FAFC]"
              )}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-medium tracking-tight">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
