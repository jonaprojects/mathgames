import { useState } from "react";

export default function usePlayer() {
  const [currentScore, setCurrentScore] = useState(0);
  const [answer, setAnswer] = useState(null);

  const increaseScore = (reward) => {
    setCurrentScore((prevScore) => prevScore + reward);
  };

  return [currentScore, increaseScore, answer, setAnswer];
}
