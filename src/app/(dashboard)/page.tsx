"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Languages,
  Sparkles,
  Headphones,
  Swords,
  Copy,
  Check,
  ArrowRight,
  RotateCw,
  BookMarked,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TranslationTier {
  band: string;
  text: string;
  analysis: string[];
  keyCollocations: string[];
}

const SAMPLE_TRANSLATIONS: Record<string, TranslationTier[]> = {
  default: [
    {
      band: "Band 6.5 (Tự nhiên)",
      text: "Many people believe that technological developments bring great advantages to modern society, but they also cause several environmental issues.",
      analysis: ["Cấu trúc câu ghép liên kết bằng 'but'", "Từ vựng chuẩn mực: 'technological developments', 'environmental issues'"],
      keyCollocations: ["technological developments", "bring advantages", "environmental issues"],
    },
    {
      band: "Band 7.5 (Học thuật Chuyên sâu)",
      text: "It is widely recognized that technological advancements yield substantial benefits for contemporary society, notwithstanding their detrimental environmental consequences.",
      analysis: ["Mệnh đề bị động khách quan 'It is widely recognized that'", "Liên từ học thuật 'notwithstanding'"],
      keyCollocations: ["technological advancements", "yield substantial benefits", "contemporary society", "detrimental consequences"],
    },
    {
      band: "Band 8.5+ (Tái tạo C1/C2 & Đảo ngữ)",
      text: "Seldom has the exponential proliferation of technological innovation exerted such profound ramifications upon modern civilization, though not without precipitating grave ecological degradation.",
      analysis: ["Cấu trúc đảo ngữ phủ định 'Seldom has...'", "Danh từ hóa phức hợp 'exponential proliferation', 'grave ecological degradation'"],
      keyCollocations: ["exponential proliferation", "exert profound ramifications", "precipitate ecological degradation"],
    },
  ],
};

