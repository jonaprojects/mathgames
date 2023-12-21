import { useMemo, useState } from "react";
import usePlayer from "./usePlayer";

export default function useOpponent() {
  const [
    opponentScore,
    increaseOpponentScore,
    opponentAnswer,
    setOpponentAnswer,
  ] = usePlayer();

  const [opponentObj, setOpponentObj] = useState(null);

  return [
    opponentScore, 
    increaseOpponentScore,
    opponentAnswer,
    setOpponentAnswer,
    opponentObj,
    setOpponentObj
  ]
}
