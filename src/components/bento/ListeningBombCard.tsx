"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, Users, Timer } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ListeningBombCard() {
  return (
    <div className="surface-card rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.08)] mb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#EF4444]" />
            <h3 className="text-xs font-semibold tracking-tight text-[#F8FAFC]">
              Chuỗi Co-op "Listening Bomb"
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#F59E0B] font-semibold bg-[#451A03] px-2 py-0.5 rounded border border-[#B45309]">
            Trận kế tiếp
          </span>
        </div>

        <p className="text-xs text-[#94A3B8] mb-3 leading-relaxed">
          Đội 2-4 thành viên phối hợp gỡ kíp nổ bằng cách nghe chép chính tả tốc độ cao bài giảng Section 4.
        </p>

        <div className="p-2.5 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.08)] space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#64748B] flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> Thành viên:
            </span>
            <span className="font-mono text-[#F8FAFC]">3/4 Đã sẵn sàng</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#64748B] flex items-center gap-1">
              <Timer className="w-3.5 h-3.5" /> Đếm ngược:
            </span>
            <span className="font-mono text-[#22C55E]">Bắt đầu sau 00:45</span>
          </div>
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-[rgba(255,255,255,0.08)]">
        <Link href="/arena/listening-bomb" className="block w-full">
          <Button variant="secondary" size="compact" className="w-full text-xs">
            Vào phòng chờ Co-op
          </Button>
        </Link>
      </div>
    </div>
  );
}
