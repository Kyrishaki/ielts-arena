import { NextRequest, NextResponse } from "next/server";
import { generateGeminiContent } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { sentence } = await req.json();

    if (!sentence || typeof sentence !== "string" || !sentence.trim()) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp câu cần viết lại." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an elite IELTS Writing evaluator.
Given an input sentence, rewrite it into 3 distinct Band 8.5+ academic styles:
1. "Nominalization (Danh từ hóa)": Convert verbs/adjectives into formal noun phrases.
2. "Passive Academic (Bị động Khách quan)": Remove personal subjects and use objective academic hedging.
3. "Syntactic Inversion (Đảo ngữ C1/C2)": Use negative inversion (e.g. Under no circumstances, Seldom, Not only).

Respond strictly with valid JSON conforming to this schema (no markdown formatting, no code blocks):
{
  "rewrites": [
    {
      "structureType": "Nominalization (Danh từ hóa)",
      "sentence": "...",
      "lexicalUpgrades": [
        { "original": "word1", "upgraded": "c1_word1" }
      ],
      "syntacticNote": "explanation..."
    },
    {
      "structureType": "Passive Academic (Bị động Khách quan)",
      "sentence": "...",
      "lexicalUpgrades": [
        { "original": "word2", "upgraded": "c1_word2" }
      ],
      "syntacticNote": "explanation..."
    },
    {
      "structureType": "Syntactic Inversion (Đảo ngữ C1/C2)",
      "sentence": "...",
      "lexicalUpgrades": [
        { "original": "word3", "upgraded": "c1_word3" }
      ],
      "syntacticNote": "explanation..."
    }
  ]
}`;

    try {
      const aiResponseText = await generateGeminiContent(
        `Original sentence to paraphrase:\n"${sentence}"`,
        systemPrompt
      );

      const cleaned = aiResponseText.replace(/```json\s*/g, "").replace(/```\s*$/g, "").trim();
      const parsed = JSON.parse(cleaned);

      if (parsed.rewrites && Array.isArray(parsed.rewrites) && parsed.rewrites.length === 3) {
        return NextResponse.json(parsed);
      }
    } catch (aiErr) {
      console.warn("AI paraphrase generation fallback triggered:", aiErr);
    }

    // AI unavailable — return proper example instead of gibberish
    return NextResponse.json({
      rewrites: [
        {
          structureType: "Nominalization (Danh từ hóa)",
          sentence: "The rapid escalation of urban migration has precipitated profound deficits in municipal infrastructure and public service delivery.",
          lexicalUpgrades: [
            { original: "cities grow fast", upgraded: "rapid escalation of urban migration" },
            { original: "causes big problems", upgraded: "precipitated profound deficits" },
          ],
          syntacticNote: "Sử dụng cấu trúc danh từ hóa 'The rapid escalation of...' tạo tính trang trọng chuẩn mực.",
        },
        {
          structureType: "Passive Academic (Bị động Khách quan)",
          sentence: "It is widely posited by contemporary urban scholars that unregulated metropolitan expansion is intrinsically correlated with the deterioration of communal well-being.",
          lexicalUpgrades: [
            { original: "people say", upgraded: "widely posited by contemporary scholars" },
            { original: "health gets worse", upgraded: "deterioration of communal well-being" },
          ],
          syntacticNote: "Loại bỏ chủ ngữ cá nhân và sử dụng bị động khách quan 'It is widely posited that...'.",
        },
        {
          structureType: "Syntactic Inversion (Đảo ngữ C1/C2)",
          sentence: "Under no circumstances should policymakers underestimate the extent to which unchecked urbanization has exacerbated socioeconomic stratification.",
          lexicalUpgrades: [
            { original: "governments should not ignore", upgraded: "under no circumstances should policymakers underestimate" },
          ],
          syntacticNote: "Đảo ngữ phủ định 'Under no circumstances should...' gây ấn tượng mạnh với giám khảo chấm Grammatical Range.",
        },
      ],
      _fallback: true,
      _notice: "AI tạm thời không phản hồi. Đây là bản mẫu. Vui lòng thử lại.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
