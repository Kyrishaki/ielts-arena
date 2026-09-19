import React from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#080C14] px-4">
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 mb-8">
        <BrandLogo size={36} className="w-9 h-9" />
        <span className="text-lg font-bold tracking-tight text-white">IELTS ARENA</span>
      </div>
      {children}
      <p className="mt-8 text-[11px] text-[#334155] text-center">
        © 2026 IELTS Arena · AI-Powered Academic English Platform
      </p>
    </div>
  );
}