export default function AcademicTranslationPage() {
  const [inputText, setInputText] = useState(
    "Nhiều người tin rằng sự phát triển của công nghệ đem lại lợi ích to lớn cho xã hội hiện đại, nhưng nó cũng gây ra nhiều vấn đề môi trường."
  );
  const [selectedBandIndex, setSelectedBandIndex] = useState(2); // Default to Band 8.5
  const [copied, setCopied] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const currentTiers = SAMPLE_TRANSLATIONS.default;
  const activeTier = currentTiers[selectedBandIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTier.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTranslate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTranslating(true);
    setTimeout(() => {
      setIsTranslating(false);
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[rgba(255,255,255,0.08)]">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Languages className="w-5 h-5 text-[#6366F1]" />
            Dịch Thuật Học Thuật IELTS (Academic Translation Engine)
          </h1>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Chuyển ngữ đa chiều Việt - Anh với 3 cấp độ Band Score (6.5, 7.5, 8.5+) và bóc tách collocations học thuật tức thời.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#1E1B4B] text-[#A5B4FC] border border-[#4338CA]">
            AI Model: Academic C1/C2
          </span>
        </div>
      </div>

      {/* Main Dual-Panel Translation Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Panel: Input Box */}
        <div className="lg:col-span-6 surface-card rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-4 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(255,255,255,0.08)] mb-3 text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <span>Văn bản gốc (Tiếng Việt / Tiếng Anh)</span>
              </span>
              <button
                onClick={() => setInputText("")}
                className="text-[11px] text-[#64748B] hover:text-[#94A3B8] transition-colors"
              >
                Xóa ô nhập
              </button>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập câu tiếng Việt hoặc tiếng Anh cần dịch học thuật..."
              rows={7}
              className="w-full bg-[#0B0F17] rounded border border-[rgba(255,255,255,0.12)] p-3 text-xs sm:text-sm text-white placeholder-[#64748B] focus:border-[#6366F1] focus:outline-none resize-none leading-relaxed transition-colors"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.08)]">
            <span className="text-[11px] text-[#64748B] font-mono">
              {inputText.length} ký tự
            </span>
            <Button
              type="button"
              variant="primary"
              size="compact"
              disabled={isTranslating || !inputText.trim()}
              onClick={handleTranslate}
              icon={<RotateCw className={`w-3.5 h-3.5 ${isTranslating ? "animate-spin" : ""}`} />}
            >
              {isTranslating ? "Đang dịch học thuật..." : "Dịch 3 Cấp Độ Band"}
            </Button>
          </div>
        </div>

        {/* Right Panel: 3 Band Output Box */}
        <div className="lg:col-span-6 surface-card rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-4 flex flex-col justify-between min-h-[360px]">
          <div>
            {/* Band Level Selector Tabs */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(255,255,255,0.08)] mb-3">
              <div className="flex items-center gap-1 bg-[#0B0F17] p-0.5 rounded border border-[rgba(255,255,255,0.06)]">
                {currentTiers.map((tier, idx) => (
                  <button
                    key={tier.band}
                    onClick={() => setSelectedBandIndex(idx)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                      selectedBandIndex === idx
                        ? "bg-[#6366F1] text-white shadow-none"
                        : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    {tier.band.split(" ")[0]} {tier.band.split(" ")[1]}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded text-[#94A3B8] hover:text-white hover:bg-[#1C2636] transition-colors"
                  title="Sao chép bản dịch"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />}
                </button>
              </div>
            </div>

            {/* Translation Output Display */}
            <div className="p-3.5 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.08)] mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A5B4FC]">
                  {activeTier.band}
                </span>
                <button className="text-[11px] text-[#6366F1] flex items-center gap-1 hover:underline">
                  <Volume2 className="w-3 h-3" /> Nghe phát âm
                </button>
              </div>
              <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                "{activeTier.text}"
              </p>
            </div>

            {/* Extracted Collocations */}
            <div className="space-y-2">
              <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">
                Collocations Nổi Bật Được Dùng:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeTier.keyCollocations.map((colloc, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#1C2636] text-[#A7F3D0] border border-[rgba(255,255,255,0.08)]"
                  >
                    ✦ {colloc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row: Send to Shadowing / Paraphrase / Flashcards */}
          <div className="pt-3 mt-3 border-t border-[rgba(255,255,255,0.08)] flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] text-[#64748B]">Thực hành tiếp câu này:</span>
            <div className="flex items-center gap-2">
              <Link href="/shadowing">
                <Button size="compact" variant="secondary" icon={<Headphones className="w-3.5 h-3.5 text-[#6366F1]" />}>
                  Shadowing Lab
                </Button>
              </Link>
              <Link href="/paraphrase">
                <Button size="compact" variant="secondary" icon={<Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />}>
                  Paraphrase
                </Button>
              </Link>
              <Link href="/cards">
                <Button size="compact" variant="secondary" icon={<BookMarked className="w-3.5 h-3.5 text-[#22C55E]" />}>
                  Lưu vào Cards
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Hub (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Hub Card 1: Shadowing Audio Lab */}
        <Link href="/shadowing" className="group">
          <div className="surface-card rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-4 group-hover:border-[#6366F1] transition-colors h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded bg-[#1E1B4B] flex items-center justify-center text-[#6366F1]">
                  <Headphones className="w-4 h-4" />
                </div>
                <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">
                Shadowing Audio Lab
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Nghe và nhại giọng theo phát âm người bản xứ câu vừa dịch. Luyện ngữ điệu và nối âm chuẩn IELTS Speaking.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] text-[#6366F1]">
              <span>Tập trung Fluency & Pronunciation</span>
              <span>Bắt đầu →</span>
            </div>
          </div>
        </Link>

        {/* Hub Card 2: Paraphrase Studio */}
        <Link href="/paraphrase" className="group">
          <div className="surface-card rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-4 group-hover:border-[#6366F1] transition-colors h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded bg-[#451A03] flex items-center justify-center text-[#F59E0B]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">
                Paraphrase Studio
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Luyện viết lại câu theo 3 cấu trúc học thuật nâng cao: Danh từ hóa (Nominalization), Câu bị động, và Đảo ngữ.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] text-[#F59E0B]">
              <span>Tập trung Lexical & Grammar</span>
              <span>Thực hành →</span>
            </div>
          </div>
        </Link>

        {/* Hub Card 3: Cụm 5 Minigames Arena */}
        <Link href="/arena" className="group">
          <div className="surface-card rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-4 group-hover:border-[#6366F1] transition-colors h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded bg-[#064E3B] flex items-center justify-center text-[#22C55E]">
                  <Swords className="w-4 h-4" />
                </div>
                <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                <span>Cụm 5 Minigames Đấu Trường</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#064E3B] text-[#A7F3D0]">
                  PVP & Co-op
                </span>
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Đấu trường thi đấu trực tiếp: Word Duel, Paraphrase Blitz, Error Hunter, Listening Bomb và Topic Debate.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] text-[#22C55E]">
              <span>14 phòng đang thách đấu</span>
              <span>Vào Đấu trường →</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
