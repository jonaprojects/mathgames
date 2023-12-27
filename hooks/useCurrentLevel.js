import { useState, useEffect } from "react";
import { getCurrentLevel } from "./handleLevelsLogic";

export default function useCurrentLevel() {
  const [currentLevel, setCurrentLevel] = useState(null);

  useEffect(() => {
    setCurrentLevel(getCurrentLevel());
  }, []);

  return [currentLevel, setCurrentLevel];
}
