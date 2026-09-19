export interface DebateTurnEvaluation {
  playerId: string;
  roundNumber: number;
  fluencyScore: number;
  lexicalScore: number;
  grammarScore: number;
  speechDurationSeconds: number;
  transcript: string;
  aiRefereeVerdict: string;
}

export interface TopicDebateState {
  matchId: string;
  topicCard: {
    title: string;
    description: string;
    perspectiveA: string;
    perspectiveB: string;
  };
  playerAId: string;
  playerBId: string;
  currentSpeakerId: string;
  currentRound: number;
  maxRounds: number;
  roundTimeSeconds: number;
  evaluations: DebateTurnEvaluation[];
  status: "PREPARING" | "SPEAKING" | "AI_DELIBERATING" | "FINISHED";
  winnerId?: string;
}

export function initTopicDebate(
  matchId: string,
  playerAId: string,
  playerBId: string
): TopicDebateState {
  return {
    matchId,
    topicCard: {
      title: "Artificial Intelligence in Academic Research",
      description: "Should academic institutions restrict student usage of generative AI?",
      perspectiveA: "Strict restriction to protect cognitive synthesis and authenticity.",
      perspectiveB: "Active integration into curriculum to foster digital fluency.",
    },
    playerAId,
    playerBId,
    currentSpeakerId: playerAId,
    currentRound: 1,
    maxRounds: 2,
    roundTimeSeconds: 60,
    evaluations: [],
    status: "PREPARING",
  };
}

export function advanceDebateTurn(
  state: TopicDebateState,
  evaluation: DebateTurnEvaluation
): TopicDebateState {
  const nextEvaluations = [...state.evaluations, evaluation];
  const isLastSpeakerInRound = state.currentSpeakerId === state.playerBId;

  if (isLastSpeakerInRound) {
    if (state.currentRound >= state.maxRounds) {
      // Finished debate - determine winner based on aggregate AI scores
      const scoreA = nextEvaluations
        .filter((e) => e.playerId === state.playerAId)
        .reduce((sum, e) => sum + e.fluencyScore + e.lexicalScore + e.grammarScore, 0);

      const scoreB = nextEvaluations
        .filter((e) => e.playerId === state.playerBId)
        .reduce((sum, e) => sum + e.fluencyScore + e.lexicalScore + e.grammarScore, 0);

      const winnerId = scoreA > scoreB ? state.playerAId : scoreB > scoreA ? state.playerBId : "DRAW";

      return {
        ...state,
        evaluations: nextEvaluations,
        status: "FINISHED",
        winnerId,
      };
    } else {
      return {
        ...state,
        currentRound: state.currentRound + 1,
        currentSpeakerId: state.playerAId,
        evaluations: nextEvaluations,
        status: "SPEAKING",
      };
    }
  } else {
    return {
      ...state,
      currentSpeakerId: state.playerBId,
      evaluations: nextEvaluations,
      status: "SPEAKING",
    };
  }
}
