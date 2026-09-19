import React from "react";
import { notFound } from "next/navigation";
import { WordDuelArena } from "@/components/arena/WordDuelArena";
import { ParaphraseBlitzArena } from "@/components/arena/ParaphraseBlitzArena";
import { ErrorHunterArena } from "@/components/arena/ErrorHunterArena";
import { ListeningBombArena } from "@/components/arena/ListeningBombArena";
import { TopicDebateArena } from "@/components/arena/TopicDebateArena";

export interface ArenaGamePageProps {
  params: {
    gameType: string;
  };
}

export default function ArenaGamePage({ params }: ArenaGamePageProps) {
  const { gameType } = params;

  switch (gameType) {
    case "word-duel":
      return <WordDuelArena />;
    case "paraphrase-blitz":
      return <ParaphraseBlitzArena />;
    case "error-hunter":
      return <ErrorHunterArena />;
    case "listening-bomb":
      return <ListeningBombArena />;
    case "topic-debate":
      return <TopicDebateArena />;
    default:
      notFound();
  }
}
