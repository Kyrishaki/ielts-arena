export interface WordDuelTurn {
  word: string;
  playerId: string;
  tier: "B2" | "C1" | "C2";
  points: number;
  timestamp: number;
}

export interface WordDuelState {
  matchId: string;
  topic: string;
  currentTurnPlayerId: string;
  playerIds: [string, string];
  history: WordDuelTurn[];
  scores: Record<string, number>;
  timeRemainingSeconds: number;
  status: "IN_PROGRESS" | "TIMEOUT" | "FINISHED";
  winnerId?: string;
}

// Sample academic IELTS lexicon lookup for validation & scoring
const ACADEMIC_LEXICON: Record<string, "B2" | "C1" | "C2"> = {
  ambiguous: "C1",
  ameliorate: "C2",
  anachronism: "C2",
  anticipate: "B2",
  arbitrary: "C1",
  articulate: "C1",
  bolster: "C1",
  catalyst: "C1",
  circumvent: "C2",
  coherent: "B2",
  commensurate: "C2",
  comprehensive: "B2",
  concomitant: "C2",
  conducive: "C1",
  deleterious: "C2",
  dichotomy: "C1",
  disparate: "C1",
  elucidate: "C2",
  empirical: "C1",
  encompass: "B2",
  epitomize: "C2",
  exacerbate: "C1",
  exemplify: "B2",
  facet: "B2",
  fastidious: "C2",
  fluctuate: "B2",
  homogeneous: "C1",
  imperative: "B2",
  inevitable: "B2",
  judicious: "C2",
  lucid: "C1",
  meticulous: "C1",
  paradigm: "C1",
  pragmatic: "C1",
  quintessential: "C2",
  ubiquitous: "C1",
  viable: "B2",
};

export const TIER_SCORES = {
  B2: 10,
  C1: 25,
  C2: 50,
};

export function initWordDuel(
  matchId: string,
  playerIds: [string, string],
  topic: string = "Globalisation & Environment",
  initialWord: string = "academic"
): WordDuelState {
  return {
    matchId,
    topic,
    currentTurnPlayerId: playerIds[0],
    playerIds,
    history: [
      {
        word: initialWord.toLowerCase(),
        playerId: "SYSTEM",
        tier: "B2",
        points: 0,
        timestamp: Date.now(),
      },
    ],
    scores: {
      [playerIds[0]]: 0,
      [playerIds[1]]: 0,
    },
    timeRemainingSeconds: 15,
    status: "IN_PROGRESS",
  };
}

export function validateWordDuelMove(
  state: WordDuelState,
  playerId: string,
  word: string
): { isValid: boolean; reason?: string; tier?: "B2" | "C1" | "C2"; points?: number } {
  if (state.status !== "IN_PROGRESS") {
    return { isValid: false, reason: "Trận đấu đã kết thúc" };
  }

  if (state.currentTurnPlayerId !== playerId) {
    return { isValid: false, reason: "Chưa tới lượt của bạn" };
  }

  const normalized = word.trim().toLowerCase();
  if (normalized.length < 4) {
    return { isValid: false, reason: "Từ phải có ít nhất 4 ký tự" };
  }

  // Check last letter chain
  const lastTurn = state.history[state.history.length - 1];
  const requiredStartChar = lastTurn.word.slice(-1).toLowerCase();
  if (normalized[0] !== requiredStartChar) {
    return {
      isValid: false,
      reason: `Từ phải bắt đầu bằng chữ cái '${requiredStartChar.toUpperCase()}'`,
    };
  }

  // Check uniqueness
  const alreadyUsed = state.history.some((h) => h.word === normalized);
  if (alreadyUsed) {
    return { isValid: false, reason: "Từ vựng này đã được dùng trước đó" };
  }

  // Check academic tier
  const tier = ACADEMIC_LEXICON[normalized] || "B2";
  const points = TIER_SCORES[tier];

  return { isValid: true, tier, points };
}

export function applyWordDuelMove(
  state: WordDuelState,
  playerId: string,
  word: string
): WordDuelState {
  const validation = validateWordDuelMove(state, playerId, word);
  if (!validation.isValid || !validation.tier || !validation.points) {
    throw new Error(validation.reason || "Nước đi không hợp lệ");
  }

  const normalized = word.trim().toLowerCase();
  const nextPlayerId = state.playerIds[0] === playerId ? state.playerIds[1] : state.playerIds[0];

  return {
    ...state,
    currentTurnPlayerId: nextPlayerId,
    history: [
      ...state.history,
      {
        word: normalized,
        playerId,
        tier: validation.tier,
        points: validation.points,
        timestamp: Date.now(),
      },
    ],
    scores: {
      ...state.scores,
      [playerId]: state.scores[playerId] + validation.points,
    },
    timeRemainingSeconds: 15,
  };
}
