"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Shuffle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { QuizletFlashcard, FlashcardData } from "@/components/cards/QuizletFlashcard";

const SAMPLE_DECK: FlashcardData[] = [
  {
    id: "fc-1",
    term: "Ameliorate",
    partOfSpeech: "verb",
    ipa: "/əˈmiː.li.ə.reɪt/",
    tier: "C2",
    vietnameseMeaning: "Làm cho tốt hơn, cải thiện, giảm nhẹ một tình trạng tồi tệ",
    collocations: ["ameliorate living conditions", "efforts to ameliorate", "ameliorate the crisis"],
    exampleSentence:
      "Municipal subsidies have been introduced to ameliorate the acute housing shortage among low-income workers.",
  },
  {
    id: "fc-2",
    term: "Ubiquitous",
    partOfSpeech: "adjective",
    ipa: "/juːˈbɪk.wɪ.təs/",
    tier: "C1",
    vietnameseMeaning: "Có mặt ở khắp nơi, phổ biến rộng rãi",
    collocations: ["ubiquitous presence", "become ubiquitous", "ubiquitous technology"],
    exampleSentence:
      "Smartphones have become ubiquitous across all demographics, profoundly restructuring human communication.",
  },
  {
    id: "fc-3",
    term: "Exacerbate",
    partOfSpeech: "verb",
    ipa: "/ɪɡˈzæs.ə.beɪt/",
    tier: "C1",
    vietnameseMeaning: "Làm trầm trọng thêm (vấn đề, bệnh tật, xung đột)",
    collocations: ["exacerbate the problem", "exacerbate tensions", "exacerbate poverty"],
    exampleSentence:
      "Uncontrolled industrial emissions exacerbate respiratory illnesses among urban residents.",
  },
  {
    id: "fc-4",
    term: "Conducive",
    partOfSpeech: "adjective",
    ipa: "/kənˈdʒuː.sɪv/",
    tier: "C1",
    vietnameseMeaning: "Đưa đến, tạo điều kiện thuận lợi cho điều gì",
    collocations: ["conducive to learning", "conducive environment", "conducive to growth"],
    exampleSentence:
      "A tranquil domestic environment is fundamentally conducive to scholastic achievement.",
  },
  {
    id: "fc-5",
    term: "Deleterious",
    partOfSpeech: "adjective",
    ipa: "/ˌdɛl.ɪˈtɪə.ri.əs/",
    tier: "C2",
    vietnameseMeaning: "Gây hại, có hại (thường dùng trong văn cảnh học thuật/môi trường)",
    collocations: ["deleterious effect", "deleterious consequences", "deleterious impact"],
    exampleSentence:
      "Prolonged sedentary habits exert deleterious consequences on cardiovascular well-being.",
  },
];

