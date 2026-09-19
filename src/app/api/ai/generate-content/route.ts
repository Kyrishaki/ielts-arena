import { NextRequest, NextResponse } from "next/server";
import { generateGeminiContent } from "@/lib/gemini";

type ContentType = "shadowing" | "paraphrase" | "flashcard";

function getBandDescriptor(band: number): string {
  if (band < 5.5) return "B2 intermediate (common vocabulary, clear sentences, familiar IELTS topics)";
  if (band < 6.5) return "B2-C1 upper-intermediate (Academic Word List basics, passive voice, linking devices)";
  if (band < 7.5) return "C1 advanced (AWL collocations, nominalization, complex clause structures)";
  if (band < 8.5) return "C1-C2 mastery (syntactic inversion, complex nominalization, sophisticated hedging)";
  return "C2 near-native (rare academic lexis, discourse markers, inversion, C2 collocations)";
}

function buildPrompt(type: ContentType, band: number, topic?: string): string {
  const levelDesc = getBandDescriptor(band);
  const topicLine = topic ? `Topic: ${topic}.` : "Choose a relevant IELTS academic topic (environment, technology, education, urbanization, health, economy).";

  const prompts: Record<ContentType, string> = {
    shadowing: `You are an IELTS Speaking & Pronunciation expert.
Generate 3 distinct shadowing practice sentences at level: ${levelDesc}.
${topicLine}
Each sentence should be natural spoken English a Band ${band} student needs to practice.

Respond with ONLY valid JSON (no markdown):
{
  "sentences": [
    {
      "id": "s-1",
      "topic": "Topic Label (Band ${band})",
      "sentence": "The full sentence here.",
      "phonetics": "/IPA transcription/",
      "audioDuration": 4.5
    }
  ]
}`,

    paraphrase: `You are an elite IELTS Writing Task 2 examiner.
Generate 1 input sentence at Band 5.5-6.0 level, then provide 3 academic rewrites targeting Band ${band}.
${topicLine}

Respond with ONLY valid JSON (no markdown):
{
  "inputSentence": "A simple Band 5.5-6.0 sentence about the topic.",
  "rewrites": [
    {
      "structureType": "Nominalization (Danh từ hóa)",
      "sentence": "...",
      "lexicalUpgrades": [{ "original": "simple word", "upgraded": "academic word" }],
      "syntacticNote": "Explanation in Vietnamese."
    },
    {
      "structureType": "Passive Academic (Bị động Khách quan)",
      "sentence": "...",
      "lexicalUpgrades": [{ "original": "simple word", "upgraded": "academic word" }],
      "syntacticNote": "Explanation in Vietnamese."
    },
    {
      "structureType": "Syntactic Inversion (Đảo ngữ C1/C2)",
      "sentence": "...",
      "lexicalUpgrades": [{ "original": "simple word", "upgraded": "academic word" }],
      "syntacticNote": "Explanation in Vietnamese."
    }
  ]
}`,

    flashcard: `You are an expert IELTS vocabulary trainer.
Generate 6 academic flashcards appropriate for a Band ${band} student.
Level: ${levelDesc}. ${topicLine}

Each card must include: the term, part of speech, IPA, CEFR tier (B2/C1/C2),
Vietnamese meaning, 3 collocations, and a full example sentence.

Respond with ONLY valid JSON (no markdown):
{
  "cards": [
    {
      "id": "fc-1",
      "term": "Word",
      "partOfSpeech": "verb",
      "ipa": "/aɪ.pɪ.eɪ/",
      "tier": "C1",
      "vietnameseMeaning": "Nghĩa tiếng Việt",
      "collocations": ["colloc 1", "colloc 2", "colloc 3"],
      "exampleSentence": "Full academic sentence using the word."
    }
  ]
}`,
  };

  return prompts[type];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const type = (body.type as ContentType) || "flashcard";
    const band = Math.min(9, Math.max(4, parseFloat(body.band) || 6.5));
    const topic = body.topic as string | undefined;

    if (!["shadowing", "paraphrase", "flashcard"].includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const prompt = buildPrompt(type, band, topic);

    try {
      const raw = await generateGeminiContent(prompt);
      const cleaned = raw.replace(/```json\s*/g, "").replace(/```\s*$/g, "").trim();
      const parsed = JSON.parse(cleaned);
      return NextResponse.json({ ...parsed, band, type });
    } catch (aiErr) {
      console.warn("AI generate-content fallback:", aiErr);
    }

    // Fallback responses
    if (type === "shadowing") {
      return NextResponse.json({
        band, type,
        sentences: [
          {
            id: "s-1",
            topic: `Academic Topic (Band ${band})`,
            sentence: "The exponential growth of digital technology has profoundly transformed contemporary educational methodologies.",
            phonetics: "/ðə ˌɛk.spəˈnɛn.ʃəl ɡroʊθ əv ˈdɪdʒ.ɪ.tl̩ tɛkˈnɒl.ə.dʒi/",
            audioDuration: 5.2,
          },
          {
            id: "s-2",
            topic: `Academic Topic (Band ${band})`,
            sentence: "Environmental degradation poses significant challenges to sustainable urban development initiatives.",
            phonetics: "/ɪnˌvaɪ.rən.ˈmɛn.tl̩ ˌdɛɡ.rə.ˈdeɪ.ʃən ˈpoʊ.zɪz sɪɡˈnɪf.ɪ.kənt/",
            audioDuration: 4.8,
          },
          {
            id: "s-3",
            topic: `Academic Topic (Band ${band})`,
            sentence: "Governments must implement comprehensive policies to ameliorate socioeconomic disparities.",
            phonetics: "/ˈɡʌv.ərn.mənts mʌst ˈɪm.plɪ.ment ˌkɒm.prɪˈhɛn.sɪv/",
            audioDuration: 4.5,
          },
        ],
      });
    }

    if (type === "paraphrase") {
      return NextResponse.json({
        band, type,
        inputSentence: "Many people think that technology causes problems for young people.",
        rewrites: [
          {
            structureType: "Nominalization (Danh từ hóa)",
            sentence: "The pervasive proliferation of digital technology has precipitated considerable detriment to adolescent developmental trajectories.",
            lexicalUpgrades: [{ original: "causes problems", upgraded: "precipitated considerable detriment" }],
            syntacticNote: "Danh từ hóa 'proliferation' thay thế động từ 'spread' tạo tính học thuật cao.",
          },
          {
            structureType: "Passive Academic (Bị động Khách quan)",
            sentence: "It is widely acknowledged that technological advancement has been associated with deleterious consequences for the psychological well-being of younger demographics.",
            lexicalUpgrades: [{ original: "people think", upgraded: "widely acknowledged" }],
            syntacticNote: "Cấu trúc 'It is widely acknowledged that...' loại bỏ chủ ngữ cá nhân.",
          },
          {
            structureType: "Syntactic Inversion (Đảo ngữ C1/C2)",
            sentence: "Not only has technological innovation reshaped communication paradigms, but it has also engendered profound psychological repercussions among contemporary youth.",
            lexicalUpgrades: [{ original: "causes problems", upgraded: "engendered profound repercussions" }],
            syntacticNote: "Đảo ngữ 'Not only has...' gây ấn tượng mạnh với giám khảo GRA.",
          },
        ],
      });
    }

    // flashcard fallback
    return NextResponse.json({
      band, type,
      cards: [
        { id: "fc-1", term: "Ameliorate", partOfSpeech: "verb", ipa: "/əˈmiː.li.ə.reɪt/", tier: "C2", vietnameseMeaning: "Cải thiện, làm cho tốt hơn", collocations: ["ameliorate conditions", "ameliorate suffering", "measures to ameliorate"], exampleSentence: "New policies were introduced to ameliorate the acute housing crisis." },
        { id: "fc-2", term: "Ubiquitous", partOfSpeech: "adjective", ipa: "/juːˈbɪk.wɪ.təs/", tier: "C1", vietnameseMeaning: "Có mặt khắp nơi, phổ biến rộng rãi", collocations: ["ubiquitous presence", "become ubiquitous", "ubiquitous technology"], exampleSentence: "Smartphones have become ubiquitous across all socioeconomic demographics." },
        { id: "fc-3", term: "Exacerbate", partOfSpeech: "verb", ipa: "/ɪɡˈzæs.ə.beɪt/", tier: "C1", vietnameseMeaning: "Làm trầm trọng thêm", collocations: ["exacerbate the problem", "exacerbate tensions", "further exacerbated by"], exampleSentence: "Industrial pollution has significantly exacerbated respiratory conditions in urban areas." },
        { id: "fc-4", term: "Proliferate", partOfSpeech: "verb", ipa: "/prəˈlɪf.ər.eɪt/", tier: "C1", vietnameseMeaning: "Sinh sôi nảy nở, lan rộng nhanh chóng", collocations: ["rapidly proliferate", "proliferation of", "continue to proliferate"], exampleSentence: "Online misinformation has continued to proliferate across social media platforms." },
        { id: "fc-5", term: "Mitigate", partOfSpeech: "verb", ipa: "/ˈmɪt.ɪ.ɡeɪt/", tier: "C1", vietnameseMeaning: "Giảm nhẹ, hạn chế (tác hại)", collocations: ["mitigate risks", "mitigate the impact", "measures to mitigate"], exampleSentence: "International cooperation is essential to mitigate the devastating effects of climate change." },
        { id: "fc-6", term: "Pervasive", partOfSpeech: "adjective", ipa: "/pəˈveɪ.sɪv/", tier: "C1", vietnameseMeaning: "Lan tràn khắp nơi, có mặt ở mọi nơi", collocations: ["pervasive influence", "pervasive problem", "increasingly pervasive"], exampleSentence: "The pervasive influence of social media has fundamentally altered interpersonal communication." },
      ],
    });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
