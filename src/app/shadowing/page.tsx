"use client";

import React, { useState } from "react";
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Mic,
  MicOff,
  Sparkles,
  Volume2,
  CheckCircle2,
  Sliders,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ShadowingItem {
  id: string;
  topic: string;
  sentence: string;
  phonetics: string;
  audioDuration: number;
}

const SAMPLE_SENTENCES: ShadowingItem[] = [
  {
    id: "s-1",
    topic: "Technology & Environment (Band 8.5)",
    sentence: "Seldom has the exponential proliferation of technological innovation exerted such profound ramifications upon modern civilization.",
    phonetics: "/ˈsɛl.dəm hæz ði ˌɛk.spəˈnɛn.ʃəl prəˌlɪf.əˈreɪ.ʃən əv ˌtɛk.nəˈlɒdʒ.ɪ.kəl ˌɪn.əˈveɪ.ʃən ɪɡˈzɜː.tɪd sʌtʃ prəˈfaʊnd ˌræm.ɪ.fɪˈkeɪ.ʃənz/",
    audioDuration: 6.2,
  },
  {
    id: "s-2",
    topic: "Education & Economy (Band 8.0)",
    sentence: "It is incumbent upon academic institutions to cultivate critical analytical faculties rather than mere rote memorization.",
    phonetics: "/ɪt ɪz ɪnˈkʌm.bənt əˈpɒn ˌæk.əˈdɛm.ɪk ˌɪn.stɪˈtjuː.ʃənz tuː ˈkʌl.tɪ.veɪt ˈkrɪt.ɪ.kəl ˌæn.əˈlɪt.ɪ.kəl ˈfæk.əl.tiz/",
    audioDuration: 5.8,
  },
];

