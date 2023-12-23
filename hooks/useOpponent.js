import { useMemo, useState } from "react";
import usePlayer from "./usePlayer";

// Extend this with more states.

export default function useOpponent() {
  const [
    opponentScore,
    increaseOpponentScore,
    opponentAnswer,
    setOpponentAnswer,
  ] = usePlayer();

  const [opponentSprite, setOpponentSprite] = useState(null);

  return [
    opponentScore,
    increaseOpponentScore,
    opponentAnswer,
    setOpponentAnswer,
    opponentSprite,
    setOpponentSprite,
  ];
}
