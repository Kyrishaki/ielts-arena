export type GameType =
  | "WORD_DUEL"
  | "PARAPHRASE_BLITZ"
  | "ERROR_HUNTER"
  | "LISTENING_BOMB"
  | "TOPIC_DEBATE"
  | "GLOBAL_RANK";

export type MatchMode = "PVP_1V1" | "COOP_TEAM";

export type MatchStatus = "WAITING" | "IN_PROGRESS" | "FINISHED" | "CANCELLED";

export type ParticipantResult = "WIN" | "LOSS" | "DRAW" | "COMPLETED";

export interface AIEvaluationRubric {
  tr: number; // Task Response / Achievement (0 - 9.0)
  cc: number; // Coherence & Cohesion (0 - 9.0)
  lr: number; // Lexical Resource (0 - 9.0)
  gra: number; // Grammatical Range & Accuracy (0 - 9.0)
  overallBand: number;
  highlightedIssues?: Array<{
    type: "collocation" | "grammar" | "vocabulary" | "punctuation";
    snippet: string;
    correction: string;
    explanation: string;
  }>;
  bandUpgradeSuggestion?: string;
}

export interface MatchMetadata {
  topic?: string;
  cefrLevel?: "B2" | "C1" | "C2";
  targetBand?: number;
  audioSnippetUrl?: string;
  transcriptBlankPositions?: number[];
  initialWord?: string;
  promptQuestion?: string;
}

export interface PlayerProfile {
  id: string;
  username: string;
  avatarUrl?: string | null;
  elo: number;
  winStreak: number;
  currentBandTarget: number;
}
