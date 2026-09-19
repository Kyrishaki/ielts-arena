export interface BombWire {
  positionIndex: number;
  expectedWord: string;
  isDefused: boolean;
  defusedByPlayerId?: string;
}

export interface ListeningBombState {
  matchId: string;
  audioClipUrl: string;
  fullTranscript: string;
  wires: BombWire[];
  fuseSecondsRemaining: number;
  totalScore: number;
  playerIds: string[];
  status: "DEFUSING" | "DEFUSED" | "EXPLODED";
}

export function initListeningBomb(
  matchId: string,
  playerIds: string[],
  audioClipUrl: string = "/audio/sample-lecture.mp3",
  transcript: string = "The archaeological evidence suggests that ancient inhabitants developed sophisticated irrigation methods.",
  blanks: Array<{ positionIndex: number; expectedWord: string }> = [
    { positionIndex: 1, expectedWord: "archaeological" },
    { positionIndex: 6, expectedWord: "inhabitants" },
    { positionIndex: 8, expectedWord: "sophisticated" },
  ]
): ListeningBombState {
  return {
    matchId,
    audioClipUrl,
    fullTranscript: transcript,
    wires: blanks.map((b) => ({
      positionIndex: b.positionIndex,
      expectedWord: b.expectedWord.toLowerCase(),
      isDefused: false,
    })),
    fuseSecondsRemaining: 60,
    totalScore: 0,
    playerIds,
    status: "DEFUSING",
  };
}

export function submitWireDefusal(
  state: ListeningBombState,
  playerId: string,
  wireIndex: number,
  typedWord: string
): ListeningBombState {
  if (state.status !== "DEFUSING") {
    return state;
  }

  const wire = state.wires[wireIndex];
  if (!wire || wire.isDefused) {
    return state;
  }

  const isMatch = wire.expectedWord === typedWord.trim().toLowerCase();

  if (isMatch) {
    const updatedWires = state.wires.map((w, idx) =>
      idx === wireIndex ? { ...w, isDefused: true, defusedByPlayerId: playerId } : w
    );
    const allDefused = updatedWires.every((w) => w.isDefused);

    return {
      ...state,
      wires: updatedWires,
      totalScore: state.totalScore + 100,
      fuseSecondsRemaining: Math.min(60, state.fuseSecondsRemaining + 5), // Bonus time for accurate defusal
      status: allDefused ? "DEFUSED" : "DEFUSING",
    };
  } else {
    // Penalty: Fuse countdown speeds up by 5 seconds
    const newFuse = Math.max(0, state.fuseSecondsRemaining - 5);
    return {
      ...state,
      fuseSecondsRemaining: newFuse,
      status: newFuse === 0 ? "EXPLODED" : "DEFUSING",
    };
  }
}