export default function CardLearningPage() {
  const [deck, setDeck] = useState<FlashcardData[]>(SAMPLE_DECK);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [reviewIds, setReviewIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentCard = deck[currentIndex];
  const progressPct = Math.round((masteredIds.length / deck.length) * 100);

  // Keyboard navigation support ([Space] to flip, [ArrowLeft] to review, [ArrowRight] to master)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handleMarkReview();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleMarkMastered();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isFinished, deck.length]);

  const advanceCard = () => {
    setIsFlipped(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleMarkReview = () => {
    if (isFinished) return;
    if (!reviewIds.includes(currentCard.id)) {
      setReviewIds((prev) => [...prev, currentCard.id]);
    }
    // Remove from mastered if was there
    setMasteredIds((prev) => prev.filter((id) => id !== currentCard.id));
    advanceCard();
  };

  const handleMarkMastered = () => {
    if (isFinished) return;
    if (!masteredIds.includes(currentCard.id)) {
      setMasteredIds((prev) => [...prev, currentCard.id]);
    }
    setReviewIds((prev) => prev.filter((id) => id !== currentCard.id));
    advanceCard();
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
    setMasteredIds([]);
    setReviewIds([]);
  };

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    handleRestart();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header & Progress Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[rgba(255,255,255,0.08)]">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-[#6366F1]" />
            Card Learning (Quizlet SRS Module)
          </h1>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Ghi nhớ thuật ngữ học thuật C1/C2 qua thẻ lật 3D kết hợp thuật toán lặp lại ngắt quãng (Spaced Repetition).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="compact" onClick={handleShuffle} icon={<Shuffle className="w-3.5 h-3.5" />}>
            Xáo trộn thẻ
          </Button>
        </div>
      </div>

      {/* Progress Bar & Counter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#94A3B8]">
            Thẻ {isFinished ? deck.length : currentIndex + 1} / {deck.length}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[#EF4444] font-medium">
              Ôn lại: {reviewIds.length}
            </span>
            <span className="text-[#22C55E] font-medium">
              Đã thuộc: {masteredIds.length}
            </span>
            <span className="text-[#6366F1] font-bold">
              {progressPct}% Hoàn thành
            </span>
          </div>
        </div>

        {/* Crisp Linear Progress Bar */}
        <div className="h-1.5 w-full bg-[#131B26] rounded-full overflow-hidden border border-[rgba(255,255,255,0.06)] flex">
          <div
            className="bg-[#22C55E] transition-all duration-300"
            style={{ width: `${(masteredIds.length / deck.length) * 100}%` }}
          />
          <div
            className="bg-[#EF4444] transition-all duration-300"
            style={{ width: `${(reviewIds.length / deck.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Flashcard Interactive Area */}
      {!isFinished ? (
        <div className="space-y-4">
          {/* 3D Flip Card */}
          <QuizletFlashcard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(!isFlipped)}
          />

          {/* Action Control Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
            {/* Left Button: Review Again (Red) */}
            <Button
              type="button"
              variant="danger"
              size="md"
              onClick={handleMarkReview}
              icon={<ArrowLeft className="w-4 h-4" />}
              shortcut="←"
              className="text-xs font-semibold py-3"
            >
              Cần ôn lại
            </Button>

            {/* Middle Button: Flip (Desktop & Mobile) */}
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setIsFlipped(!isFlipped)}
              icon={<RotateCcw className="w-4 h-4" />}
              shortcut="SPACE"
              className="hidden sm:inline-flex text-xs font-semibold py-3"
            >
              {isFlipped ? "Xem mặt trước" : "Lật mặt sau"}
            </Button>

            {/* Right Button: Mastered (Green) */}
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleMarkMastered}
              icon={<ArrowRight className="w-4 h-4" />}
              shortcut="→"
              className="text-xs font-semibold bg-[#059669] hover:bg-[#047857] border-[#047857] text-white py-3"
            >
              Đã ghi nhớ
            </Button>
          </div>

          {/* Bottom Hint */}
          <p className="text-center text-[11px] text-[#64748B] pt-1">
            Phím tắt: [SPACE] để Lật thẻ • [Phím Mũi Tên Trái] Chưa thuộc • [Phím Mũi Tên Phải] Đã thuộc
          </p>
        </div>
      ) : (
        /* Deck Completed Summary Card */
        <div className="surface-card rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#064E3B] flex items-center justify-center text-[#22C55E] mx-auto border border-[#059669]">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold text-white">
            Xuất sắc! Bạn đã duyệt hết {deck.length} thẻ từ vựng!
          </h2>

          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <div className="p-3 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.06)]">
              <span className="text-xs text-[#64748B] block">Đã ghi nhớ</span>
              <span className="text-lg font-mono font-bold text-[#22C55E]">
                {masteredIds.length} từ
              </span>
            </div>
            <div className="p-3 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.06)]">
              <span className="text-xs text-[#64748B] block">Cần củng cố thêm</span>
              <span className="text-lg font-mono font-bold text-[#EF4444]">
                {reviewIds.length} từ
              </span>
            </div>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <Button variant="primary" size="md" onClick={handleRestart} icon={<RotateCcw className="w-4 h-4" />}>
              Học lại bộ thẻ này
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
