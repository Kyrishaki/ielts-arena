"use client";

import React, { useState } from "react";
import { Volume2, RotateCw, Sparkles, BookOpen } from "lucide-react";

export interface FlashcardData {
  id: string;
  term: string;
  partOfSpeech: string;
  ipa: string;
  tier: "B2" | "C1" | "C2";
  vietnameseMeaning: string;
  collocations: string[];
  exampleSentence: string;
}

export interface QuizletFlashcardProps {
  card: FlashcardData;
  isFlipped: boolean;
  onFlip: () => void;
}

export function QuizletFlashcard({ card, isFlipped, onFlip }: QuizletFlashcardProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingAudio(true);
    // Use Web Speech API if available
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(card.term);
      utterance.lang = "en-GB";
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 800);
    }
  };

  return (
    <div
      onClick={onFlip}
      className="relative w-full h-[320px] sm:h-[360px] cursor-pointer select-none perspective-1000 group"
    >
      <div
        className={`w-full h-full duration-300 transform-style-preserve-3d transition-transform rounded-xl border border-[rgba(255,255,255,0.1)] shadow-none ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT OF THE CARD */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-[#131B26] rounded-xl p-6 flex flex-col justify-between border border-[rgba(255,255,255,0.08)]">
          {/* Top Bar on Front */}
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#1E1B4B] text-[#A5B4FC] border border-[#4338CA]">
              {card.tier} Academic
            </span>
            <button
              onClick={handlePlayAudio}
              className="p-2 rounded-full bg-[#1C2636] text-[#6366F1] hover:text-white hover:bg-[#6366F1] transition-colors"
              title="Phát âm từ vựng"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? "animate-pulse" : ""}`} />
            </button>
          </div>

          {/* Center: Term & IPA */}
          <div className="text-center space-y-2 my-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              {card.term}
            </h2>
            <div className="flex items-center justify-center gap-2 text-xs text-[#94A3B8] font-mono">
              <span className="italic text-[#A5B4FC]">({card.partOfSpeech})</span>
              <span>{card.ipa}</span>
            </div>
          </div>

          {/* Bottom Flip Hint */}
          <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-3 border-t border-[rgba(255,255,255,0.06)]">
            <span className="flex items-center gap-1">
              <RotateCw className="w-3 h-3" /> Click hoặc phím [SPACE] để xem nghĩa
            </span>
            <span>Mặt trước (1/2)</span>
          </div>
        </div>

        {/* BACK OF THE CARD */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#1C2636] rounded-xl p-6 flex flex-col justify-between border border-[#6366F1]/50">
          {/* Top Bar on Back */}
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.08)]">
            <span className="text-xs font-semibold text-[#A5B4FC] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#6366F1]" />
              {card.term} ({card.partOfSpeech})
            </span>
            <span className="text-[10px] font-mono text-[#22C55E]">Mặt sau</span>
          </div>

          {/* Center Details */}
          <div className="space-y-3.5 my-auto text-left">
            {/* Vietnamese Meaning */}
            <div>
              <span className="text-[10px] text-[#64748B] uppercase tracking-wider block mb-0.5">
                Định nghĩa tiếng Việt:
              </span>
              <p className="text-base sm:text-lg font-semibold text-white">
                {card.vietnameseMeaning}
              </p>
            </div>

            {/* Collocations */}
            <div>
              <span className="text-[10px] text-[#64748B] uppercase tracking-wider block mb-1">
                Collocations học thuật:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {card.collocations.map((col, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#0B0F17] text-[#A7F3D0] border border-[rgba(255,255,255,0.08)]"
                  >
                    • {col}
                  </span>
                ))}
              </div>
            </div>

            {/* Example sentence */}
            <div className="p-2.5 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.06)] text-xs text-[#F8FAFC]">
              <span className="text-[10px] text-[#F59E0B] flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3" /> Ví dụ IELTS Task 2:
              </span>
              <p className="italic leading-relaxed">"{card.exampleSentence}"</p>
            </div>
          </div>

          {/* Bottom Flip Hint */}
          <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-2 border-t border-[rgba(255,255,255,0.06)]">
            <span>Click để lật lại</span>
            <span className="text-[#6366F1]">Dùng phím [←] hoặc [→] để chấm điểm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
