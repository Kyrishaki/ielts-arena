export interface ErrorHunterSentence {
  id: string;
  sentenceWithMistake: string;
  mistakeSnippet: string;
  correctSnippet: string;
  explanation: string;
  category: "Collocation" | "Grammar" | "Preposition" | "Lexical";
}

export interface ErrorHunterState {
  matchId: string;
  currentRound: number;
  totalRounds: number;
  sentences: ErrorHunterSentence[];
  currentSentence: ErrorHunterSentence;
  buzzerLockedByPlayerId: string | null;
  buzzerLockedAt: number | null;
  lockoutPlayers: Record<string, number>; // playerId -> expiry timestamp
  scores: Record<string, number>;
  status: "WAITING_BUZZER" | "ANSWERING" | "ROUND_RESOLVED" | "FINISHED";
}

export function initErrorHunter(
  matchId: string,
  playerIds: string[],
  sentences: ErrorHunterSentence[]
): ErrorHunterState {
  const defaultSentences: ErrorHunterSentence[] = sentences.length > 0 ? sentences : [
    {
      id: "eh-1",
      sentenceWithMistake: "The government should do efforts to eradicate environmental degradation.",
      mistakeSnippet: "do efforts",
      correctSnippet: "make efforts",
      explanation: "'Effort' đi kèm collocation với động từ 'make', không dùng 'do'.",
      category: "Collocation",
    },
    {
      id: "eh-2",
      sentenceWithMistake: "Despite of the rapid economic growth, income inequality is widening.",
      mistakeSnippet: "Despite of",
      correctSnippet: "Despite",
      explanation: "'Despite' là giới từ đi kèm danh từ, không có 'of' (hoặc dùng 'In spite of').",
      category: "Grammar",
    },
  ];

  return {
    matchId,
    currentRound: 1,
    totalRounds: defaultSentences.length,
    sentences: defaultSentences,
    currentSentence: defaultSentences[0],
    buzzerLockedByPlayerId: null,
    buzzerLockedAt: null,
    lockoutPlayers: {},
    scores: playerIds.reduce((acc, id) => ({ ...acc, [id]: 0 }), {}),
    status: "WAITING_BUZZER",
  };
}

export function hitBuzzer(
  state: ErrorHunterState,
  playerId: string,
  now: number = Date.now()
): { state: ErrorHunterState; allowed: boolean; reason?: string } {
  if (state.status !== "WAITING_BUZZER") {
    return { state, allowed: false, reason: "Chuông đã bị người khác bấm trước" };
  }

  const lockoutUntil = state.lockoutPlayers[playerId];
  if (lockoutUntil && lockoutUntil > now) {
    const remaining = Math.ceil((lockoutUntil - now) / 1000);
    return { state, allowed: false, reason: `Bạn đang bị phạt khóa chuông ${remaining}s` };
  }

  return {
    state: {
      ...state,
      buzzerLockedByPlayerId: playerId,
      buzzerLockedAt: now,
      status: "ANSWERING",
    },
    allowed: true,
  };
}

export function submitCorrection(
  state: ErrorHunterState,
  playerId: string,
  mistakeFound: string,
  correction: string,
  now: number = Date.now()
): ErrorHunterState {
  if (state.status !== "ANSWERING" || state.buzzerLockedByPlayerId !== playerId) {
    throw new Error("Không thể nộp bài khi chưa bấm chuông thành công");
  }

  const current = state.currentSentence;
  const isMistakeMatch =
    current.mistakeSnippet.toLowerCase().trim() === mistakeFound.toLowerCase().trim();
  const isCorrectionMatch =
    current.correctSnippet.toLowerCase().trim() === correction.toLowerCase().trim();

  const isCorrect = isMistakeMatch && isCorrectionMatch;

  if (isCorrect) {
    return {
      ...state,
      scores: {
        ...state.scores,
        [playerId]: (state.scores[playerId] || 0) + 50,
      },
      status: "ROUND_RESOLVED",
    };
  } else {
    // Penalty: -25 points and 5-second lockout
    return {
      ...state,
      scores: {
        ...state.scores,
        [playerId]: Math.max(0, (state.scores[playerId] || 0) - 25),
      },
      lockoutPlayers: {
        ...state.lockoutPlayers,
        [playerId]: now + 5000,
      },
      buzzerLockedByPlayerId: null,
      buzzerLockedAt: null,
      status: "WAITING_BUZZER", // Re-open buzzer for other players
    };
  }
}
