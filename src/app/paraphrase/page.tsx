"use client";

import React, { useState, useCallback } from "react";
import {
  Sparkles, Copy, Check, RotateCw, Layers, ShieldCheck, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useUser } from "@/context/UserContext";

interface ParaphraseOption {
  structureType: string;
  sentence: string;
  lexicalUpgrades: Array<{ original: string; upgraded: string }>;
  syntacticNote: string;
}

const INITIAL_REWRITES: ParaphraseOption[] = [
  {
    structureType: "Nominalization (Danh từ hóa)",
    sentence: "The rapid urbanization of provincial territories has precipitated severe deficits in municipal infrastructure.",
    lexicalUpgrades: [
      { original: "cities grow fast", upgraded: "rapid urbanization" },
      { original: "causes big problems", upgraded: "precipitated severe deficits" },
    ],
    syntacticNote: "Chuyển đổi mệnh đề vị ngữ thành cụm danh từ 'rapid urbanization' giúp câu mang tính học thuật cao.",
  },
  {
    structureType: "Passive Academic (Bị động Khách quan)",
    sentence: "It is widely posited by contemporary demographers that uninterrupted urban expansion is directly correlated with environmental degradation.",
    lexicalUpgrades: [
      { original: "many people say", upgraded: "widely posited by contemporary demographers" },
      { original: "nature gets worse", upgraded: "environmental degradation" },
    ],
    syntacticNote: "Sử dụng cấu trúc 'It is widely posited that...' tạo giọng văn trung lập, khách quan chuẩn Task 2.",
  },
  {
    structureType: "Syntactic Inversion (Đảo ngữ C1/C2)",
    sentence: "Under no circumstances should policymakers disregard the deleterious ramifications of unregulated metropolitan sprawl.",
    lexicalUpgrades: [
      { original: "governments should not ignore", upgraded: "under no circumstances should policymakers disregard" },
      { original: "bad effects", upgraded: "deleterious ramifications" },
    ],
    syntacticNote: "Cấu trúc đảo ngữ phủ định 'Under no circumstances should...' gây ấn tượng mạnh với giám khảo chấm Grammatical Range.",
  },
];

export default function ParaphraseStudioPage() {
  const { profile } = useUser();
  const userBand = profile?.band_target ?? 7.0;

  const [inputSentence, setInputSentence] = useState(
    "When cities grow too fast, it causes many bad problems for the environment and people."
  );
  const [rewrites, setRewrites] = useState<ParaphraseOption[]>(INITIAL_REWRITES);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // AI generate new exercise based on band level
  const handleGenerateNew = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "paraphrase", band: userBand }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.inputSentence) setInputSentence(data.inputSentence);
        if (data.rewrites?.length === 3) setRewrites(data.rewrites);
      }
    } catch (err) {
      console.warn("Generate paraphrase error:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, [userBand]);

  // Paraphrase the current input using AI
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputSentence.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/paraphrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence: inputSentence }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.rewrites?.length) setRewrites(data.rewrites);
      }
    } catch (err) {
      console.warn("Paraphrase API notice:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[rgba(255,255,255,0.08)]">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#F59E0B]" />
            Paraphrase Studio
          </h1>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Bài tập AI tạo theo{" "}
            <span className="text-[#818CF8] font-mono font-semibold">Band {userBand}</span> của bạn
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="primary"
            size="compact"
            onClick={handleGenerateNew}
            disabled={isRefreshing}
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />}
          >
            {isRefreshing ? "AI đang tạo..." : `🎲 Bài mới (Band ${userBand})`}
          </Button>
          <span className="px-2.5 py-1 rounded text-xs font-mono bg-[#1C2636] text-[#A5B4FC] border border-[rgba(255,255,255,0.08)]">
            AI Rubric: LR & GRA Focus
          </span>
        </div>
      </div>

      {/* Input */}
      <div className="surface-card rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-4 space-y-3">
        <label className="text-xs font-semibold text-white block">
          Câu gốc cần nâng cấp (Band 5.5 - 6.0):
        </label>
        <textarea
          value={inputSentence}
          onChange={(e) => setInputSentence(e.target.value)}
          rows={3}
          placeholder="Nhập câu tiếng Anh bạn muốn viết lại..."
          className="w-full rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.12)] p-3 text-xs sm:text-sm text-white placeholder-[#64748B] focus:border-[#6366F1] focus:outline-none resize-none leading-relaxed"
        />
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-[#64748B]">
            Tự động phát hiện cấu trúc câu và gợi ý C1/C2 collocations
          </span>
          <Button
            type="button"
            variant="primary"
            size="compact"
            onClick={handleGenerate}
            disabled={isGenerating || !inputSentence.trim()}
            icon={<RotateCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />}
          >
            {isGenerating ? "AI đang viết lại..." : "Tạo 3 Phương Án"}
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
          3 Phương Án Tái Cấu Trúc — Band {userBand}+
        </h2>
        <div className="grid grid-cols-1 gap-3.5">
          {rewrites.map((opt, idx) => (
            <div
              key={idx}
              className="surface-card rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-4 space-y-3 hover:border-[#6366F1]/50 transition-colors"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.08)]">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#A5B4FC]">
                  <Layers className="w-3.5 h-3.5 text-[#6366F1]" />
                  {opt.structureType}
                </span>
                <button
                  onClick={() => handleCopy(opt.sentence, idx)}
                  className="p-1 rounded text-[#94A3B8] hover:text-white hover:bg-[#1C2636] transition-colors flex items-center gap-1 text-[11px]"
                >
                  {copiedIndex === idx ? (
                    <span className="text-[#22C55E] flex items-center gap-1"><Check className="w-3 h-3" /> Đã chép</span>
                  ) : (
                    <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> Sao chép</span>
                  )}
                </button>
              </div>
              <p className="text-xs sm:text-sm font-medium text-white leading-relaxed italic">
                &ldquo;{opt.sentence}&rdquo;
              </p>
              {opt.lexicalUpgrades?.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                  <span className="text-[#64748B]">Từ vựng C1/C2:</span>
                  {opt.lexicalUpgrades.map((item, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.08)] text-[#A7F3D0] font-mono">
                      <del className="text-[#EF4444] opacity-70 mr-1">{item.original}</del>
                      → <span className="font-semibold text-[#22C55E]">{item.upgraded}</span>
                    </span>
                  ))}
                </div>
              )}
              <p className="text-[11px] text-[#94A3B8] bg-[#0B0F17] p-2.5 rounded border border-[rgba(255,255,255,0.05)]">
                <ShieldCheck className="w-3 h-3 text-[#6366F1] inline mr-1" />
                {opt.syntacticNote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
