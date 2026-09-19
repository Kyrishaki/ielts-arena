"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function BandUpgraderCard() {
  const [essayText, setEssayText] = useState("");
  const [upgradedPreview, setUpgradedPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!essayText.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setUpgradedPreview(
        "It is widely contended that the exponential proliferation of motorized transportation constitutes a profound hazard to urban biosphere integrity."
      );
    }, 450);
  };

  return (
    <div className="surface-card rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)] mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#6366F1]" />
            <h2 className="text-sm font-semibold tracking-tight text-[#F8FAFC]">
              AI Writing Band-Upgrader
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#6366F1] font-semibold bg-[#1E1B4B] px-2 py-0.5 rounded border border-[#4338CA]">
            Tái tạo Band 8.5
          </span>
        </div>

        <p className="text-xs text-[#94A3B8] mb-3 leading-relaxed">
          Nhập câu hoặc đoạn văn Task 2 để thuật toán AI phân tích Collocation và tái thiết kế cấu trúc ngữ pháp học thuật.
        </p>

        {/* Pure CSS :has() validation form */}
        <form onSubmit={handleUpgrade} className="space-y-3">
          <div>
            <textarea
              required
              minLength={10}
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              placeholder="Ví dụ: Many people think cars make cities polluted and bad for health..."
              rows={3}
              className="w-full rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.12)] p-2.5 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:border-[#6366F1] focus:outline-none resize-none transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#64748B]">Tối thiểu 10 ký tự</span>
            <Button
              type="submit"
              variant="primary"
              size="compact"
              disabled={isProcessing}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              {isProcessing ? "Đang xử lý..." : "Tái tạo Band 8.5"}
            </Button>
          </div>
        </form>

        {/* Upgraded Preview Container */}
        {upgradedPreview && (
          <div className="mt-3 p-3 rounded bg-[#1C2636] border border-[#6366F1]/40 transition-all">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#A5B4FC] mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
              Kết quả Tái tạo Band 8.5
            </div>
            <p className="text-xs text-[#F8FAFC] italic font-serif leading-relaxed">
              "{upgradedPreview}"
            </p>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-[#94A3B8]">
              <span>Lexical: 8.5</span>
              <span>•</span>
              <span>Syntactic Inversion: Đạt</span>
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 mt-3 border-t border-[rgba(255,255,255,0.08)]">
        <span className="text-[11px] text-[#64748B]">
          Đánh giá dựa trên tiêu chuẩn IELTS Writing Rubric (TR, CC, LR, GRA).
        </span>
      </div>
    </div>
  );
}
