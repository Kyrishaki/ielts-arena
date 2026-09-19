import React from "react";
import { TopNavbar } from "./TopNavbar";
import { Sidebar } from "./Sidebar";
import { MobileNavDock } from "./MobileNavDock";
import { UserProvider } from "@/context/UserContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <div className="min-h-screen" style={{ backgroundColor: "var(--canvas)", color: "var(--text-primary)" }}>
        {/* Fixed Top Navbar (Z-Index 50) */}
        <TopNavbar />

        {/* Locked Fixed Sidebar (Z-Index 40) */}
        <Sidebar />

        {/* Main Content Workspace */}
        <div className="pt-14 lg:pl-60 flex flex-col min-h-screen pb-16 lg:pb-0">
          <main className="flex-1 p-3.5 sm:p-5 md:p-6 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>

        {/* Mobile Bottom Navigation Dock */}
        <MobileNavDock />
      </div>
    </UserProvider>
  );
}
