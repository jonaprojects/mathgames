import { useRouter } from "next/router";
import { getLevelStatistics } from "./handleLevelsLogic";

const { useEffect, useState } = require("react");

export default function useLevelStatistics(props) {
  const router = useRouter();

  // use the level statistics in a way that doesn't
  // create an hydration error when using "router" for instance
  const [currentLevel, setCurrentLevel] = useState(null);
  const [numOfLevels, setNumOfLevels] = useState(null);
  const [levelsProgressPercentage, setLevelsProgressPercentage] =
    useState(null);

  const loadStatistics = () => {
    const [levelTemp, numOfLevelsTemp, progressTemp] = getLevelStatistics();
    setCurrentLevel(levelTemp);
    setNumOfLevels(numOfLevelsTemp);
    setLevelsProgressPercentage(progressTemp);
  };
  useEffect(() => {
    if (router.isReady) {
      loadStatistics();
    }
  }, [router.isReady]);

  return [currentLevel, numOfLevels, levelsProgressPercentage, loadStatistics];
}
