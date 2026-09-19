import { NextRequest, NextResponse } from "next/server";
import { generateGeminiContent } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { essay } = await req.json();

    if (!essay || typeof essay !== "string" || !essay.trim()) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp bài viết Task 2." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a Senior IELTS Examiner.
Evaluate the submitted paragraph or essay across the official 4 IELTS criteria (TR, CC, LR, GRA) from 0 to 9.0 in steps of 0.5.
Also provide a reconstructed Band 8.5+ version of the text.

Respond strictly with valid JSON conforming to this schema (no markdown formatting, no code blocks):
{
  "tr": 7.5,
  "cc": 7.0,
  "lr": 8.0,
  "gra": 7.5,
  "overallBand": 7.5,
  "reconstructedBand85": "...",
  "strengths": ["point 1", "point 2"],
  "improvements": ["point 1", "point 2"]
}`;

    try {
      const aiResponseText = await generateGeminiContent(
        `Essay text to evaluate:\n"${essay}"`,
        systemPrompt
      );

      const cleaned = aiResponseText.replace(/```json\s*/g, "").replace(/```\s*$/g, "").trim();
      const parsed = JSON.parse(cleaned);

      if (parsed.overallBand && parsed.reconstructedBand85) {
        return NextResponse.json(parsed);
      }
    } catch (aiErr) {
      console.warn("AI writing evaluation fallback triggered:", aiErr);
    }

    // AI unavailable — return generic example instead of inserting raw essay text
    return NextResponse.json({
      tr: 7.5,
      cc: 7.0,
      lr: 8.0,
      gra: 7.5,
      overallBand: 7.5,
      reconstructedBand85: "It is widely contended that the proliferation of digital technology constitutes a profound catalyst for sustainable structural advancement in contemporary educational paradigms, notwithstanding the concomitant challenges it poses to interpersonal connectivity.",
      strengths: [
        "Luận điểm rõ ràng, cấu trúc câu chặt chẽ",
        "Có nỗ lực sử dụng các từ vựng học thuật trong chủ đề",
      ],
      improvements: [
        "Nên bổ sung thêm các cấu trúc đảo ngữ hoặc danh từ hóa phức hợp để nâng band GRA",
        "Tránh lặp lại các động từ chỉ quan điểm đơn giản",
      ],
      _fallback: true,
      _notice: "AI tạm thời không phản hồi. Đây là điểm mẫu. Vui lòng thử lại.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
