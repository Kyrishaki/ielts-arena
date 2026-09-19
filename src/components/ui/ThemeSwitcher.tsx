"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, ThemeMode } from "@/context/ThemeContext";
import { Palette, Sun, Zap, Circle } from "lucide-react";

const THEMES: {
  id: ThemeMode;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  preview: string;
  dotColors: string[];
}[] = [
  {
    id: "vibrant",
    label: "Rực Rỡ",
    sublabel: "Indigo · Cyan · Coral",
    icon: <Zap className="w-3.5 h-3.5" />,
    preview:
      "linear-gradient(135deg, #6366F1 0%, #06B6D4 50%, #FF5722 100%)",
    dotColors: ["#6366F1", "#06B6D4", "#FF5722"],
  },
  {
    id: "monochrome",
    label: "Trắng Đen",
    sublabel: "High Contrast Noir",
    icon: <Circle className="w-3.5 h-3.5" />,
    preview: "linear-gradient(135deg, #FFFFFF 0%, #404040 100%)",
    dotColors: ["#FFFFFF", "#888888", "#000000"],
  },
  {
    id: "light",
    label: "Sáng",
    sublabel: "Nền Trắng Tinh Khôi",
    icon: <Sun className="w-3.5 h-3.5" />,
    preview: "linear-gradient(135deg, #4F46E5 0%, #0284C7 100%)",
    dotColors: ["#4F46E5", "#0284C7", "#F1F5F9"],
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const active = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div ref={ref} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        title="Chuyển đổi giao diện"
        className={`flex items-center gap-1.5 px-2 py-1 rounded border text-xs font-medium transition-all duration-150
          ${
            open
              ? "bg-[#1C2636] border-[rgba(99,102,241,0.5)] text-white"
              : "bg-[#131B26] border-[rgba(255,255,255,0.08)] text-[#94A3B8] hover:text-white hover:border-[rgba(255,255,255,0.2)]"
          }`}
      >
        <Palette className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{active.label}</span>
        {/* Color dots preview */}
        <div className="flex items-center gap-0.5 ml-0.5">
          {active.dotColors.map((c, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div
          className="absolute right-0 top-full mt-1.5 w-52 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#0D1320]/95 backdrop-blur-xl shadow-2xl z-[100] overflow-hidden"
          style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}
        >
          <div className="px-3 pt-2.5 pb-1">
            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
              Giao Diện
            </span>
          </div>

          {THEMES.map((t) => {
            const isActive = t.id === theme;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors
                  ${
                    isActive
                      ? "bg-[rgba(99,102,241,0.12)] text-white"
                      : "text-[#94A3B8] hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
                  }`}
              >
                {/* Gradient swatch */}
                <div
                  className="w-7 h-7 rounded-md shrink-0 border border-[rgba(255,255,255,0.15)]"
                  style={{ background: t.preview }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold">{t.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                    )}
                  </div>
                  <span className="text-[10px] text-[#64748B]">
                    {t.sublabel}
                  </span>
                </div>
              </button>
            );
          })}

          <div className="px-3 py-2 border-t border-[rgba(255,255,255,0.06)]">
            <span className="text-[10px] text-[#475569]">
              Cài đặt được lưu tự động
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
