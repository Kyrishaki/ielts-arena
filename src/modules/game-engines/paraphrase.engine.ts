export interface ParaphraseSubmission {
  playerId: string;
  paraphrasedText: string;
  timeSpentSeconds: number;
  lexicalScore: number;
  syntacticVarietyScore: number;
  overallBand: number;
  feedbackSnippets: string[];
}

export interface ParaphraseBlitzState {
  matchId: string;
  originalSentence: string;
  originalBand: number;
  timeLimitSeconds: number;
  timeRemainingSeconds: number;
  playerIds: string[];
  submissions: Record<string, ParaphraseSubmission>;
  status: "WAITING" | "COUNTDOWN" | "IN_PROGRESS" | "EVALUATING" | "FINISHED";
  winnerId?: string;
}

export function initParaphraseBlitz(
  matchId: string,
  playerIds: string[],
  originalSentence: string = "Many people think that cars make the city polluted and dangerous for citizens.",
  originalBand: number = 5.5
): ParaphraseBlitzState {
  return {
    matchId,
    originalSentence,
    originalBand,
    timeLimitSeconds: 45,
    timeRemainingSeconds: 45,
    playerIds,
    submissions: {},
    status: "IN_PROGRESS",
  };
}

export function evaluateParaphraseClientSide(
  original: string,
  paraphrased: string,
  timeSpent: number
): {
  lexicalScore: number;
  syntacticVarietyScore: number;
  overallBand: number;
  feedbackSnippets: string[];
} {
  const words = paraphrased.trim().split(/\s+/);
  const wordCount = words.length;

  if (wordCount < 6) {
    return {
      lexicalScore: 4.0,
      syntacticVarietyScore: 4.0,
      overallBand: 4.0,
      feedbackSnippets: ["Câu quá ngắn để đánh giá tiêu chuẩn IELTS."],
    };
  }

  // Academic markers
  const academicMarkers = [
    "furthermore",
    "deleterious",
    "ubiquitous",
    "exacerbate",
    "consequently",
    "catalyst",
    "imperative",
    "it is argued that",
    "it is widely acknowledged",
    "substantial threat",
    "pose a substantial threat",
    "poses a substantial threat",
    "exponentially",
    "mitigate",
    "emissions",
    "public health",
  ];

  const lower = paraphrased.toLowerCase();
  let lexicalHits = 0;
  for (const marker of academicMarkers) {
    if (lower.includes(marker)) lexicalHits++;
  }

  // Calculate scores
  let lexicalScore = 6.0 + Math.min(2.5, lexicalHits * 0.8);
  let syntacticScore = 6.5;

  // Check complex syntax structures
  if (lower.includes("which") || lower.includes("although") || lower.includes("whereas")) {
    syntacticScore += 0.8;
  }
  if (lower.includes("by") || lower.includes("is considered") || lower.includes("has been")) {
    syntacticScore += 0.5; // Passive voice
  }

  lexicalScore = Math.min(9.0, Math.round(lexicalScore * 10) / 10);
  syntacticScore = Math.min(9.0, Math.round(syntacticScore * 10) / 10);
  const overallBand = Math.round(((lexicalScore + syntacticScore) / 2) * 10) / 10;

  const feedbacks: string[] = [];
  if (lexicalHits > 1) {
    feedbacks.push("Sử dụng từ vựng C1/C2 tự nhiên và đúng văn cảnh học thuật.");
  } else {
    feedbacks.push("Nên bổ sung thêm các collocations nâng cao để vượt ngưỡng Band 7.0.");
  }

  return {
    lexicalScore,
    syntacticVarietyScore: syntacticScore,
    overallBand,
    feedbackSnippets: feedbacks,
  };
}

export function submitParaphrase(
  state: ParaphraseBlitzState,
  playerId: string,
  paraphrasedText: string
): ParaphraseBlitzState {
  const timeSpent = state.timeLimitSeconds - state.timeRemainingSeconds;
  const evaluation = evaluateParaphraseClientSide(state.originalSentence, paraphrasedText, timeSpent);

  const newSubmissions = {
    ...state.submissions,
    [playerId]: {
      playerId,
      paraphrasedText,
      timeSpentSeconds: timeSpent,
      lexicalScore: evaluation.lexicalScore,
      syntacticVarietyScore: evaluation.syntacticVarietyScore,
      overallBand: evaluation.overallBand,
      feedbackSnippets: evaluation.feedbackSnippets,
    },
  };

  const allSubmitted = state.playerIds.every((pid) => newSubmissions[pid] !== undefined);

  return {
    ...state,
    submissions: newSubmissions,
    status: allSubmitted ? "FINISHED" : state.status,
  };
}
