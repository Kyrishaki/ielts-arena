import React from "react";
import { Activity } from "lucide-react";

export function RadarScoreCard() {
  const criteria = [
    { code: "TR", name: "Task Response", score: 7.5, max: 9.0, pct: 83 },
    { code: "CC", name: "Coherence & Cohesion", score: 7.0, max: 9.0, pct: 77 },
    { code: "LR", name: "Lexical Resource", score: 8.5, max: 9.0, pct: 94 },
    { code: "GRA", name: "Grammatical Accuracy", score: 7.0, max: 9.0, pct: 77 },
  ];

  return (
    <div className="surface-card rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.08)] mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#6366F1]" />
            <h3 className="text-xs font-semibold tracking-tight text-[#F8FAFC]">
              Phân Tích 4 Tiêu Chí IELTS
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-[#6366F1]">Band 7.5</span>
        </div>

        <div className="space-y-2.5">
          {criteria.map((c) => (
            <div key={c.code} className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium text-[#F8FAFC]">
                  {c.code} <span className="text-[#64748B] font-normal">({c.name})</span>
                </span>
                <span className="font-mono text-[#F8FAFC]">{c.score}</span>
              </div>
              {/* Linear crisp 1px bordered bar */}
              <div className="h-1.5 w-full bg-[#0B0F17] rounded-full overflow-hidden border border-[rgba(255,255,255,0.05)]">
                <div
                  className="h-full bg-[#6366F1] rounded-full transition-all duration-300"
                  style={{ width: `${c.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 mt-3 border-t border-[rgba(255,255,255,0.08)] text-[11px] text-[#94A3B8] flex items-center justify-between">
        <span>Tiêu chí mạnh nhất: Lexical</span>
        <span className="text-[#22C55E] font-medium">+0.5 tuần này</span>
      </div>
    </div>
  );
}
