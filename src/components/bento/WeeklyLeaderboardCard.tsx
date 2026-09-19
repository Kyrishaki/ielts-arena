import React from "react";
import { Trophy } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  elo: number;
  winStreak: number;
}

const TOP_FIVE: LeaderboardEntry[] = [
  { rank: 1, username: "HoangNam_C2", elo: 1845, winStreak: 9 },
  { rank: 2, username: "ThuyTien_IELTS", elo: 1790, winStreak: 6 },
  { rank: 3, username: "QuocBao_9.0", elo: 1720, winStreak: 4 },
  { rank: 4, username: "MinhTriet (Bạn)", elo: 1480, winStreak: 3 },
  { rank: 5, username: "KhanhVy_Eng", elo: 1455, winStreak: 2 },
];

export function WeeklyLeaderboardCard() {
  return (
    <div className="surface-card rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.08)] mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#F59E0B]" />
            <h3 className="text-xs font-semibold tracking-tight text-[#F8FAFC]">
              Bảng Vàng Tuần Này (Top 5)
            </h3>
          </div>
          <span className="text-[11px] text-[#64748B]">Mật độ 32px</span>
        </div>

        {/* 32px compact density rows */}
        <div className="divide-y divide-[rgba(255,255,255,0.06)]">
          {TOP_FIVE.map((user) => {
            const isSelf = user.username.includes("Bạn");
            return (
              <div
                key={user.rank}
                className={`h-8 max-h-8 flex items-center justify-between px-2 text-[13px] tracking-[-0.01em] transition-colors ${
                  isSelf ? "bg-[#1C2636] font-medium" : "hover:bg-[rgba(255,255,255,0.03)]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 text-left">
                  <span
                    className={`w-4 text-center font-mono text-[11px] ${
                      user.rank === 1
                        ? "text-[#F59E0B] font-bold"
                        : user.rank === 2
                        ? "text-[#94A3B8] font-bold"
                        : user.rank === 3
                        ? "text-[#B45309] font-bold"
                        : "text-[#64748B]"
                    }`}
                  >
                    #{user.rank}
                  </span>
                  <span className={`truncate ${isSelf ? "text-[#6366F1]" : "text-[#F8FAFC]"}`}>
                    {user.username}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-right shrink-0">
                  <span className="text-[#64748B] text-[11px]">W{user.winStreak}</span>
                  <span className="text-[#F8FAFC] font-semibold">{user.elo}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-2 mt-2 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between text-[11px] text-[#64748B]">
        <span>Reset sau: 2 ngày 14 giờ</span>
        <span className="text-[#6366F1] font-medium cursor-pointer hover:underline">
          Xem toàn bộ
        </span>
      </div>
    </div>
  );
}
