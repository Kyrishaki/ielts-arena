import { NextRequest, NextResponse } from "next/server";
import { generateGeminiContent } from "@/lib/gemini";

export interface TranslationResponse {
  tiers: Array<{
    band: string;
    text: string;
    analysis: string[];
    keyCollocations: string[];
  }>;
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp văn bản cần dịch." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a world-class IELTS examiner and translation linguist.
Given an input sentence (Vietnamese or English), translate and upgrade it into 3 distinct IELTS writing band levels:
1. Band 6.5 (Clear, natural, correct grammar)
2. Band 7.5 (Academic, formal, uses Academic Word List - AWL, passive constructions)
3. Band 8.5+ (Mastery of C1/C2 academic collocations, syntactic inversion or complex nominalization)

You MUST respond strictly with valid JSON conforming to this schema (no markdown fences, no raw text):
{
  "tiers": [
    {
      "band": "Band 6.5 (Tự nhiên)",
      "text": "...",
      "analysis": ["point 1", "point 2"],
      "keyCollocations": ["colloc1", "colloc2"]
    },
    {
      "band": "Band 7.5 (Học thuật Chuyên sâu)",
      "text": "...",
      "analysis": ["point 1", "point 2"],
      "keyCollocations": ["colloc1", "colloc2", "colloc3"]
    },
    {
      "band": "Band 8.5+ (Tái tạo C1/C2 & Đảo ngữ)",
      "text": "...",
      "analysis": ["point 1", "point 2"],
      "keyCollocations": ["colloc1", "colloc2", "colloc3"]
    }
  ]
}`;

    try {
      const aiResponseText = await generateGeminiContent(
        `Input text to translate and upgrade:\n"${text}"`,
        systemPrompt
      );

      // Clean response in case of markdown wrapping
      const cleaned = aiResponseText.replace(/```json\s*/g, "").replace(/```\s*$/g, "").trim();
      const parsed = JSON.parse(cleaned);

      if (parsed.tiers && Array.isArray(parsed.tiers) && parsed.tiers.length === 3) {
        return NextResponse.json(parsed);
      }
    } catch (aiErr) {
      console.warn("AI generation fallback triggered:", aiErr);
    }

    // AI unavailable — return error message instead of gibberish fallback
    return NextResponse.json({
      tiers: [
        {
          band: "Band 6.5 (Tự nhiên)",
          text: "The rapid development of technology brings significant benefits to modern society, though it also creates various environmental challenges.",
          analysis: ["Cấu trúc câu phức với mệnh đề nhượng bộ 'though it also...'", "Từ vựng B2-C1 chuẩn IELTS"],
          keyCollocations: ["rapid development", "significant benefits", "environmental challenges"],
        },
        {
          band: "Band 7.5 (Học thuật Chuyên sâu)",
          text: "It is widely acknowledged that technological advancement has yielded substantial socioeconomic dividends, albeit at the cost of exacerbating ecological degradation.",
          analysis: ["Mệnh đề bị động khách quan 'It is widely acknowledged that'", "Cấu trúc nhượng bộ 'albeit at the cost of'"],
          keyCollocations: ["widely acknowledged", "socioeconomic dividends", "ecological degradation"],
        },
        {
          band: "Band 8.5+ (Tái tạo C1/C2 & Đảo ngữ)",
          text: "Seldom can it be contested that the exponential proliferation of technological innovation has served as a quintessential catalyst for profound institutional transformation, notwithstanding its deleterious environmental ramifications.",
          analysis: ["Cấu trúc đảo ngữ phủ định 'Seldom can it be contested'", "Cụm danh từ học thuật C2 'quintessential catalyst'"],
          keyCollocations: ["seldom contested", "quintessential catalyst", "deleterious ramifications"],
        },
      ],
      _fallback: true,
      _notice: "AI tạm thời không phản hồi. Đây là bản dịch mẫu. Vui lòng thử lại.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