export default function ShadowingPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.75 | 1.0 | 1.25>(1.0);
  const [isLooping, setIsLooping] = useState(true);
  const [recordedAudio, setRecordedAudio] = useState<boolean>(false);
  const [aiScore, setAiScore] = useState<{
    pronunciation: number;
    intonation: number;
    fluency: number;
    feedback: string;
  } | null>(null);

  const currentItem = SAMPLE_SENTENCES[selectedIndex];

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordedAudio(false);
      setAiScore(null);
    } else {
      setIsRecording(false);
      setRecordedAudio(true);
      // Simulate instant AI speech alignment
      setTimeout(() => {
        setAiScore({
          pronunciation: 88,
          intonation: 84,
          fluency: 90,
          feedback: "Ngữ điệu câu đảo ngữ 'Seldom has...' chuẩn xác. Cần nhấn rõ hơn âm tiết thứ 4 của từ 'proliferation' (/leɪ/).",
        });
      }, 500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[rgba(255,255,255,0.08)]">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Headphones className="w-5 h-5 text-[#6366F1]" />
            Shadowing Audio Lab (Luyện Ngữ Điệu & Nối Âm)
          </h1>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Phương pháp nhại giọng phản xạ theo người bản xứ. AI đối soát phát âm, cao độ (pitch contour) và độ trôi chảy.
          </p>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-1.5 bg-[#131B26] p-1 rounded border border-[rgba(255,255,255,0.08)]">
          <Sliders className="w-3.5 h-3.5 text-[#64748B] ml-1 mr-0.5" />
          {([0.75, 1.0, 1.25] as const).map((spd) => (
            <button
              key={spd}
              onClick={() => setPlaybackSpeed(spd)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                playbackSpeed === spd
                  ? "bg-[#6366F1] text-white font-bold"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* Main Shadowing Workspace */}
      <div className="surface-card rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-4 sm:p-6 space-y-6">
        {/* Sentence Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[rgba(255,255,255,0.08)]">
          {SAMPLE_SENTENCES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedIndex(idx);
                setAiScore(null);
                setRecordedAudio(false);
              }}
              className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                selectedIndex === idx
                  ? "bg-[#1C2636] text-white border border-[rgba(255,255,255,0.12)]"
                  : "text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              {item.topic}
            </button>
          ))}
        </div>

        {/* Big Target Sentence Display with IPA */}
        <div className="p-4 sm:p-5 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.08)] text-center space-y-2">
          <span className="text-[11px] font-mono text-[#6366F1] tracking-wider uppercase block">
            CÂU MẪU BẢN XỨ (BAND 8.5)
          </span>
          <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
            "{currentItem.sentence}"
          </p>
          <p className="text-xs text-[#94A3B8] font-mono tracking-wide">
            {currentItem.phonetics}
          </p>
        </div>

        {/* Audio Waveform & Player Controls */}
        <div className="p-4 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.08)] space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#94A3B8] flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-[#6366F1]" />
              Audio Bản Xứ (Giọng Anh - RP)
            </span>
            <span className="font-mono text-[#64748B]">Tốc độ: {playbackSpeed}x | Lặp lại: {isLooping ? "Bật" : "Tắt"}</span>
          </div>

          {/* Sóng âm giả lập tương tác */}
          <div className="flex items-center justify-center gap-1 h-14 bg-[#131B26] rounded px-3 border border-[rgba(255,255,255,0.05)]">
            {[35, 60, 90, 45, 80, 100, 70, 50, 85, 65, 40, 95, 75, 55, 85, 30, 70, 90, 60, 40, 80, 100, 60, 30].map(
              (h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-150 ${
                    isPlaying
                      ? "bg-[#6366F1] animate-pulse"
                      : "bg-[rgba(255,255,255,0.15)]"
                  }`}
                  style={{ height: isPlaying ? `${h}%` : "25%" }}
                />
              )
            )}
          </div>

          {/* Action Player Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="secondary"
              size="compact"
              onClick={handleTogglePlay}
              icon={isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            >
              {isPlaying ? "Tạm dừng" : "Nghe mẫu (Native)"}
            </Button>

            <Button
              variant="outline"
              size="compact"
              onClick={() => setIsLooping(!isLooping)}
              icon={<RotateCcw className={`w-3.5 h-3.5 ${isLooping ? "text-[#6366F1]" : ""}`} />}
            >
              {isLooping ? "Đang bật lặp câu" : "Bật lặp câu"}
            </Button>
          </div>
        </div>

        {/* Microphone Recording Section */}
        <div className="p-4 rounded bg-[#0B0F17] border border-[rgba(255,255,255,0.08)] text-center space-y-3">
          <span className="text-xs text-[#94A3B8] block">
            Bật mic và đọc đồng thanh (hoặc ngay sau 0.5s) theo người bản xứ:
          </span>

          <Button
            type="button"
            variant={isRecording ? "danger" : "primary"}
            size="lg"
            onClick={handleToggleRecord}
            icon={isRecording ? <MicOff className="w-4 h-4 animate-bounce" /> : <Mic className="w-4 h-4" />}
            className="w-full sm:w-auto px-6 text-sm"
          >
            {isRecording ? "Dừng thu âm & Phân tích AI" : "Bắt đầu Shadowing (Thu âm)"}
          </Button>

          {isRecording && (
            <p className="text-xs text-[#22C55E] animate-pulse">
              ● Đang thu âm giọng đọc của bạn...
            </p>
          )}
        </div>

        {/* AI Scoring Result Container */}
        {aiScore && (
          <div className="p-4 rounded bg-[#1C2636] border border-[#6366F1]/40 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.08)]">
              <span className="flex items-center gap-2 text-xs font-semibold text-[#A5B4FC]">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                Đánh Giá AI Shadowing
              </span>
              <span className="text-xs font-mono font-bold text-[#22C55E]">
                Điểm tổng quan: 87 / 100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded bg-[#0B0F17] text-center">
                <span className="text-[10px] text-[#64748B] block">Phát âm (Pronunciation)</span>
                <span className="text-base font-mono font-bold text-[#22C55E]">{aiScore.pronunciation}%</span>
              </div>
              <div className="p-2.5 rounded bg-[#0B0F17] text-center">
                <span className="text-[10px] text-[#64748B] block">Ngữ điệu (Intonation)</span>
                <span className="text-base font-mono font-bold text-[#6366F1]">{aiScore.intonation}%</span>
              </div>
              <div className="p-2.5 rounded bg-[#0B0F17] text-center">
                <span className="text-[10px] text-[#64748B] block">Độ lưu loát (Fluency)</span>
                <span className="text-base font-mono font-bold text-[#F59E0B]">{aiScore.fluency}%</span>
              </div>
            </div>

            <p className="text-xs text-[#F8FAFC] bg-[#0B0F17] p-2.5 rounded border border-[rgba(255,255,255,0.06)] leading-relaxed">
              <Sparkles className="w-3.5 h-3.5 text-[#6366F1] inline-block mr-1.5" />
              {aiScore.feedback}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
