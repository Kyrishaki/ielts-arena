import React from "react";
import { Sidebar } from "./Sidebar";
import { MobileNavDock } from "./MobileNavDock";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-row bg-[#0B0F17] text-[#F8FAFC]">
      {/* Desktop Collapsible Sidebar */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        {/* Mobile Top Brand Bar (Only on mobile) */}
        <header className="lg:hidden h-12 flex items-center justify-between px-4 border-b border-[rgba(255,255,255,0.08)] bg-[#0B0F17] sticky top-0 z-20">
          <div className="flex items-center gap-2 font-bold tracking-tight text-white">
            <div className="w-5 h-5 rounded bg-[#6366F1] flex items-center justify-center text-[10px] font-mono font-black text-white">
              IA
            </div>
            <span className="text-sm font-semibold">IELTS ARENA</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#6366F1] bg-[#1E1B4B] px-2 py-0.5 rounded border border-[#4338CA]">
            1,480 ELO
          </div>
        </header>

        {/* Dynamic Content Container */}
        <main className="flex-1 p-3 sm:p-5 md:p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Dock */}
      <MobileNavDock />
    </div>
  );
}
